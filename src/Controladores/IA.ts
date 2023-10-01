import { IPlayerOPTS, cPlayer } from "./Player";

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
}
