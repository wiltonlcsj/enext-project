import Player from '@models/Player';

/**
 * Class that represents a kill inside game
 * @class Kill
 */
class Kill {
  killer: Player;

  killed: Player;

  mod: string;

  constructor(killer: Player, killed: Player, mod: string) {
    this.killer = killer;
    this.killed = killed;
    this.mod = mod;
  }
}

export default Kill;
