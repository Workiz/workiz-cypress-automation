import { HomePage } from "../../page-objects/homePage";
import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";
import { RandomFunctions } from "../../support/randomFunctions";

describe('Clients tests', () => {
    let pageRouter: PageRouter;
    let logInPage: LogInPage;
    let homePage: HomePage;

    beforeEach(() => {
        pageRouter = new PageRouter;
        logInPage = new LogInPage;
        homePage =logInPage.logInWithAccount1();
    })

    it.only('When creating new client it appears in the clients report',() =>{
        let allClientsPage = pageRouter.goToClientsPage();
        let clientAliasName = RandomFunctions.generateRandomString(5);
        allClientsPage.createClient(clientAliasName);
        let alias = '\@' +`${clientAliasName}`;
        cy.get(alias).then((clientId) =>{
        pageRouter.goToClientsPage().IsClientsTableContainsClientId(clientId);
        });
    });
})