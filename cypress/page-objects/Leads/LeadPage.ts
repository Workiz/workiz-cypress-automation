import { RandomFunctions } from "../../support/randomFunctions";

export class LeadPage{
    private static leadCounter: number = 0;
    alias: string;

    constructor() {
        this.alias = 'lead' + ++LeadPage.leadCounter;
        this.setJobIdAsAlias(this.alias);
        this.alias = RandomFunctions.generateRandomAliasName(this.alias);
    }

    setJobIdAsAlias(jobIdAlias: string) {
        cy.get('.flexCont ._clLink').invoke('text').then((text) => { 
        const clientId = text.split(' ')[1].slice(1, text.split(' ')[1].length);
        cy.wrap(clientId).as(`${jobIdAlias}`);
        });
    }
} 