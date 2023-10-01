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
    it("La primera ronda es del oponente", () => {
      gameMode.nextRound();
      expect(gameMode.jugadorActivo).toBe(gameMode.oponente);
    });
    it("Al finalizar el turno del oponente, se establece el turno al jugador", () => {
      gameMode.nextRound();
      //Finaliza el turno del oponente
      gameMode.finalizarTurno();
      expect(gameMode.jugadorActivo).toBe(gameMode.jugador);
    });
    it("Al finalizar el turno del jugador, se comienza una nueva ronda que tiene el turno del oponente", () => {
      gameMode.nextRound();
      //Finaliza el turno del oponente
      gameMode.finalizarTurno();
      //Finaliza el turno del jugador
      gameMode.finalizarTurno();
      expect(gameMode.jugadorActivo).toBe(gameMode.oponente);
    });
    it("Al finalizar el turno del jugador, se comienza una nueva ronda que será la 2", () => {
      gameMode.nextRound();
      //Finaliza el turno del oponente
      gameMode.finalizarTurno();
      //Finaliza el turno del jugador
      gameMode.finalizarTurno();
      expect(gameMode.ronda).toBe(2);
    });

    it("Antes de comenzar, el jugador activo es undefined", () => {
      expect(gameMode.jugadorActivo).toBeUndefined();
    });

    it("Si gameMode tiene un turno inválido el jugador activo es undefined", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gameMode.turno = 99 as any;
      expect(gameMode.jugadorActivo).toBeUndefined();
    });
  });
});
