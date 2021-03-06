import {ClientPage} from "./clientPage"
import { CreateClientPage } from "./createClientPage";

export class AllClientsPage {

    createClient(email?: string, twilioPhoneNumber?: string): ClientPage {
        let createClientPage = this.clickOnCreateClient();
        createClientPage.fillClientsDetails(email,twilioPhoneNumber);
        return createClientPage.save();
    }

    private clickOnCreateClient(): CreateClientPage {
        cy.get('.float-right.iFfWBzvt7RjPTzzA73jT ', {timeout: 10000}).should('contain.text', 'Add Client').click();
        return new CreateClientPage;
    }

    validateClientsTableContainsClientId(clientId: JQuery<HTMLElement>)
    {
        cy.validateTextAppearInElements('.rt-tbody .rt-td:nth-child(1)', clientId.toString());
    };

    sortClientTableById(acSort: boolean){
        cy.get('div').contains('Job ID').click();
        if (!acSort){
            cy.get('div').contains('Job ID').click();
        }
    }

    validateClientContainsTag(clientId: JQuery<HTMLElement>, tag: string)
    {
        cy.get('.rt-tr-group.pointer .rt-td', {timeout: 10000}).filter(`:contains("${clientId.toString()}")`).siblings('div').find('div').should('contain.text', tag);
    };

    validateClientDontContainsTag(clientId: JQuery<HTMLElement>, tag: string)
    {
        cy.get('.rt-tr-group.pointer .rt-td', {timeout: 10000}).filter(`:contains("${clientId.toString()}")`).siblings('div').find('div').should('not.contain.text', tag);
    }

    validateClientsTableNotContainsClientId(clientId: JQuery<HTMLElement>)
    {
        cy.waitForTableLoaderSpinnerToDisappear();
        cy.validateTextIsNotAppearInTableElements('rt-tr-group pointer', '.rt-tbody .rt-td:nth-child(1)', clientId.toString());
    }

    goToClient(clientId: JQuery<HTMLElement>): ClientPage
    {
        cy.get('.rt-tr-group.pointer .rt-td', {timeout: 10000}).filter(`:contains("${clientId.toString()}")`).click();
        return new ClientPage();
    }

    validateChildClientContainsParentClient(childClientId: JQuery<HTMLElement>, parentClientName: JQuery<HTMLElement>)
    {
        cy.get('.rt-tr-group.pointer .rt-tr', {timeout: 10000}).filter(`:contains("${childClientId.toString()}")`).should('contain.text', parentClientName.toString());
    }

    validateChildClientDontContainsParentClient(childClientId: JQuery<HTMLElement>, parentClientName: JQuery<HTMLElement>)
    {
        cy.get('.rt-tr-group.pointer .rt-tr', {timeout: 10000}).filter(`:contains("${childClientId.toString()}")`).should('not.contain.text', parentClientName.toString());
    }
}
