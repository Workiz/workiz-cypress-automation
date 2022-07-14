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

    it('ValidateTheNumberOfPressedAndUnPressedFiltersInMarketPlacePage',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        const unPressedButtonElements = marketPlacePage.getUnpressedButtonElements;
        unPressedButtonElements.its('length').should('eq', 4);
        const pressedButtonElements = marketPlacePage.pressedButtonElements;
        pressedButtonElements.its('length').should('eq', 1);

    });

    it('ValidateTheNumberOfWidgetsInMarketPlacePage',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        const allWidgetElements = marketPlacePage.getAllWidgetsElements;
        allWidgetElements.its('length').should('eq', 36);
    });

    it('SearchValuesInSearchBarAndValidateTheResults',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.SearchForValueInSearchBar('quickBooks');
        marketPlacePage.getAllActiveWidgetsList.first().then(($el) => {
            expect($el.text()).to.equal('QuickBooks Online');
        });

        marketPlacePage.ClearSearchBar();
        marketPlacePage.SearchForValueInSearchBar('Online Booking');
        marketPlacePage.getAllActiveWidgetsList.first().then(($el) => {
            expect($el.text()).to.equal('Online Booking');
        });
    });

    it('ValidateThatOnlyAddOnsTypesWidgetsAppearWhenClickingOnAddOnsFilter',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        let adoonsWidgets = marketPlacePage.getOnlyAddOnsType;
        adoonsWidgets.each((item,index,list) => {
            expect(item.text()).to.be.oneOf(MarketPlaceLabels.allAddOnsLabelsList);
        });
    });

    it('ValidateThatOnlyIntegrationsWidgetsAppearWhenClickingOnIntegrationFilter',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        let integrationsWidgets = marketPlacePage.getOnlyIntegrationType;
        integrationsWidgets.each((item,index,list) => {
            expect(item.text()).to.be.oneOf(MarketPlaceLabels.allIntegrationsLabelsList);
        });
    });

    it('UsingCustomFieldsLinkWorksProperlyInCustomFields',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToHowToCreateCutsomFieldsLinkFromCustomFieldsAddOnPage();
        cy.url().should('include', '2246776-how-to-create-custom-fields-for-jobs-and-clients');
    });

    it('UsingCustomFieldsLinkWorksProperlyInCustomFields',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToCustomFieldsByJobLinkFromCustomFieldsAddOnPage();
        cy.url().should('include', '3092163-setting-up-custom-fields-by-job-type');
    });
});
