import { Request, Response } from 'express';
import FileHelper from '@helpers/FileHelper';
import Game from '@models/Game';

/**
 * Controller to Game Model
 * @class GameController
 */
class GameController {
  /**
   * Method to return a game by id
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof GameController
   */
  async viewGame(req: Request, res: Response) {
    const result = await FileHelper.readFromFile();
    const { id } = req.params;

    if (result) {
      // Search the index by id
      const gameIndex = (result as Game[]).findIndex((item: Game) => {
        if (item.id) return item.id.toString() === id;
        return false;
      });

      // Case game not found
      if (gameIndex === -1) {
        return res.status(404).json('Game not found');
      }

      // Case game was found, generate a new Game to parse
      const gameDAO = (result as Game[])[gameIndex];
      const game = new Game(
        gameDAO.id,
        gameDAO.totalKills,
        gameDAO.players,
        gameDAO.kills,
      );
      return res.status(200).json(game.parseToShow());
    }

    return res
      .status(500)
      .json('Something happened, please repeat the request');
  }

  /**
   * Method to reload games.log file
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof GameController
   */
  async reloadFile(req: Request, res: Response) {
    try {
      FileHelper.reloadFile();
      return res.status(200).json('File log was reloaded');
    } catch (error) {
      return res
        .status(500)
        .json('Something happened, please repeat the request');
    }
  }

  /**
   * Function to list all games
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof GameController
   */
  async listAll(req: Request, res: Response) {
    const result = await FileHelper.readFromFile();
    return res.status(200).json(
      (result as Game[]).map(game => {
        const gameDao = new Game(
          game.id,
          game.totalKills,
          game.players,
          game.kills,
        );

        return gameDao.parseToShow();
      }),
    );
  }
}

export default new GameController();
