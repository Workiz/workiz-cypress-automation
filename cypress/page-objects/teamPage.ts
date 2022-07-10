import { SQLQueries } from "../support/dbRequests";
import { Constans } from "./../infrastructure/consts"

export class TeamPage{

    getUserInvitation(email: string) {
        SQLQueries.getInvitationHashByEmail(email);
    }

    createNewUserForTeam(email: string, fullName: string,role: string) {
        this.clickAddNewUser();
        this.fillUserDetails(email, fullName, Constans.PHONE);
        cy.selectFromDropDown('attr', "name='role_id'",role)
        cy.get('button').contains('Invite user').click();
    }
    
    getFreeTeamUsers(email:string): Cypress.Chainable<JQuery> {
        this.cleanTeamFilter();
        this.addFilterFromDropDown('Subcontractor');
        cy.get('#searchString').type(email);
        return cy.get('._tblLbl');
    }

    createNewFreeUserForTeam(email: string, fullName: string): void {
        this.clickAddNewUser();
        cy.contains('Subcontractor').click();
        this.fillUserDetails(email, fullName, Constans.PHONE);
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