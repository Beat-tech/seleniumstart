const { Builder, By, until } = require('selenium-webdriver');

async function runScript() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://www.liferay.com/es/');
    await driver.sleep(10000)
    // Esperar hasta que se encuentre el botón de aceptar
    await driver.wait(until.elementLocated(By.id('onetrust-accept-btn-handler')), 10000).click()

    const secciones = await driver.wait(until.elementsLocated(By.className('adt-nav-item dropdown')),10000)

    for (const seccion of secciones) {

      const textoSeccion = await seccion.getText();
      await driver.sleep(1000)
      await seccion.click();
      console.log(textoSeccion);

    }

    //Vamos a contactar con ventas
    //boton ventas
    await driver.wait(until.elementLocated(By.className('contact-sales w-button')), 10000).click();
    //Rellenar el form:
    await driver.wait(until.elementLocated(By.name('Email')), 10000).sendKeys('Bea@trabajonuevo.com');
    const dropdown = await driver.findElement(By.name('Country'));
    await clickOptionByValue(dropdown, 'Alemania');

    await driver.findElement(By.name('Contact_Sales_Comments__c')).sendKeys('Hola que tal como estas')
    const title = await driver.getTitle();
    console.log('El título de la página es:', title);
    await driver.sleep(5000)
  } finally {
   await driver.quit();
  }
}

runScript();


async function clickOptionByValue(selectElement, optionValue) {
  const options = await selectElement.findElements(By.tagName('option'));

  for (const option of options) {
    const value = await option.getAttribute('value');
    if (value === optionValue) {
      await option.click();
      return;
    }
  }

  throw new Error(`No se encontró la opción con el valor "${optionValue}"`);
}