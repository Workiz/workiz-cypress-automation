export class SQLQueries {
    static getInvitationHashByEmail() {
        const query = `SELECT hash_id from sendajobprod.requests where id=4672;`;
        cy.task("queryDb", query).as('res').then(() => {
            console.log("This is result!!!: ",cy.get('@res'))
        }) 
    }
}

