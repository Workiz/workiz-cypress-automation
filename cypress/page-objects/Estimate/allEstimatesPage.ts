export class AllEstimatesPage {

    IsEstimatesTableContainsJobId(estimateId: JQuery<HTMLElement>)
    {
        //Need to find a better solution to get text without the texts of the child element!!!
        const idToSearch = estimateId.toString();
        cy.validateTextAppearInElements('.rt-tbody .rt-td:nth-child(2)', idToSearch);
    }
}