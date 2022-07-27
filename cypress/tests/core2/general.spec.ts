import { HomePageLabels } from "../../infrastructure/homePageLabels";
import { UserRoles } from "../../infrastructure/userRoles";
import { HomePage } from "../../page-objects/homePage";
import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";
import { RandomFunctions } from "../../support/randomFunctions";

describe('general tests',() => {
    let pageRouter: PageRouter;
    let homePage: HomePage;

    beforeEach(() => {
        pageRouter = new PageRouter;
        let loginPage = new LogInPage;
        homePage = loginPage.logInWithAccount2();
    });

    it('After changing tech user role to dispatch his role on team page will be dispatch',() => {
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateFullName();
        const role = "tech";
        let teamPage = pageRouter.goToTeamPage();
        teamPage.createNewUserForTeam(email,fullName,role);

        let teamPageAfterAddingNew = pageRouter.goToTeamPage();
        let userPage = teamPageAfterAddingNew.goToTeamUser(email);

        let userRole = userPage.getUserRole;
        userRole.should('equal',` ${UserRoles.Tech}`);

        let newRole = UserRoles.Dispatch;
        userPage.setUserRole(newRole);
        teamPageAfterAddingNew = pageRouter.goToTeamPage();
        userPage = teamPageAfterAddingNew.goToTeamUser(email);
        
        userRole = userPage.getUserRole;
        userRole.should('equal',` ${UserRoles.Dispatch}`);
    });

    it('After remove user it will not appear on active users screen',() => {        
        const email = RandomFunctions.generateRandomEmail();
        const fullName = RandomFunctions.generateFullName();
        const role = "tech";
        let teamPage = pageRouter.goToTeamPage();
        teamPage.createNewUserForTeam(email,fullName,role);

        teamPage.getUserInvitation(email);
        let invitationPage = pageRouter.goToInvitationPage();
        invitationPage.completeRegistaration();

        teamPage = pageRouter.goToTeamPage();
        let activeUsers = teamPage.getActiveUsers;
        activeUsers.should('contain',email);

        let userPage = teamPage.goToTeamUser(email);
        userPage.removeUser();

        let disabledUsers = teamPage.getDisabledUsers;
        disabledUsers.should('contain',email);
    });

    it('After sending to client email message via messaging message will appear in logs messages in DB', () => {
        let accountPage = pageRouter.goToAccountPage();
        accountPage.getCompanyEmail();
       
        let clientEmail = RandomFunctions.generateRandomEmail();
        let emailMessage = RandomFunctions.generateRandomMessage();
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient(clientEmail,undefined);  

        let messagingPage = pageRouter.goToMessagingPage();
        cy.get(client.firstNameAlias).then((clName) => {
            let clientName = clName.toString();
            messagingPage.sendEmailToClient(clientName,emailMessage);
        });
        cy.get('@companyEmail').then((accEmail) => {
            let accountEmail = accEmail.toString();
            messagingPage.isBodyMessageSent(accountEmail,emailMessage,'email');      
        });
    });

    it('After sending to client sms message via messaging message will appear in logs messages in DB', () => {
        let accountPage = pageRouter.goToAccountPage();
        accountPage.getCompanyEmail();

        let smsMessage = RandomFunctions.generateRandomMessage();
        let phoneNumber = Cypress.env("twilioPhoneNumber");
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient(undefined,phoneNumber);  

        let messagingPage = pageRouter.goToMessagingPage();
        cy.get(client.firstNameAlias).then((clName) => {
            let clientName = clName.toString();
            messagingPage.sendSmsToClient(clientName,smsMessage);
        });
        cy.get('@companyEmail').then((accEmail) => {
            let accountEmail = accEmail.toString();
            messagingPage.isBodyMessageSent(accountEmail,smsMessage,'sms');                
    });
});

    it('After sending to client message via messaging  client will appear on messaging search', () => {
        let smsMessage = RandomFunctions.generateRandomMessage();
        let phoneNumber = Cypress.env("twilioPhoneNumber");
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient(undefined,phoneNumber);  

        let messagingPage = pageRouter.goToMessagingPage();
        cy.get(client.firstNameAlias).then((clName) => {
            let clientName = clName.toString();
            messagingPage.sendSmsToClient(clientName,smsMessage);
            messagingPage = pageRouter.goToMessagingPage();
            messagingPage.isClientExistsInMessaging(clientName);
        });
    });

    it('User can clock in and clock out', () => {    
        homePage.clockIn();
        homePage.getClockIconStatus();
        cy.get('@clockStatus').then((statusClock) => {
            let clockStatus = statusClock.toString();
            expect(clockStatus).to.contain('clockGreen');
        });

        homePage.clockOut();
        homePage.getClockIconStatus();
        cy.get('@clockStatus').then((statusClock) => {
            let clockStatus = statusClock.toString();
            expect(clockStatus).to.contain('clockRed');
        });
    });

    it('Left aside menu contains all titles', () => {
        let leftMenuElements = homePage.getLeftMenuLabelsElements;
        leftMenuElements.should('have.length', 12);
        leftMenuElements.each((item, index, list) => {
            cy.wrap(item).should("contain.text", HomePageLabels.listForDefaultAccount[index])
        });
    });

    it('Make sure all possible widgets appears on dashboard', () => {
        let widgetsElements = homePage.getDashboaredElements;
        widgetsElements.should('have.length', 16);
        widgetsElements.each((item,index,list) => {
            cy.wrap(item).should('contain.text',HomePageLabels.listWidgetsForDefaultAccount[index])
        });
    });

    it('MakeSureLeftAsideMenuLinksWorksWhileItMinimized', () => {
    });
});