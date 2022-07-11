import { AngiPage } from "./angiIntegrationPage";

export class MarketPlacePage {
     goToAngiIntergationPage(): AngiPage {
         cy.get('section[data-testid="angi_feature_card"]').click();
         return new AngiPage;
     }
}