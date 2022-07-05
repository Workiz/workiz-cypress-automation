import { HomePage } from "./homePage";

export class LogInPage {
    logInWithAccount2() {
        cy.visit('');
        let email = Cypress.env("email2");
        let pwd = Cypress.env("password2");
        this.logIn(email,pwd);
    }

    logIn(email: string, pwd: string):HomePage {
        cy.get('#email').type(email);
        cy.get('#password').type(pwd);
        cy.get('.button._loginBtn.signSubmit').click();
        return new HomePage;
    }
}