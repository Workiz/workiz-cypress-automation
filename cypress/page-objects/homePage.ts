
export class HomePage {

    clockOut() {
        cy.location('href').should('contain','root/home');
        cy.openSettingsMenu();
        cy.get('.pName img').click();
        cy.get('div.addNewModal').find('div').contains('Clocked in since');
        cy.get('.mid-margin-bottom > .button').invoke('text').then((button) => {
            let clockInButton = button.toString();
            if(clockInButton == "Clock Out") 
            {
                this.clockInOutModalButton();
            }
        });
    }

    clockIn() {
        cy.location('href').should('contain','root/home');
        cy.openSettingsMenu();
        cy.get('.pName img').click();
        cy.get('div.addNewModal').find('div').contains('Currently clocked out');
        cy.get('.mid-margin-bottom > .button').invoke('text').then((button) => {
            let clockInButton = button.toString();
            if(clockInButton == "Clock in") 
            {
                this.clockInOutModalButton();
            }
        });
    }

    clockInOutModalButton() {
        cy.get('.mid-margin-bottom > .button').click();
        cy.waitForToasterToDisappear();
    }

    clockIconStatus() {
        cy.openSettingsMenu();
        cy.get('.pName img').invoke('attr','src').then((src) => {
            cy.wrap(src).as('clockStatus');
            cy.get('#title-bar').click();
        });
    }

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