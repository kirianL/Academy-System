import { chromium } from "playwright";

const outDir =
  "C:/Users/Kirian/.gemini/antigravity/brain/42370fe8-5b20-478b-b0b6-37e4ce7f824b";

async function runAudit() {
  const consoleErrors = [];
  const pageErrors = [];

  const browser = await chromium.launch({ channel: "chrome", headless: true });

  // 1. Desktop Viewport (1440 x 1450)
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1450 },
    deviceScaleFactor: 2,
  });

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => {
    pageErrors.push(err.message);
  });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });
  await page.waitForTimeout(900);

  // Screenshot 1: Full Desktop Dashboard (1440px)
  await page.screenshot({
    path: `${outDir}/1_desktop_full_1440.png`,
    fullPage: true,
  });

  // Screenshot 2: Sidebar Expanded with Institution & Cycle Switcher Open
  await page
    .getByRole("button", { name: "Cambiar institución o periodo lectivo" })
    .click();
  await page.waitForTimeout(350);
  await page.screenshot({
    path: `${outDir}/2_sidebar_switcher_open.png`,
    clip: { x: 0, y: 0, width: 1440, height: 820 },
  });
  // Close switcher
  await page
    .getByRole("button", { name: "Cambiar institución o periodo lectivo" })
    .click();
  await page.waitForTimeout(250);

  // Screenshot 3: Sidebar Collapsed (72px rail)
  await page.getByRole("button", { name: "Contraer barra lateral" }).click();
  await page.waitForTimeout(350);
  await page.screenshot({
    path: `${outDir}/3_sidebar_collapsed.png`,
    clip: { x: 0, y: 0, width: 1440, height: 860 },
  });
  // Expand sidebar back
  await page.getByRole("button", { name: "Expandir barra lateral" }).click();
  await page.waitForTimeout(350);

  // Screenshot 4: Hover & Active States + Methodological Tooltip + Segmented Period Switch (SlotText roll)
  await page.getByRole("tab", { name: "Trimestral" }).click();
  await page.waitForTimeout(450);
  const infoBtn = page.getByRole("button", {
    name: "Información metodológica del indicador",
  });
  await infoBtn.hover();
  await infoBtn.focus();
  await page.waitForTimeout(350);
  await page.screenshot({
    path: `${outDir}/4_hover_tooltip_and_visualizations.png`,
    clip: { x: 250, y: 115, width: 1180, height: 650 },
  });
  // Reset back to Mensual
  await page.getByRole("tab", { name: "Mensual" }).click();
  await page.waitForTimeout(350);

  // Screenshot 5: Omnibar with Multiple Selected Filters + Open Filter Popover
  const addFilterBtn = page.getByRole("button", { name: "Filtro", exact: true });
  await addFilterBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  await addFilterBtn.click();
  await page.waitForTimeout(250);
  await page
    .getByRole("button", { name: /Educación Diversificada/i })
    .click();
  await page.waitForTimeout(250);
  await addFilterBtn.click();
  await page.waitForTimeout(250);
  await page.getByRole("button", { name: /II Trimestre 2026/i }).click();
  await page.waitForTimeout(250);
  // Open popover again so screenshot shows both multiple tokens + popover menu
  await addFilterBtn.click();
  await page.waitForTimeout(350);
  const omnibarSection = page.locator(
    'section[aria-label="Flujo de trabajo académico y cierre de actas"]'
  );
  await omnibarSection.screenshot({
    path: `${outDir}/5_omnibar_multi_filters.png`,
  });
  // Close popover
  await addFilterBtn.click();
  await page.waitForTimeout(250);

  // Screenshot 6: Command Palette Open (Ctrl + K)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.keyboard.press("Control+k");
  await page.waitForTimeout(350);
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(150);
  await page.screenshot({
    path: `${outDir}/6_command_palette_open.png`,
    clip: { x: 0, y: 0, width: 1440, height: 860 },
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);

  // Screenshot 9: Mantra Projects Section + Smooth Modal Open
  const mantraSection = page.locator(
    'section[aria-label="Proyectos y programas institucionales"]'
  );
  await mantraSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await mantraSection.screenshot({
    path: `${outDir}/9_mantra_projects_section.png`,
  });

  // Open Smooth Modal ("Nuevo Registro")
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.getByRole("button", { name: /Nuevo Registro/i }).click();
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `${outDir}/10_smooth_modal_open.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);

  // Screenshot 11: Communications Inbox View (Exact Reference Image 1:1)
  await page.getByRole("tab", { name: /Comunicaciones/i }).click();
  await page.waitForTimeout(600);
  await page.screenshot({
    path: `${outDir}/11_communications_inbox_1440.png`,
    clip: { x: 0, y: 0, width: 1440, height: 1000 },
  });

  // Screenshot 12: Communications Compose Floating Window Open
  await page.getByRole("button", { name: "Compose" }).click();
  await page.waitForTimeout(600);
  const composer = page.locator("div.pointer-events-auto").last();
  await composer.screenshot({
    path: `${outDir}/12_communications_compose_modal.png`,
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);

  // Widescreen Ultrawide Viewport (1920 x 1080) to verify 3-panel layout and full space utilization
  const widePage = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });
  await widePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await widePage.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });
  await widePage.getByRole("tab", { name: /Comunicaciones/i }).click();
  await widePage.waitForTimeout(600);
  await widePage.screenshot({
    path: `${outDir}/13_communications_widescreen_1920.png`,
  });
  await widePage.getByRole("tab", { name: /Dashboard/i }).click();
  await widePage.waitForTimeout(600);
  await widePage.screenshot({
    path: `${outDir}/14_dashboard_widescreen_1920.png`,
  });
  await widePage.close();

  // 7. Mobile Viewport (390 x 844)
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  mobilePage.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  mobilePage.on("pageerror", (err) => {
    pageErrors.push(err.message);
  });

  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await mobilePage.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });
  await mobilePage.waitForTimeout(700);
  await mobilePage.screenshot({
    path: `${outDir}/7_mobile_dashboard_390.png`,
    fullPage: false,
  });

  // Screenshot 8: Mobile Navigation Drawer Open
  await mobilePage
    .getByRole("button", { name: "Abrir menú de navegación" })
    .click();
  await mobilePage.waitForTimeout(400);
  await mobilePage.screenshot({
    path: `${outDir}/8_mobile_drawer_390.png`,
    fullPage: false,
  });

  await browser.close();

  console.log(
    JSON.stringify({
      status: "SUCCESS",
      consoleErrorsCount: consoleErrors.length,
      pageErrorsCount: pageErrors.length,
      consoleErrors,
      pageErrors,
    })
  );
}

runAudit().catch((err) => {
  console.error(err);
  process.exit(1);
});
