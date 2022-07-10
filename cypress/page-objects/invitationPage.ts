import { Constans } from "./../infrastructure/consts"

export class InvitationPage {
    setNewPassword(defaultPasswprdForInvintation: string) {
        cy.get('#password').type(defaultPasswprdForInvintation);
        cy.get('._submitLoadButton').click();
        cy.get('.thankYou').should('exist');
        this.gotoLoginAfterReset();
    }
    completeRegistaration() {
        cy.get('#pro-user-form').type(Constans.defaultPasswprdForInvintation);
        cy.get('a').contains('Submit').click();
    }
    gotoLoginAfterReset() {
        cy.get(':nth-child(2) > .button').contains('Log In').click();
    }
}