import { CARTAS_EN_MAZO } from "@/.conf.json";

export interface ICartasEnMazo {
  faceDown: boolean; //True indica que no se debe ver
  valor: string | undefined; //El valor de la carta - Hasta que no está boca arriba, no se define el valor
}

interface IDeckCards {
  cartasPosibles: string[]; //Los posibles valores que quedan en el mazo
  mazo: Array<ICartasEnMazo>; //El mazo, las cartas que aún están por jugar
  enJuego: Array<ICartasEnMazo>; //Las cartas en juego, se establece a vacío al comenzar el turno
  descarte: Array<ICartasEnMazo>; //Las cartas que han sido jugadas y se descartan al comenzar un nuevo turno
}

/**
 * * *** Mazo ***
 * ? Las dos instancias que pueden haber son para el jugador y para el oponente
 * ? Mazo controla:
 * ?    |-> Las cartas que contiene.
 * ? La mayoría son funciones como helpers
 */

export interface IMazo {
  //Se muestran las propiedades expuestas de la clase
  //- Cartas
  numeroCartasEnMazo: number; //El número de cartas que están por jugar
  enJuego: Array<ICartasEnMazo>; //Las cartas que están actualmente en el juego
  descarte: Array<ICartasEnMazo>; //Las cartas ya jugadas
  posiblesCartas: Array<string>; //Las posibles cartas que pueden aún salir
  drawCard(faceDown?: boolean): void;
  limpiarJuego(): void; //Limpia la zona de juego y envía las cartas al descarte
}

//- Determina las opciones posibles para crear una instancia de la clase mazo
export interface IDeckOPTS {
  numeroDecksEnMazo: number;
}

/**
 * Clase Mazo
 * Controla el flujo y lógica del juego, incluyendo la vida y el mazo
 */
export class cMazo implements IMazo {
  constructor(mazoOpts?: IDeckOPTS) {
    const mazo = this.setMazo(mazoOpts?.numeroDecksEnMazo || 1);
    this._deckCards = {
      cartasPosibles: mazo.cartasIniciales,
      mazo: mazo.mazo,
      enJuego: [],
      descarte: [],
    };
  }

  //- Cartas
  private _deckCards: IDeckCards = {
    cartasPosibles: [],
    mazo: [],
    enJuego: [],
    descarte: [],
  };

  private setMazo(numeroDecksEnMazo: number): { mazo: ICartasEnMazo[]; cartasIniciales: string[] } {
    let mazo: ICartasEnMazo[] = [];
    let mazosAgregados = 0;
    const todosValoresCartas: string[] = [];

    while (mazosAgregados < numeroDecksEnMazo) {
      mazosAgregados++;
      mazo = mazo.concat(
        CARTAS_EN_MAZO.map((carta) => {
          todosValoresCartas.push(carta);
          return {
            valor: undefined,
            faceDown: true,
          };
        })
      );
    }

    return {
      mazo,
      cartasIniciales: todosValoresCartas,
    };
  }

  /**
   * Propiedad numeroCartasEnMazo
   * Obtiene la cantidad de cartas que están aún por jugar
   */
  public get numeroCartasEnMazo(): number {
    return this._deckCards.mazo.length;
  }

  /**
   * Método drawCard
   * Mecánica para robar cartas.
   * Robar una carta significa coger una carta restantes del mazo y establecerla en el juego
   */
  public drawCard(faceDown?: boolean): void {
    //Coge una carta
    let nuevaCarta = this.takeCard();
    //TODO: Hacer otra lógica cuando sea undefined, como por ejemplo, perder el juego
    if (nuevaCarta === undefined) throw new Error("Sin implementar: Al robar una carta, el mazo parece estar vacío.");
    //Si hay que mantenerla boca abajo no se ejecuta flipCard
    if (faceDown !== true) nuevaCarta = this.flipCard(nuevaCarta);
    //La establece en el juego
    this.playCard(nuevaCarta);
  }

  /**
   * Método takeCard
   * Obtiene y actualiza el mazo
   * @returns Carta robada o undefined si no hay carta en el mazo
   */
  private takeCard(): ICartasEnMazo | undefined {
    //Obtiene una carta al azar
    const carta = this._deckCards.mazo.pop();
    //Retorna la carta
    return carta;
  }

  /**
   * Método flipCard
   * "Da la vuelva" a una carta, estableciendo su faceDown = !faceDown
   * Se puede forzar el estado indicando force
   * Al dar la vuelta, se define el valor
   */

  private flipCard(carta: ICartasEnMazo, force?: boolean) {
    carta.faceDown = force !== undefined ? force : !carta.faceDown;

    //Si no está boca abajo, establece su valor
    if (!carta.faceDown) carta.valor = this.obtenerValorUnaCartaDelMazo();

    //Si no está boca abajo, se elimina de los posibles valores que aún están en el mazo
    if (carta.valor) {
      const indexValor = this._deckCards.cartasPosibles.indexOf(carta.valor);
      if (indexValor > -1) {
        this._deckCards.cartasPosibles.splice(indexValor, 1);
      } else {
        //TODO: Handle cuando no se encuentre el valor de la carta entre los posibles valores del mazo.
        throw new Error(
          "Al quitar del array de cartas posibles, no se encontró el valor. ArrayPosiblesValores: " +
            JSON.stringify(this._deckCards.cartasPosibles) +
            "Valor de la carta: " +
            carta.valor
        );
      }
    }

    return carta;
  }

  /**
   * Método obtenerValorUnaCartaDelMazo
   * Calcula el valor de una carta dependiendo de las cartas restantes en el mazo
   */

  private obtenerValorUnaCartaDelMazo(): string {
    const posiblesValores = this._deckCards.cartasPosibles;
    const randomIndex = Math.floor(Math.random() * posiblesValores.length);
    return posiblesValores[randomIndex];
  }

  /**
   * Método playCard
   * Establece una carta en el campo de juego
   */
  private playCard(carta: ICartasEnMazo) {
    this._deckCards.enJuego.push(carta);
  }

  /**
   * Propiedad enJuego
   * Obtiene el array de las cartas en juego en el turno actual
   */
  public get enJuego(): Array<ICartasEnMazo> {
    return this._deckCards.enJuego;
  }

  /**
   * Método limpiarJuego
   * Limpia las cartas en juego.
   * Las cartas en juego pasan a estar en la propiedad de descarte
   */
  public limpiarJuego(): void {
    //Añade enJuego a descarte
    this._deckCards.descarte = this._deckCards.descarte.concat(this._deckCards.enJuego);
    //Establece las cartas de juego a un array vacío
    this._deckCards.enJuego = [];
  }

  /**
   * Propiedad descarte
   * Obtiene las cartas descartadas, aquellas que ya se han jugado
   */
  public get descarte(): Array<ICartasEnMazo> {
    return this._deckCards.descarte;
  }

  /**
   * Propiedad posiblesCartas
   * Obtiene las posibles cartas que aún están en el mazo
   */

  public get posiblesCartas(): Array<string> {
    return this._deckCards.cartasPosibles;
  }
}

export const Mazo: Readonly<IMazo> = new cMazo();
