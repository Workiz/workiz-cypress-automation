
export class AllJobsPage {

    IsJobsTableContainsJobId(jobId: JQuery<HTMLElement>)
    {
        //Need to find a better solution to get text without the texts of the child element!!!
        const idToSearch = jobId.toString()+'Quick view';
        cy.validateTextAppearInElements('.rt-tbody .rt-td:nth-child(2) .jobs-module__quickJob___3NbDw', idToSearch )
    }

    sortJobTableById(acSort: boolean){
        cy.get('div').contains('Job ID').click();
        if (!acSort){
            cy.get('div').contains('Job ID').click();
        }
    }
}