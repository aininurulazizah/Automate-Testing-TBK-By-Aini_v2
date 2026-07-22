import { 
    askClients,
    askScenario, 
    askBrowser,
    askExecutionMode,
    askOpenReport,
    askConfirmation,
} from "./prompts.js";
import { buildCommand, runCommand, openReport } from "./runner.js";

const selectedClients = await askClients();
const selectedScenarios = await askScenario(selectedClients);
const selectedBrowser = await askBrowser();
const selectedMode = await askExecutionMode();
const shouldOpenReport = await askOpenReport();

const command = buildCommand(
  selectedClients,
  selectedScenarios,
  selectedBrowser,
  selectedMode
);

const modeLabel = selectedMode === "headed" ? "Headed (UI Visible)" : "Headless (Background)";
const reportLabel = shouldOpenReport ? "Yes (Auto-Open after test)" : "No";
const width = 60;
const divider = "─".repeat(width);

console.log(`
┌${divider}┐
│                     🎭 QC RUNNER v1.1                    │
├${divider}┤
│ 👥 CLIENT(S):
${selectedClients.map(c => `│    • ${c.name}`).join("\n")}
│
│ 📋 SCENARIO(S):
${selectedScenarios.map(s => `│    • ${s.name}`).join("\n")}
│
│ 🌐 BROWSER:
│    • ${selectedBrowser}
│
│ ⚡ EXECUTION MODE:
│    • ${modeLabel}
│
│ 📊 AUTO OPEN REPORT:
│    • ${reportLabel}
├${divider}┤
│ 🚀 GENERATED COMMAND:
│    ${command}
└${divider}┘
`);

const run = await askConfirmation();

if (!run) {
  console.log("Cancelled.");
  process.exit(0);
}

runCommand(command);

if (shouldOpenReport) {
  openReport();
}

