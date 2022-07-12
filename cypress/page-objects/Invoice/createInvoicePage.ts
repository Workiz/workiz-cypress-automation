import { InvoicePage } from "./invoicePage";

export class CreateInvoicePage {

    SubmitToInvoice(): InvoicePage{
        cy.get('.sbmt_bar .button').click();
        return new InvoicePage();
    }

}