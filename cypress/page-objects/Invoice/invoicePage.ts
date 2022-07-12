import { RandomFunctions } from "../../support/randomFunctions";

export class InvoicePage {

    private static invoiceCounter: number = 0;
    alias: string;

    constructor() {
        this.alias = 'job' + ++InvoicePage.invoiceCounter;
        this.setInvoiceIdAsAlias(this.alias);
        this.alias = RandomFunctions.generateRandomAliasName(this.alias);
    }

    setInvoiceIdAsAlias(invoiceIdAlias: string) {
        cy.get('._jobInfoCard ._clLink').invoke('text').then((text) => { 
        const invoiceId = text.split(' ')[1].slice(1, text.split(' ')[1].length);
        cy.wrap(invoiceId).as(`${invoiceIdAlias}`);
        });
    }
}