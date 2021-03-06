import { AllClientsPage } from './Clients/allClientsPage';
import { RegistrationPage } from './registrationPage';
import { TeamPage } from './teamPage';
import { InvitationPage } from './invitationPage';
import { AccountPage } from './accountPage';
import { AllLeadsPage } from './Lead/allLeadsPage';
import { AllJobsPage } from './Job/allJobsPage';
import { JobTypesPage } from './Job/jobTypesPage';
import { GoogleLocalServicesPage } from './googleLocalServicesPage';
import { MarketPlacePage } from './marketPlacePage';
import { AllInvoicesPage } from './Invoice/allInvoicesPage';
import { AllEstimatesPage } from './Estimate/allEstimatesPage';
import { CustomDocumentsPage } from './customDocumentsPage';
import { FranchisePage } from './franchisePage';
import { SettingsPage } from './settingsPage';
import { MessagingPage } from './messagingPage';

export class PageRouter {
    goToMessagingPage(): MessagingPage {
        cy.get('.topMenu .lnr-bubbles').click();
        cy.location('href').should('contain','root/messaging');
        return new MessagingPage;
    }

    goToSettingsPage(): SettingsPage {
        cy.visit('root/settings');
        cy.get('div h4._widgetTitle:nth-child(1)').should('contain','General Settings');
        return new SettingsPage;
    }

    goToFranchisePage(): FranchisePage {
        cy.get('#title-bar span[data-testid="pop-menu-span"]').click();
        cy.get('.franchise_pane footer a').click({force:true});
        cy.location('href').should('contain','/franchises');
        return new FranchisePage;
    }

    goToCustomDocumentsPage(): CustomDocumentsPage {
        cy.visit('root/documents/');
        cy.get('h2.thin').should('contain','Document templates');
        return new CustomDocumentsPage;
    }

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

    goToInvoicePage(): AllInvoicesPage {
        cy.visit('root/invoices');
        cy.location().should((location) => {
            expect(location.href).to.contain('root/invoices');
        });
        return new AllInvoicesPage;        
    }

    goToEstimatePage(): AllEstimatesPage {
        cy.visit('root/estimates');
        cy.location().should((location) => {
            expect(location.href).to.contain('root/estimates');
        });
        return new AllEstimatesPage;        
    }
}