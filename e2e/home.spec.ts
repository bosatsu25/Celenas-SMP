import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home exposes honest connection details with no runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Celenas SMP | Minecraft コミュニティ");
  await expect(
    page.getByRole("heading", { level: 1, name: "Celenas SMP" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "参加案内を見る" }).click();
  await expect(page).toHaveURL(/#join$/);
  await expect(
    page.getByRole("heading", { name: "参加案内", exact: true }),
  ).toBeInViewport();
  await expect(
    page.locator("#join").getByText("サーバーアドレスは準備中です。"),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Discord へ" })).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("keyboard users can skip to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "本文へ移動" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
});

test("uses the canonical logo and keeps unconfirmed content pending", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator('img[src*="celenas-logo-white.png"]')).toHaveCount(
    2,
  );
  await expect(
    page.getByText("サーバールールは現在、管理者確認中です。"),
  ).toBeVisible();
  await expect(page.getByText("ワールドの写真は準備中です。")).toBeVisible();
  await expect(page.getByText("Moonlit base")).toHaveCount(0);
  await expect(page.getByText("Campsite")).toHaveCount(0);
  await expect(page.getByText(/チェストや保護の範囲/)).toHaveCount(0);
});

test("mobile navigation is keyboard-operable and reaches page sections", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menu = page.locator(".mobile-nav");
  await expect(menu).toBeVisible();
  await menu.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("open", "");
  await menu.getByRole("link", { name: "World" }).click();
  await expect(page).toHaveURL(/#world$/);
});

test("has no detectable WCAG AA accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("supports narrow screens and enlarged text without horizontal overflow", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `expected no horizontal overflow at ${width}px`,
    ).toBe(true);
  }
  await expect(
    page.getByRole("link", { name: "参加案内を見る" }),
  ).toBeVisible();
});

test("respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});
