const url = "http://localhost:8080";

describe("Empezar juego", () => {
  it("Carga la pantallade inicio", () => {
    cy.visit(url);
  });

  it("Al cargar por primera vez, existe el botón de Jugar", () => {
    cy.visit(url);
    cy.get("[data-play-button]").should("exist");
  });

  it("Al cargar por primera vez, existe el GameFrame", () => {
    cy.visit(url);
    cy.get("[data-game-frame]").should("exist");
  });

  it("Al cargar por primera vez, no existe el GameField", () => {
    cy.visit(url);
    cy.get("[data-game-field]").should("not.exist");
  });

  it("Al comenzar pulsar en el botón para comenzar, desaparece el botón", () => {
    cy.visit(url);
    cy.get("[data-play-button]").click();
    cy.get("[data-play-button]").should("not.exist");
  });

  it("En el marco de rondas de rondas aparece la ronda actual (que debe ser 0)", () => {
    cy.visit(url);
    cy.get("[data-play-button]").click();

    cy.get("[data-round]").find("[data-round-view]").should("exist");
    cy.get("[data-round]").find("[data-round-view]").should("contain", "0");
  });

});
