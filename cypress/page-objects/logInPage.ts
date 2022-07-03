import { HomePage } from "./homePage";

export class LogInPage {

    logIn(email: string, pwd: string):HomePage {
        cy.get('#email').type(email);
        cy.get('#password').type(pwd);
        cy.get('.button._loginBtn.signSubmit').click();
        return new HomePage;
    }
}