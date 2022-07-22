export class CustomDocumentsPage {
    
    getAddNewDocumentButton(): Cypress.Chainable<JQuery> {
        return cy.get('.button').contains('Add Custom Document')
    }

    createCustomDocument(documentName: string,templateName: string) {
        this.clickOnAddCustomDocument();
        this.chooseAndSaveTemplate(templateName);
        this.inputDocumentName(documentName);
        this.clickOnSaveButton();
    }

    clickOnAddCustomDocument() {
        cy.get('.button').contains('Add Custom Document').click();
        cy.location('href').should('contain','/doctemplate/');
    }

    chooseAndSaveTemplate(templateName: string) {
        cy.get('._dsTemplate.card').should('have.length', 9);
        cy.get('h4.no-margin-bottom').contains(templateName).click();
        cy.get('.rrt-button.rrt-ok-btn.toastr-control').click();
    }

    inputDocumentName(documentName: string) {
        cy.get('#template_name').clear().type(documentName);
    }

    clickOnSaveButton() {
        //Only this is working, clining 2 times. if u will remove one line test will faild
        cy.get('.margin-right').contains('Save').click();
        cy.get('.margin-right').contains('Save').click();
    }

    isDocumentsPageContainsDocumentName(documentName: string) {
        cy.validateTextAppearInElements('.rt-tbody .rt-td:nth-child(1)',`${documentName} (Custom)`);
    }

    deleteCustomDocument(documentName: string) {
        this.clickOnWantedCustomDocument(documentName);
        this.clickOnDeleteTemplateButtonAndConfirmDeleting();
    }

    clickOnWantedCustomDocument(documentName: string) {
        cy.get('._caps').contains(documentName).click();
        cy.get('.button').contains('Delete template').should('be.visible');
    }
    clickOnDeleteTemplateButtonAndConfirmDeleting() {
        cy.get('.button').contains('Delete template').click();
        cy.get('.rrt-button.rrt-ok-btn.toastr-control').click();
    }
}