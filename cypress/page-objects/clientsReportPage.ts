import { Constans } from "../infrastructure/consts";
import { RandomFunctions } from "../support/randomFunctions";
import {PageRouter} from "./router"

export interface Client{
    clientId: string;
}

export class ClientsReportPage {
    static readonly firstNameLocator: string = "[name='first_name']";

    public createClient():Client {
        this.clickOnCreateClient();
        this.fillClientsDetails();
        return {clientId: '123'};
    }

    clickOnCreateClient():void{
        cy.get('.float-right.iFfWBzvt7RjPTzzA73jT ').should('contain.text', 'Add Client').click();
    }

    fillClientsDetails():void{
        let firstName: string = RandomFunctions.generateRandomString(8);
        cy.get(`${ClientsReportPage.firstNameLocator}`).type(firstName);
        cy.get('[name="address_serach"]').type(Constans.ADDRESS);
        cy.get('.relative .sajComplete .sajComplete-suggestion').click();
        cy.get('[name="zipcode"]').type(Constans.ZIPCODE);
        if(cy.get(`${ClientsReportPage.firstNameLocator}`).should('not.match', firstName)){
            cy.get(`${ClientsReportPage.firstNameLocator}`).clear().type(firstName);
        }
    }
}
