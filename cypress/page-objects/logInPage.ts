import { HomePage } from "./homePage";

export class LogInPage {
    logInWithAccount2() {
        cy.visit('');
        this.logIn(Cypress.env("email2"),Cypress.env("password2"));
    }

    logIn(email: string, pwd: string):HomePage {
        cy.get('#email').type(email);
        cy.get('#password').type(pwd);
        cy.get('.button._loginBtn.signSubmit').click();
        return new HomePage;
    }
}