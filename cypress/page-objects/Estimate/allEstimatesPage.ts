export class AllEstimatesPage {

    isEstimatesTableContainsJobId(estimateId: JQuery<HTMLElement>)
    {
        const idToSearch = estimateId.toString();
        cy.validateTextAppearInElements('.rt-tbody .rt-td:nth-child(2)', idToSearch);
    }

    validateEstimateExistByEstimateIdAndClient(estimateId: JQuery<HTMLElement>, clientName: JQuery<HTMLElement>)
    {
        cy.get('.rt-tr-group .rt-tr', {timeout: 10000}).filter(`:contains("${estimateId.toString()}")`).should('contain', clientName.toString(), { matchCase: false });
    }
}