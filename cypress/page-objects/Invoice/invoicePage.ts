import { RandomFunctions } from "../../support/randomFunctions";

export class InvoicePage {

    private static invoiceCounter: number = 0;
    alias: string;

    constructor() {
        this.alias = 'invoice' + ++InvoicePage.invoiceCounter;
        this.setInvoiceIdAsAlias(this.alias);
        this.alias = RandomFunctions.generateRandomAliasName(this.alias);
    }

    setInvoiceIdAsAlias(invoiceIdAlias: string) {
        cy.contains('div', 'Invoice:').siblings('div').invoke('text').then((text) => { 
        const invoiceId = text.trim();
        cy.wrap(invoiceId).as(`${invoiceIdAlias}`);
        });
    }
}