import {ClientPage} from "./clientPage"
import { CreateClientPage } from "./createClientPage";

export class AllClientsPage {

    createClient(): ClientPage {
        let createClientPage = this.clickOnCreateClient();
        let name = createClientPage.fillClientsDetails();
        createClientPage.save();
        return new ClientPage(name);
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
        cy.validateTextIsNotAppearInElements('rt-tr-group pointer', '.rt-tbody .rt-td:nth-child(1)', clientId.toString());
    }
}
