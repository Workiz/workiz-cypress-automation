import {LogInPage} from "../page-objects/logInPage"

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to select DOM element by data-cy attribute.
             * @example cy.dataCy('greeting')
             */
            logOut(): void
            openSettingsMenu(): void
            selectFromDropDown(by: string, element: string, valueToChoose: string): void
            validateTextAppearInElements(selector: string, textToFind: string): void
            validateTextIsNotAppearInElements(selector: string, textToFind: string): void
            validateTextIsNotAppearInTableElements(loadTableLocator: string, selector: string, textToFind: string): void
            waitForTableLoaderSpinnerToDisappear(): void
        }
    }
}


Cypress.Commands.add('logOut', () => {
    cy.get('[data-testid="pop-menu-span"] > .lnr-cog').click();
    cy.contains('Log Out').click();

});


Cypress.Commands.add('openSettingsMenu', () => {
    cy.get('[data-testid="pop-menu-span"] > .lnr-cog', {timeout: 10000}).click({force: true});
});

Cypress.Commands.add('selectFromDropDown', (by: string, element: string, valueToChoose: string) => {
    switch (by) {
        case 'attr': {
            cy.get(`input[${element}]`).parent().find('.react-select__control').click();
            cy.get(`input[${element}]`).parent().find('[tabindex="-1"]').contains(valueToChoose).click();
            break;
        }
        case 'id': {
            cy.get(`#${element}`).parent().find('.react-select__control').click();
            cy.get(`#${element}`).parent().find('[tabindex="-1"]').contains(valueToChoose).click();
            break;
        }
        case 'class': {
            cy.get(`.${element}`).parent().find('.react-select__control').click();
            cy.get(`.${element}`).parent().find('[tabindex="-1"]').contains(valueToChoose).click();
            break;
        }
        case 'css': {
            cy.get(`${element}`).parent().find('.react-select__control').click();
            cy.get(`${element}`).parent().find('[tabindex="-1"]').contains(valueToChoose).click();
            break;
        }
    }
});

Cypress.Commands.add('validateTextAppearInElements', (selector: string, textToFind: string) => {

    let allElementsText = new Array<string>;
    cy.get(selector, {timeout: 10000}).should('contain.text', textToFind).each(($el, index, $list) => {
        allElementsText.push($el.text());
        if ($el.text() == textToFind) {
            expect($el.text()).to.be.eq(textToFind);
            return false;
        } else if (index == $list.length - 1) {
            console.log(`these are all the texts were in the elements and didnt equal to text: ${allElementsText}`)
            expect($el.text()).to.be.eq(textToFind);
        }
    })
});

Cypress.Commands.add('validateTextIsNotAppearInElements', (selector: string, textToFind: string) => {

    let allElementsText = new Array<string>;
    cy.get(selector, {timeout: 10000}).should('have.length.greaterThan', 1).each(($el, index, $list) => {
        allElementsText.push($el.text());
        if ($el.text() == textToFind) {
            expect($el.text()).to.not.be.eq(textToFind);
            return false;
        } else if (index == $list.length - 1) {
            console.log(`these are all the texts were in the elements and didnt equal to text: ${allElementsText}`)
            expect($el.text()).to.not.be.eq(textToFind);
        }
    })
});

Cypress.Commands.add('validateTextIsNotAppearInTableElements', (loadTableLocator: string ,selector: string, textToFind: string) => {
    let allElementsText = new Array<string>;
    cy.get('div', {timeout: 10000}).should('be.visible', loadTableLocator,{timeout: 10000}).then(() => {
        cy.get(selector, {timeout: 10000}).each(($el, index, $list) => {
            allElementsText.push($el.text());
            if ($el.text() == textToFind) {
                expect($el.text()).to.not.be.eq(textToFind);
                return false;
            } else if (index == $list.length - 1) {
                console.log(`these are all the texts were in the elements : ${allElementsText}`)
                expect($el.text()).to.not.be.eq(textToFind);
            }
        })
    });
});

Cypress.Commands.add('waitForTableLoaderSpinnerToDisappear', () => {
    cy.get('.ReactTable .spinnerDots', {timeout: 10000}).should('be.visible');
    cy.get('.ReactTable .spinnerDots', {timeout: 10000}).should('not.exist');
})




 