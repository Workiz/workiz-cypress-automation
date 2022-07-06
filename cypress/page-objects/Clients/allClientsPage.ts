import {ClientPage} from "./clientPage"
import { CreateClientPage } from "./createClientPage";

export class AllClientsPage {

    public createClient():ClientPage {
        let createClientPage = this.clickOnCreateClient();
        createClientPage.fillClientsDetails();
        return createClientPage.save();
    }

    clickOnCreateClient():CreateClientPage {
        cy.get('.float-right.iFfWBzvt7RjPTzzA73jT ').should('contain.text', 'Add Client').click();
        return new CreateClientPage;
    }

}
