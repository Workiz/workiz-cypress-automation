export class ClientPage {
    
   // clientId: string;

    getUrl() {
        cy.location('href').should('contains', 'clients').then((text) => { 
            console.log(typeof(text));
        });
      }



}