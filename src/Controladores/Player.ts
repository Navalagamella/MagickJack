import { ETurno, cGameMode } from "./GameMode";
import { IDeckOPTS, IMazo, cMazo } from "./Mazo";
import { VIDA_BASE_NOT_SET } from "@/.conf.json";
/**
 * * *** Player ***
 * ? Las dos instancias que pueden haber son para el jugador y para el oponente
 * ? Player controla:
 * ?    |-> La vida actual.
 * ?    |-> El mazo en juego.
 */

export interface IPlayer {
  //Se muestran las propiedades expuestas de la clase
  tipoJugador: string; // "jugador" | "oponente" .toLowerCase() - Retorna el tipo de jugador
  //- Vida
  vida: number; // La vida actual del jugador
  //- Mazo
  mazo: IMazo; // El mazo del jugador
  //- Turno
  isActive: boolean; //Indica si es el turno del jugador.
  comenzarTurno(): void; // Comienza el turno del jugador
  finalizarTurno(): void; // Finaliza el turno del jugador
}

//- Determina las opciones posibles para crear una instancia de la clase jugador
export interface IPlayerOPTS {
  vida: number; //Requerido
  tipoJugador: ETurno; //Requerido
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
    this._mazo = new cMazo(player?.deckOpts);
    this._tipoJugador = player?.tipoJugador !== undefined ? player.tipoJugador : ETurno?.JUGADOR;
  }

  private _tipoJugador: ETurno;

  /**
   * Propiedad tipoJugador
   * Retorna un string indicando el tipo de jugador en lowerCase
   */

  public get tipoJugador() {
    return ETurno[this._tipoJugador].toLowerCase();
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
   * Propiedad mazo
   * Obtiene la referencia de la instancia de la clase mazo
   */
  public get mazo() {
    return this._mazo;
  }

  //- Turno

  private _isActive = false;

  /**
   * Setter isActive
   * Establece el estado de isActive.
   */
  public set isActive(active: boolean) {
    this._isActive = active;
  }
  /**
   * Propiedad isActive
   * Obtiene si es el turno de esta instancia
   */
  public get isActive() {
    return this._isActive;
  }

  /**
   * Método comenzarTurno
   * Realiza las acciones para comenzar el turno del player
   */
  public comenzarTurno() {
    //Establece el turno del jugador
    this.isActive = true;
    //Al comenzar el turno, se deben robar dos cartas
    this.mazo.drawCard();
    //Si es el oponente, al comenzar el turno, la segunda carta está boca abajo
    const faceDown = this._tipoJugador === ETurno.OPONENTE;
    this.mazo.drawCard(faceDown);
  }

  public finalizarTurno() {
    this.isActive = false;
    const gameMode = cGameMode.obtenerInstancia();
    gameMode.finalizarTurno();
  }
}

export const Player: Readonly<IPlayer> = new cPlayer();

/**
 * * *** IA ***
 * ? Es el enemigo a quien tienes que enfrentar
 * ? Controla una instancia Player.
 */

/**
 * Clase IA
 * Controla el jugador oponente
 */
export class cIA extends cPlayer {
  constructor(player?: Partial<IPlayerOPTS>) {
    super(player);
  }

  /**
   * @EXTEND Método comenzarTurno
   * Comienza el turno para la IA
   * La acción del primer turno de la IA será pasar.
   */
  public comenzarTurno() {
    //LLama primero al método del padre
    super.comenzarTurno();
    //Si es el primer turno, pasa.
    if (this.mazo.enJuego.length === 2) {
      this.finalizarTurno();
      return;
    }
    //Realiza la lógica rápida para determinar si debe jugar o no
  }
}
