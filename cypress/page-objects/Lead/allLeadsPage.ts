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
        cy.get('.rt-tbody .rt-td:nth-child(2)', {timeout: 10000}).contains(leadId.toString()).parent().siblings('div').children('span').children('a').invoke('text').then((text) => {
            let trimText = text.trim().toUpperCase();
            expect(clientName.toString().toUpperCase()).to.be.eq(trimText);
        });

    }
}