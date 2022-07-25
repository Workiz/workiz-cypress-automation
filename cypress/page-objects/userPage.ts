export class UserPage {

    removeUser() {
        cy.get('button').contains('Disable user').click();
        cy.get('button').contains('Yes, disable user').click();
    }

    setUserRole(role: string) {
        cy.get('.roleSelection > .columns > :nth-child(1) > .select > .select-arrow').click();
        cy.get('.tracking > .drop-down').scrollTo('top').contains(role).click();
    }

    public get getUserRole() {
        return cy.get('.roles .select-value').invoke('text');
     }
}