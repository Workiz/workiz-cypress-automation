
export class HomePage {
    public get getDashboaredElements(): Cypress.Chainable<JQuery> {
        return cy.get(".styles__title___1-_xq", { timeout: 10000 } );
    }

    
    public get getLeftMenuLabelsElements(): Cypress.Chainable<JQuery> {
        return cy.get("#big-menu li a");
    }

    public get getAccountUserName(): Cypress.Chainable<string>{
        cy.openSettingsMenu();
        return cy.get('._popMenu._right .pName').invoke("text");
    }  
}