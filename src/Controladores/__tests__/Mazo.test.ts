import { CARTAS_EN_MAZO } from "@/.conf.json";
import { IMazo, cMazo } from "../Mazo";

const lengthArrayCartasConfiguradas = CARTAS_EN_MAZO.length;
const numeroCartasMazoMinimo = 1 * lengthArrayCartasConfiguradas;
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
    expect(mazo.numeroCartasEnMazo).toBe(numeroCartasMazoMinimo);
  });

  it("Al robar una carta, se modifica el número de cartas en el mazo", () => {
    mazo = new cMazo();
    mazo.drawCard();
    expect(mazo.numeroCartasEnMazo).toBe(numeroCartasMazoMinimo - 1);
  });
  it("Al robar una carta, se establece en el juego", () => {
    mazo = new cMazo();
    mazo.drawCard();
    expect(mazo.enJuego).toHaveLength(1);
  });
  it("Al robar una carta, por defecto, se volteará", () => {
    mazo = new cMazo();
    mazo.drawCard();
    expect(mazo.enJuego[0].faceDown).toBe(false);
  });
  it("Al robar una carta si se indica, no se volteará", () => {
    mazo = new cMazo();
    mazo.drawCard(true);
    expect(mazo.enJuego[0].faceDown).toBe(true);
  });
  it("Al finalizar el turno, el jugador llama a limpiarJuego y reestablece enJuego a un array vacío", () => {
    mazo = new cMazo();
    mazo.drawCard();
    mazo.limpiarJuego();
    expect(mazo.enJuego).toHaveLength(0);
  });
  it("Las cartas que se han sacado del mazo, al limpiar el juego, van al descarte", () => {
    mazo = new cMazo();
    mazo.drawCard();
    mazo.limpiarJuego();
    expect(mazo.descarte).toHaveLength(1);
  });
  it("Una carta faceDown no tiene el valor definido", () => {
    mazo = new cMazo();
    mazo.drawCard(true);
    expect(mazo.enJuego[0].valor).toBeUndefined;
  });
  it("Una carta faceUp tiene el valor definido", () => {
    mazo = new cMazo();
    mazo.drawCard();
    expect(mazo.enJuego[0].valor).toBeDefined();
  });

  it("Cuando se roba una carta si está boca arriba, se elimina un valor del array de los posibles valores", () => {
    mazo = new cMazo();
    const oldStatePosiblesCartas = mazo.posiblesCartas.length;
    mazo.drawCard();
    expect(mazo.posiblesCartas.length).toBe(oldStatePosiblesCartas - 1);
  });

  it("Si no está boca arriba, no se eliina del valor de los posibles valores", () => {
    mazo = new cMazo();
    const oldStatePosiblesCartas = mazo.posiblesCartas.length;
    mazo.drawCard(true);
    expect(mazo.posiblesCartas.length).toBe(oldStatePosiblesCartas);
  });
});
