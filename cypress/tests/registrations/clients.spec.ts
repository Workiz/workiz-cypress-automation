import { ClientsReportPage } from "../../page-objects/clientsReportPage";
import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";

describe('Clients tests', () => {
    let pageRouter:PageRouter;
    let logInPage: LogInPage;
    let clientsPage: ClientsReportPage

    beforeEach(() => {
        pageRouter = new PageRouter;
        logInPage = new LogInPage;
        clientsPage = new ClientsReportPage
    })


    it.only('WhenCreatingNewClientItAppearsInTheClinentsReport',() =>{
        logInPage.logInWithAccount1();
        pageRouter.goToClientsPage();
        clientsPage.createClient();
    });
})