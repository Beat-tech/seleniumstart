const { Builder } = require('selenium-webdriver');

async function runScript() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('https://www.example.com');
      const title = await driver.getTitle();
      console.log('El título de la página es:', title);
    } finally {
      await driver.quit();
    }
  }

  runScript();