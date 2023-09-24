import { cGameMode, IGameMode } from "../GameMode";

/**
 *? *** Tests para la clase GameMode ***
 */

describe("GameMode - Controladora de la instancia de juego", () => {
  let gameMode: IGameMode;

  beforeEach(() => {
    gameMode = new cGameMode();
  });

  //- Rondas
  describe("Rondas", () => {
    it("Cuando se crea el GameMode, la ronda es 0", () => {
      expect(gameMode.ronda).toBe(0);
    });
    it("Incrementa una ronda del juego", () => {
      expect(gameMode.ronda).toBe(0);
      gameMode.nextRound();
      expect(gameMode.ronda).toBe(1);
    });
  });
});
