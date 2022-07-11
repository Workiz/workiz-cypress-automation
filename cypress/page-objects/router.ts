import { AllClientsPage } from './Clients/allClientsPage';
import { RegistrationPage } from './registrationPage';
import { TeamPage } from './teamPage';
import { InvitationPage } from './invitationPage';
import { AccountPage } from './accountPage';
import { AllJobsPage } from './Job/allJobsPage';
import { JobTypesPage } from './jobTypesPage';
import { GoogleLocalServicesPage } from './googleLocalServicesPage';

export class PageRouter {

    goToGoogleLocalServicesPage(): GoogleLocalServicesPage {
        cy.visit('root/googleLocal');
        cy.get('h2.thin').should('contain', 'Local Services Ads');
        return new GoogleLocalServicesPage;
    }

    goToJobTypesPage(): JobTypesPage {
        cy.visit('root/jobTypes');
        cy.get('.historyWrap > span').should('contain','Job Admin');
        return new JobTypesPage;
    }

    goToAccountPage() {
        cy.visit('root/account');
        cy.get('._clickToUpload').should('contain','Company Logo');
        return new AccountPage;
    }

    goToInvitationPage(): InvitationPage {
    cy.get('@hash').then((hash) => {
        cy.visit(`invite/${hash}/`)
        });
        return new InvitationPage;
    }

    goToTeamPage(): TeamPage{
        cy.visit('/root/team/')
        return new TeamPage;
    }

    goToRegistrationPage(): RegistrationPage {
        cy.visit('/sign/');
        cy.location().should((location) => {
            expect(location.href).to.contain('/sign/')
        });
        return new RegistrationPage;        
    }

    goToClientsPage(): AllClientsPage {
        cy.visit('root/clients');
        cy.location().should((location) => {
            expect(location.href).to.contain('root/clients');
        });
        return new AllClientsPage;        
    }

    goToJobsPage(): AllJobsPage {
        cy.visit('root/jobs');
        cy.location().should((location) => {
            expect(location.href).to.contain('root/jobs');
        });
        return new AllJobsPage;        
    }
}