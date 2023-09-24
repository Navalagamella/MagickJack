/**
 * * *** GameMode ***
 * ? Solo debe haber una instancia de GameMode
 * ? El GameMode controla:
 * ?    |-> Las rondas: Ronda actual, jugador activo en ronda.
 * ?    |-> Los jugadores: Oponente (máquina), Jugador (humano)
 */

export interface IGameMode {
  //Se muestran las propiedades expuestas de la clase
  //- Ronda
  ronda: number; // La ronda actual de juego.
  nextRound(): number; // Incrementa en uno la ronda.
}

/**
 * Clase GameMode
 * Controla el flujo y lógica del juego, incluyendo el tiempo, las rondas y los mundos.
 */
export class cGameMode implements IGameMode {
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
   * @returns El número de la nueva ronda.
   */
  public nextRound() {
    this._ronda++;
    return this._ronda;
  }
}

export const GameMode: Readonly<IGameMode> = new cGameMode();
