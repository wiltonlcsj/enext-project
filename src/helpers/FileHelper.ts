import fs from 'fs';
import readline from 'line-reader';
import path from 'path';
import Game from '@models/Game';

const fsPromises = fs.promises;
const filejson = path.resolve('./data/data.json');
const gamelog = path.resolve('./data/games.log');
/**
 * Class to make easily manipulate json file
 * @class FileHelper
 */
class FileHelper {
  /**
   * Function that read file from path and return a JSON if successfull
   * @async
   * @returns {boolean|array} Returns false if a error occurs or JSON if was successfull
   * @memberof FileHelper
   */
  async readFromFile(): Promise<boolean | Array<Game>> {
    try {
      const content = await fsPromises.readFile(filejson);
      if (content) {
        return JSON.parse(content.toString());
      }
      return false;
    } catch (err) {
      // If no document was found on filepath must create one
      try {
        await this.writeOnFile([]);
        const content = await fsPromises.readFile(filejson);
        if (content) {
          return JSON.parse(content.toString());
        }
        return false;
      } catch (error) {
        return false;
      }
    }
  }

  /**
   * Function that writes on file from path
   * @async
   * @param {string|object|Array} content Content that must be write on document
   * @param {string} [encoding='utf8'] The encoding used to write the document
   * @returns {boolean} Returns false if some error occurs or true if the write was successful
   * @memberof FileHelper
   */
  async writeOnFile(content: Game | Game[]): Promise<boolean> {
    try {
      await fsPromises.opendir(path.resolve('./data'));
      await fsPromises.writeFile(filejson, JSON.stringify(content));
      return true;
    } catch (err) {
      try {
        await fsPromises.mkdir(path.resolve('./data'));
        await fsPromises.writeFile(filejson, JSON.stringify(content));
        return true;
      } catch (error) {
        return false;
      }
    }
  }

  /**
   * Function to write at JSON file
   * @param {(Game | Game[])} content
   * @returns {boolean}
   * @memberof FileHelper
   */
  writeOnFileSync(content: Game | Game[]): boolean {
    try {
      fs.writeFileSync(filejson, JSON.stringify(content));
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * Function to read a file
   * @returns {(Array<Game> | boolean)}
   * @memberof FileHelper
   */
  readFromFileSync(): Array<Game> | boolean {
    try {
      const content = fs.readFileSync(filejson);
      if (content) {
        return JSON.parse(content.toString());
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  /**
   * Function to reload games.log file and create the JSON object with models
   * @memberof FileHelper
   */
  reloadFile() {
    this.writeOnFileSync([]);

    let newGame = new Game(1);
    readline.eachLine(gamelog, line => {
      // Verify if is a end of game
      if (line.includes('ShutdownGame')) {
        const prevGame = newGame;
        const content = this.readFromFileSync();
        prevGame.id = (content as Game[]).length + 1;
        (content as Game[]).push(prevGame);
        // Write on JSON the ended game
        this.writeOnFileSync(content as Game[]);
        newGame = new Game(prevGame.id);
      } else if (line.includes('Kill:')) {
        // If the line contains a kill
        const killline = line.trim().split(':')[3].trim();

        // Desestruturate to get the names of killers, killed and mode
        const [killer, killed, mod] = killline.split(/killed | by/gm);

        // Checks the exists of players
        const newKiller = newGame.checkPlayerExists(killer.trim());
        const newKilled = newGame.checkPlayerExists(killed.trim());

        // Instantiate a new kill object
        newGame.newKill(newKiller, newKilled, mod.trim());
      }
    });
  }
}

export default new FileHelper();
