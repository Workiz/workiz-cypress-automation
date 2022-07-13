
import { CreateInvoicePage } from "./createInvoicePage";

export class AllInvoicesPage {

    isInvoiceTableContainsInvoiceId(invoiceId: JQuery<HTMLElement>)
    {
        const idToSearch = invoiceId.toString();
        cy.validateTextAppearInElements('.rt-tbody .rt-td:nth-child(2)', idToSearch);
    }
}
