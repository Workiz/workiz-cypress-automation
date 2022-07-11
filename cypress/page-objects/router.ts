import { AllClientsPage } from './Clients/allClientsPage';
import { RegistrationPage } from './registrationPage';
import { TeamPage } from './teamPage';
import { InvitationPage } from './invitationPage';
import { AccountPage } from './accountPage';
import { AllLeadsPage } from './Leads/allLeadsPage';
import { AllJobsPage } from './Job/allJobsPage';
import { JobTypesPage } from './Job/jobTypesPage';
import { GoogleLocalServicesPage } from './googleLocalServicesPage';
import { MarketPlacePage } from './marketPlacePage';

export class PageRouter {

    goToMarketPlacePage(): MarketPlacePage {
        cy.visit('root/marketplace');
        cy.get('.FeatureCard-module__card___12rzT').should('have.length.at.least',1);
        return new MarketPlacePage;
    }

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

    goToAccountPage(): AccountPage {
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

    goToLeadsPage (): AllLeadsPage  {
        cy.visit('root/leads');
        cy.location().should((location) => {
            expect(location.href).to.contain('root/leads');
        });
        return new AllLeadsPage; 
    }  

    goToJobsPage(): AllJobsPage {
        cy.visit('root/jobs');
        cy.location().should((location) => {
            expect(location.href).to.contain('root/jobs');
        });
        return new AllJobsPage;        
    }
}