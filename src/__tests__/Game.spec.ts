import Game from '@models/Game';
import Player from '@models/Player';
import ModDeath from '@interfaces/ModDeath';

describe('Tests suit for Game model and methods', () => {
  it('If player already exists players array should not change', () => {
    const game = new Game(1, 0, [new Player('uknown player')]);
    game.checkPlayerExists('uknown player');

    expect(game.players.length).toBe(1);
    expect(game.players[0].name).toBe('uknown player');
  });

  it("If player doesn't exists should be added in players array", () => {
    const game = new Game(1, 0, [new Player('player1')]);
    game.checkPlayerExists('uknown player');

    expect(game.players.length).toBe(2);
    expect(game.players[1].name).toBe('uknown player');
  });

  it('If a new kill was set must increment totalKills and length of kills array', () => {
    const game = new Game(1, 0, [new Player('killer'), new Player('killed')]);

    const oldKillsCount = game.totalKills;
    const oldKillsArray = game.kills.length;

    game.newKill(game.players[0], game.players[1], ModDeath.MOD_CHAINGUN);

    expect(game.totalKills).toBe(oldKillsCount + 1);
    expect(game.kills.length).toBe(oldKillsArray + 1);
  });
});
