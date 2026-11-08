import { test, expect } from '@playwright/test'

const lojinha = 'https://tsvini.github.io/custo-oculto-fabrica/loja/'

test('os textos da tela de login', async ({ page }) => {
  await page.goto(lojinha)
  await expect.soft(page.getByTestId('entrar')).toHaveText('Entrar')
  await expect.soft(page.getByTestId('usuario')).toBeVisible()
  await expect.soft(page.getByTestId('senha')).toBeEmpty()
  await expect.soft(page.getByTestId('erro')).not.toBeVisible()
})
