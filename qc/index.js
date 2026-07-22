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

  let selectedClients = [];
  let selectedScenarios = [];
  let selectedBrowser = "chromium";
  let selectedMode = "headed";
  let executionOptions = { workers: 1, retries: 0 };
  let shouldOpenReport = true;
  let activePresetName = null;

  let lastRun = getLastRun();
  let presets = getPresets();

  while (true) {
    const hasLastRun = Boolean(lastRun);
    presets = getPresets();

    let action = "custom";
    if (hasLastRun || presets.length > 0) {
      action = await askInitialAction({ hasLastRun, presets });
    }

    if (action === "manage_presets") {
      await handlePresetManagement();
      lastRun = getLastRun();
      presets = getPresets();
      continue;
    }

    if (action === "last_run" && lastRun) {
      selectedClients = clients.filter(c => lastRun.clientIds.includes(c.id));
      selectedScenarios = scenarios.filter(s => lastRun.scenarioIds.includes(s.id));
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
      } else {
        break;
      }
    }

    if (action === "preset") {
      const chosenPreset = await askPresetSelection(presets);
      selectedClients = clients.filter(c => chosenPreset.clientIds.includes(c.id));
      selectedScenarios = scenarios.filter(s => chosenPreset.scenarioIds.includes(s.id));
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
      } else {
        break;
      }
    }

    if (action === "custom") {
      const defaultClientIds = lastRun?.clientIds || [];
      const defaultScenarioIds = lastRun?.scenarioIds || [];
      const defaultBrowser = lastRun?.browser || "chromium";
      const defaultMode = lastRun?.mode || "headed";
      const defaultOptions = { workers: lastRun?.workers ?? 1, retries: lastRun?.retries ?? 0 };
      const defaultAutoOpen = lastRun?.autoOpenReport ?? true;

      selectedClients = await askClients(defaultClientIds);
      selectedScenarios = await askScenario(selectedClients, defaultScenarioIds);
      selectedBrowser = await askBrowser(defaultBrowser);
      selectedMode = await askExecutionMode(defaultMode);
      executionOptions = await askExecutionOptions(defaultOptions);
      shouldOpenReport = await askOpenReport(defaultAutoOpen);
      break;
    }
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
    console.log("\nCancelled.");
    process.exit(0);
  }

  if (confirmAction === "dry_run") {
    console.log("\n📋 DRY RUN - Generated Playwright Command:\n");
    console.log(`  ${command}\n`);
    console.log("Copy and execute the command above whenever you're ready.\n");
    process.exit(0);
  }

  if (confirmAction === "save_and_run") {
    const presetName = await askPresetName();
    const presetId = presetName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
    savePreset({
      id: presetId,
      name: presetName.trim(),
      clientIds: selectedClients.map(c => c.id),
      scenarioIds: selectedScenarios.map(s => s.id),
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
    selectedBrowser,
    selectedMode,
    workers: executionOptions.workers,
    retries: executionOptions.retries,
    shouldOpenReport,
  });

  const result = runCommand(command);

  if (shouldOpenReport) {
    openReport();
  }
}

main().catch(err => {
  console.error("QC Runner Error:", err);
  process.exit(1);
});
