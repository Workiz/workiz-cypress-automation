import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";
import { RandomFunctions } from "../../support/randomFunctions";
import { HomePageLabels } from "../../infrastructure/homePageLabels";
import { Constans } from "./../../infrastructure/consts"
import { MarketPlaceLabels } from "../../infrastructure/marketPlaceLabels";

describe('Registration and login tests',() => {
    let pageRouter:PageRouter;

    beforeEach(() => {
        pageRouter = new PageRouter;
    })

    it('able to log in after registration',() =>{
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateFullName();

        let registrationPage = pageRouter.goToRegistrationPage();
        registrationPage.fullSignUp(email,fullName);
        cy.logOut();

        let loginPage = new LogInPage;
        let homePage = loginPage.logIn(email,'Test123!');
        
        homePage.getAccountUserName.should('equal',fullName);
    });

    it('left aside menu contains all defult labels after registration',() =>{
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateFullName();

        let registrationPage = pageRouter.goToRegistrationPage();
        let homePage = registrationPage.fullSignUp(email,fullName);

        let leftMenuElements = homePage.getLeftMenuLabelsElements;
        leftMenuElements.should('have.length', 13);
        leftMenuElements.each((item, index, list) => {
            cy.wrap(item).should("contain.text", HomePageLabels.listForNewAccountWithGettingStarted[index])
        });
    });

    it('make sure all default widgets appears on dashboared',() =>{
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateFullName();

        let registrationPage = pageRouter.goToRegistrationPage();
        let homePage = registrationPage.fullSignUp(email,fullName);
  
        let widgetsElements = homePage.getDashboaredElements;
        widgetsElements.should('have.length', 15);
        widgetsElements.each((item,index,list) => {
            cy.wrap(item).should('contain.text',HomePageLabels.listWidgetsForNewAccount[index])
        });
    });

    it('after creating free user he will appear in free users list',() => {
        let loginPage = new LogInPage;
        loginPage.logInWithAccount2();

        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateFullName();
        let teamPage = pageRouter.goToTeamPage();
        teamPage.createNewFreeUserForTeam(email,fullName);

        let teamPageAfterAddingNew = pageRouter.goToTeamPage();
        let teamFreeUsers = teamPageAfterAddingNew.getFreeTeamUsers(email);
        teamFreeUsers.invoke('text').then((text) => {
            expect(text).includes(email);
    });
});

    it('user can logIn after signup from email invitation',() => {
        let loginPage = new LogInPage;
        loginPage.logInWithAccount2();
        
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateFullName();
        const role = "tech";
        let teamPage = pageRouter.goToTeamPage();
        teamPage.createNewUserForTeam(email,fullName,role);

        teamPage.getUserInvitation(email);
        let invitationPage = pageRouter.goToInvitationPage();
        invitationPage.completeRegistaration();

        cy.clearCookies();
        cy.visit('login/')
        let homePage = loginPage.logIn(email, Constans.defaultPasswprdForInvintation);

        homePage.getAccountUserName.should('equal',fullName);
    });

    it('user can login after reseting password', () => {
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateFullName();

        let registrationPage = pageRouter.goToRegistrationPage();
        registrationPage.fullSignUp(email,fullName);
        cy.logOut();

        let loginPage = new LogInPage;
        let resetPasswordPage = loginPage.forgotPassword();
        resetPasswordPage.sendResetEmail(email);
        resetPasswordPage.getResetInvitation(email);
        let invitationPage = pageRouter.goToInvitationPage();
        invitationPage.setNewPassword(Constans.defaulPwdAfterReset);
        let homePage = loginPage.logIn(email,Constans.defaulPwdAfterReset);
        homePage.getAccountUserName.should('equal',fullName);
    });

    it('validate that connecting to Gls via web will open request PopUp',() => {
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateFullName();
        const companyName = RandomFunctions.generateRandomString(5);

        let registrationPage = pageRouter.goToRegistrationPage();
        registrationPage.fullSignUp(email,fullName,companyName);

        let accountPage = pageRouter.goToAccountPage();
        accountPage.changeRegion("United States");

        let jobTypesPage = pageRouter.goToJobTypesPage();
        jobTypesPage.addJobType("Repair");

        let googleLocalServicePage = pageRouter.goToGoogleLocalServicesPage();
        googleLocalServicePage.fillAllDetailsAndSchedule();
        cy.get('h3').should('contain','Request Sent!');        
    });

    it('connecting to angi link works properly',() => {
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateFullName();

        let registrationPage = pageRouter.goToRegistrationPage();
        registrationPage.fullSignUp(email,fullName);
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        let angiPage = marketPlacePage.goToAngiIntergationPage();
        angiPage.clickOnActivateAngi();
        cy.get('div.angiRegistration__confirmModal___135pH').should('be.visible');
    });

    it.only('validate number and names of active widgets on NewUser',() => {
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateFullName();

        let registrationPage = pageRouter.goToRegistrationPage();
        registrationPage.fullSignUp(email,fullName);

        let accountPage = pageRouter.goToAccountPage();
        accountPage.changeRegion("United States");

        let marketPlacePage = pageRouter.goToMarketPlacePage();
        let widgetsElements = marketPlacePage.getAllActiveWidgetsList;
        widgetsElements.each((item,index,list) => {
            expect(item.text()).to.be.oneOf(MarketPlaceLabels.allActiveWidgetsLabelsList);
        });
        marketPlacePage.getActiveWidgetsElements.should('have.length',15);
    });
});



