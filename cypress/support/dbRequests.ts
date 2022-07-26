export class SQLQueries {

    static checkIfBodyMessageSent(email: string, message: string) {
        const envVars:Object = Cypress.env("db")
        const query = `select message_plain from sendajobprod.accounts as acc join sendajobprod.messages_log as mes on acc.id = mes.account_id where email_address = '${email}' and via = 'email' order by timestamp desc limit 1;`;
        cy.task("queryDb", {query, envVars}).then((res) => {
            return res;
        }).then((res) => {
            cy.wrap(res[0].message_plain).as('message');
        }).then(() => {
           cy.get('@message').then((mssDB) => {
                let messageDB = mssDB.toString();
                expect(messageDB).to.contain(message);
           });
        });
    }

    static getInvitationHashByEmail(email:string) {
        const envVars:Object = Cypress.env("db")
        console.log("DB from DB REQUEST: ", envVars)
        const query = `SELECT requests.hash_id from sendajobprod.requests INNER JOIN sendajobprod.users ON users.id = JSON_UNQUOTE(JSON_EXTRACT(settings,'$.user_id')) where lower(email_address) = lower('${email}') order by requests.created desc limit 1;`;
        cy.task("queryDb", {query, envVars}).then((res) => {
           return res;
        }).then((res) => {
            cy.wrap(res[0].hash_id).as('hash');
        }
        )
    }
}

