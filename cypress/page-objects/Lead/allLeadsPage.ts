export class AllLeadsPage {

    isLeadsTableContainsJobId(leadId: JQuery<HTMLElement>)
    {
        //Need to find a better solution to get text without the texts of the child element!!!
        const idToSearch = leadId.toString()+'Quick view';
        cy.validateTextAppearInElements('.rt-td .leads-module__quickJob___365MB', idToSearch);
    }

    validateLeadExistByLeadIdAndClient(leadId: JQuery<HTMLElement>, clientName: JQuery<HTMLElement>)
    {
        cy.get('.rt-tr-group.pointer').should('exist');
        cy.get('.rt-tr-group .rt-tr', {timeout: 10000}).filter(`:contains("${leadId.toString()}")`).should('contain.text', clientName.toString(), { matchCase: false });
    }
}