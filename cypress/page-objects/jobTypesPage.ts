export class JobTypesPage {
    addJobType(jobType: string) {
        cy.get('.rt-tbody .rt-tr .rt-td:nth-child(1)').should('have.length.at.least',1).invoke('text').then((jobTypesNames) => {
            if(!jobTypesNames.includes(jobType)){
                this.createJobType(jobType);
            }
        })
    }

    createJobType(jobType: string) {
        cy.get('button.float-right').click();
        cy.get('#type_name').type(jobType);
        cy.get('.modal-buttons .margin-left').contains('Save').click();
    }
}