const { Builder, By, until, Key } = require('selenium-webdriver');

async function runScript() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://www.liferay.com/es/');
    await driver.sleep(10000)
    // Esperar hasta que se encuentre el botón de aceptar
    await driver.wait(until.elementLocated(By.id('onetrust-accept-btn-handler')), 10000).click()

    // Vamos a realizar una búsqueda
    // botón lupa

   await driver.wait(until.elementLocated(By.className('search-button w-inline-block')), 10000).click()

   const searchInput = await driver.findElement(By.id('searchInput'),10000);

   await searchInput.sendKeys('GDPR', Key.ENTER);

   // Encontrar el segundo artículo y hacer clic en él
  // await driver.findElement(By.css('#st-nav-results-container > a:nth-child(2)'),10000).click();
   

  


    

   
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