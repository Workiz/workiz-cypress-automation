import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";

describe('Accounts tests',() => {
    let pageRouter:PageRouter;
    
    beforeEach(() => {
        pageRouter = new PageRouter;
    });

    it('validates that all fields show correct info',() => {
        let loginPage = new LogInPage;
        loginPage.logInWithAccount2();
        let accountPage = pageRouter.goToAccountPage();
        accountPage.getAccountDetails();
        cy.get('@companyName').should('equal',"Automation2");
        cy.get('@firstName').should('equal',"Joe");
        cy.get('@ownerLastName').should('equal', "Acme");
        cy.get('@companyEmail').should('equal', Cypress.env("email2"));
    });
});