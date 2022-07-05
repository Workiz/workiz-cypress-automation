import { SQLQueries } from "../support/dbRequests";

export class TeamPage{

    getUserInvitation(email: string) {
        SQLQueries.getInvitationHashByEmail(email);
    }

    createNewUserForTeam(email: string, fullName: string, phone: string, role: string) {
        this.clickAddNewUser();
        cy.get('#email_address').type(email);
        cy.get('#name').type(fullName);
        cy.get('#cell_phone').type(phone);
        cy.get(':nth-child(6) > .validationSpan > :nth-child(1) > .react-select-container > .react-select__control').click();
        cy.get('button').contains('Invite user').click();

    }
    
    getFreeTeamUsers(email:string): Cypress.Chainable<JQuery> {
        cy.get('.react-select__multi-value__remove').click();
        cy.get('.react-select__dropdown-indicator').click();
        cy.contains('Subcontractor').click();
        cy.get('#searchString').type(email);
        return cy.get('._tblLbl');
    }

    public get getFreeTeamUsersNextPage() : Cypress.Chainable<JQuery> {
        cy.get('.-next > ._paginateButton').click(); 
       return cy.get('._tblLbl');
    }

    createNewFreeUserForTeam(email: string, fullName: string, phone: string): void {
        this.clickAddNewUser();
        cy.contains('Subcontractor').click();
        cy.get('#email_address').type(email);
        cy.get('#name').type(fullName);
        cy.get('#cell_phone').type(phone);
        cy.get('button').contains('Add user').click();
        cy.location('href').should('contain','/user/');
    }

    clickAddNewUser():void {
        cy.get('.four-columns > .button').click();
    }
}