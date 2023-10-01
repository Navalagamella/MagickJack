import { CARTAS_EN_MAZO } from "@/.conf.json";
import { IMazo, cMazo } from "../Mazo";

const lengthArrayCartasConfiguradas = CARTAS_EN_MAZO.length;

/**
 *? *** Tests para la clase Mazo ***
 */

describe("Mazo - Controladora de la instancia de un mazo", () => {
  let mazo: IMazo | undefined = undefined;

  beforeEach(() => {
    mazo = undefined;
  });

  it("Generar un mazo, cargará siempre un mínimo de cartas", () => {
    mazo = new cMazo();
    expect(mazo.numeroCartasEnMazo).toBe(1 * lengthArrayCartasConfiguradas);
  });
});
