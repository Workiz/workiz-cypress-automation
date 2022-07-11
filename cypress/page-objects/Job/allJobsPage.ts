
export class AllJobsPage {

    IsJobsTableContainsJobId(jobId: JQuery<HTMLElement>)
    {
        cy.elementsContainsText('.rt-tbody .rt-td:nth-child(2)', jobId.toString());
    }

    sortClientTableById(acSort: boolean){
        cy.get('div').contains('Job ID').click();
        if (!acSort){
            cy.get('div').contains('Job ID').click();
        }
    }
}