export class AllEstimatesPage {

    IsEstimatesTableContainsJobId(estimateId: JQuery<HTMLElement>)
    {
        const idToSearch = estimateId.toString();
        cy.validateTextAppearInElements('.rt-tbody .rt-td:nth-child(2)', idToSearch);
    }
}