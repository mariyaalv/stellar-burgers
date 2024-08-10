/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable<Subject> {
    getElement(value: string): Chainable<any>;
  }
}
