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
        const idToSearch = clientId.toString();
        cy.get('.rt-tbody .rt-td:nth-child(1)', {timeout: 10000}).should('contain.text',idToSearch).each(($el, index, $list) => {
            console.log('checking for index ' + index);
                if($el.text() == idToSearch)
            {
                    console.log('im on first if my index is ' + index)
                    expect($el.text()).to.be.eq(idToSearch);
                    return false;
            }
                else if (index == $list.length-1)
                {
                    console.log('im on the last else if my index is ' + index)
                    expect($el.text()).to.be.eq(idToSearch);
                }
        })
    };

    sortClientTableById(acSort: boolean){
        cy.get('div').contains('Job ID').click();
        if (!acSort){
            cy.get('div').contains('Job ID').click();
        }
    }
}
