import { VIDA_BASE_NOT_SET, VIDA_BASE_JUGADOR, VIDA_BASE_MAQUINA, CARTAS_EN_MAZO } from "@/.conf.json";
import { IPlayer, cPlayer } from "../Player";

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
      player = new cPlayer({
        deckOpts: {
          numeroDecksEnMazo: 3,
        },
      });
      expect(player.mazo.numeroCartasEnMazo).toBe(3 * lengthArrayCartasConfiguradas);
    });
  });
});
