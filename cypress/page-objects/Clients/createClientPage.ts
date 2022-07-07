import { Constans } from "../../infrastructure/consts";
import { RandomFunctions } from "../../support/randomFunctions";
import { ClientPage } from "./clientPage";

export class CreateClientPage {

    static readonly firstNameLocator: string = "[name='first_name']";
    
    fillClientsDetails():void{
        let firstName: string = RandomFunctions.generateRandomString(8);
        cy.get(`${CreateClientPage.firstNameLocator}`).type(firstName);
        cy.get('[name="address_serach"]').type(Constans.ADDRESS);
        cy.wait(1000);
        cy.get('[name="address_serach"]').type(' r');
        cy.get('.relative .sajComplete .sajComplete-suggestion', {timeout: 10000}).click({force: true});
        cy.get('[name="zipcode"]').type(Constans.ZIPCODE);
        cy.get(`${CreateClientPage.firstNameLocator}`).invoke('attr', 'value').then((firstNameValue) => {
            if(firstNameValue !== firstName){
                cy.get(`${CreateClientPage.firstNameLocator}`).clear().type(firstName);
            }
        })
    }

    save(idAlias: string):ClientPage {
        cy.get('button').contains('Save').click();
        cy.url().should('contain', 'client/');
        return new ClientPage(idAlias);
    }

}