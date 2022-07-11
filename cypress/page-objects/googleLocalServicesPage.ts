import { ConstsGLI } from '../infrastructure/gliConsts'
export class GoogleLocalServicesPage {

    fillAllDetailsAndSchedule() {
        this.fillMatchYourGoogleListing();
        this.fillJobType();
        this.clickOnConnectScheduleButton();
    }

    clickOnConnectScheduleButton() {
        cy.get('.button').contains('Connect Schedule').click();
    }

    fillJobType() {
        cy.get('h5').contains('Job Types').find('span').click();
        cy.selectFromDropDown('class','bookingJobTypes-module__row___1ssl0',ConstsGLI.serviceType);  
        this.addGoogleServiceType()      
    }

    addGoogleServiceType() {
        cy.selectFromDropDown('class','bookingJobTypes-module__googleType___4Qrhz',ConstsGLI.googleServiceType);
    }

    fillMatchYourGoogleListing() {
        this.fillBusinessAddress(ConstsGLI.address);
        this.fillBusinessPhone(ConstsGLI.phone);
        this.fillBusinessCustomerId(ConstsGLI.googleId);
        this.fillBusinessWebsite(ConstsGLI.businessWebsite);
    }

    fillBusinessWebsite(businessWebsite: string) {
        cy.get('#website').type(businessWebsite);
    }

    fillBusinessCustomerId(googleId: string) {
        cy.get('#external_customer_id').type(googleId);
    }

    fillBusinessPhone(phone: string) {
        cy.get('#telephone').type(phone);
    }

    fillBusinessAddress(address: string) {
        cy.get('#geo').type(address);
    }
}