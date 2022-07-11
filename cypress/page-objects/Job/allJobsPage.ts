
export class AllJobsPage {

    IsJobsTableContainsJobId(jobId: JQuery<HTMLElement>)
    {
        const idToSearch = jobId.toString();
        cy.get('.rt-tbody .rt-td:nth-child(2) .jobs-module__quickJob___3NbDw', {timeout: 10000}).should('contain.text',idToSearch).each(($el, index, $list) => {

            if($el.text() == idToSearch + 'Quick view')
            {
                expect($el.text()).to.be.eq(idToSearch + 'Quick view');
                return false;
            }
            else if (index == $list.length-1)
            {
                expect($el.text()).to.be.eq(idToSearch + 'Quick view');
            }
        })
    }

    sortClientTableById(acSort: boolean){
        cy.get('div').contains('Job ID').click();
        if (!acSort){
            cy.get('div').contains('Job ID').click();
        }
    }
}