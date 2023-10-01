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
  drawCard(): void;
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
    if (mazoOpts) {
      this._deckCards = {
        cantidad: mazoOpts.numeroDecksEnMazo,
      };
    }
  }

  //- Cartas
  private _deckCards = {
    cantidad: -1,
  };

  /**
   * Propiedad vida
   * Obtiene la vida actual.
   */
  public get numeroCartasEnMazo(): number {
    return this._deckCards.cantidad;
  }

  /**
   * * Mecánica para robar cartas:
   */

  public drawCard(): void {
    return;
  }
}

export const Mazo: Readonly<IMazo> = new cMazo();
