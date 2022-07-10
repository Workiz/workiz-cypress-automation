import { RandomFunctions } from "../../support/randomFunctions";

export class ClientPage {

    private static clientCounter: number = 0;
    alias: string;

    constructor() {
        this.alias = 'client' + ++ClientPage.clientCounter;
        this.setClientIdAsAlias(this.alias);
        this.alias = RandomFunctions.generateRandomAliasName(this.alias);
    }

    setClientIdAsAlias(clientIdAlias: string) {
        cy.location('href').should('contains', 'client').then((fullUrl) => { 
        const clientId = fullUrl.split('/')[5];
        cy.wrap(clientId).as(`${clientIdAlias}`);
        });
    }

}