import { AngiPage } from "./angiIntegrationPage";

export class MarketPlacePage {

    readonly VisibleWidgets = 'div.FeatureCard-module__title___1KBvT';

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

     GoToMarketPlaceLink(widgetTestIdSelector: string, linkToBeClicked: string) {
        cy.get(`section[data-testid='${widgetTestIdSelector}']`).click();
        cy.get("a").contains(`${linkToBeClicked}`).invoke('removeAttr', 'target').click(); 
    }
    goToLedasWidget() {
        cy.get("section[data-testid='leads_feature_card']").click();
    }

    goToCustomReportsLinkPage() {
        cy.get("section[data-testid='customReports_feature_card']").click();
    }
  
    goToWorkizServicePhonePage() {
        cy.get("section[data-testid='workizPhone_feature_card']").click();
    }
}