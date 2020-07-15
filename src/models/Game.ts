import MainHelper from '@helpers/MainHelper';
import Player from '@models/Player';
import Kill from '@models/Kill';

/**
 * Class that represents a game instance
 * @class Game
 */
class Game {
  id: number;

  totalKills: number;

  players: Player[];

  kills: Kill[];

  constructor(
    id: number,
    totalKills?: number,
    players?: Player[],
    kills?: Kill[],
  ) {
    this.id = id;

    if (!totalKills) this.totalKills = 0;
    else this.totalKills = totalKills;

    if (!players) {
      const world = new Player('<world>');
      this.players = [world];
    } else {
      this.players = players;
    }

    if (!kills) this.kills = [];
    else this.kills = kills;
  }

  /**
   * Function to check if a player already exists in game and create a player otherwise
   * @param {string} playerName
   * @returns {Player}
   * @memberof Game
   */
  checkPlayerExists(playerName: string): Player {
    const existingUser = this.players.find(existingPlayer => {
      return existingPlayer.name === playerName;
    });

    if (!existingUser) {
      const newPlayer = new Player(playerName);
      this.players.push(newPlayer);
      return newPlayer;
    }
    return existingUser;
  }

  /**
   * Function to save a new kill in game
   * @param {Player} killer The player that killed another
   * @param {Player} killed The player that has been killed
   * @param {string} mod The death mode of kill
   * @memberof Game
   */
  newKill(killer: Player, killed: Player, mod: string): void {
    this.kills.push(new Kill(killer, killed, mod));
    this.totalKills += 1;
  }

  /**
   * Parse a JSON previously stored in output format
   * @returns {ResultGame}
   * @memberof Game
   */
  parseToShow(): ResultGame {
    const killsSave: Array<{ [key: string]: number }> = [];
    const killsByMeans: Array<{ [key: string]: number }> = [];

    this.kills.forEach(kill => {
      const existingKiller = killsSave.findIndex(savedKill => {
        return Object.keys(savedKill).shift() === kill.killer.name;
      });

      if (existingKiller >= 0 && kill.killer.name !== kill.killed.name) {
        // If killer registry already exists
        const prevKiller = killsSave[existingKiller];
        prevKiller[kill.killer.name] += 1;
        killsSave[existingKiller] = prevKiller;
      } else if (kill.killer.name === '<world>') {
        // If player were killed by world
        const existingKilled = killsSave.findIndex(savedKill => {
          return Object.keys(savedKill).shift() === kill.killed.name;
        });

        if (existingKilled === -1) {
          killsSave.push({
            [kill.killed.name]: -1,
          });
        } else {
          const prevKilled = killsSave[existingKilled];
          prevKilled[kill.killed.name] -= 1;
          killsSave[existingKilled] = prevKilled;
        }
      } else if (kill.killer.name === kill.killed.name) {
        // If player commited suicide
        if (existingKiller !== -1) {
          const prevKiller = killsSave[existingKiller];
          prevKiller[kill.killer.name] -= 1;
          killsSave[existingKiller] = prevKiller;
        } else {
          killsSave.push({
            [kill.killer.name]: -1,
          });
        }
      } else {
        // If player doesn't have a entry yet
        killsSave.push({
          [kill.killer.name]: 1,
        });
      }

      // Count deaths by mode
      const existingMean = killsByMeans.findIndex(savedmeans => {
        return Object.keys(savedmeans).shift() === kill.mod;
      });

      if (existingMean >= 0) {
        const prevMean = killsByMeans[existingMean];
        prevMean[kill.mod] += 1;
        killsByMeans[existingMean] = prevMean;
      } else {
        killsByMeans.push({
          [kill.mod]: 1,
        });
      }
    });

    // Creating players registry that didn't kill anyone and didn't have been killed by <world>
    this.players
      .filter(player => player.name !== '<world>')
      .forEach(player => {
        if (
          killsSave.findIndex(savedKill => {
            return Object.keys(savedKill).shift() === player.name;
          }) === -1
        ) {
          killsSave.push({
            [player.name]: 0,
          });
        }
      });

    return {
      [`game_${this.id}`]: {
        total_kills: this.totalKills,
        players: this.players
          .filter(player => player.name !== '<world>')
          .map(player => player.name),
        kills: MainHelper.mergeObjects(
          killsSave.sort(MainHelper.sortByKeyName),
        ),
        kills_by_means: MainHelper.mergeObjects(
          killsByMeans.sort(MainHelper.sortByKeyName),
        ),
      },
    };
  }
}

export default Game;
