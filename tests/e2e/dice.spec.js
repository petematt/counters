import { test, expect } from './fixtures.js';

const trayDie = (page, sides) => page.locator(`.dice-tray-btn[data-sides="${sides}"]`);
const arena = (page) => page.locator('#dice-arena');
const emptyHint = (page) => page.locator('#dice-empty-hint');
const arenaDice = (page) => page.locator('#dice-arena .die-chip');
const rollSet = (page, key) => page.locator(`.dice-roll-set[data-roll-set="${key}"]`);
const resultCard = (page) => page.locator('#dice-result-card');
const resultTotal = (page) => page.locator('#dice-result-total');
const rerollBtn = (page) => page.locator('#btn-roll-action');
const clearBtn = (page) => page.locator('#btn-dice-clear');
const modeBtn = (page, mode) => page.locator(`.dice-mode-btn[data-dice-mode="${mode}"]`);

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-tab-btn="dice"]').click();
});

test('shows empty helper text, 8 3D dice types, and disabled controls initially', async ({ page }) => {
  await expect(page.locator('.dice-tray-btn')).toHaveCount(8);
  for (const sides of [2, 4, 6, 8, 10, 12, 20, 100]) {
    await expect(trayDie(page, sides)).toBeVisible();
  }
  await expect(emptyHint(page)).toBeVisible();
  await expect(emptyHint(page)).toHaveText('Tap a die to roll it');
  await expect(rerollBtn(page)).toHaveText('Reroll');
  await expect(rerollBtn(page)).toBeDisabled();
  await expect(clearBtn(page)).toBeDisabled();
  await expect(resultCard(page)).not.toHaveClass(/rolled/);
  await expect(resultTotal(page)).toHaveText('—');
});

test('tapping a die rolls it immediately into the single arena and updates the live total', async ({ page }) => {
  await trayDie(page, 6).click();

  await expect(emptyHint(page)).toBeHidden();
  await expect(resultCard(page)).toHaveClass(/rolled/);
  await expect(arenaDice(page)).toHaveCount(1);
  await expect(resultTotal(page)).toHaveText(/^[1-6]$/);
  await expect(rerollBtn(page)).toBeEnabled();
  await expect(clearBtn(page)).toBeEnabled();

  const firstVal = Number(await resultTotal(page).textContent());
  await trayDie(page, 20).click();
  await expect(arenaDice(page)).toHaveCount(2);
  const secondTotal = Number(await resultTotal(page).textContent());
  expect(secondTotal).toBeGreaterThanOrEqual(firstVal + 1);
  expect(secondTotal).toBeLessThanOrEqual(firstVal + 20);

  // Reroll keeps the same pool size and stays rolled
  await rerollBtn(page).click();
  await expect(rerollBtn(page)).toBeEnabled();
  await expect(arenaDice(page)).toHaveCount(2);
  await expect(resultCard(page)).toHaveClass(/rolled/);
});

test('coin (d2) immediately displays H/2 or T/1 and counts as 2 or 1', async ({ page }) => {
  await trayDie(page, 2).click();

  await expect(arenaDice(page)).toHaveCount(1);
  const faceText = await arenaDice(page).first().locator('.die-face-text').textContent();
  expect(['H/2', 'T/1']).toContain(faceText);
  await expect(resultTotal(page)).toHaveText(faceText === 'H/2' ? '2' : '1');
});

test('tapping a die removes it and recalculates the total; Clear empties the arena', async ({ page }) => {
  await trayDie(page, 6).click();
  await trayDie(page, 10).click();
  await expect(arenaDice(page)).toHaveCount(2);

  // Remove first die -> total matches remaining die
  await arenaDice(page).first().click();
  await expect(arenaDice(page)).toHaveCount(1);
  const remainingFace = await arenaDice(page).first().locator('.die-face-text').textContent();
  await expect(resultTotal(page)).toHaveText(remainingFace);

  // Clear empties the arena and resets controls
  await clearBtn(page).click();
  await expect(arenaDice(page)).toHaveCount(0);
  await expect(emptyHint(page)).toBeVisible();
  await expect(resultCard(page)).not.toHaveClass(/rolled/);
  await expect(resultTotal(page)).toHaveText('—');
  await expect(rerollBtn(page)).toBeDisabled();
  await expect(clearBtn(page)).toBeDisabled();
});

test('Best of two and Worst of two show both rolls with the non-selected set greyed out and persist mode', async ({ page }) => {
  await modeBtn(page, 'best').click();
  await expect(modeBtn(page, 'best')).toHaveAttribute('aria-checked', 'true');

  await trayDie(page, 6).click();
  await trayDie(page, 20).click();

  await expect(arena(page)).toHaveClass(/is-dual/);
  await expect(rollSet(page, 'A')).toBeVisible();
  await expect(rollSet(page, 'B')).toBeVisible();
  await expect(rollSet(page, 'A').locator('.die-chip')).toHaveCount(2);
  await expect(rollSet(page, 'B').locator('.die-chip')).toHaveCount(2);
  await expect(page.locator('.dice-roll-set.is-selected')).toHaveCount(1);
  await expect(page.locator('.dice-roll-set.is-discarded')).toHaveCount(1);

  const sumA = Number(await rollSet(page, 'A').locator('.dice-roll-set-sum').textContent());
  const sumB = Number(await rollSet(page, 'B').locator('.dice-roll-set-sum').textContent());
  await expect(resultTotal(page)).toHaveText(String(Math.max(sumA, sumB)));

  // Switching to Worst of two keeps both sets and selects the lower sum
  await modeBtn(page, 'worst').click();
  await expect(resultTotal(page)).toHaveText(String(Math.min(sumA, sumB)));

  // Removing a die from either set removes it from both sets
  await rollSet(page, 'A').locator('.die-chip').first().click();
  await expect(rollSet(page, 'A').locator('.die-chip')).toHaveCount(1);
  await expect(rollSet(page, 'B').locator('.die-chip')).toHaveCount(1);

  // Mode persists across reload while arena resets to empty
  await page.reload();
  await page.locator('[data-tab-btn="dice"]').click();
  await expect(modeBtn(page, 'worst')).toHaveAttribute('aria-checked', 'true');
  await expect(arenaDice(page)).toHaveCount(0);
});

test('dice resize dynamically by count tier and scale up on larger viewports', async ({ page }) => {
  await trayDie(page, 6).click();
  const area = page.locator('#dice-arena .dice-area').first();
  await expect(area).toHaveAttribute('data-count-tier', 'lg');
  const largeWidth = (await arenaDice(page).first().boundingBox()).width;

  for (let i = 0; i < 6; i++) {
    await trayDie(page, 6).click();
  }
  await expect(area).toHaveAttribute('data-count-tier', 'sm');
  const smallWidth = (await arenaDice(page).first().boundingBox()).width;
  expect(smallWidth).toBeLessThan(largeWidth);

  // Clear and verify a single die scales larger on desktop than on phone
  await clearBtn(page).click();
  await page.setViewportSize({ width: 375, height: 667 });
  await trayDie(page, 20).click();
  const phoneDieWidth = (await arenaDice(page).first().boundingBox()).width;

  await page.setViewportSize({ width: 1280, height: 900 });
  const desktopDieWidth = (await arenaDice(page).first().boundingBox()).width;
  expect(desktopDieWidth).toBeGreaterThan(phoneDieWidth);
});
