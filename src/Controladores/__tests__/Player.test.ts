import { VIDA_BASE_NOT_SET, VIDA_BASE_JUGADOR, VIDA_BASE_MAQUINA, CARTAS_EN_MAZO } from "@/.conf.json";
import { IPlayer, cPlayer } from "../Player";
import { ETurno } from "../GameMode";

const lengthArrayCartasConfiguradas = CARTAS_EN_MAZO.length;

/**
 *? *** Tests para la clase Player ***
 */

describe("Player - Controladora de la instancia de un jugador", () => {
  let player: IPlayer | undefined = undefined;

  beforeEach(() => {
    player = undefined;
  });

  describe("Genera un jugador con la vida indicada", () => {
    it("Si no se indica, no se obtiene una vida válida", () => {
      player = new cPlayer();
      expect(player.vida).toBe(VIDA_BASE_NOT_SET);
    });
    it("Si no se indica las opciones de mazo, se genera uno mínimo", () => {
      player = new cPlayer();
      expect(player.mazo.numeroCartasEnMazo).toBe(1 * lengthArrayCartasConfiguradas);
    });
    it("Genera la vida por defecto para el oponente", () => {
      player = new cPlayer({ vida: VIDA_BASE_MAQUINA });
      expect(player.vida).toBe(VIDA_BASE_MAQUINA);
    });
    it("Genera la vida por defecto para el jugador", () => {
      player = new cPlayer({ vida: VIDA_BASE_JUGADOR });
      expect(player.vida).toBe(VIDA_BASE_JUGADOR);
    });
    it("Genera un mazo minimo", () => {
      player = new cPlayer({
        deckOpts: {
          numeroDecksEnMazo: 1,
        },
      });
      expect(player.mazo.numeroCartasEnMazo).toBe(1 * lengthArrayCartasConfiguradas);
    });
    it("Genera un mazo con tres barajas", () => {
      player = new cPlayer({
        deckOpts: {
          numeroDecksEnMazo: 3,
        },
      });
      expect(player.mazo.numeroCartasEnMazo).toBe(3 * lengthArrayCartasConfiguradas);
    });
    it("Al iniciar turno, si no hay cartas en juego, pone en juego dos cartas", () => {
      player = new cPlayer();
      player.comenzarTurno();
      expect(player.mazo.enJuego).toHaveLength(2);
    });
    it("Al iniciar turno del oponente, si no hay cartas en juego, la primera está boca arriba y la segunda carta en juego está boca abajo", () => {
      player = new cPlayer({ tipoJugador: ETurno.OPONENTE });
      player.comenzarTurno();
      const cartasEnJuego = player.mazo.enJuego;
      expect(cartasEnJuego[0].faceDown).toBe(false);
      expect(cartasEnJuego[cartasEnJuego.length - 1].faceDown).toBe(true);
    });
    it("Al iniciar turno del jugador, si no hay cartas en juego, las dos cartas están boca arriba", () => {
      player = new cPlayer();
      player.comenzarTurno();
      const cartasEnJuego = player.mazo.enJuego;
      cartasEnJuego.forEach((carta) => {
        expect(carta.faceDown).toBe(false);
      });
    });
  });
});
