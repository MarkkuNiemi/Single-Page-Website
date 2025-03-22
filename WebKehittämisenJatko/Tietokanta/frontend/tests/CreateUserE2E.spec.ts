import { test, expect } from '@playwright/test';

// Sovelluksen osoite
const appAddress = 'http://localhost:5173';

test('Käyttäjän lisääminen listaan', async ({ page }) => {
    // Luo satunnaiset nimi- ja osoitetiedot
    const name = 'User_' + Math.random().toString(36).substring(7);
    const address = 'Address_' + Math.random().toString(36).substring(7);
    const phone = '123456789';

    // Mene sovellukseen
    await page.goto(appAddress);

    // Täytä lomake
    await page.fill('input[placeholder="Name"]', name);
    await page.fill('input[placeholder="Address"]', address);
    await page.fill('input[placeholder="Phone"]', phone);

    // Lähetä lomake
    await page.click('button:has-text("Create")');

    // Odota, että uusi käyttäjä ilmestyy listaan
    await page.waitForSelector('li');

    // Hae viimeksi lisätty käyttäjä
    const lastUser = page.locator('li').last();

    // Varmista, että käyttäjä näkyy listassa oikeilla tiedoilla
    await expect(lastUser).toContainText(name);
    await expect(lastUser).toContainText(address);
    await expect(lastUser).toContainText(phone);

    //Huom! JOS HALUAT TESTIIN PAUSE-OMINAUSUUDEN LISÄÄ await page.pause(); TOIMINNON JÄLKEEN
});
