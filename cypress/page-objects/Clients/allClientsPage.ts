import {ClientPage} from "./clientPage"
import { CreateClientPage } from "./createClientPage";

export class AllClientsPage {

    createClient(): ClientPage {
        let createClientPage = this.clickOnCreateClient();
        createClientPage.fillClientsDetails();
        return createClientPage.save();
    }

    private clickOnCreateClient(): CreateClientPage {
        cy.get('.float-right.iFfWBzvt7RjPTzzA73jT ', {timeout: 10000}).should('contain.text', 'Add Client').click();
        return new CreateClientPage;
    }

    IsClientsTableContainsClientId(clientId: JQuery<HTMLElement>)
    {
        cy.elementsContainsText('.rt-tbody .rt-td:nth-child(1)', clientId.toString());
    };
}
