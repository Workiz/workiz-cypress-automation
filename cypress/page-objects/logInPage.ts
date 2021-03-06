import { HomePage } from "./homePage";
import { ResetPasswordPage } from "./resetPasswordPage";

export class LogInPage {
    logInWithAccount6(): HomePage {
        cy.visit('');
        let email = Cypress.env("email6");
        let pwd = Cypress.env("password6");
        return this.logIn(email,pwd);
    }

    logInWithAccount1(): HomePage {
        cy.visit('');
        let email = Cypress.env("email");
        let pwd = Cypress.env("password");
        return this.logIn(email,pwd);
    }

    logInWithAccount2(): HomePage {
        cy.visit('');
        let email = Cypress.env("email2");
        let pwd = Cypress.env("password2");
        return this.logIn(email,pwd);
    }

    logInWithAccount3(): HomePage {
        cy.visit('');
        let email = Cypress.env("email3");
        let pwd = Cypress.env("password3");
        return this.logIn(email,pwd);
    }

    logIn(email: string, pwd: string): HomePage {
        cy.get('#email').type(email);
        cy.get('#password').type(pwd);
        cy.get('.button._loginBtn.signSubmit').click();
        return new HomePage;
    }

    forgotPassword() {
        cy.get('._mt > ._pink').click();
        return new ResetPasswordPage;
    }
}