const { defineConfig } = require('cypress')
const fs = require("fs-extra");
const path = require("path");

const fetchConfigurationByFile = file => {
  const pathOfConfigurationFile = `config/cypress.${file}.json`;

  return (
    file && fs.readJson(path.join(__dirname, "/cypress/", pathOfConfigurationFile))
  );
};

export default defineConfig({
  e2e: {
    specPattern: "cypress/tests/**/*/*.spec.{js,jsx,ts,tsx}",
    viewportWidth: 1280,
    viewportHeight: 800,
    "retries": {
      "runMode": 1,
      "openMode": 1
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const environment = config.env.configFile || "development";
      const configurationForEnvironment = fetchConfigurationByFile(environment);
    
      return configurationForEnvironment || config;
      
    },
  },
});
