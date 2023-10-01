const urlEmpezarJuego = "http://localhost:8080";

const players = ["oponente", "jugador"];
const contenedoresComunes = ["vida", "mazo", "descarte", "juego"];
describe("GameField", () => {
  it("Carga hasta el entorno de testeo", () => {
    cy.visit(urlEmpezarJuego);
    cy.get("[data-play-button]").click();
    cy.get("[data-game-field]").should("exist");
    players.forEach((player) => {
      cy.get("[data-game-field]").find(`[data-game-field="${player}"]`).should("exist");
    });
  });

  describe("Zonas de juego - contenedores comunes", () => {
    players.forEach((player) => {
      contenedoresComunes.forEach((contenedor) => {
        it(`La zona del jugador ${player} Contiene ${contenedor}`, () => {
          cy.visit(urlEmpezarJuego);
          cy.get("[data-play-button]").click();
          cy.get(`[data-game-field="${player}"]`).find(`[data-jugador-${contenedor}]`).should("exist");
        });
      });
    });
  });

  it("Al iniciar el juego aparece un único menú de acciones", () => {
    cy.visit(urlEmpezarJuego);
    cy.get("[data-play-button]").click();
    cy.get("[data-game-frame]").find(`[data-game-frame-menu-acciones]`).should("exist").and("have.length", 1);
  });

  it("El menú de acciones tiene las acciones correctas", () => {
    cy.visit(urlEmpezarJuego);
    cy.get("[data-play-button]").click();
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
  });

  it("Al iniciar el juego, existen 4 cartas en juego", () => {
    cy.visit(urlEmpezarJuego);
    cy.get("[data-play-button]").click();

    cy.get("[data-game-frame]").find("[data-jugador-juego-carta]").should("have.length", 4);
  });
});
