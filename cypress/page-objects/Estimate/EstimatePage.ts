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
        cy.get('.flexCont ._clLink').invoke('text').then((text) => { 
        const estimateId = text.split(' ')[1].slice(1, text.split(' ')[1].length);
        cy.wrap(estimateId).as(`${estimateIdAlias}`);
        });
    }
} 