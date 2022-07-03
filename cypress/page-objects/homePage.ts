
export class HomePage {

    getAccountUserName(){
        cy.openSettingsMenu();
        cy.get('._popMenu._right .pName').then(elem => {
           let user =  elem.text().trim(); 
           console.log(user);           
        })

    }  
}