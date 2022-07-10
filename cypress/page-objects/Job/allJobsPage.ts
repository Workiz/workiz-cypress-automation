
export class AllJobsPage {

    IsJobsTableContainsJobId(jobId: JQuery<HTMLElement>)
    {
        let elementText: string;
        let fieldText: string;
        cy.get('.rt-tbody .rt-td:nth-child(1)', {timeout:10000}).should('have.length', 10).each(($el, index, $list) => {
            elementText = $el.text();
            if ($el.text() == jobId.toString())
            {
                cy.get(".rt-tbody .rt-td:nth-child(1)").eq(index).then(function (Field) {
                    fieldText = Field.text();
                    expect(Field.text()).to.equal(jobId.toString());
            });
            }
        });
    }
}