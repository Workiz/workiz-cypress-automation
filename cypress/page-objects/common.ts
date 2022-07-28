export class CommonOps {

    checkThatStatusIsClockedInOut(clock: string) {
        cy.openSettingsMenu();
        cy.get('.pName img').invoke('attr','src').then((clockStatus) => {
            let clockSt = clockStatus.toString().split('/');
            if(clockSt[6] == clock){
                cy.get('#title-bar').click();    
                cy.openSettingsMenu();
                cy.get('.pName img').click();
                this.clickOnClockInOutModalButton();
            }
            else
            {
                cy.get('#title-bar').click();    
            }                  
        });
    }

    clockOut() {
        this.checkThatStatusIsClockedInOut("clockRed.svg")
        cy.openSettingsMenu();
        cy.get('.pName img').click();
        cy.get('div.addNewModal').find('div').contains('Clocked in since');
        cy.get('.mid-margin-bottom > .button').invoke('text').then((button) => {
            let clockInButton = button.toString();
            if(clockInButton == "Clock Out") 
            {
                this.clickOnClockInOutModalButton();
            }
        });
    }

    clockIn() {
        this.checkThatStatusIsClockedInOut("clockGreen.svg");
        cy.openSettingsMenu();
        cy.get('.pName img').click();
        cy.get('div.addNewModal').find('div').contains('Currently clocked out');
        cy.get('.mid-margin-bottom > .button').invoke('text').then((button) => {
            let clockInButton = button.toString();
            console.log("button inside clock in func",clockInButton);

            if(clockInButton == "Clock in") 
            {
                console.log("button inside clock in func in if",clockInButton);

                this.clickOnClockInOutModalButton();
            }
        });
    }

    clickOnClockInOutModalButton() {
        cy.get('.mid-margin-bottom > .button').click();
        cy.waitForToasterToDisappear();
    }

    getClockIconStatus() {
        cy.openSettingsMenu();
        cy.get('.pName img').invoke('attr','src').then((src) => {
            cy.wrap(src).as('clockStatus');
            cy.get('#title-bar').click();
        });
    }
    minimizeLeftMenu() {
        cy.get('#open-menu').click();
        cy.get('.small-menu').should('be.visible');
    }

    checkLinksWorksOnAsideMenuMinimized() {
            this.checkMinimizedAddNewButtonWork(); 
            this.checkMinimizedSchduleLink();
            this.checkMinimizedCallsLink(); 
            this.checkMinimizedClientLink(); 
            this.checkMinimizedJobsLink(); 
            this.checkMinimizedInvoicesLink(); 
            this.checkMinimizedEstimatesLink(); 
            this.checkMinimizedLeadLink(); 
            this.checkMinimizedTeamLink(); 
            this.checkMinimizedReportsLink();
    }


    private checkMinimizedAddNewButtonWork() {
        let addNewButton = cy.get('.MainCta__smallMenu___JlcgO').should('be.visible');
        addNewButton.click();
        let addModalElement = cy.get('.AddNewItemMenu__smallMenu___2BZRf');
        addModalElement.should('be.visible');
        cy.reload();
    }

    private checkMinimizedSchduleLink() {
       cy.get('.small-menu .lnr-calendar-full').click();
       cy.location('href').should('contain','root/schedule');
    }

    private checkMinimizedCallsLink() {
        cy.get('.small-menu .lnr-telephone').click();
        cy.location('href').should('contain','root/callsReport');
    }

    private checkMinimizedClientLink() {
        cy.get('.small-menu .lnr-users2').click();
        cy.location('href').should('contain','root/clients');
    }

    private checkMinimizedJobsLink() {
        cy.get('.small-menu .lnr-hammer-wrench').click();
        cy.location('href').should('contain','root/jobs');
    }

    private checkMinimizedInvoicesLink() {
        cy.get('.small-menu .lnr-receipt').click();
        cy.location('href').should('contain','root/invoices');
    }

    private checkMinimizedEstimatesLink() {
        cy.get('.small-menu .lnr-paperclip').click();
        cy.location('href').should('contain','root/estimates');
    }

    private checkMinimizedLeadLink() {
        cy.get('.small-menu .lnr-cash-dollar').click();
        cy.location('href').should('contain','root/leads');
    }

    private checkMinimizedTeamLink() {
        cy.get('.small-menu .lnr-group-work').click();
        cy.location('href').should('contain','root/team');
    }

    private checkMinimizedReportsLink() {
        cy.get('.small-menu .lnr-graph').click();
        cy.location('href').should('contain','root/reports/');
    }
}