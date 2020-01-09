/// <reference types="Cypress" />
/// <reference types="Cypress-testing-library" />

describe("debug console can be used at all", () => {
  it("console can be opened and closed", () => {
    // the console is not there yet+
    cy.visit("/")
      .queryByText(/cache \(/i)
      .should("not.exist");

    // bring up the console
    cy.openConsole()
      .queryByText(/cache \(/i)
      .should("exist")
      .queryByText(/close/i)
      .should("exist");

    // close it
    cy.window()
      .queryByText(/close/i)
      .click()
      .queryByText(/cache \(/i)
      .should("not.exist");
  });

  it("cookie can be set so console stays on a refresh", () => {
    cy.visit("/")
      .queryByText(/cache \(/i)
      .should("not.exist");

    // bring up the console
    cy.openConsole(true)
      .queryByText(/cache \(/i)
      .should("exist")
      .getCookie("__neos_debug__")
      .should("have.property", "value")
      .should("eq", "true");
  });

  it("debug console opens when the cookie is set", () => {
    cy.setCookie("__neos_debug__", "true")
      .visit("/")
      .queryByText(/cache \(/i)
      .should("exist");
  });

  it("closing the console will also delete the cooke", () => {
    cy.setCookie("__neos_debug__", "true")
      .visit("/")
      .queryByText(/close/i)
      .click()
      .getCookie("__neos_debug__")
      .should("eq", null);
  });
});
