import {RegistrationPage} from './registrationPage';

export class PageRouter {
    
    goToRegistrationPage ():RegistrationPage  {
        cy.visit('/sign/');
        cy.location().should((location) => {
            expect(location.href).to.contain('/sign/')
        });
        return new RegistrationPage();        
    }
}