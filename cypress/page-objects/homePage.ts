
export class HomePage {
    public get getLeftMenuLabelsElements(): Cypress.Chainable<JQuery> {
        return cy.get("#big-menu li a");
    }

    public get getAccountUserName(): Cypress.Chainable<string>{
        cy.openSettingsMenu();
        return cy.get('._popMenu._right .pName').invoke("text");
    }  
}