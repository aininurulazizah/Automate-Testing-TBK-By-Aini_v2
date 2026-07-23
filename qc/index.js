import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { 
  askClients,
  askScenario, 
  askBrowser,
  askExecutionMode,
  askAdvancedOptions,
  askInitialAction,
  askPresetSelection,
  askConfirmationAction,
  askPresetName,
  askDeletePreset,
  askPostRunAction,
} from "./prompts.js";
import { buildCommand, runCommand, openReport, getMatchingTestsBreakdown } from "./runner.js";
import { clients } from "./config/clients.js";
import { scenarios } from "./config/scenarios.js";
import { 
  getLastRun, 
  saveLastRun, 
  getPresets, 
  savePreset, 
  deletePreset,
} from "./storage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function printBox(title, bodyLines, width = 64) {
  const horizontal = "─".repeat(width - 2);
  console.log(`┌${horizontal}┐`);
  
  const paddedTitle = ` ${title} `.padEnd(width - 2, " ");
  console.log(`│${paddedTitle}│`);
  console.log(`├${horizontal}┤`);

  for (const line of bodyLines) {
    const rawLine = line || "";
    const len = rawLine.length;
    const padding = Math.max(0, width - 4 - len);
    console.log(`│ ${rawLine}${" ".repeat(padding)} │`);
  }

  console.log(`└${horizontal}┘`);
}



function checkClientSync() {
  try {
    const sitesPath = path.join(__dirname, "..", "utils", "sites.js");
    const sitesContent = fs.readFileSync(sitesPath, "utf-8");
    const siteTags = [...sitesContent.matchAll(/tag:\s*['"](@\w+)['"]/g)].map(m => m[1]);
    const clientTags = new Set(clients.map(c => c.tag));

    const missing = siteTags.filter(t => !clientTags.has(t));
    if (missing.length > 0) {
      console.log("\n⚠️  SYNC WARNING: Klien baru ditemukan di utils/sites.js yang belum ada di qc/config/clients.js:");
      missing.forEach(t => console.log(`   + ${t}`));
      console.log("\n   Jalankan: npm run qc:sync\n");
    }
  } catch {
    // Silent fail — sync check is non-critical
  }
}

async function main() {
  checkClientSync();

  while (true) {
    let selectedClients = [];
    let selectedScenarios = [];
    let selectedEnv = "staging";
    let selectedBrowser = "chromium";
    let selectedMode = "headed";
    let advancedOptions = { workers: 1, retries: 0, autoOpenReport: true };
    let activePresetName = null;

    let lastRun = getLastRun();
    let presets = getPresets();

    let action = "custom";
    if (hasLastRunMenu(lastRun, presets)) {
      action = await askInitialAction({ hasLastRun: Boolean(lastRun), presets });
    }

    if (action === "exit") {
      console.log("\nGoodbye! 👋\n");
      break;
    }

    if (action === "delete_preset") {
      const presetToDelete = await askDeletePreset(presets);
      if (presetToDelete) {
        deletePreset(presetToDelete);
        console.log("\n✅ Preset deleted successfully.\n");
      }
      continue;
    }

    if (action === "last_run" && lastRun) {
      selectedClients = clients.filter(c => lastRun.clientIds.includes(c.id));
      selectedScenarios = scenarios.filter(s => lastRun.scenarioIds.includes(s.id));
      selectedEnv = lastRun.env || "staging";
      selectedBrowser = lastRun.browser || "chromium";
      selectedMode = lastRun.mode || "headed";
      advancedOptions = {
        workers: lastRun.workers ?? 1,
        retries: lastRun.retries ?? 0,
        autoOpenReport: lastRun.autoOpenReport ?? true,
      };

      if (selectedClients.length === 0 || selectedScenarios.length === 0) {
        console.log("\n⚠️ Previous selection references missing clients/scenarios. Falling back to custom selection.\n");
        action = "custom";
      }
    }

    if (action === "preset") {
      const chosenPreset = await askPresetSelection(presets);
      selectedClients = clients.filter(c => chosenPreset.clientIds.includes(c.id));
      selectedScenarios = scenarios.filter(s => chosenPreset.scenarioIds.includes(s.id));
      selectedEnv = chosenPreset.env || "staging";
      selectedBrowser = chosenPreset.browser || "chromium";
      selectedMode = chosenPreset.mode || "headed";
      advancedOptions = {
        workers: chosenPreset.workers ?? 1,
        retries: chosenPreset.retries ?? 0,
        autoOpenReport: chosenPreset.autoOpenReport ?? true,
      };
      activePresetName = chosenPreset.name;

      if (selectedClients.length === 0 || selectedScenarios.length === 0) {
        console.log("\n⚠️ Preset references missing clients/scenarios. Falling back to custom selection.\n");
        action = "custom";
      }
    }

    if (action === "custom") {
      const clientResult = await askClients([], { initialEnv: "staging" });
      selectedClients = clientResult.selectedClients;
      selectedEnv = clientResult.selectedEnv;

      selectedScenarios = await askScenario(selectedClients, []);
      selectedBrowser = await askBrowser("chromium");
      selectedMode = await askExecutionMode("headed");
    }

    // --- Confirmation Loop (allows changing advanced options before running) ---
    let confirmed = false;
    while (!confirmed) {
      const command = buildCommand(
        selectedClients,
        selectedScenarios,
        selectedBrowser,
        selectedMode,
        advancedOptions
      );

      const breakdown = getMatchingTestsBreakdown(selectedClients, selectedScenarios);
      const modeLabel = selectedMode === "headed" ? "Headed (UI Visible)" : "Headless (Background)";
      const reportLabel = advancedOptions.autoOpenReport ? "Yes (Auto-Open)" : "No";
      const presetBadge = activePresetName ? `[Preset: ${activePresetName}]` : "";
      const title = `🎭 PLAYWRIGHT QC RUNNER v1.5 ${presetBadge}`.trim();

      const bodyLines = [
        "🎯 MATCHING TESTS:",
        ...breakdown.lines.map(l => l.replace(/^│\s?/, "")),
        "",
        `📊 Total: ${breakdown.totalMatchingTests} test(s)`,
        "",
        `🏷️ ENVIRONMENT:    ${selectedEnv}`,
        `🌐 BROWSER:        ${selectedBrowser}`,
        `⚡ EXECUTION MODE: ${modeLabel}`,
        `⚙️ WORKERS:        ${advancedOptions.workers} worker(s)`,
        `🔄 RETRIES:        ${advancedOptions.retries} attempt(s)`,
        `📈 AUTO REPORT:    ${reportLabel}`,
        "─".repeat(60),
        "🚀 GENERATED COMMAND:",
        `  ${command}`,
      ];

      console.log("");
      printBox(title, bodyLines, 64);
      console.log("");

      const confirmAction = await askConfirmationAction();

      if (confirmAction === "cancel") {
        console.log("\nOperation cancelled. Returning to main menu...\n");
        confirmed = true; // exit inner loop, continue outer loop
        continue;
      }

      if (confirmAction === "advanced") {
        advancedOptions = await askAdvancedOptions(advancedOptions);
        console.log("\n✅ Advanced options updated. Refreshing summary...\n");
        continue; // re-render the summary box with updated options
      }

      if (confirmAction === "dry_run") {
        console.log("\n📋 DRY RUN - Generated Playwright Command:\n");
        console.log(`  Target Environment: ${selectedEnv}`);
        console.log(`  ${command}\n`);
        console.log("Copy and execute the command above whenever you're ready.\n");
        
        const postAction = await askPostRunAction();
        if (postAction === "exit") {
          console.log("\nGoodbye! 👋\n");
          return;
        }
        confirmed = true;
        continue;
      }

      if (confirmAction === "save_and_run") {
        const presetName = await askPresetName();
        const presetId = presetName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
        savePreset({
          id: presetId,
          name: presetName.trim(),
          clientIds: selectedClients.map(c => c.id),
          scenarioIds: selectedScenarios.map(s => s.id),
          env: selectedEnv,
          browser: selectedBrowser,
          mode: selectedMode,
          workers: advancedOptions.workers,
          retries: advancedOptions.retries,
          autoOpenReport: advancedOptions.autoOpenReport,
        });
        console.log(`\n⭐ Preset "${presetName}" saved successfully!`);
      }

      // "run" or "save_and_run" both execute
      saveLastRun({
        selectedClients,
        selectedScenarios,
        env: selectedEnv,
        selectedBrowser,
        selectedMode,
        workers: advancedOptions.workers,
        retries: advancedOptions.retries,
        shouldOpenReport: advancedOptions.autoOpenReport,
      });

      runCommand(command, { env: selectedEnv });

      if (advancedOptions.autoOpenReport) {
        openReport();
      }

      const postAction = await askPostRunAction();
      if (postAction === "exit") {
        console.log("\nGoodbye! 👋\n");
        return;
      }
      confirmed = true;
    }
  }
}

function hasLastRunMenu(lastRun, presets) {
  return Boolean(lastRun) || (presets && presets.length > 0);
}

main().catch(err => {
  console.error("QC Runner Error:", err);
  process.exit(1);
});
