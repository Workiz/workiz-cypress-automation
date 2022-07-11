
export class AllJobsPage {

    IsJobsTableContainsJobId(jobId: JQuery<HTMLElement>)
    {
        const idToSearch = jobId.toString();
        cy.get('.rt-tbody .rt-td:nth-child(2) .jobs-module__quickJob___3NbDw', {timeout: 10000}).should('contain.text',idToSearch).each(($el, index, $list) => {
            console.log('checking for index ' + index);
                if($el.text() == idToSearch)
            {
                    console.log('im on first if my index is ' + index)
                    expect($el.text()).to.be.eq(idToSearch);
                    return false;
            }
                else if (index == $list.length-1)
                {
                    console.log('im on the last else if my index is ' + index)
                    expect($el.text()).to.be.eq(idToSearch);
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