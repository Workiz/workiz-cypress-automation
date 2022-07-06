import { AllClientsPage } from "../../page-objects/Clients/allClientsPage";
import { HomePage } from "../../page-objects/homePage";
import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";

describe('Clients tests', () => {
    let pageRouter: PageRouter;
    let logInPage: LogInPage;
    let homePage: HomePage;

    beforeEach(() => {
        pageRouter = new PageRouter;
        logInPage = new LogInPage;
        homePage =logInPage.logInWithAccount1();
    })

    it.only('WhenCreatingNewClientItAppearsInTheClinentsReport',() =>{
        let allClientsPage = pageRouter.goToClientsPage();
        let clientPage = allClientsPage.createClient();
        clientPage.getUrl();
    });
})