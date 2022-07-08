import { AllClientsPage } from './Clients/allClientsPage';
import { RegistrationPage } from './registrationPage';
import { TeamPage } from './teamPage';
import { InvitationPage } from './InvitationPage';

export class PageRouter {
    goToInvitationPage(): InvitationPage {
    cy.get('@hash').then((hash) => {
        cy.visit(`invite/${hash}/`)
        });
        return new InvitationPage;
    }

    goToTeamPage():TeamPage{
        cy.visit('/root/team/')
        return new TeamPage;
    }
    
    goToRegistrationPage ():RegistrationPage  {
        cy.visit('/sign/');
        cy.location().should((location) => {
            expect(location.href).to.contain('/sign/')
        });
        return new RegistrationPage;        
    }

    goToClientsPage ():AllClientsPage  {
        cy.visit('root/clients');
        cy.location().should((location) => {
            expect(location.href).to.contain('root/clients')
        });
        return new AllClientsPage;        
    }
}