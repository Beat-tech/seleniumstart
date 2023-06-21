const { Builder, By, until } = require('selenium-webdriver');

async function runScript() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://www.liferay.com/es/');

    // Esperar hasta que se encuentre el botón de aceptar
    const button = await driver.wait(until.elementLocated(By.id('onetrust-accept-btn-handler')), 10000);

    // Hacer clic en el botón de aceptar
    await button.click();

    const title = await driver.getTitle();
    console.log('El título de la página es:', title);

    // Expresión regular para verificar el título esperado
    const expectedTitleRegex = /Software de Experiencias Digitales a medida/;

    if (expectedTitleRegex.test(title)) {
      console.log('El título es el esperado.');
    } else {
      console.log('El título no es el esperado.');
    }

    await driver.sleep(5000);
  } finally {
    await driver.quit();
  }
}

runScript();