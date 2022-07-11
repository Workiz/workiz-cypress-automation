export class AllLeadsPage {

    IsLeadsTableContainsJobId(jobId: JQuery<HTMLElement>)
    {
        //Need to find a better solution to get text without the texts of the child element!!!
        const idToSearch = jobId.toString()+'Quick view';
        cy.get('.rt-tbody .rt-td:nth-child(2) .jobs-module__quickJob___3NbDw', {timeout: 10000}).should('contain.text',idToSearch).each(($el, index, $list) => {

            if($el.text() == idToSearch)
            {
                expect($el.text()).to.be.eq(idToSearch);
                return false;
            }
            else if (index == $list.length-1)
            {
                expect($el.text()).to.be.eq(idToSearch);
            }
        })
    }
}