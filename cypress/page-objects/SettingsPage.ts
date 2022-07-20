import { CustomDocumentsPage } from "./customDocumentsPage";

export class SettingsPage{
    
    widgetsSelector: string;
     constructor(){
        this.widgetsSelector = '.card.widget';
    }

    goToCustomDocumentsPage() {
        cy.get('.card.widget').contains('Documents').click().then(() =>{
            cy.get('h2.thin').should('have.text', 'Document templates');
        });
        return new CustomDocumentsPage;
    };
};