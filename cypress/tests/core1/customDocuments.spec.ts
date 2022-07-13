import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";
import { RandomFunctions } from "../../support/randomFunctions";

describe('Custom documents test',() => {
    let pageRouter:PageRouter;

    beforeEach(() => {
        pageRouter = new PageRouter;
    });

    it('Create and delete basic custom document', () => {
        let loginPage = new LogInPage;
        loginPage.logInWithAccount3();
        
        let documentName = RandomFunctions.generateRandomString(8);
        let customDocumentsPage = pageRouter.goToCustomDocumentsPage();
        customDocumentsPage.createCustomDocument(documentName,'Basic');
        pageRouter.goToCustomDocumentsPage();
        customDocumentsPage.isDocumentsPageContainsDocumentName(documentName);
        customDocumentsPage.deleteCustomDocument(documentName);
        cy.get('._caps').invoke('text').should('not.contain',documentName)
    });
});