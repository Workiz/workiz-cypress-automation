import { ClientsReportPage } from './clientsReportPage';
import { RegistrationPage } from './registrationPage';
import { TeamPage } from './teamPage';

export class PageRouter {

    goToTeamPage():TeamPage{
        cy.visit('/root/team/')
        // cy.get('.teamLink > a').should('have.attr','title','Team').click();
        // cy.location('href').should('contain','/root/team');
        return new TeamPage;
    }
    
    goToRegistrationPage ():RegistrationPage  {
        cy.visit('/sign/');
        cy.location().should((location) => {
            expect(location.href).to.contain('/sign/')
        });
        return new RegistrationPage;        
    }

    goToClientsPage ():ClientsReportPage  {
        cy.visit('root/clients');
        cy.location().should((location) => {
            expect(location.href).to.contain('root/clients')
        });
        return new ClientsReportPage;        
    }
}