export class AllInvoicesPage {

    isInvoiceTableContainsInvoiceId(invoiceId: JQuery<HTMLElement>)
    {
        const idToSearch = invoiceId.toString();
        cy.validateTextAppearInElements('.rt-tbody .rt-td:nth-child(2)', idToSearch);
    }

    validateInvoiceExistByInvoiceIdAndClient(invoiceId: JQuery<HTMLElement>, clientName: JQuery<HTMLElement>)
    {
        cy.get('.rt-tr-group .rt-tr', {timeout: 10000}).filter(`:contains("${invoiceId.toString()}")`).should('contain.text', clientName.toString());
    }
}
