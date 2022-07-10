import { PageRouter } from "../../page-objects/router";
import { RandomFunctions } from "../../support/randomFunctions";

describe('Accounts tests',() => {
    let pageRouter:PageRouter;
    
    beforeEach(() => {
        pageRouter = new PageRouter;
    });

    it('validates that all fields show correct info and count account preferences',() => {
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateFullName();
        const companyName = RandomFunctions.generateRandomString(5);

        let registrationPage = pageRouter.goToRegistrationPage();
        registrationPage.fullSignUp(email,fullName,companyName);
        let accountPage = pageRouter.goToAccountPage();
        accountPage.getAccountDetails();

        cy.get('@companyName').should('equal',companyName);
        cy.get('@firstName').should('equal',fullName.split(' ')[0]);
        cy.get('@ownerLastName').should('equal', fullName.split(' ')[1]);
        cy.get('@companyEmail').should('equal', email);

        accountPage.getAccountPreferencesTabs().should('equal',6);
        accountPage.getAccountPreferencesToggles().should('equal',4);
    });
});