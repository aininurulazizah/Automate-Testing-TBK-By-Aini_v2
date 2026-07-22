import { execSync } from "child_process";

export function buildCommand(clients, scenarios, browser, mode = "headed") {

    const grepParts = [];

    for (const client of clients) {

        for (const scenario of scenarios) {

            // Skip unsupported scenarios
            if (!scenario.supports(client)) {
                continue;
            }

            grepParts.push(`${client.tag}.*${scenario.grep}`);
        }

    }

    const grep = grepParts.join("|");

    const modeFlag = mode === "headed" ? " --headed" : "";

    return `npx playwright test --project="${browser}"${modeFlag} --workers=1 --grep "${grep}"`;
}

export function runCommand(command) {
  execSync(command, {
    stdio: "inherit",
  });
}

export function openReport() {
  console.log("\n📊 Opening Playwright HTML report...\n");
  try {
    execSync("npx playwright show-report", {
      stdio: "inherit",
    });
  } catch (error) {
    console.error("Failed to open Playwright HTML report:", error.message);
  }
}