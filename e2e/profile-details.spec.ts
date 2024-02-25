import { test, expect } from '@playwright/test';

// TODO: these tests cover only happy cases, write tests for error cases as well
test.describe('Profile Details page', () => {
  test('display correct user data', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await expect(page.getByRole('link', { name: 'CoolChatX' })).toBeVisible();
    await expect(page.getByLabel('Switch to dark mode')).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'My Profile' })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Edit' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Email' })).toBeVisible();
    await expect(page.getByText('olivia.davis@havi.com')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bio' })).toBeVisible();
    await expect(page.getByText('Senior Product Manager at')).toBeVisible();
  });

  test('switch to dark mode correctly', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await expect(page.getByRole('link', { name: 'CoolChatX' })).toBeVisible();
    await expect(page.getByLabel('Switch to dark mode')).toBeVisible();

    await page.getByLabel('Switch to dark mode').click();
    await expect(page.getByLabel('Switch to light mode')).toBeVisible();
  });

  test('go to Update Profile page', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await expect(page.getByRole('link', { name: 'CoolChatX' })).toBeVisible();

    await page.getByRole('link', { name: 'Edit' }).click();
    await expect(
      page.getByRole('heading', { name: 'Update Profile' })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByPlaceholder('Enter your bio')).toContainText(
      'Senior Product Manager at Havi. Passionate about creating exceptional digital experiences. In my free time, I enjoy hiking and experimenting with new recipes.'
    );
    await expect(page.getByPlaceholder('Enter your email')).toHaveValue(
      'olivia.davis@havi.com'
    );
    await expect(page.getByPlaceholder('Enter your name')).toHaveValue(
      'Olivia Davis'
    );
    await expect(
      page.locator('div').filter({ hasText: /^Save$/ })
    ).toBeVisible();
  });

  test('update user profile', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await expect(page.getByRole('link', { name: 'CoolChatX' })).toBeVisible();

    await page.getByRole('link', { name: 'Edit' }).click();
    await expect(
      page.getByRole('heading', { name: 'Update Profile' })
    ).toBeVisible();

    await page.getByPlaceholder('Enter your bio').clear();

    await page.getByPlaceholder('Enter your bio').fill('Updated bio.');

    await page.getByRole('button', { name: 'Save' }).click();

    await expect(
      page.getByText('Your profile has been updated.')
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Go to profile page' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Go to profile page' }).click();
    await expect(
      page.getByRole('heading', { name: 'My Profile' })
    ).toBeVisible();

    await expect(page.getByText('Updated bio.')).toBeVisible();
  });
});
