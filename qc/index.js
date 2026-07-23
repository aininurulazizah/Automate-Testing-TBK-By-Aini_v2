import { 
  askClients,
  askScenario, 
  askBrowser,
  askExecutionMode,
  askExecutionOptions,
  askOpenReport,
  askInitialAction,
  askPresetSelection,
  askPresetManagementAction,
  askConfirmationAction,
  askPresetName,
  askDeletePreset,
  askFilePath,
  askPostRunAction,
} from "./prompts.js";
import { buildCommand, runCommand, openReport, getMatchingTestsBreakdown } from "./runner.js";
import { clients } from "./config/clients.js";
import { scenarios } from "./config/scenarios.js";
import { validateConfigs } from "./config/validator.js";
import { 
  getLastRun, 
  saveLastRun, 
  getPresets, 
  savePreset, 
  deletePreset,
  exportPresetsToFile,
  importPresetsFromFile,
} from "./storage.js";

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

async function handlePresetManagement() {
  while (true) {
    const presets = getPresets();
    const action = await askPresetManagementAction();

    if (action === "back") break;

    if (action === "export") {
      if (presets.length === 0) {
        console.log("\n⚠️ No presets available to export.\n");
        continue;
      }
      const filePath = await askFilePath("Enter target file path for export:", "qc/data/exported_presets.json");
      const result = exportPresetsToFile(filePath);
      if (result.success) {
        console.log(`\n✅ Exported ${result.count} preset(s) successfully to: ${result.path}\n`);
      } else {
        console.log(`\n❌ Export failed: ${result.message}\n`);
      }
    }

    if (action === "import") {
      const filePath = await askFilePath("Enter source JSON file path for import:", "qc/data/exported_presets.json");
      const result = importPresetsFromFile(filePath);
      if (result.success) {
        console.log(`\n✅ Imported ${result.count} preset(s) successfully!\n`);
      } else {
        console.log(`\n❌ Import failed: ${result.message}\n`);
      }
    }

    if (action === "delete") {
      if (presets.length === 0) {
        console.log("\n⚠️ No presets available to delete.\n");
        continue;
      }
      const presetToDelete = await askDeletePreset(presets);
      if (presetToDelete) {
        deletePreset(presetToDelete);
        console.log("\n✅ Preset deleted successfully.\n");
      }
    }
  }
}

async function main() {
  const validation = validateConfigs(clients, scenarios);
  if (!validation.valid) {
    console.warn("\n⚠️ Configuration warnings detected:");
    validation.errors.forEach(err => console.warn(`  - ${err}`));
    console.warn("Proceeding with valid definitions...\n");
  }

  while (true) {
    let selectedClients = [];
    let selectedScenarios = [];
    let selectedEnv = "staging";
    let selectedBrowser = "chromium";
    let selectedMode = "headed";
    let executionOptions = { workers: 1, retries: 0 };
    let shouldOpenReport = true;
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

    if (action === "manage_presets") {
      await handlePresetManagement();
      continue;
    }

    if (action === "last_run" && lastRun) {
      selectedClients = clients.filter(c => lastRun.clientIds.includes(c.id));
      selectedScenarios = scenarios.filter(s => lastRun.scenarioIds.includes(s.id));
      selectedEnv = lastRun.env || "staging";
      selectedBrowser = lastRun.browser || "chromium";
      selectedMode = lastRun.mode || "headed";
      executionOptions = {
        workers: lastRun.workers ?? 1,
        retries: lastRun.retries ?? 0,
      };
      shouldOpenReport = lastRun.autoOpenReport ?? true;

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
      executionOptions = {
        workers: chosenPreset.workers ?? 1,
        retries: chosenPreset.retries ?? 0,
      };
      shouldOpenReport = chosenPreset.autoOpenReport ?? true;
      activePresetName = chosenPreset.name;

      if (selectedClients.length === 0 || selectedScenarios.length === 0) {
        console.log("\n⚠️ Preset references missing clients/scenarios. Falling back to custom selection.\n");
        action = "custom";
      }
    }

    if (action === "custom") {
      const defaultClientIds = [];
      const defaultScenarioIds = [];
      const defaultEnv = "staging";
      const defaultBrowser = "chromium";
      const defaultMode = "headed";
      const defaultOptions = { workers: 1, retries: 0 };
      const defaultAutoOpen = true;

      const clientResult = await askClients(defaultClientIds, { initialEnv: defaultEnv });
      selectedClients = clientResult.selectedClients;
      selectedEnv = clientResult.selectedEnv;

      selectedScenarios = await askScenario(selectedClients, defaultScenarioIds);
      selectedBrowser = await askBrowser(defaultBrowser);
      selectedMode = await askExecutionMode(defaultMode);
      executionOptions = await askExecutionOptions(defaultOptions);
      shouldOpenReport = await askOpenReport(defaultAutoOpen);
    }

    const command = buildCommand(
      selectedClients,
      selectedScenarios,
      selectedBrowser,
      selectedMode,
      executionOptions
    );

    const breakdown = getMatchingTestsBreakdown(selectedClients, selectedScenarios);
    const modeLabel = selectedMode === "headed" ? "Headed (UI Visible)" : "Headless (Background)";
    const reportLabel = shouldOpenReport ? "Yes (Auto-Open)" : "No";
    const presetBadge = activePresetName ? `[Preset: ${activePresetName}]` : "";
    const title = `🎭 PLAYWRIGHT QC RUNNER v1.4 ${presetBadge}`.trim();

    const bodyLines = [
      "🎯 MATCHING TESTS:",
      ...breakdown.lines.map(l => l.replace(/^│\s?/, "")),
      "",
      `📊 Total: ${breakdown.totalMatchingTests} test(s)`,
      "",
      `🏷️ ENVIRONMENT:    ${selectedEnv}`,
      `🌐 BROWSER:        ${selectedBrowser}`,
      `⚡ EXECUTION MODE: ${modeLabel}`,
      `⚙️ WORKERS:        ${executionOptions.workers} worker(s)`,
      `🔄 RETRIES:        ${executionOptions.retries} attempt(s)`,
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
      continue;
    }

    if (confirmAction === "dry_run") {
      console.log("\n📋 DRY RUN - Generated Playwright Command:\n");
      console.log(`  Target Environment: ${selectedEnv}`);
      console.log(`  ${command}\n`);
      console.log("Copy and execute the command above whenever you're ready.\n");
      
      const postAction = await askPostRunAction();
      if (postAction === "exit") {
        console.log("\nGoodbye! 👋\n");
        break;
      }
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
        workers: executionOptions.workers,
        retries: executionOptions.retries,
        autoOpenReport: shouldOpenReport,
      });
      console.log(`\n⭐ Preset "${presetName}" saved successfully!`);
    }

    saveLastRun({
      selectedClients,
      selectedScenarios,
      env: selectedEnv,
      selectedBrowser,
      selectedMode,
      workers: executionOptions.workers,
      retries: executionOptions.retries,
      shouldOpenReport,
    });

    const result = runCommand(command, { env: selectedEnv });

    if (shouldOpenReport) {
      openReport();
    }

    const postAction = await askPostRunAction();
    if (postAction === "exit") {
      console.log("\nGoodbye! 👋\n");
      break;
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
