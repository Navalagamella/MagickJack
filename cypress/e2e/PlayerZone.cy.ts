const urlPlayerZone = "http://localhost:8080";

describe("PlayerZone - entorno testeo", () => {
  const player = "oponente";

  it("Carga hasta el entorno de testeo", () => {
    cy.visit(urlPlayerZone);
    cy.get("[data-play-button]").click();
    cy.get("[data-game-field]").should("exist");
    cy.get("[data-game-field]").find(`[data-game-field="${player}"]`).should("exist");
    cy.get("[data-game-field]")
      .find(`[data-game-field="${player}"]`)
      .find("[data-jugador-juego]")
      .should("exist")
      .and("have.length", 1);
  });
});

describe("PlayerZone - oponente", () => {
  const player = "oponente";

  it("La zona de juego del oponente, contiene dos cartas en juego", () => {
    cy.visit(urlPlayerZone);
    cy.get("[data-play-button]").click();
    cy.get("[data-game-field]").should("exist");
    cy.get(`[data-game-field="${player}"]`)
      .find("[data-jugador-juego]")
      .find("[data-jugador-juego-carta]")
      .should("have.length", 2);
  });

  it("La zona de juego del oponente, la primera carta está boca arriba y la segunda boca abajo. (clases faceUp / faceDown)", () => {
    cy.visit(urlPlayerZone);
    cy.get("[data-play-button]").click();
    cy.get("[data-game-field]").should("exist");
    cy.get(`[data-game-field="${player}"]`)
      .find("[data-jugador-juego]")
      .find("[data-jugador-juego-carta]")
      .each((elemento, index) => {
        if (index === 0) cy.wrap(elemento).should("have.class", "faceUp").and("not.have.class", "faceDown");
        if (index === 1) cy.wrap(elemento).should("have.class", "faceDown").and("not.have.class", "faceUp");
      });
  });
});

describe("PlayerZone - jugador", () => {
  const player = "jugador";
  it("La zona de juego del jugador, contiene dos cartas en juego", () => {
    cy.visit(urlPlayerZone);
    cy.get("[data-play-button]").click();
    cy.get("[data-game-field]").should("exist");
    cy.get(`[data-game-field="${player}"]`)
      .find("[data-jugador-juego]")
      .find("[data-jugador-juego-carta]")
      .should("have.length", 2);
  });

  it("La zona de juego del jugador, las dos cartas en juego están boca arriba. (class faceUp )", () => {
    cy.visit(urlPlayerZone);
    cy.get("[data-play-button]").click();
    cy.get("[data-game-field]").should("exist");
    cy.get(`[data-game-field="${player}"]`)
      .find("[data-jugador-juego]")
      .find("[data-jugador-juego-carta]")
      .each((elemento, index) => {
        if (index === 0) cy.wrap(elemento).should("have.class", "faceUp").and("not.have.class", "faceDown");
        if (index === 1) cy.wrap(elemento).should("have.class", "faceUp").and("not.have.class", "faceDown");
      });
  });


  it("La zona de juego del jugador, las dos cartas en juego están boca arriba. (class faceUp )", () => {
    cy.visit(urlPlayerZone);
    cy.get("[data-play-button]").click();
    cy.get("[data-game-field]").should("exist");
    cy.get(`[data-game-field="${player}"]`)
      .find("[data-jugador-juego]")
      .find("[data-jugador-juego-carta]")
      .each((elemento, index) => {
        if (index === 0) cy.wrap(elemento).should("have.class", "faceUp").and("not.have.class", "faceDown");
        if (index === 1) cy.wrap(elemento).should("have.class", "faceUp").and("not.have.class", "faceDown");
      });
  });
});
