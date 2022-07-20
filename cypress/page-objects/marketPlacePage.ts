import { AngiPage } from "./angiIntegrationPage";

export class MarketPlacePage {
    goToSettingAssigningTeamByServiceAreaLink() {
        cy.get("section[data-testid='metros_feature_card']").click();
        cy.get("a").contains('Assigning a team by service area').invoke('removeAttr', 'target').click(); 
    }
    goToSettingUpServiceAreasLink() {
        cy.get("section[data-testid='metros_feature_card']").click();
        cy.get("a").contains('Setting up service areas').invoke('removeAttr', 'target').click(); 
    }
    goToUsingTasksLink() {
        cy.get("section[data-testid='tasks_feature_card']").click();
        cy.get("a").contains('Using Tasks').invoke('removeAttr', 'target').click(); 
    }
    goToLedasWidget() {
        cy.get("section[data-testid='leads_feature_card']").click();
    }
    goToCreatingCustomDocumentsLink() {
        cy.get("section[data-testid='customdoc_feature_card']").click();
        cy.get("a").contains('Creating custom documents').invoke('removeAttr', 'target').click(); 
    }
    goToTrackingYourFieldTeamLocation() {
        cy.get("section[data-testid='map_feature_card']").click();
        cy.get("a").contains('Tracking your field team').invoke('removeAttr', 'target').click(); 
    }
    goToCustomReportsLinkPage() {
        cy.get("section[data-testid='customReports_feature_card']").click();
    }
    goToSettingAutoTechCommissionsLinkFromCommissionsPage() {
        cy.get("section[data-testid='commissions_feature_card']").click();
        cy.get("a").contains('Setting auto tech commissions').invoke('removeAttr', 'target').click(); 
    }
    goToFranchiseClickOnViewSetupGuideLinkFromFranchisePage() {
        cy.get("section[data-testid='franchises_feature_card']").click();
        cy.get("a").contains('View Setup Guide').invoke('removeAttr', 'target').click(); 
    }
    goToWorkizServicePhonePage() {
        cy.get("section[data-testid='workizPhone_feature_card']").click();
    }

    goToTrackingOnlineBookingSourcesePage() {
        cy.get("section[data-testid='booking_feature_card']").click();
        cy.get("a").contains('Tracking online booking sources').invoke('removeAttr', 'target').click(); 
    }

    goToSettingUpOnlineBookingLinkFromQuickBooksOnlinePage() {
        cy.get("section[data-testid='booking_feature_card']").click();
        cy.get("a").contains('Setting up online booking').invoke('removeAttr', 'target').click(); 
    }
    goToMatchingYourQuickBooksTaxRatesLinkFromQuickBooksOnlinePage() {
        cy.get("section[data-testid='quickbooks_feature_card']").click();
        cy.get("a").contains('Matching your QuickBooks tax rates').invoke('removeAttr', 'target').click(); 
    }
    
    goToConnectingToQuickBooksLinkFromQuickBooksOnlinePage() {
        cy.get("section[data-testid='quickbooks_feature_card']").click();
        cy.get("a").contains('Connecting to QuickBooks Online').invoke('removeAttr', 'target').click(); 
    }
    
    readonly VisibleWidgets = 'div.FeatureCard-module__title___1KBvT';

    goToCustomFieldsByJobLinkFromCustomFieldsAddOnPage() {
        cy.get("section[data-testid='customFields_feature_card']").click();
        cy.get("a").contains('Custom fields by job type').invoke('removeAttr', 'target').click();   
    }
    
    goToHowToCreateCutsomFieldsLinkFromCustomFieldsAddOnPage() {
        cy.get("section[data-testid='customFields_feature_card']").click();
        cy.get("a").contains('How to create custom fields for jobs and clients').invoke('removeAttr', 'target').click();
    }

    public get getOnlyIntegrationType(): Cypress.Chainable<JQuery> {
        cy.get("span").contains('Integration').click();
        return cy.get(this.VisibleWidgets);
    }
    
    public get getOnlyAddOnsType(): Cypress.Chainable<JQuery> {
        cy.get("span").contains('Add-Ons').click();
        return cy.get(this.VisibleWidgets);
    }

    clearSearchBar() {
        cy.get(".lnr.lnr-close").click();
    }

    searchForValueInSearchBar(textToSearch: string): void {
        cy.get('i.lnr.lnr-magnifier').click();
        cy.get("input[placeholder='Search...']").type(textToSearch);
    }

    public get getAllWidgetsElements(): Cypress.Chainable<JQuery> {
        return cy.get('section.FeatureCard-module__card___12rzT');
    }

    public get pressedButtonElements():Cypress.Chainable<JQuery> {
        return cy.get('span.MarketplacePage-module__current___1xBlY');
    }
    
    public get getUnpressedButtonElements(): Cypress.Chainable<JQuery> {
        return cy.get('span[class="MarketplacePage-module__category_item___25HXd"]');
    }
        
    public get getActiveWidgetsElements(): Cypress.Chainable<JQuery> {
        return cy.get('img[src$="/svg/activated_feature_ok.svg"]');
    }

     public get getAllActiveWidgetsList(): Cypress.Chainable<JQuery> {
         this.clickOnCurrentlyActive();
         return cy.get(this.VisibleWidgets);
     }

    clickOnCurrentlyActive() {
        cy.get('.MarketplacePage-module__category_item___25HXd').contains('Currently Active').click();
    }
    
     goToAngiIntergationPage(): AngiPage {
         cy.get('section[data-testid="angi_feature_card"]').click();
         return new AngiPage;
     }
}