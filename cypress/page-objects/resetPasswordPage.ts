import { SQLQueries } from "../support/dbRequests";

export class ResetPasswordPage {
    
    sendResetEmail(email: string) {
        cy.get('#lostEmail').type(email);
        cy.get('._resetPassBtn').click();
        cy.get('h1').should('contain','Done!');
    }

    getResetInvitation(email: string) {
        SQLQueries.getInvitationHashByEmail(email);
    }

}