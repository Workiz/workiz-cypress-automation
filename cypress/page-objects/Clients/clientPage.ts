import { JobTypeConsts } from "../../infrastructure/jobTypeConsts";
import { RandomFunctions } from "../../support/randomFunctions";
import { CreateJobPage } from "../Job/createJobPage";
import { JobPage } from "../Job/jobPage";
import { CreateLeadPage } from "../Leads/createLeadPage";
import { LeadPage } from "../Leads/LeadPage";

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

    private ClickCreateInvoice(): CreateLeadPage{
        this.ClickActionMenu();
        cy.get('a').contains('Create Invoice').click();
        return new CreateLeadPage();
    }

    CreateJobToNewJobPage(): JobPage{
       let createJobPage =  this.ClickCreateJob();
       createJobPage.jobType = JobTypeConsts.SERVICE;
       return createJobPage.SubmitToJob();
    }

    CreateLeadToNewLeadPage(): LeadPage{
        let createLeadPage =  this.ClickCreateLead();
        return createLeadPage.SubmitToLead();
     }
     CreateInvoiceToNewInvoicePage(): LeadPage{
        let createLeadPage =  this.ClickCreateInvoice();
        return createLeadPage.SubmitToLead();
     }
}