import { test, expect } from '@playwright/test'

const lojinha = 'https://tsvini.github.io/custo-oculto-fabrica/loja/'

test('a tela de login não mudou', async ({ page }) => {
  await page.goto(lojinha)
  await expect(page).toHaveScreenshot('login.png')
})
