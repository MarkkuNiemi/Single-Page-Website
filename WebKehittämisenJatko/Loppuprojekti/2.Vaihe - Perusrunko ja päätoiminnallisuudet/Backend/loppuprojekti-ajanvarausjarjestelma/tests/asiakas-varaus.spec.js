import { test, expect } from '@playwright/test';

test('Asiakas voi varata ajan ja nähdä sen varauksissaan', async ({ page }) => {
    // Avaa sovellus
    await page.goto('http://localhost:5000');

    // Valitse asiakas-rooli
    await page.getByRole('button', { name: /Asiakas/i }).click();

    // Syötä käyttäjätunnus ja salasana
    await page.getByLabel('Käyttäjätunnus').fill('pekka');
    await page.getByLabel('Salasana').fill('salasana');

    // Kirjaudu
    await page.getByRole('button', { name: /Kirjaudu/i }).click();

    // Odota että asiakasnäkymä latautuu
    await page.getByText('Vapaat ajat').waitFor({ timeout: 5000 });

    // Odota että "Varaa"-nappi löytyy ja klikkaa ensimmäistä
    const varaaBtn = page.getByRole('button', { name: 'Varaa' }).first();
    await varaaBtn.click();

    // Tarkista että "Omat varaukset" listassa näkyy jotain
    const varaukset = await page.locator('h3', { hasText: 'Omat varaukset' });
    await expect(varaukset).toBeVisible();

    const omatVarauksetOtsikko = await page.locator('h3', { hasText: 'Omat varaukset' });
    const omaLista = omatVarauksetOtsikko.locator('xpath=following-sibling::ul[1]/li');

    await expect(omaLista.first()).toContainText('klo');

});
