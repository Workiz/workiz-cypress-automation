import { Constans } from "../../infrastructure/consts";
import { RandomFunctions } from "../../support/randomFunctions";
import { ClientPage } from "./clientPage";

export class CreateClientPage {

    readonly firstNameLocator: string = "[name='first_name']";
    
    fillClientsDetails(email?: string, twilioPhoneNumber?: string):void{
        let firstName: string = RandomFunctions.generateRandomString(8);
        cy.get(`${this.firstNameLocator}`).type(firstName);
        if(typeof twilioPhoneNumber !== 'undefined') { cy.get('[name="primary_phone"]').type(twilioPhoneNumber) }
        else { cy.get('[name="primary_phone"]').type(Constans.PHONE) };
        cy.get('[name="address_serach"]').type(Constans.ADDRESS);
        if(typeof email !== 'undefined') { cy.get('.eight-columns > :nth-child(1) > .validationSpan > ._fLabel > #email_address').type(email) };  
        cy.get('[name="address_serach"]').type(' r', {delay: 2000});
        cy.get('.relative .sajComplete .sajComplete-suggestion', {timeout: 10000}).click({force: true});
        cy.get('[name="zipcode"]').type(Constans.ZIPCODE);
        cy.get(`${this.firstNameLocator}`).invoke('attr', 'value').then((firstNameValue) => {
            if(firstNameValue !== firstName){
                cy.get(`${this.firstNameLocator}`).clear().type(firstName);
            }
        });
    }

    save(): ClientPage {
        cy.get('button').contains('Save').click();
        cy.url().should('contain', 'client/');
        return new ClientPage();
    }
}