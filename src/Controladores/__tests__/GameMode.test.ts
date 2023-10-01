import { cGameMode, IGameMode } from "../GameMode";
import { VIDA_BASE_JUGADOR, VIDA_BASE_MAQUINA } from "@/.conf.json";

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

  //- Jugadores
  describe("Genera los jugadores", () => {
    it("Si la partida no ha comenzado (ronda 0) ambos jugadores no están definidos", () => {
      expect(gameMode.jugador).toBeUndefined();
      expect(gameMode.oponente).toBeUndefined();
    });

    it("Al comenzar la ronda, se establecen los jugadores con las vidas por defecto y mazos definidos", () => {
      gameMode.nextRound();
      expect(gameMode.oponente).toBeDefined();
      expect(gameMode.oponente?.vida).toBe(VIDA_BASE_MAQUINA);
      expect(gameMode.oponente?.mazo).toBeDefined();
      expect(gameMode.jugador).toBeDefined();
      expect(gameMode.jugador?.vida).toBe(VIDA_BASE_JUGADOR);
      expect(gameMode.jugador?.mazo).toBeDefined();
    });
  });
});
