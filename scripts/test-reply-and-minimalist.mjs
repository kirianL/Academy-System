import { chromium } from "playwright";

const outDir =
  "C:/Users/Kirian/.gemini/antigravity/brain/42370fe8-5b20-478b-b0b6-37e4ce7f824b";

async function runTest() {
  const consoleErrors = [];
  const pageErrors = [];

  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
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

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });
  await page.waitForTimeout(800);

  // Switch to Communications tab
  console.log("Switching to Communications tab...");
  const commsButton = page.getByRole("button", { name: "Comunicaciones 4" });
  await commsButton.click();
  await page.waitForTimeout(600);

  // Take screenshot 1: Communications widescreen overview with minimalist right panel & thread
  console.log("Capturing 15_communications_thread_overview.png...");
  await page.screenshot({
    path: `${outDir}/15_communications_thread_overview.png`,
    fullPage: false,
  });

  // Test reply composer: type text
  console.log("Testing reply composer...");
  const replyTextarea = page.locator("textarea[placeholder*='Responder a']");
  await replyTextarea.click();
  await replyTextarea.fill("Revisión completada de las especificaciones y actas institucionales.");
  await page.waitForTimeout(300);

  // Attach official file
  const attachButton = page.getByRole("button", { name: /Adjuntar/i });
  await attachButton.click();
  await page.waitForTimeout(300);

  // Send reply using Ctrl+Enter
  console.log("Sending reply with Ctrl+Enter...");
  await replyTextarea.press("Control+Enter");
  await page.waitForTimeout(800);

  // Take screenshot 2: After reply submitted, showing the new reply at the bottom of the conversation thread
  console.log("Capturing 16_communications_reply_submitted.png...");
  await page.screenshot({
    path: `${outDir}/16_communications_reply_submitted.png`,
    fullPage: false,
  });

  // Also switch to msg-4 (Valeria Mora) to show another email thread and PDF attachments
  console.log("Selecting message from Valeria Mora...");
  const valeriaItem = page.locator("button:has-text('Valeria Mora')");
  await valeriaItem.click();
  await page.waitForTimeout(600);

  console.log("Capturing 17_valeria_thread_and_minimalist.png...");
  await page.screenshot({
    path: `${outDir}/17_valeria_thread_and_minimalist.png`,
    fullPage: false,
  });

  await browser.close();

  console.log("Audit complete!");
  console.log("Console errors:", consoleErrors);
  console.log("Page errors:", pageErrors);
}

runTest().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});

