import { RandomFunctions } from "../../support/randomFunctions";

export class LeadPage{
    private static jobCounter: number = 0;
    alias: string;

    constructor() {
        this.alias = 'lead' + ++LeadPage.jobCounter;
        this.setJobIdAsAlias(this.alias);
        this.alias = RandomFunctions.generateRandomAliasName(this.alias);
    }

    setJobIdAsAlias(jobIdAlias: string) {
        cy.get('._jobInfoCard ._clLink').invoke('text').then((text) => { 
        const clientId = text.split(' ')[1].slice(1, text.split(' ')[1].length);
        cy.wrap(clientId).as(`${jobIdAlias}`);
        });
    }
} 