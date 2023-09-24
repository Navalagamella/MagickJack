export class cBackground {
  keyArts = {
    fondo: true,
    backLayer1: true,
    backLayer2: true,
    backLayer3: true,
    backLayer4: true,
    topLayer1: true,
    topLayer2: true,
    topLayer3: true,
    topLayer4: true,
  };
  private _debug = true;

  public get debug() {
    return this._debug;
  }

  public switchEstado(value: number) {
    switch (value) {
      case 0:
        this.switchTopLayers();
        return;
      default:
        return;
    }
  }

  private switchTopLayers() {
    this.keyArts.topLayer1 = false;
    this.keyArts.topLayer2 = false;
    this.keyArts.topLayer3 = false;
    this.keyArts.topLayer4 = false;
    return true;
  }
}

export const Background: Readonly<cBackground> = new cBackground();
