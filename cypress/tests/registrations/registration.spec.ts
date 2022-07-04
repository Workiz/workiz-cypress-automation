import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";
import { RandomFunctions } from "../../support/randomFunctions";
import { MenuLabels } from "../../infrastructure/menuLabels";


describe('Registration and login tests',() => {
    let pageRouter:PageRouter;
    beforeEach(() => {
        cy.viewport(1280, 800) // Set viewport to 550px x 750px
        pageRouter = new PageRouter;
    })
    it('able to log in after registration',() =>{
        const email = RandomFunctions.generateRandomEmail();
        let registrationPage = pageRouter.goToRegistrationPage();
        const fullName = RandomFunctions.generateRandomString(7);
        registrationPage.fullSignUp(email,fullName);

        cy.logOut();
        let loginPage = new LogInPage;
        let homePage = loginPage.logIn(email,'Test123!');
        
        homePage.getAccountUserName.should('equal',fullName);
    });

    it('left aside menu contains all defult labels after registration',() =>{
        const email = RandomFunctions.generateRandomEmail();
        let registrationPage = pageRouter.goToRegistrationPage();
        const fullName = RandomFunctions.generateRandomString(7);
        let homePage = registrationPage.fullSignUp(email,fullName);
        let leftMenuElements = homePage.getLeftMenuLabelsElements;
        leftMenuElements.each((item, index, list) => {
            expect(list).to.have.length(13);
        })
        leftMenuElements.each((item, index, list) => {
            cy.wrap(item).should("contain.text", MenuLabels.listForNewAccountWithGettingStarted[index])
        })
    });
});



