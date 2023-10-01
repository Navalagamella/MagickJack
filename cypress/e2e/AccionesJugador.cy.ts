const urlAccionesJugador = "http://localhost:8080";

describe("Acciones de jugador", () => {
  const player = "jugador";

  it("Carga hasta el entorno de testeo", () => {
    cy.visit(urlAccionesJugador);
    cy.get("[data-play-button]").click();
    cy.get("[data-game-field]").should("exist");
    cy.get("[data-game-field]").find(`[data-game-field="${player}"]`).should("exist");
    cy.get("[data-game-field]")
      .find(`[data-game-field="${player}"]`)
      .find("[data-jugador-juego]")
      .should("exist")
      .and("have.length", 1);

    cy.get(`[data-game-field="${player}"]`)
      .find("[data-jugador-juego]")
      .find("[data-jugador-juego-carta]")
      .each((elemento, index) => {
        if (index === 0) cy.wrap(elemento).should("have.class", "faceUp").and("not.have.class", "faceDown");
        if (index === 1) cy.wrap(elemento).should("have.class", "faceUp").and("not.have.class", "faceDown");
      });

    cy.get("[data-game-frame]")
      .find(`[data-game-frame-menu-acciones]`)
      .find("[data-menu-acciones-draw]")
      .should("exist");
    cy.get("[data-game-frame]")
      .find(`[data-game-frame-menu-acciones]`)
      .find("[data-menu-acciones-doblar]")
      .should("exist");
    cy.get("[data-game-frame]")
      .find(`[data-game-frame-menu-acciones]`)
      .find("[data-menu-acciones-pasar]")
      .should("exist");

    cy.get("[data-game-frame]").find(`[data-game-frame-menu-acciones]`).should("exist").and("have.length", 1);
  });

  it("Al pedir una carta, se añade una carta, y las acciones siguen habilitadas", () => {
    cy.visit(urlAccionesJugador);
    cy.get("[data-play-button]").click();
    cy.get("[data-game-frame]")
      .find(`[data-game-frame-menu-acciones]`)
      .find("[data-menu-acciones-draw]")
      .trigger("click");

    cy.get("[data-game-frame]")
      .find(`[data-game-frame-menu-acciones]`)
      .find("[data-menu-acciones-draw]")
      .should("not.have.attr", "disabled");
  });

  it("Al doblar, se añade una carta, y las acciones se deshabilitan", () => {
    cy.visit(urlAccionesJugador);
    cy.get("[data-play-button]").click();
    cy.get("[data-game-frame]")
      .find(`[data-game-frame-menu-acciones]`)
      .find("[data-menu-acciones-doblar]")
      .trigger("click");

    cy.get("[data-game-frame]")
      .find(`[data-game-frame-menu-acciones]`)
      .find("[data-menu-acciones-draw]")
      .should("have.attr", "disabled");
  });

  it("Al pasar, no se añade una carta, y las acciones se deshabilitan", () => {
    cy.visit(urlAccionesJugador);
    cy.get("[data-play-button]").click();
    cy.get("[data-game-frame]")
      .find(`[data-game-frame-menu-acciones]`)
      .find("[data-menu-acciones-pasar]")
      .trigger("click");

    cy.get("[data-game-frame]")
      .find(`[data-game-frame-menu-acciones]`)
      .find("[data-menu-acciones-draw]")
      .should("have.attr", "disabled");
  });
});
