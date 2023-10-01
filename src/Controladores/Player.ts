import { IDeckOPTS, IMazo, cMazo } from "./Mazo";
import { VIDA_BASE_NOT_SET, CANTIDAD_MAZOS_PARA_JUGAR } from "@/.conf.json";
/**
 * * *** Player ***
 * ? Las dos instancias que pueden haber son para el jugador y para el oponente
 * ? Player controla:
 * ?    |-> La vida actual.
 * ?    |-> El mazo en juego.
 */

export interface IPlayer {
  //Se muestran las propiedades expuestas de la clase
  //- Vida
  vida: number; // La vida actual del jugador
  //- Mazo
  mazo: IMazo; // El mazo del jugador
}

//- Determina las opciones posibles para crear una instancia de la clase jugador
export interface IPlayerOPTS {
  vida: number; //Requerido
  deckOpts?: IDeckOPTS; //Opciones para el mazo
}

/**
 * Clase Player
 * Controla el flujo y lógica del juego, incluyendo la vida y el mazo
 */
export class cPlayer implements IPlayer {
  constructor(player?: Partial<IPlayerOPTS>) {
    if (player) {
      if (player.vida !== undefined) this._vida = player.vida;
    }

    const deckOpts = player?.deckOpts || { numeroDecksEnMazo: CANTIDAD_MAZOS_PARA_JUGAR };

    this._mazo = new cMazo(deckOpts);
  }

  //- Vida
  private _vida = VIDA_BASE_NOT_SET;

  /**
   * Propiedad vida
   * Obtiene la vida actual.
   */
  public get vida() {
    return this._vida;
  }

  //- Mazo
  private _mazo: IMazo = new cMazo();

  /**
   * Proviedad mazo
   * Obtiene la referencia de la instancia de la clase mazo
   */
  public get mazo() {
    return this._mazo;
  }
}

export const Player: Readonly<IPlayer> = new cPlayer();
