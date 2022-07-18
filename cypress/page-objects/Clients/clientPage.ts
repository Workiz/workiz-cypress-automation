import {JobTypeConsts} from "../../infrastructure/jobTypeConsts";
import {RandomFunctions} from "../../support/randomFunctions";
import {CreateEstimatePage} from "../Estimate/createEstimatePage";
import {EstimatePage} from "../Estimate/EstimatePage";
import {CreateInvoicePage} from "../Invoice/createInvoicePage";
import {InvoicePage} from "../Invoice/invoicePage";
import {CreateJobPage} from "../Job/createJobPage";
import {JobPage} from "../Job/jobPage";
import {CreateLeadPage} from "../Lead/createLeadPage";
import {LeadPage} from "../Lead/LeadPage";

export class ClientPage {

    private static clientCounter: number = 0;
    alias: string;
    private _note: string | undefined;
    private _tag: string | undefined;

    constructor() {
        this.alias = 'client' + ++ClientPage.clientCounter;
        this.setClientIdAsAlias(this.alias);
        this.alias = RandomFunctions.generateRandomAliasName(this.alias);
    }

    get note(): Cypress.Chainable<JQuery> {
        return cy.get(".clientNotes-module__flexCol___2xSY_ div:nth-child(2)");
    }

    setClientIdAsAlias(clientIdAlias: string) {
        cy.location('href').should('contains', 'client').then((fullUrl) => {
            const clientId = fullUrl.split('/')[5];
            cy.wrap(clientId).as(`${clientIdAlias}`);
        });
    }

    private ClickActionMenu() {
        cy.get("[data-testid='pop-menu-span'] .button").click();
    }

    private ClickCreateJob(): CreateJobPage {
        this.ClickActionMenu();
        cy.get('a').contains('Create Job').click();
        return new CreateJobPage();
    }

    private ClickCreateLead(): CreateLeadPage {
        this.ClickActionMenu();
        cy.get('a').contains('Create Lead').click();
        return new CreateLeadPage();
    }

    private ClickCreateInvoice(): CreateInvoicePage {
        this.ClickActionMenu();
        cy.get('a').contains('Create Invoice').click();
        return new CreateInvoicePage();
    }

    private ClickCreateEstimate(): CreateEstimatePage {
        this.ClickActionMenu();
        cy.get('a').contains('Create Estimate').click();
        return new CreateEstimatePage();
    }

    private openTagDialog() {
        cy.get(".lnr-tags").click();
    }

    createJobToNewJobPage(): JobPage {
        let createJobPage = this.ClickCreateJob();
        createJobPage.jobType = JobTypeConsts.SERVICE;
        return createJobPage.SubmitToJob();
    }

    createLeadToNewLeadPage(): LeadPage {
        let createLeadPage = this.ClickCreateLead();
        return createLeadPage.SubmitToLead();
    }

    createInvoiceToNewInvoicePage(): InvoicePage {
        let createInvoicePage = this.ClickCreateInvoice();
        return createInvoicePage.SubmitToInvoice();
    }

    createEstimateToNewEstimatePage(): EstimatePage {
        let createEstimatePage = this.ClickCreateEstimate();
        return createEstimatePage.SubmitToEstimate();
    }

    addNoteToClient(note: string) {
        cy.scrollTo('bottom');
        cy.get('button').contains('Add Note').click();
        cy.get("div[data-editor='editor']").type(note);
        cy.get(".clientNotes-module__note___2-SM_ button").click();
    }

    createNewTag(tag: string) {
        this.openTagDialog();
        cy.get("span.objectTags-module__link___266ge").click();
        cy.get("[name='tag_name']").type(tag);
        cy.get(".button.button-module__container___i9TLF ").contains('Save').click();
        cy.get(".client-module__tags___2g9Z1").click();
    }

    addExitingTag(tag: string) {
        this.openTagDialog();
        cy.get('.objectTags-module__tagsWrapper___vUCcB .green-bg ', {timeout: 10000}).filter(`:contains("${tag}")`).click();
    }

    isClientTagContainsTag(tag: string)
    {
        cy.validateTextAppearInElements('.objectTags-module__objectTags___3CQmo .tag-module__tag___36uWb', tag);
    };
}