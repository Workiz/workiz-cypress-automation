import { SQLQueries } from "../support/dbRequests";

export class MessagingPage {

    isBodyMessageSent(email: string, message: string) {
        cy.wait(5000);
        SQLQueries.checkIfBodyMessageSent(email,message);
    }

    sendEmailToClient(clientName: string, emailMessage: string) {
        this.openConversationWithClient(clientName);
        this.sendEmail(emailMessage);
    }

    openConversationWithClient(clientName: string) {
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

    setTheMessage(emailMessage: string) {
        cy.get('.textarea').type(emailMessage);
    }

    chooseToSendViaEmail() {
        cy.get('.lnr-chevron-up').click();
        cy.get('div._popMenu li a').contains('Email').click();
    }
}