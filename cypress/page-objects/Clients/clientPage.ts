export class ClientPage {

    constructor(idAlias: string) {
        this.setClientIdAsAlias(idAlias);
    }

    setClientIdAsAlias(idAlias: string) {
        cy.location('href').should('contains', 'client').then((fullUrl) => { 
        const clientId = fullUrl.split('/')[5];
        cy.wrap(clientId).as(`${idAlias}`);
        });
    }
}