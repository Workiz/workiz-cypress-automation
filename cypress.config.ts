const { defineConfig } = require('cypress')
const fs = require("fs-extra");
const path = require("path");
const mysql = require("mysql");

const fetchConfigurationByFile = file => {
  const pathOfConfigurationFile = `config/cypress.${file}.json`;

  return (
    file && fs.readJson(path.join(__dirname, "/cypress/", pathOfConfigurationFile))
  );
};

function queryTestDb(query,config) {
  const connection = mysql.createConnection(config.env.configFile.env.db);
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
    "retries": {
      "runMode": 1,
      "openMode": 0
    },
    "videoUploadOnPasses": false,
    setupNodeEvents(on, config) {
      const environment = config.env.configFile || "development";
      const configurationForEnvironment = fetchConfigurationByFile(environment);
      // implement node event listeners here
      on("task", {
        queryDb: query => {
          return queryTestDb(query,config)
        },
      })
      return configurationForEnvironment || config;
      
    },
    

  },
});
