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
        marketPlacePage.GoToMarketPlaceLink('customFields_feature_card', 'How to create custom fields for jobs and clients');
        cy.url().should('include', '2246776-how-to-create-custom-fields-for-jobs-and-clients');
    });

    it('Using custom fields link works properly in custom fields',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('customFields_feature_card', 'Custom fields by job type');
        cy.url().should('include', '3092163-setting-up-custom-fields-by-job-type');
    });
    //QuickBooks Online widget links
    it('Using Connecting to QuickBooks Online link Works properly in QuickBooks',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('quickbooks_feature_card', 'Connecting to QuickBooks Online');
        cy.url().should('include', 'how-to-sync-your-quickbooks-online-account-with-workiz');
    });

    it('Using matching Your QuickBooks Tax Rates Link Works Properly in QuickBooks',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('quickbooks_feature_card', 'Matching your QuickBooks tax rates');
        cy.url().should('include', 'match-up-your-workiz-tax-rates-with-your-quickbooks-account');
    });
    //Online Booking widget links
    it('Using Setting Up Online-Booking Link works properly in QuickBooks Online-Booking',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('booking_feature_card', 'Setting up online booking');
        cy.url().should('include', 'how-to-enable-and-use-online-booking');
    });

    it('Using Tracking online booking sources Link works properly in Online-Booking',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('booking_feature_card', 'Tracking online booking sources');
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
        marketPlacePage.GoToMarketPlaceLink('franchises_feature_card', 'View Setup Guide');
        cy.url().should('include', 'help.workiz');
    });  

    //Commission widget Links
    it('Using Setting auto tech commissions link works properly in commissions',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('commissions_feature_card', 'Setting auto tech commissions');
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
        marketPlacePage.GoToMarketPlaceLink('map_feature_card', 'Tracking your field team');
        cy.url().should('include', 'tracking-your-team-s-location-in-workiz');
    });  

    // Custom Documents widgets links
    it('Using Creating Custom Documents Link Works Properly In Custom Documents',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('customdoc_feature_card', 'Creating custom documents');
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
        marketPlacePage.GoToMarketPlaceLink('tasks_feature_card', 'Using Tasks');
        cy.url().should('include', 'how-to-use-the-tasks-add-on-to-manage-complex-jobs');
    });  

    //Metro Areas Links
    it('Using Setting up service areas link works properly in Metro Areas',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('metros_feature_card', 'Setting up service areas');
        cy.url().should('include', 'how-to-manage-multiple-service-areas');
    });  

    it('Using Assigning a team by service area link works properly in Metro Areas',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('metros_feature_card', 'Assigning a team by service area');
        cy.url().should('include', 'filtering-field-techs-for-jobs-using-skills-and-service-areas');
    });  

    //External Companies Link
    it('Using Automatically creating leads from messages link works properly in External Company',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('external_feature_card', 'Automatically creating leads from messages');
        cy.url().should('include', 'automatically-create-leads-from-your-lead-sources');
    });  

    //Inventory Links
    it('Using Managing your Inventory link works properly in Inventory',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('inventory_feature_card', 'Managing your inventory');
        cy.url().should('include', 'managing-your-stock-with-workiz-s-inventory-add-on');
    }); 

    it('Using Inventory locations link works properly in Inventory',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('inventory_feature_card', 'Inventory locations');
        cy.url().should('include', 'how-to-create-and-manage-inventory-containers');
    }); 

});


