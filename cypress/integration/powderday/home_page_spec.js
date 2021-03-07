/// <reference types="cypress" />

describe("Powder Day - Base", () => {
  it("Visits Home Page", () => {
    cy.visit("/");
  });

  it("Adds a Mountain - Cypress", () => {
    cy.visit("/");

    cy.get(".icon-plus-circled")
      .click();

    cy.get(":nth-child(5) > div")
      .click();
  });

  it("Adds another mountain - Whistler", () => {
    cy.visit("/");

    cy.get(".icon-plus-circled")
      .click();

    cy.get(".menu > :nth-child(1) > div")
      .click();
  });

  // it("Displays Temp - Whistler", async () => {
  //   cy.visit("/")
  //     .get(":nth-child(2) > :nth-child(1) > .weather-card-inner > .weather-card-day-0 > .data-block-subcontent-wrapper > :nth-child(3) > :nth-child(2)")
  //     .should((val) => {
  //       expect(parseInt(val.text)).to.be.at.least(-40);
  //     });
  // });
});