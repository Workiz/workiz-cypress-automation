import { UserRoles } from "../../infrastructure/userRoles";
import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";
import { RandomFunctions } from "../../support/randomFunctions";

describe('general tests',() => {
    let pageRouter: PageRouter;

    beforeEach(() => {
        pageRouter = new PageRouter;

    });

    it('After changing tech user role to dispatch his role on team page will be dispatch',() => {
        let loginPage = new LogInPage;
        loginPage.logInWithAccount2();
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

        teamPage = pageRouter.goToTeamPage();
        let activeUsers = teamPage.getActiveUsers;
        activeUsers.should('contain',email);

        let userPage = teamPage.goToTeamUser(email);
        userPage.removeUser();

        let disabledUsers = teamPage.getDisabledUsers;
        disabledUsers.should('contain',email);
    });
});