export class SQLQueries {
    static getInvitationHashByEmail(email:string) {
        const envVars:Object = Cypress.env("db")
        console.log("DB from DB REQUEST: ", envVars)
        const query = `SELECT requests.hash_id from sendajobprod.requests INNER JOIN sendajobprod.users ON users.id = JSON_UNQUOTE(JSON_EXTRACT(settings,'$.user_id')) where lower(email_address) = lower('${email}') order by requests.created desc limit 1;`;
        cy.task("queryDb", {query, envVars}).then((res) => {
            console.log("next!!", envVars)
           return res;
        }).then((res) => {
            cy.wrap(res[0].hash_id).as('hash');
        }
        )
        // .as('res').then(() => {
        //     console.log("This is result!!!: ",cy.get('@res'))
        // }) 
    }
}

