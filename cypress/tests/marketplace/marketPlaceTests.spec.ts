import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";
import { MarketPlaceLabels } from "../../infrastructure/marketPlaceLabels";

describe('MarketPlace tests', () => {
    let pageRouter: PageRouter;
    let logInPage: LogInPage;

    beforeEach(() => {
        pageRouter = new PageRouter;
        logInPage = new LogInPage;
        logInPage.logInWithAccount6();
    })

    it('Validate the number of pressed and  unpressed filters in MarketPlacePage',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        const unPressedButtonElements = marketPlacePage.getUnpressedButtonElements;
        unPressedButtonElements.its('length').should('eq', 4);
        const pressedButtonElements = marketPlacePage.pressedButtonElements;
        pressedButtonElements.its('length').should('eq', 1);

    });

    it('Validate the number of widgets in marketPlace page',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        const allWidgetElements = marketPlacePage.getAllWidgetsElements;
        allWidgetElements.its('length').should('eq', 36);
    });

    it('Search values in search bar and validate the results',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.searchForValueInSearchBar('quickBooks');
        marketPlacePage.getAllActiveWidgetsList.first().then(($el) => {
            expect($el.text()).to.equal('QuickBooks Online');
        });

        marketPlacePage.clearSearchBar();
        marketPlacePage.searchForValueInSearchBar('Online Booking');
        marketPlacePage.getAllActiveWidgetsList.first().then(($el) => {
            expect($el.text()).to.equal('Online Booking');
        });
    });

    it('Validate that only add-ons types widgets appear when clicking on add-ons filter',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        let adoonsWidgets = marketPlacePage.getOnlyAddOnsType;
        adoonsWidgets.each((item,index,list) => {
            expect(item.text()).to.be.oneOf(MarketPlaceLabels.allAddOnsLabelsList);
        });
    });

    it('Validate that only integrations types widgets appear when clicking on integrations filter',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        let integrationsWidgets = marketPlacePage.getOnlyIntegrationType;
        integrationsWidgets.each((item,index,list) => {
            expect(item.text()).to.be.oneOf(MarketPlaceLabels.allIntegrationsLabelsList);
        });
    });

    //Custom fields
    it('Using custom fields link works properly in custom fields',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToHowToCreateCutsomFieldsLinkFromCustomFieldsAddOnPage();
        cy.url().should('include', '2246776-how-to-create-custom-fields-for-jobs-and-clients');
    });

    it('Using custom fields link works properly in custom fields',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToCustomFieldsByJobLinkFromCustomFieldsAddOnPage();
        cy.url().should('include', '3092163-setting-up-custom-fields-by-job-type');
    });
    //QuickBooks Online widget links
    it('Using Connecting to QuickBooks Online link Works properly in QuickBooks',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToConnectingToQuickBooksLinkFromQuickBooksOnlinePage();
        cy.url().should('include', 'how-to-sync-your-quickbooks-online-account-with-workiz');
    });

    it('Using matching Your QuickBooks Tax Rates Link Works Properly in QuickBooks',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToMatchingYourQuickBooksTaxRatesLinkFromQuickBooksOnlinePage();
        cy.url().should('include', 'match-up-your-workiz-tax-rates-with-your-quickbooks-account');
    });
    //Online Booking widget links
    it('Using Setting Up Online-Booking Link works properly in QuickBooks Online-Booking',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToSettingUpOnlineBookingLinkFromQuickBooksOnlinePage();
        cy.url().should('include', 'how-to-enable-and-use-online-booking');
    });

    it('Using Tracking online booking sources Link works properly in Online-Booking',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToTrackingOnlineBookingSourcesePage();
        cy.url().should('include', 'tracking-multiple-ad-sources-for-online-booking');
    });

    //workiz phone system widget links
    it('Validate Workiz service phone link works properly after clicking the phone widget',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToWorkizServicePhonePage();
        cy.url().should('include', '/billing/phone');
    });    

    //Franchises widget Links
    it('Using view set up guide link works properly in franchises',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToFranchiseClickOnViewSetupGuideLinkFromFranchisePage();
        cy.url().should('include', 'help.workiz');
    });  

    //Commission widget Links
    it('Using Setting auto tech commissions link works properly in commissions',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToSettingAutoTechCommissionsLinkFromCommissionsPage();
        cy.url().should('include', 'setting-commission-rates-for-techs');
    });  

    //Custom report widget Links
    it('Using custom reports link from marketplace works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToCustomReportsLinkPage();
        cy.url().should('include', 'customReports');
    });  

    // Map/GPS Tracking your field team's location Link
    it('Using Tracking your field teams location link from marketplace works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToTrackingYourFieldTeamLocation();
        cy.url().should('include', 'tracking-your-team-s-location-in-workiz');
    });  

    // Custom Documents widgets links
    it('Using Creating Custom Documents Link Works Properly In Custom Documents',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToCreatingCustomDocumentsLink();
        cy.url().should('include', 'how-to-create-a-custom-document-from-scratch');
    });  

    // Leads widgets links
    it('Using leads widget link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToLedasWidget();
        cy.url().should('include', 'name=leads');
    });
    
    // Tasks widgets links
    it('Using tasks link works properly in tasks',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToUsingTasksLink();
        cy.url().should('include', 'how-to-use-the-tasks-add-on-to-manage-complex-jobs');
    });  

    //Metro Areas Links
    it.only('Setting up service areas link works properly in Metro Areas',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToSettingUpServiceAreasLink();
        cy.url().should('include', 'how-to-manage-multiple-service-areas');
    });  

    it.only('Assigning a team by service area link works properly in Metro Areas',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToSettingAssigningTeamByServiceAreaLink();
        cy.url().should('include', 'filtering-field-techs-for-jobs-using-skills-and-service-areas');
    });  
});


