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
import { AllClientsPage } from "./allClientsPage";

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

    private ClickDeleteClient(): AllClientsPage{
        this.ClickActionMenu();
        cy.get('a').contains('Delete Client').click();
        cy.get('button').contains('Yes delete it').click();
        return new AllClientsPage();
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

    validateClientTagContainsTag(tag: string)
    {
        cy.validateTextAppearInElements('.objectTags-module__objectTags___3CQmo .tag-module__tag___36uWb', tag);
    }

    validateClientDontContainsTag(tag: string)
    {
        cy.validateTextIsNotAppearInElements('client-module__clientTags___2Ry3o','.objectTags-module__objectTags___3CQmo .tag-module__tag___36uWb', tag);
    }

    addContact(contactName: string, phoneNumber: string) {
        cy.get('.clientContacts-module__wrapper___2kQuz .button.float-right').click();
        cy.get('.right-pane-content #first_name').type(contactName);
        cy.get('.right-pane-content #primary_phone').type(phoneNumber);
        cy.get('button').contains('Add contact').click();
    }

    isContactExistInClient(contactName: string){
         cy.scrollTo('bottom');
         cy.get('.clientContacts-module__wrapper___2kQuz tbody td:nth-child(1)').should('contain.text', contactName);
    }

    addProperty() {
        this.goToPropertyTab();
        cy.get('.clientProperties-module__container___3Wx7j button').click();
        cy.get('._single_tab_contents._selected #location_name').type("nick name");
        cy.get('._single_tab_contents._selected #address').type("second property");
        cy.get('._single_tab_contents._selected #city').type("second property");
        cy.get('._single_tab_contents._selected #zipcode').type("dummy zipcode");
        cy.selectFromDropDown('css', '._selected  input[name="state"]', 'Alabama');
        cy.get('._single_tab_contents._selected button.margin-left').click();
    }

    goToPropertyTab(){
        cy.get('._singleTab ').contains('Properties').click();
    }

    DeleteClient(): AllClientsPage{
        return this.ClickDeleteClient();
    }
}