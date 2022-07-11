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
  const connection = mysql.createConnection(envVars);
  connection.connect();

  return new Promise((resolve,reject) => {
    connection.query(query,(error,results) => {
      if(error) reject(error);
      else{
        connection.end();    
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
    pageLoadTimeout: 10000,
    "retries": {
      "runMode": 1,
      "openMode": 0
    },
    userAgent: "workiz-automation-user-agent",
    "videoUploadOnPasses": false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        queryDb: ({query,envVars}) => {
            return queryTestDb(query,envVars);               
        },
      })
      const environment = config.env.configFile || "development";
      const configurationForEnvironment = fetchConfigurationByFile(environment);
      return configurationForEnvironment || config;   
    },
  },
});
