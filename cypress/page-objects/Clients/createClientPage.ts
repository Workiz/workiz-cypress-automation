import { Constans } from "../../infrastructure/consts";
import { RandomFunctions } from "../../support/randomFunctions";
import { ClientPage } from "./clientPage";

export class CreateClientPage {

    readonly firstNameLocator: string = "[name='first_name']";
    
    fillClientsDetails():void{
        let firstName: string = RandomFunctions.generateRandomString(8);
        cy.get(`${this.firstNameLocator}`).type(firstName);
        cy.get('[name="address_serach"]').type(Constans.ADDRESS);
        cy.get('[name="address_serach"]').type(' r', {delay: 2000});
        cy.get('.relative .sajComplete .sajComplete-suggestion', {timeout: 10000}).click({force: true});
        cy.get('[name="zipcode"]').type(Constans.ZIPCODE);
        cy.get(`${this.firstNameLocator}`).invoke('attr', 'value').then((firstNameValue) => {
            if(firstNameValue !== firstName){
                cy.get(`${this.firstNameLocator}`).clear().type(firstName);
            }
        })
    }

    save(): ClientPage {
        cy.get('button').contains('Save').click();
        cy.url().should('contain', 'client/');
        return new ClientPage();
    }

}