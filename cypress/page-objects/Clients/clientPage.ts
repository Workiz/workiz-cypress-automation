import { JobTypeConsts } from "../../infrastructure/jobTypeConsts";
import { RandomFunctions } from "../../support/randomFunctions";
import { CreateEstimatePage } from "../Estimate/createEstimatePage";
import { EstimatePage } from "../Estimate/EstimatePage";
import { CreateInvoicePage } from "../Invoice/createInvoicePage";
import { InvoicePage } from "../Invoice/invoicePage";
import { CreateJobPage } from "../Job/createJobPage";
import { JobPage } from "../Job/jobPage";
import { CreateLeadPage } from "../Lead/createLeadPage";
import { LeadPage } from "../Lead/LeadPage";

export class ClientPage {

    private static clientCounter: number = 0;
    alias: string;

    constructor() {
        this.alias = 'client' + ++ClientPage.clientCounter;
        this.setClientIdAsAlias(this.alias);
        this.alias = RandomFunctions.generateRandomAliasName(this.alias);
    }

    setClientIdAsAlias(clientIdAlias: string) {
        cy.location('href').should('contains', 'client').then((fullUrl) => { 
        const clientId = fullUrl.split('/')[5];
        cy.wrap(clientId).as(`${clientIdAlias}`);
        });
    }

    private ClickActionMenu(){
        cy.get("[data-testid='pop-menu-span'] .button").click();
    }

    private ClickCreateJob(): CreateJobPage{
        this.ClickActionMenu();
        cy.get('a').contains('Create Job').click();
        return new CreateJobPage();
    }

    private ClickCreateLead(): CreateLeadPage{
        this.ClickActionMenu();
        cy.get('a').contains('Create Lead').click();
        return new CreateLeadPage();
    }

    private ClickCreateInvoice(): CreateInvoicePage{
        this.ClickActionMenu();
        cy.get('a').contains('Create Invoice').click();
        return new CreateInvoicePage();
    }

    private ClickCreateEstimate(): CreateEstimatePage{
        this.ClickActionMenu();
        cy.get('a').contains('Create Estimate').click();
        return new CreateEstimatePage();
    }

    createJobToNewJobPage(): JobPage{
       let createJobPage =  this.ClickCreateJob();
       createJobPage.jobType = JobTypeConsts.SERVICE;
       return createJobPage.SubmitToJob();
    }

    createLeadToNewLeadPage(): LeadPage{
        let createLeadPage =  this.ClickCreateLead();
        return createLeadPage.SubmitToLead();
     }

     createInvoiceToNewInvoicePage(): InvoicePage{
        let createInvoicePage =  this.ClickCreateInvoice();
        return createInvoicePage.SubmitToInvoice();
     }

     createEstimateToNewEstimatePage(): EstimatePage{
        let createEstiamtePage =  this.ClickCreateEstimate();
        return createEstiamtePage.SubmitToEstimate();
     }
}