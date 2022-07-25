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
});