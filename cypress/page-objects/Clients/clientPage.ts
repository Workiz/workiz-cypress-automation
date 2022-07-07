export class ClientPage {

    constructor() {
        this.setClientIdAsAlias();
    }

        setClientIdAsAlias() {
        cy.location('href').should('contains', 'client').then((fullUrl) => { 
        const clientId = fullUrl.split('/')[5];
        cy.wrap(clientId).as('clientId');
        });
      }
}