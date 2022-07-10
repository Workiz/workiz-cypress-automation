import { Constans } from "./../infrastructure/consts"

export class InvitationPage {
    completeRegistaration() {
        cy.get('#pro-user-form').type(Constans.defaultPasswprdForInvintation);
        cy.get('a').contains('Submit').click();
    }
}