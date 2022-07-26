import { UserRoles } from "../../infrastructure/userRoles";
import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";
import { RandomFunctions } from "../../support/randomFunctions";

describe('general tests',() => {
    let pageRouter: PageRouter;

    beforeEach(() => {
        pageRouter = new PageRouter;
        let loginPage = new LogInPage;
        loginPage.logInWithAccount2();
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
        let emailMessage = RandomFunctions.generateRandomEmailMessage();
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient(clientEmail);  

        let messagingPage = pageRouter.goToMessagingPage();
        cy.get(client.firstNameAlias).then((clName) => {
            let clientName = clName.toString();
            messagingPage.sendEmailToClient(clientName,emailMessage);
        });
        cy.get('@companyEmail').then((accEmail) => {
            let accountEmail = accEmail.toString();
            messagingPage.isBodyMessageSent(accountEmail,emailMessage);      
        });
    });
});