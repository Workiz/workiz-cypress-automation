export class AccountPage {
    getCompanyName() {
        cy.get('#account_name').invoke('attr', 'value').then((accountName) => {
            cy.wrap(accountName).as('companyName');
        })
    }

    getFirstName() {
        cy.get('#owner_first').invoke('attr', 'value').then((ownerName) => {
            cy.wrap(ownerName).as('firstName');
        })
    }

    getLastName() {
        cy.get('#owner_last').invoke('attr', 'value').then((ownerLastName) => {
            cy.wrap(ownerLastName).as('ownerLastName');
        })
    }

    getCompanyEmail() {
        cy.get('#email_address').invoke('attr', 'value').then((companyEmail) => {
            cy.wrap(companyEmail).as('companyEmail');
        })
    }

    getAccountDetails() {
        this.getCompanyName();
        this.getFirstName();
        this.getLastName();
        this.getCompanyEmail();
    }
}