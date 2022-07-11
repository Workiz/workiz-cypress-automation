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
         selectFromDropDown(by:string, element:string, valueToChoose: string): void
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

 Cypress.Commands.add('selectFromDropDown',(by:string, element:string, valueToChoose: string) => {
    switch(by) {
      case 'attr': {
        cy.get(`input[${element}]`).parent().find('.react-select__control').click();
        cy.get(`input[${element}]`).parent().find('[tabindex="-1"]').contains(valueToChoose).click();
        break;
      }
      case 'id': {
        cy.get(`#${element}`).parent().find('.react-select__control').click();
        cy.get(`#${element}`).parent().find('[tabindex="-1"]').contains(valueToChoose).click();
        break;
      }
      case 'class': {
        cy.get(`.${element}`).parent().find('.react-select__control').click();
        cy.get(`.${element}`).parent().find('[tabindex="-1"]').contains(valueToChoose).click();
        break;
      }
    }
 })

 