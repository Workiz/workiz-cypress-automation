const { defineConfig } = require('cypress')
const fs = require("fs-extra");
const path = require("path");
const mysql = require("mysql");
require("dotenv").config();

let fetchConfigurationByFile = file => {
  const pathOfConfigurationFile = `config/cypress.${file}.json`;

  return (
    file && fs.readJson(path.join(__dirname, "/cypress/", pathOfConfigurationFile))
  );
};

function queryTestDb(query,envVars) {
  //const config1 =  configurationForEnvironment;
  console.log("This is ENV_VAR!!!!!: ",envVars);
  const connection = mysql.createConnection(envVars);
      // "host": "104.198.246.80",
      // "port": "3306",
      // "user": "g1_usr",
      // "password": "KYrf<9G/wHqh92gn",
      // "database": "sendajobprod"
      console.log("This is ENV_VAR: ",envVars);

  connection.connect();

  return new Promise((resolve,reject) => {
    connection.query(query,(error,results) => {
      if(error) reject(error);
      else{
        connection.end(); 
        console.log("results!:",(results[0].hash_id));     
        return resolve(results);
      } 
    });
  });
}
export default defineConfig({
  e2e: {
    specPattern: "cypress/tests/**/*/*.spec.{js,jsx,ts,tsx}",
    viewportWidth: 1280,
    viewportHeight: 800,
    "retries": {
      "runMode": 1,
      "openMode": 0
    },
    "videoUploadOnPasses": false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        queryDb: ({query,envVars}) => {
          // const environment = config.env.configFile || "development";
          // const configuForEnvironment = fetchConfigurationByFile(environment)
          // configuForEnvironment.then((result) => {
          //   let confCon = result.env.db;
            console.log('query ', query);
            console.log("envVars on task ", envVars)
            return queryTestDb(query,envVars);
          // })                 
        },
      })
      const environment = config.env.configFile || "development";
      const configurationForEnvironment = fetchConfigurationByFile(environment);
      return configurationForEnvironment || config;   
    },
  },
});
