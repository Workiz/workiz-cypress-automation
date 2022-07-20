import { CustomDocumentsPage } from "./customDocumentsPage";

export class SettingsPage{
    goToCustomDocumentsPage() {
        cy.get('.card.widget').contains('Documents').click().then(() =>{
            cy.get('h2.thin').should('have.text', 'Document templates');
        });
        return new CustomDocumentsPage;
    };
};