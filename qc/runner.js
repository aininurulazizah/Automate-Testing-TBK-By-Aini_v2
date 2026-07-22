import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function buildCommand(clients, scenarios, browser, mode = "headed", options = {}) {
  const grepParts = [];

  for (const client of clients) {
    for (const scenario of scenarios) {
      if (!scenario.supports(client)) {
        continue;
      }
      grepParts.push(`${client.tag}.*${scenario.grep}`);
    }
  }

  const grep = grepParts.join("|");
  const modeFlag = mode === "headed" ? " --headed" : "";
  const workersFlag = options.workers ? ` --workers=${options.workers}` : " --workers=1";
  const retriesFlag = options.retries && options.retries > 0 ? ` --retries=${options.retries}` : "";

  return `npx playwright test --project="${browser}"${modeFlag}${workersFlag}${retriesFlag} --grep "${grep}"`;
}

export function getMatchingTestsBreakdown(selectedClients, selectedScenarios) {
  let totalMatchingTests = 0;
  const lines = [];

  for (const client of selectedClients) {
    const supported = selectedScenarios.filter(s => s.supports(client));
    if (supported.length > 0) {
      lines.push(`│ 🔹 ${client.name}`);
      for (const scenario of supported) {
        lines.push(`│    ✓ ${scenario.name}`);
        totalMatchingTests++;
      }
      lines.push("│");
    }
  }

  if (lines.length > 0 && lines[lines.length - 1] === "│") {
    lines.pop();
  }

  return {
    totalMatchingTests,
    lines,
    formatted: lines.length > 0 ? lines.join("\n") : "│    (No matching tests found)",
  };
}

export function runCommand(command, options = {}) {
  const startTime = Date.now();
  const targetEnv = options.env || "staging";
  console.log(`\n🚀 Executing Playwright Test Suite [Environment: ${targetEnv}]...\n`);

  let exitCode = 0;
  let success = true;

  try {
    execSync(command, {
      stdio: "inherit",
      env: {
        ...process.env,
        ENV: targetEnv,
      },
    });
  } catch (error) {
    success = false;
    exitCode = error.status ?? 1;
  }

  const durationMs = Date.now() - startTime;
  const durationSec = (durationMs / 1000).toFixed(2);

  console.log("\n" + "─".repeat(60));
  if (success) {
    console.log(`✅ TEST RUN COMPLETED SUCCESSFULLY | Environment: ${targetEnv} | Duration: ${durationSec}s`);
  } else {
    console.log(`❌ TEST RUN COMPLETED WITH FAILURES | Environment: ${targetEnv} | Exit Code: ${exitCode} | Duration: ${durationSec}s`);
  }
  console.log("─".repeat(60) + "\n");

  return { success, exitCode, durationSec };
}

export function openReport() {
  const reportPath = path.resolve(process.cwd(), "playwright-report");
  const reportFile = path.resolve(reportPath, "index.html");

  if (!fs.existsSync(reportPath) && !fs.existsSync(reportFile)) {
    console.log("\n⚠️ HTML Report directory not found. Run tests first to generate a report.\n");
    return;
  }

  console.log("\n📊 Opening Playwright HTML report...\n");
  try {
    execSync("npx playwright show-report", {
      stdio: "inherit",
    });
  } catch (error) {
    console.error("Failed to open Playwright HTML report:", error.message);
  }
}