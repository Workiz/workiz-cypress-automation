
export class AllJobsPage {

    isJobsTableContainsJobId(jobId: JQuery<HTMLElement>)
    {
        //Need to find a better solution to get text without the texts of the child element!!!
        const idToSearch = jobId.toString()+'Quick view';
        cy.validateTextAppearInElements('.rt-tbody .rt-td:nth-child(2) .jobs-module__quickJob___3NbDw', idToSearch )
    }

    validateJobExistByJobIdAndClient(jobId: JQuery<HTMLElement>, clientName: JQuery<HTMLElement>)
    {
        cy.sortTableColumnById(".rt-table .rt-th:nth-child(2)",false);
        cy.get('.rt-tbody .rt-td:nth-child(2) .jobs-module__quickJob___3NbDw', {timeout: 10000}).contains(jobId.toString()).parent().siblings('div').children('span').children('a').should('contain.text', clientName.toString(), { matchCase: false });
    }
}