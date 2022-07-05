export class SQLQueries {
    static getInvitationHashByEmail(email: string) {
        cy.task("queryDb", "SELECT requests.hash_id from requests desc limit 1;").then((result) => {
            console.log(result);
        })

    }

}