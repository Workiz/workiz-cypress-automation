import { contains } from "cypress/types/jquery";
import {ClientPage} from "./clientPage"
import { CreateClientPage } from "./createClientPage";

export class AllClientsPage {

    createClient():ClientPage {
        let createClientPage = this.clickOnCreateClient();
        createClientPage.fillClientsDetails();
        return createClientPage.save();
    }

    private clickOnCreateClient():CreateClientPage {
        cy.get('.float-right.iFfWBzvt7RjPTzzA73jT ', {timeout: 10000}).should('contain.text', 'Add Client').click();
        return new CreateClientPage;
    }

    IsClientsTableContainsClientId(clientId: JQuery<HTMLElement>)
    {
        let elementText: string;
        let fieldText: string;
        cy.get('.rt-tbody .rt-td:nth-child(1)', {timeout:10000}).should('have.length', 10).each(($el, index, $list) => {
            elementText = $el.text();
            if ($el.text() == clientId.toString())
            {
                cy.get(".rt-tbody .rt-td:nth-child(1)").eq(index).then(function (Field) {
                    fieldText = Field.text();
                    expect(Field.text()).to.equal(clientId.toString());
            });
            }
        });
    }
}
