import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";

describe('Franchise tests',() => {
    let pageRouter:PageRouter;
    
    beforeEach(() => {
        pageRouter = new PageRouter;
    });

    it('after sending franchise invintation it will appear with status pending',() => {
        let loginPage = new LogInPage;
        loginPage.logInWithAccount2();

        let franchisePage = pageRouter.goToFranchisePage();
        let email = Cypress.env("email3");
        franchisePage.sendFranchiseInvitation(email);

        franchisePage.isInvitationSentAndStatusPending(email);
        franchisePage.deleteAllExistingFranchises();
        cy.get('.rt-tbody .rt-td:nth-child(1)').invoke('text').should('not.contain',email);
    });
});