import { LogInPage } from "../page-objects/logInPage"

declare global {
    namespace Cypress {
      interface  Chainable{
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example cy.dataCy('greeting')
         */
         logOut(): void
         openSettingsMenu(): void
      }
    }
  }


Cypress.Commands.add('logOut', () => { 
    cy.get('[data-testid="pop-menu-span"] > .lnr-cog').click();
    cy.contains('Log Out').click();
    
 });


 Cypress.Commands.add('openSettingsMenu',() => {
    cy.get('[data-testid="pop-menu-span"] > .lnr-cog',{ timeout: 10000 }).click({force: true});
 });