import { 
        askClients,
        askScenario, 
        askBrowser,
        askConfirmation,
    } from "./prompts.js";
import { buildCommand, runCommand } from "./runner.js"

const selectedClients = await askClients();
const selectedScenarios = await askScenario(selectedClients);
const selectedBrowser = await askBrowser();

const command = buildCommand(
  selectedClients,
  selectedScenarios,
  selectedBrowser
);
console.log(`
=========================================
         QC Runner v1
=========================================

Clients:
${selectedClients.map(c => `- ${c.name}`).join("\n")}

Scenarios:
${selectedScenarios.map(s => `- ${s.name}`).join("\n")}

Browser:
- ${selectedBrowser}

-----------------------------------------

${command}

`);

const run = await askConfirmation();

if (!run) {
  console.log("Cancelled.");
  process.exit(0);
}

runCommand(command);

