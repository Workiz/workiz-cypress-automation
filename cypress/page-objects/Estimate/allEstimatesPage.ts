export class AllEstimatesPage {

    isEstimatesTableContainsJobId(estimateId: JQuery<HTMLElement>)
    {
        const idToSearch = estimateId.toString();
        cy.validateTextAppearInElements('.rt-tbody .rt-td:nth-child(2)', idToSearch);
    }

    validateEstimateExistByEstimateIdAndClient(estimateId: JQuery<HTMLElement>, clientName: JQuery<HTMLElement>)
    {
        cy.get('.rt-tbody .rt-td:nth-child(2)', {timeout: 10000}).contains(estimateId.toString()).siblings('div').children('span').children('a').invoke('text').then((text) => {
            let trimText = text.trim().toUpperCase();
            expect(clientName.toString().toUpperCase()).to.be.eq(trimText);
        });
    }
}