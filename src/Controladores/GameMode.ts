import { VIDA_BASE_JUGADOR, VIDA_BASE_MAQUINA } from "@/.conf.json";
import { IPlayer, cPlayer, cIA } from "./Player";
import { reactive } from "vue";

export enum ETurno {
  OPONENTE,
  JUGADOR,
}

/**
 * * *** GameMode ***
 * ? Solo debe haber una instancia de GameMode
 * ? El GameMode controla:
 * ?    |-> Las rondas: Ronda actual, jugador activo en ronda, el turno de qué jugador
 * ?    |-> Los jugadores: Oponente (máquina), Jugador (humano)
 */

export interface IGameMode {
  //Se muestran las propiedades expuestas de la clase
  //- Ronda
  ronda: number; // La ronda actual de juego.
  nextRound(): number; // Incrementa en uno la ronda.
  //- Turnos
  turno: ETurno;
  iniciarPartida(): boolean; //Inicia la partida.
  finalizarTurno(): ETurno; //Finaliza un turno
  //- Jugadores
  jugadorActivo: IPlayer | undefined;
  oponente: IPlayer | undefined;
  jugador: IPlayer | undefined;
}

/**
 * Clase GameMode
 * Controla el flujo y lógica del juego, incluyendo las rondas y los jugadores.
 */
export class cGameMode implements IGameMode {
  private static _instancia: undefined | IGameMode;
  static obtenerInstancia() {
    if (!cGameMode._instancia) {
      cGameMode._instancia = new cGameMode();
    }
    //Necesario importar el reactive para que Vue aprecie los cambios
    return reactive(cGameMode._instancia);
  }

  //- Ronda
  private _ronda = 0;

  /**
   * Propiedad ronda
   * Obtiene el número de la ronda actual.
   */
  public get ronda() {
    return this._ronda;
  }

  /**
   * Método nextRound
   * Incrementa en uno el número de la ronda actual.
   * ? Al comenzar la ronda, se reparte primero al oponente, luego al jugador
   * @returns El número de la nueva ronda.
   */
  public nextRound() {
    //Al comenzar una ronda, se reparte
    this._ronda++;
    //Turno para el oponente
    this.turno = ETurno.OPONENTE;
    this.jugadorActivo?.comenzarTurno();
    return this._ronda;
  }

  /**
   * Método iniciarPartida
   * Establece los valores que se requieren para iniciar una partida, como los jugadores
   * Si ya estaba algún valor definido, no realiza nada y retorna false
   * @returns true | false
   */
  public iniciarPartida() {
    //Check para jugadores
    if (this.oponente || this.jugador) return false;
    //Check para turno
    if (this.turno > 0) return false;
    //Inicia a los jugadores
    this.iniciarJugadores();
    //Inicia la ronda
    this.nextRound();
    return true;
  }

  /**
   * Método iniciarJugadores
   * Genera un oponente con sus valores por defecto.
   * Genera un jugador con sus valores por defecto.
   * Establecidos en .conf.json
   */
  private iniciarJugadores() {
    //- Oponente
    this._oponente = new cIA({ vida: VIDA_BASE_MAQUINA, tipoJugador: ETurno.OPONENTE });

    //- Jugador
    this._jugador = new cPlayer({ vida: VIDA_BASE_JUGADOR, tipoJugador: ETurno.JUGADOR });
  }

  //- Turnos
  private _turno = ETurno.OPONENTE;

  /**
   * Método finalizarTurno
   * Finaliza el turno del jugador activo.
   * Si el turno era del jugador, avanza la ronda
   * @returns number El turno del jugador actual
   */
  public finalizarTurno(): ETurno {
    switch (this.turno) {
      case ETurno.OPONENTE:
        this.turno = ETurno.JUGADOR;
        this.jugadorActivo?.comenzarTurno();
        break;
      case ETurno.JUGADOR:
        this.turno = ETurno.OPONENTE;

        //Finaliza el juego
        this.jugador?.mazo.unFlipCards();
        this.jugador?.mazo.limpiarJuego();
        this.oponente?.mazo.unFlipCards();
        this.oponente?.mazo.limpiarJuego();
        this.nextRound();
        break;
      default:
        break;
    }

    return this.turno;
  }

  /**
   * Setter turno
   */
  public set turno(nuevoTurno: ETurno) {
    this._turno = nuevoTurno;
  }
  /**
   * Propiedad turno
   * Obtiene el turno actual
   */

  public get turno() {
    return this._turno;
  }

  //- Jugadores

  /**
   * Propiedad jugadorActivo
   * Obtiene la referencia de la instancia de la clase Player que está activa dependiendo del turno
   */
  public get jugadorActivo() {
    if (!this.jugador || !this.oponente) return undefined;
    switch (this.turno) {
      case ETurno.JUGADOR:
        return this.jugador;
      case ETurno.OPONENTE:
        return this.oponente;
      default:
        return undefined;
    }
  }

  /**
   * Método switchTurno
   * Establece el turno en 0 =
   */

  private _oponente: undefined | IPlayer = undefined;

  /**
   * Propiedad oponente
   * Obtiene la referencia de la instancia de la clase Player
   */
  public get oponente() {
    return this._oponente;
  }

  private _jugador: undefined | IPlayer = undefined;

  /**
   * Propiedad jugador
   * Obtiene la referencia de la instancia de la clase Player
   */
  public get jugador() {
    return this._jugador;
  }
}

export const GameMode: Readonly<IGameMode> = new cGameMode();
