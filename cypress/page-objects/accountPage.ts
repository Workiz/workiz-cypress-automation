export class AccountPage {

    changeRegion(region: string) {
        cy.get('h4.fieldTitle').contains('Account Region').parent().find('.react-select__single-value').invoke('text').then((accountRegion) => {
            if(accountRegion !== region) {
                cy.selectFromDropDown('attr','name="region"',region);                
                this.clickOnSaveButton();
            }
        });
    }

    clickOnSaveButton() {
        cy.get('.button').contains('Save').click();
    }

    getAccountPreferencesToggles():Cypress.Chainable<number> {
        let count = cy.get('.react-switch-slider').its('length');
        return count;
    }

    getAccountPreferencesTabs():Cypress.Chainable<number> {
       let count= cy.get('div > h4.fieldTitle').its('length');
       return count;
    }
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
