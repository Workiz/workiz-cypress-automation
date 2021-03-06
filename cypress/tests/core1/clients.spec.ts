import {HomePage} from "../../page-objects/homePage";
import {LogInPage} from "../../page-objects/logInPage";
import {PageRouter} from "../../page-objects/router";
import {RandomFunctions} from "../../support/randomFunctions";
import {Constans} from "../../infrastructure/consts";

describe('Clients tests', () => {
    let pageRouter: PageRouter;
    let logInPage: LogInPage;
    let homePage: HomePage;

    beforeEach(() => {
        pageRouter = new PageRouter;
        logInPage = new LogInPage;
        homePage = logInPage.logInWithAccount1();
    })

    it('When creating new client it appears in the clients report', () => {
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        cy.get(client.alias).then((clientId) => {
            pageRouter.goToClientsPage().validateClientsTableContainsClientId(clientId);
        });
    });

    it('When creating new job from client it appears in the jobs report', () => {
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        let job = client.createJobToNewJobPage();
        cy.get(job.alias).then((jobId) => {
            let jobsPage = pageRouter.goToJobsPage();
            jobsPage.sortJobTableById(false);
            jobsPage.isJobsTableContainsJobId(jobId);
        });
    });

    it('When creating new lead from client it appears in the leads report', () => {
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        let lead = client.createLeadToNewLeadPage();
        cy.get(lead.alias).then((leadId) => {
            let leadsPage = pageRouter.goToLeadsPage();
            leadsPage.isLeadsTableContainsJobId(leadId);
        });
    });

    it('When creating new invoice from client it appears in the invoices report', () => {
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        let invoice = client.createInvoiceToNewInvoicePage();
        cy.get(invoice.alias).then((invoiceId) => {
            let invoicesPage = pageRouter.goToInvoicePage();
            invoicesPage.isInvoiceTableContainsInvoiceId(invoiceId);
        });
    });

    it('When creating new estimate from client it appears in the estimates report', () => {
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        let estimate = client.createEstimateToNewEstimatePage();
        cy.get(estimate.alias).then((estimateId) => {
            let estimatesPage = pageRouter.goToEstimatePage();
            estimatesPage.isEstimatesTableContainsJobId(estimateId);
        });
    });

    it('After adding note to client it will appear in client page notes', () => {
        let note = RandomFunctions.generateRandomString(7);
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        client.addNoteToClient(note);
        let noteElement = client.note;
        noteElement.should('contain.text', note).then((el) => {
            expect(el.text()).to.be.equal(note);
        })
        cy.reload();
        noteElement = client.note;
        noteElement.should('contain.text', note).then((el) => {
            expect(el.text()).to.be.equal(note);
        })
    });

    it('While adding new tag to client it appears on client tags', () => {
        let tag = RandomFunctions.generateRandomString(4);
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        client.createNewTag(tag);
        client.addExitingTag(tag)
        cy.reload();
        client.validateClientTagContainsTag(tag);
        cy.get(client.alias).then((clientId) => {
            pageRouter.goToClientsPage().validateClientContainsTag(clientId, tag);
        });
    });

    it('After deleting tag from client tag will not appear anymore', () => {
        let tag = RandomFunctions.generateRandomString(4);
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        client.createNewTag(tag);
        client.addExitingTag(tag);
        cy.reload();
        client.deleteTag(tag);
        cy.reload();
        client.validateClientDontContainsAnyTag();
        cy.get(client.alias).then((clientId) => {
            pageRouter.goToClientsPage().validateClientDontContainsTag(clientId, tag);
        });
    });

    it('After deleting client it will not appear in the client report',() =>{
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        allClientsPage =client.DeleteClient();
        cy.get(client.alias).then((clientId) =>{
        allClientsPage.validateClientsTableNotContainsClientId(clientId)
        });
    });

    it('After adding contact to client it will appear in client contacts', () => {
        let name = RandomFunctions.generateRandomString(7);
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        client.addContact(name, Constans.PHONE);
        cy.reload();
        client.isContactExistInClient(name);
    });

    it('After adding property to Client it will appear in client properties', () => {
        let name = RandomFunctions.generateRandomString(7);
        let allClientsPage = pageRouter.goToClientsPage();
        let client = allClientsPage.createClient();
        client.addProperty();
        cy.reload();
        client.goToPropertyTab();
        cy.get('.rt-tr-group.pointer .rt-td:nth-child(1)').its('length').should('equal', 2);
    });

    it('After setting client as parent he will contains sub client', () => {
        let allClientsPage = pageRouter.goToClientsPage();
        let parentClient = allClientsPage.createClient();
        allClientsPage = pageRouter.goToClientsPage();
        let childClient = allClientsPage.createClient()
        cy.get(parentClient.firstNameAlias).then((parentClientName) =>{
            childClient.setParentClient(parentClientName);
            allClientsPage = pageRouter.goToClientsPage();
            cy.get(childClient.alias).then((childClientId) => {
                allClientsPage.validateChildClientContainsParentClient(childClientId, parentClientName);
            });
        });
        cy.get(parentClient.alias).then((parentClientId) => {
            let parentClient =allClientsPage.goToClient(parentClientId);
            cy.get(childClient.firstNameAlias).then((childClientName) => {
                parentClient.validateParentClientContainsChildClient(childClientName);
            });
        });
    });

    it('After deleting sub client parent he will not appear as parent', () => {
        let allClientsPage = pageRouter.goToClientsPage();
        let parentClient = allClientsPage.createClient();
        allClientsPage = pageRouter.goToClientsPage();
        let childClient = allClientsPage.createClient();
        cy.get(parentClient.firstNameAlias).then((parentClientName) =>{
            childClient.setParentClient(parentClientName);
            allClientsPage = pageRouter.goToClientsPage();
            cy.get(childClient.alias).then((childClientId) => {
                allClientsPage.validateChildClientContainsParentClient(childClientId, parentClientName);
                let childClient =allClientsPage.goToClient(childClientId);
                childClient.deleteParentClient();
                allClientsPage = pageRouter.goToClientsPage();
                allClientsPage.validateChildClientDontContainsParentClient(childClientId, parentClientName);
            });
        });
        cy.get(parentClient.alias).then((parentClientId) => {
            let parentClient =allClientsPage.goToClient(parentClientId);
            cy.get(childClient.firstNameAlias).then((childClientName) => {
                parentClient.validateParentClientDontContainsChildClient(childClientName);
            });
        });
    });

    it('Creating job for sub client inside parent will create it as it should', () => {
        let allClientsPage = pageRouter.goToClientsPage();
        let parentClient = allClientsPage.createClient();
        allClientsPage = pageRouter.goToClientsPage();
        let childClient = allClientsPage.createClient();
        cy.get(parentClient.firstNameAlias).then((parentClientName) =>{
            childClient.setParentClient(parentClientName);
        });
        allClientsPage = pageRouter.goToClientsPage();
        cy.get(parentClient.alias).then((parentClientId) => {
            let parentClient =allClientsPage.goToClient(parentClientId);
            cy.get(childClient.firstNameAlias).then((childClientName) => {
               let job = parentClient.createJobForChildClientFromSubClientTab(childClientName);
                cy.get(job.alias).then((jobId) => {
                    let allJobsPage = pageRouter.goToJobsPage();
                    allJobsPage.validateJobExistByJobIdAndClient(jobId, childClientName)
                });
            });
        });
    });

    it('Creating invoice for sub client inside parent will create it as it should', () => {
        let allClientsPage = pageRouter.goToClientsPage();
        let parentClient = allClientsPage.createClient();
        allClientsPage = pageRouter.goToClientsPage();
        let childClient = allClientsPage.createClient();
        cy.get(parentClient.firstNameAlias).then((parentClientName) =>{
            childClient.setParentClient(parentClientName);
        });
        allClientsPage = pageRouter.goToClientsPage();
        cy.get(parentClient.alias).then((parentClientId) => {
            let parentClient =allClientsPage.goToClient(parentClientId);
            cy.get(childClient.firstNameAlias).then((childClientName) => {
                let invoice = parentClient.createInvoiceForChildClientFromSubClientTab(childClientName);
                cy.get(invoice.alias).then((invoiceId) => {
                    let allInvoicesPage = pageRouter.goToInvoicePage();
                    allInvoicesPage.validateInvoiceExistByJobIdAndClient(invoiceId, childClientName)
                });
            });
        });
    });

    it('Creating lead for sub client inside parent will create it as it should', () => {
        let allClientsPage = pageRouter.goToClientsPage();
        let parentClient = allClientsPage.createClient();
        allClientsPage = pageRouter.goToClientsPage();
        let childClient = allClientsPage.createClient();
        cy.get(parentClient.firstNameAlias).then((parentClientName) =>{
            childClient.setParentClient(parentClientName);
        });
        allClientsPage = pageRouter.goToClientsPage();
        cy.get(parentClient.alias).then((parentClientId) => {
            let parentClient =allClientsPage.goToClient(parentClientId);
            cy.get(childClient.firstNameAlias).then((childClientName) => {
                let lead = parentClient.createLeadForChildClientFromSubClientTab(childClientName);
                cy.get(lead.alias).then((leadId) => {
                    let allLeadsPage = pageRouter.goToLeadsPage();
                    allLeadsPage.validateLeadExistByJobIdAndClient(leadId, childClientName)
                });
            });
        });
    });

    it.only('Creating estimate for sub client inside parent will create it as it should', () => {
        let allClientsPage = pageRouter.goToClientsPage();
        let parentClient = allClientsPage.createClient();
        allClientsPage = pageRouter.goToClientsPage();
        let childClient = allClientsPage.createClient();
        cy.get(parentClient.firstNameAlias).then((parentClientName) =>{
            childClient.setParentClient(parentClientName);
        });
        allClientsPage = pageRouter.goToClientsPage();
        cy.get(parentClient.alias).then((parentClientId) => {
            let parentClient =allClientsPage.goToClient(parentClientId);
            cy.get(childClient.firstNameAlias).then((childClientName) => {
                let estimate = parentClient.createEstimateForChildClientFromSubClientTab(childClientName);
                cy.get(estimate.alias).then((estimateId) => {
                    let allEstimatesPage = pageRouter.goToEstimatePage();
                    allEstimatesPage.validateEstimateExistByEstimateIdAndClient(estimateId, childClientName)
                });
            });
        });
    });
})
