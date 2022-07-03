import { forEach } from "cypress/types/lodash";
import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";
import { RandomFunctions } from "../../support/randomFunctions";
import { MenuLabels } from "../../infrastructure/menuLabels";





describe('Registration and login tests',() => {
    beforeEach(() => {
        cy.viewport(1280, 800) // Set viewport to 550px x 750px
    })
    it('able to log in after registration',() =>{
        const pageRouter =  new PageRouter;
        const email = RandomFunctions.generateRandomEmail();
        let registrationPage = pageRouter.goToRegistrationPage();
        const fullName = RandomFunctions.generateRandomString(7);
        registrationPage.fullSignUp(email,fullName);

        cy.logOut();
        let loginPage = new LogInPage;
        let homePage = loginPage.logIn(email,'Test123!');
        //let actualUserName = homePage.getAccountUserName();
        
        cy.openSettingsMenu();
        cy.get('._popMenu._right .pName').invoke('text').should('equal',fullName);
    });

    it.only('left aside menu contains all defult labels after registration',() =>{
        const pageRouter =  new PageRouter;
        const email = RandomFunctions.generateRandomEmail();
        let registrationPage = pageRouter.goToRegistrationPage();
        const fullName = RandomFunctions.generateRandomString(7);
        registrationPage.fullSignUp(email,fullName);
        
        cy.logOut();
        let loginPage = new LogInPage;
        let homePage = loginPage.logIn(email,'Test123!');
        
        cy.get("#big-menu li a").should('have.length.at.least',11).invoke('attr','title').each((item) =>{
            expect(MenuLabels.listForNewAccount).to.include(item);
        })
    });
});