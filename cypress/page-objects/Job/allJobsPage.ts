
export class AllJobsPage {

    IsJobsTableContainsJobId(jobId: JQuery<HTMLElement>)
    {
        cy.elementsContainsText('.rt-tbody .rt-td:nth-child(2)', jobId.toString());
    }
}