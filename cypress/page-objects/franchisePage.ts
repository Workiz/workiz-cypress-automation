export class FranchisePage {

    isInvitationSentAndStatusPending(email: string) {
        cy.get('#searchString').type(email);
        cy.get('.rt-tr-group.pointer').its('length').should('equal', 1);
        this.rowContainsStatus();
    }

    rowContainsStatus() {
        cy.validateTextAppearInElements('.rt-tbody .rt-td:nth-child(5)', 'Pending');
    }

    sendFranchiseInvitation(email: string) {
        this.deleteAllExistingFranchises();
        this.inviteAccount(email);
    }

    deleteAllExistingFranchises() {
        cy.wait(500);
        cy.get('.rt-tbody .rt-td:nth-child(1)').should('have.length', 5).invoke('text').then((text) => {
            if (text != '     ') {
                cy.get('.rt-tr-group.pointer').each(($el, index, $list) => {
                        cy.get('.rt-tr-group.pointer').first().click();
                        cy.get('.lnr-trash').click();
                        cy.get('.button').contains('Remove sub account').click();
                        cy.get('.toastr').should('be.visible', {
                            setTimeout: 4000
                        });
                        cy.get('.toastr').should('not.exist', {
                            setTimeout: 5000
                        });
                });
            }
        });
    }

    inviteAccount(email: string) {
        cy.get('.icon-plus').click();
        cy.get('input[name="email"]').type(email);
        this.clickSendAndCloseRightPane();
    }

    clickSendAndCloseRightPane() {
        cy.get('.button.margin-left').contains('Send').click();
        cy.get('.button.red-gradient').contains('Close').click();
    }
}