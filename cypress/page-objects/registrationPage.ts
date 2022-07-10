import { RandomFunctions } from "../support/randomFunctions";
import { HomePage } from "./homePage";
import { Constans } from "../infrastructure/consts";

export class RegistrationPage {

    fullSignUp(email: string,fullName:string): HomePage {
        this.inputEmailAndPwd(email);
        this.inputDetails(fullName);
        this.fillInAdditionalDetails();
        return this.closeExperimentModal();
    }

    inputEmailAndPwd(email: string):void {
        cy.get('#email_address').type(email);
        cy.get('#password').type("Test123!");
        cy.get('.button._loginBtn.signSubmit').click();
    }

    inputDetails(fullName: string):void {
        cy.get('#full_name').type(fullName);
        cy.get('#phone_number').type(Constans.PHONE);
        cy.get('#business_name').type(RandomFunctions.generateRandomString(5));
        cy.get('.signUpCompleting-module__sButton___3RyhP').click();
    }    

    fillInAdditionalDetails(): void {
        cy.contains('Locksmith').click();
        this.saveBtn();  
        //How many people work in your business?
        cy.contains('Just me').click();
        this.saveBtn();  
        //Facebook
        cy.get(':nth-child(1) > label').click();
        this.saveBtn();  
        cy.get('.InviteTeamMemberModal-module__container___3TGhk',{timeout:20000}).should('be.visible');
    }

    saveBtn():void {
        cy.get('.button.signUpCompleting-module__sFixedButtom___1sDA0').click();
    }

    closeExperimentModal(): HomePage {
        //invite team member
        cy.get('.InviteTeamMemberModal-module__doItLaterButton___1sCJf').click();
        //create job
        cy.get('.InviteTeamMemberModal-module__doItLaterButton___1sCJf').click();
        cy.location('href').should('contain','home'); 
        return new HomePage;
    }
}