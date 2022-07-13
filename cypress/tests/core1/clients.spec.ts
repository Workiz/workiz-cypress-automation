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

    it('When creating new client it appears in the clients report',() =>{
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        cy.get(client.alias).then((clientId) =>{
        pageRouter.goToClientsPage().IsClientsTableContainsClientId(clientId);
        });
    });

    it('When creating new job from client it appears in the jobs report',() =>{
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        let job = client.CreateJobToNewJobPage();
        cy.get(job.alias).then((jobId) =>{
        let jobsPage = pageRouter.goToJobsPage();
        jobsPage.sortJobTableById(false);
        jobsPage.IsJobsTableContainsJobId(jobId);
        });
    });

    it('When creating new lead from client it appears in the leads report',() =>{
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        let lead = client.CreateLeadToNewLeadPage();
        cy.get(lead.alias).then((leadId) =>{
        let leadsPage = pageRouter.goToLeadsPage();
        leadsPage.IsLeadsTableContainsJobId(leadId);
        });
    });

    it('When creating new invoice from client it appears in the invoices report',() =>{
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        let invoice = client.CreateInvoiceToNewInvoicePage();
        cy.get(invoice.alias).then((invoiceId) =>{
        let invoicesPage = pageRouter.goToInvoicePage();
        invoicesPage.IsInvoiceTableContainsInvoiceId(invoiceId);
        });
    });

    it('When creating new estimate from client it appears in the estimates report',() =>{
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        let estimate = client.CreateEstimateToNewEstimatePage();
        cy.get(estimate.alias).then((estimateId) =>{
        let estiamtesPage = pageRouter.goToEstimatePage();
        estiamtesPage.IsEstimatesTableContainsJobId(estimateId);
        });
    });

    it('After adding note to client it will appear in client page notes',() =>{
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        let estimate = client.CreateEstimateToNewEstimatePage();
        
    });
})
