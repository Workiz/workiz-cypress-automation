import { RandomFunctions } from "../../support/randomFunctions";

export class EstimatePage{
    private static estimateCounter: number = 0;
    alias: string;

    constructor() {
        this.alias = 'lead' + ++EstimatePage.estimateCounter;
        this.setEstimateIdAsAlias(this.alias);
        this.alias = RandomFunctions.generateRandomAliasName(this.alias);
    }

    setEstimateIdAsAlias(estimateIdAlias: string) {
        cy.contains('div', 'Estimate:').siblings('div').invoke('text').then((text) => { 
        const estimateId = text.trim();
        cy.wrap(estimateId).as(`${estimateIdAlias}`);
        });
    }
} 