import { SQLQueries } from "../support/dbRequests";
import { Constans } from "./../infrastructure/consts"
import { UserPage } from "./userPage";

export class TeamPage {

    public get getActiveUsers() {
        this.cleanTeamFilter();
        cy.selectFromMultiSelectDropDown('class','_med','Active');
        let activeUsersTable = cy.get('.rt-table').should('exist');
        cy.get('.rt-table .rt-tbody .rt-td').should('have.length.greaterThan',0);
        return activeUsersTable;
    }

    public get getDisabledUsers() {
        this.cleanTeamFilter();
        cy.selectFromMultiSelectDropDown('class','_med','Disabled');
        cy.sortTableColumnById(':nth-child(6) > .rt-resizable-header-content', false);
        let disabledUsersTable = cy.get('.rt-table').should('exist');
        cy.get('.rt-table .rt-tbody .rt-td').should('have.length.greaterThan',0);
        return disabledUsersTable;
    }
    
    goToTeamUser(email: string): UserPage {
        cy.get('#searchString').type(email);
        cy.get('._tblLbl').contains(email).click();
        cy.location('href').should('contain','/user/');
        return new UserPage;
    }

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
        cy.get('.react-select__multi-value__remove').click({ force: true });
    }

    addFilterFromDropDown(chooseFromDropdown: string):void {
        cy.get('._med > .react-select__control > .react-select__indicators > .react-select__indicator > .css-19bqh2r').click();
        cy.contains(chooseFromDropdown).click();
    }

    fillUserDetails(email: string, fullName: string, phone: string): void {
        cy.get('#email_address').type(email);
        cy.get('#name').type(fullName);
        cy.get('#cell_phone').type(phone);
    }
}