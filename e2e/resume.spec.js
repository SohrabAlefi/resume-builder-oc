import { test, expect } from '@playwright/test'

test('Resume Builder loads and accepts input', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Resume Builder' })).toBeVisible()

  // Fill in name
  await page.getByTestId('input-name').fill('Sohrab Alefi')
  await expect(page.getByTestId('input-name')).toHaveValue('Sohrab Alefi')

  // Fill in title
  await page.getByTestId('input-title').fill('Software Engineer')
  await expect(page.getByTestId('input-title')).toHaveValue('Software Engineer')
})
