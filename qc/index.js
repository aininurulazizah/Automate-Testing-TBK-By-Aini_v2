import { 
  askClients,
  askScenario, 
  askBrowser,
  askExecutionMode,
  askOpenReport,
  askInitialAction,
  askPresetSelection,
  askConfirmationAction,
  askPresetName,
  askDeletePreset,
} from "./prompts.js";
import { buildCommand, runCommand, openReport } from "./runner.js";
import { clients } from "./config/clients.js";
import { scenarios } from "./config/scenarios.js";
import { getLastRun, saveLastRun, getPresets, savePreset, deletePreset } from "./storage.js";

async function main() {
  let selectedClients = [];
  let selectedScenarios = [];
  let selectedBrowser = "chromium";
  let selectedMode = "headed";
  let shouldOpenReport = true;
  let activePresetName = null;

  let lastRun = getLastRun();
  let presets = getPresets();

  if (lastRun || presets.length > 0) {
    let action = await askInitialAction({ hasLastRun: Boolean(lastRun), presets });

    if (action === "manage_presets") {
      const presetToDelete = await askDeletePreset(presets);
      if (presetToDelete) {
        deletePreset(presetToDelete);
        console.log("\n✅ Preset deleted successfully.\n");
      }
      presets = getPresets();
      action = await askInitialAction({ hasLastRun: Boolean(lastRun), presets });
    }

    if (action === "last_run" && lastRun) {
      selectedClients = clients.filter(c => lastRun.clientIds.includes(c.id));
      selectedScenarios = scenarios.filter(s => lastRun.scenarioIds.includes(s.id));
      selectedBrowser = lastRun.browser || "chromium";
      selectedMode = lastRun.mode || "headed";
      shouldOpenReport = lastRun.autoOpenReport ?? true;

      if (selectedClients.length === 0 || selectedScenarios.length === 0) {
        console.log("\n⚠️ Previous selection references clients/scenarios no longer found. Falling back to custom selection.\n");
        action = "custom";
      }
    }

    if (action === "preset") {
      const chosenPreset = await askPresetSelection(presets);
      selectedClients = clients.filter(c => chosenPreset.clientIds.includes(c.id));
      selectedScenarios = scenarios.filter(s => chosenPreset.scenarioIds.includes(s.id));
      selectedBrowser = chosenPreset.browser || "chromium";
      selectedMode = chosenPreset.mode || "headed";
      shouldOpenReport = chosenPreset.autoOpenReport ?? true;
      activePresetName = chosenPreset.name;

      if (selectedClients.length === 0 || selectedScenarios.length === 0) {
        console.log("\n⚠️ Preset references clients/scenarios no longer found. Falling back to custom selection.\n");
        action = "custom";
      }
    }

    if (action === "custom") {
      const defaultClientIds = lastRun?.clientIds || [];
      const defaultScenarioIds = lastRun?.scenarioIds || [];
      const defaultBrowser = lastRun?.browser || "chromium";
      const defaultMode = lastRun?.mode || "headed";
      const defaultAutoOpen = lastRun?.autoOpenReport ?? true;

      selectedClients = await askClients(defaultClientIds);
      selectedScenarios = await askScenario(selectedClients, defaultScenarioIds);
      selectedBrowser = await askBrowser(defaultBrowser);
      selectedMode = await askExecutionMode(defaultMode);
      shouldOpenReport = await askOpenReport(defaultAutoOpen);
    }
  } else {
    selectedClients = await askClients();
    selectedScenarios = await askScenario(selectedClients);
    selectedBrowser = await askBrowser();
    selectedMode = await askExecutionMode();
    shouldOpenReport = await askOpenReport();
  }

  const command = buildCommand(
    selectedClients,
    selectedScenarios,
    selectedBrowser,
    selectedMode
  );

  let totalMatchingTests = 0;
  const matchingTestsLines = [];

  for (const client of selectedClients) {
    const supported = selectedScenarios.filter(s => s.supports(client));
    if (supported.length > 0) {
      matchingTestsLines.push(`│ 🔹 ${client.name}`);
      for (const scenario of supported) {
        matchingTestsLines.push(`│    ✓ ${scenario.name}`);
        totalMatchingTests++;
      }
      matchingTestsLines.push("│");
    }
  }

  if (matchingTestsLines.length > 0 && matchingTestsLines[matchingTestsLines.length - 1] === "│") {
    matchingTestsLines.pop();
  }

  const matchingTestsFormatted = matchingTestsLines.length > 0 
    ? matchingTestsLines.join("\n")
    : "│    (No matching tests found)";

  const modeLabel = selectedMode === "headed" ? "Headed (UI Visible)" : "Headless (Background)";
  const reportLabel = shouldOpenReport ? "Yes (Auto-Open after test)" : "No";
  const presetBadge = activePresetName ? ` [⭐ Preset: ${activePresetName}]` : "";
  const width = 60;
  const divider = "─".repeat(width);

  console.log(`
┌${divider}┐
│                   🎭 QC RUNNER v1.3${presetBadge.padEnd(20)}│
├${divider}┤
│ 🎯 MATCHING TESTS:
${matchingTestsFormatted}
│
│ 📊 Total: ${totalMatchingTests} test(s)
│
│ 🌐 BROWSER:
│    • ${selectedBrowser}
│
│ ⚡ EXECUTION MODE:
│    • ${modeLabel}
│
│ 📈 AUTO OPEN REPORT:
│    • ${reportLabel}
├${divider}┤
│ 🚀 GENERATED COMMAND:
│    ${command}
└${divider}┘
`);

  const confirmAction = await askConfirmationAction();

  if (confirmAction === "cancel") {
    console.log("Cancelled.");
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
      autoOpenReport: shouldOpenReport,
    });
    console.log(`\n⭐ Preset "${presetName}" saved successfully!`);
  }

  saveLastRun({
    selectedClients,
    selectedScenarios,
    selectedBrowser,
    selectedMode,
    shouldOpenReport,
  });

  runCommand(command);

  if (shouldOpenReport) {
    openReport();
  }
}

main().catch(err => {
  console.error("QC Runner Error:", err);
  process.exit(1);
});

