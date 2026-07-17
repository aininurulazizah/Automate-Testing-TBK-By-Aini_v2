import { checkbox, select, confirm } from "@inquirer/prompts";
import { clients } from "./config/clients.js";
import { scenarios } from "./config/scenarios.js";

export async function askClients() {
  return checkbox({
    message: "Select client(s)",
    choices: clients.map(client => ({
      name: client.name,
      value: client,
    })),
    required: true,
  });
}

export async function askScenario(selectedClients) {
  
  const availableScenarios = scenarios.filter(scenario =>
    selectedClients.some(client => scenario.supports(client))
  );

  return checkbox({
    message: "Select scenario(s)",
    choices: availableScenarios.map(scenario => ({
      name: scenario.name,
      value: scenario,
    })),
    required: true,
  });
}

export async function askBrowser() {
  return select({
    message: "Select browser",
    choices: [
      {
        name: "Chromium",
        value: "chromium",
      },
      {
        name: "Firefox",
        value: "firefox",
      },
      {
        name: "Microsoft Edge",
        value: "Microsoft Edge",
      },
    ],
  });
}

export async function askConfirmation() {
  return confirm({
    message: "Run Playwright?",
  default: true,
  });
}