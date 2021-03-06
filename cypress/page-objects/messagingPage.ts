import { SQLQueries } from "../support/dbRequests";

export class MessagingPage {

    isClientExistsInMessaging(clientName: string) {
        this.searchForClient(clientName);
        cy.get('.ms_scrollable-content strong').invoke('text').should('contain',clientName);
    }

    searchForClient(clientName: string) {
        cy.get('.messaging-module__flex_align_end___3VB42 img:nth-child(1)').click();
        cy.get('input[placeholder="Search everything..."').type(clientName);
        cy.get('._smalMenuMsgFirst').should('have.length.greaterThan',0);

    }

    sendSmsToClient(clientName: string, smsMessage: string) {
        this.openConversationWithClient(clientName);
        this.setTheMessage(smsMessage);
        this.clickDefaultSendOption();
    }

    isBodyMessageSent(email: string, message: string,via: string) {
        cy.wait(5000);
        SQLQueries.checkIfBodyMessageSent(email,message,via);
    }

    sendEmailToClient(clientName: string, emailMessage: string) {
        this.openConversationWithClient(clientName);
        this.sendEmail(emailMessage);
    }

    private openConversationWithClient(clientName: string) {
        this.openSearchContactSearchField();
        this.chooseTheClient(clientName);
    }

    openSearchContactSearchField() {
        cy.get('span').contains('New message').click( {timeout: 6000} );
    }

    chooseTheClient(clientName: string) {
        cy.get('#_searchContact').click( {timeout: 6000} ).type(clientName);
        let clientValueToChooseFromDropDown = cy.get('a span strong').contains(clientName,{matchCase:false});
        clientValueToChooseFromDropDown.click();
    }

    sendEmail(emailMessage: string) {
        this.setTheMessage(emailMessage);
        this.chooseToSendViaEmail();
    }

    private setTheMessage(emailMessage: string) {
        cy.get('.textarea').type(emailMessage);
    }

    private chooseToSendViaEmail() {
        cy.get('.lnr-chevron-up').click();
        cy.get('div._popMenu li a').contains('Email').click();
    }

    private clickDefaultSendOption() {
        cy.get('.button .mobile-hide').click()
    }
}