import { InvoicePage } from "./invoicePage";

export class CreateInvoicePage {

    SubmitToJob(): InvoicePage{
        cy.get('.sbmt_bar .button').click();
        return new InvoicePage();
    }

}