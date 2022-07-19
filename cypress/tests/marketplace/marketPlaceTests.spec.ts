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

    it('Using Connecting to QuickBooks Online link Works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToConnectingToQuickBooksLinkFromQuickBooksOnlinePage();
        cy.url().should('include', 'how-to-sync-your-quickbooks-online-account-with-workiz');
    });

    it.only('Using matching Your QuickBooks Tax Rates Link Works Properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goMatchingYourQuickBooksTaxRatesLinkFromQuickBooksOnlinePage();
        cy.url().should('include', 'match-up-your-workiz-tax-rates-with-your-quickbooks-account');
    });
});


