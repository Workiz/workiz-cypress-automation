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

    it('When creating new client it appears in the clients report',() =>{
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        cy.get(client.alias).then((clientId) =>{
        pageRouter.goToClientsPage().IsClientsTableContainsClientId(clientId);
        });
    });

    it.only('When creating new job from client it appears in the jobs report',() =>{
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        let job = client.CreateJobToNewJobPag();
        cy.get(job.alias).then((jobId) =>{
        let jobsPage = pageRouter.goToJobsPage();
        jobsPage.sortClientTableById(false);
        jobsPage.IsJobsTableContainsJobId(jobId);
        });
    });
})