export class AllLeadsPage {

    IsLeadsTableContainsJobId(leadId: JQuery<HTMLElement>)
    {
        //Need to find a better solution to get text without the texts of the child element!!!
        const idToSearch = leadId.toString()+'Quick view';
        cy.validateTextAppearInElements('.rt-td .leads-module__quickJob___365MB', idToSearch);
    }
}