
export class HomePage {

    getAccountUserName(): Cypress.Chainable<string>{
        cy.openSettingsMenu();
        return cy.get('._popMenu._right .pName').invoke("text");
    }  
}