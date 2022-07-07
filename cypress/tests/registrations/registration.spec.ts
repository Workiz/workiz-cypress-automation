import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";
import { RandomFunctions } from "../../support/randomFunctions";
import { HomePageLabels } from "../../infrastructure/homePageLabels";

describe('Registration and login tests',() => {
    let pageRouter:PageRouter;

    beforeEach(() => {
        pageRouter = new PageRouter;
    })

    it('able to log in after registration',() =>{
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateRandomString(7);
        let registrationPage = pageRouter.goToRegistrationPage();
        registrationPage.fullSignUp(email,fullName);
        cy.logOut();

        let loginPage = new LogInPage;
        let homePage = loginPage.logIn(email,'Test123!');
        
        homePage.getAccountUserName.should('equal',fullName);
    });

    it('left aside menu contains all defult labels after registration',() =>{
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateRandomString(7);
        let registrationPage = pageRouter.goToRegistrationPage();
        let homePage = registrationPage.fullSignUp(email,fullName);

        let leftMenuElements = homePage.getLeftMenuLabelsElements;
        leftMenuElements.should('have.length', 13);
        leftMenuElements.each((item, index, list) => {
            cy.wrap(item).should("contain.text", HomePageLabels.listForNewAccountWithGettingStarted[index])
        });
    });

    it('Make sure all default widgets appears on dashboared',() =>{
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateRandomString(7);
        let registrationPage = pageRouter.goToRegistrationPage();
        registrationPage.fullSignUp(email,fullName);
        cy.logOut();

        let loginPage = new LogInPage;
        let homePage = loginPage.logIn(email,'Test123!');
        let widgetsElements = homePage.getDashboaredElements;
        widgetsElements.should('have.length', 15);
        widgetsElements.each((item,index,list) => {
            cy.wrap(item).should('contain.text',HomePageLabels.listWidgetsForNewAccount[index])
        });
    });

    it('After Creating Free User He Will Appear In free Users List',() => {
        let loginPage = new LogInPage;
        loginPage.logInWithAccount2();
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateRandomString(7);
        const phone = "0548107330";
        const chooseUserType = "Subcontractor";
        let teamPage = pageRouter.goToTeamPage();
        teamPage.createNewFreeUserForTeam(email,fullName,phone,chooseUserType);
        let teamPageAfterAddingNew = pageRouter.goToTeamPage();
        let teamUsers = teamPageAfterAddingNew.getFreeTeamUsers(email,chooseUserType);
        teamUsers.invoke('text').then((text) => {
            expect(text).includes(email);
    });
});

    it.only('User Can LogIn After Signup From Email Invitation',() => {
        let loginPage = new LogInPage;
        loginPage.logInWithAccount2();
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateRandomString(7);
        const phone = "0548107330";
        const role = "tech";
        let teamPage = pageRouter.goToTeamPage();
        teamPage.createNewUserForTeam(email,fullName,phone,role);
        teamPage.getUserInvitation(email);
        cy.get('@hash').then((hash) => {
            console.log('from tst ', hash);
        })
    });
});



