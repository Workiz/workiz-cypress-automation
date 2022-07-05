import { SQLQueries } from "../support/dbRequests";

export class TeamPage{

    getUserInvitation(email: string) {
        SQLQueries.getInvitationHashByEmail(email);
    }

    createNewUserForTeam(email: string, fullName: string, phone: string, role: string) {
        this.clickAddNewUser();
        this.fillUserDetails(email, fullName, phone);
        cy.get(':nth-child(6) > .validationSpan > :nth-child(1) > .react-select-container > .react-select__control').click();
        cy.contains(role).click;
        cy.get('button').contains('Invite user').click();
    }
    
    getFreeTeamUsers(email:string,chooseFromDropdown: string): Cypress.Chainable<JQuery> {
        this.cleanTeamFilter();
        this.addFilterFromDropDown(chooseFromDropdown);
        cy.get('#searchString').type(email);
        return cy.get('._tblLbl');
    }

    createNewFreeUserForTeam(email: string, fullName: string, phone: string,chooseFromDropdown:string): void {
        this.clickAddNewUser();
        cy.contains(chooseFromDropdown).click();
        this.fillUserDetails(email, fullName, phone);
        cy.get('button').contains('Add user').click();
        cy.location('href').should('contain','/user/');
    }

    clickAddNewUser():void {
        cy.get('.four-columns > .button').click();
    }

    cleanTeamFilter(): void {
        cy.get('.react-select__multi-value__remove').click();
    }

    addFilterFromDropDown(chooseFromDropdown: string):void {
        cy.get('.react-select__dropdown-indicator').click();
        cy.contains(chooseFromDropdown).click();
    }

    fillUserDetails(email: string, fullName: string, phone: string): void {
        cy.get('#email_address').type(email);
        cy.get('#name').type(fullName);
        cy.get('#cell_phone').type(phone);
    }
}