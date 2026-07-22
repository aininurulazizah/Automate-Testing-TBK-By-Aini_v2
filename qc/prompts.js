import { checkbox, select, confirm, input } from "@inquirer/prompts";
import { clients } from "./config/clients.js";
import { scenarios } from "./config/scenarios.js";

export async function askClients(defaultClientIds = []) {
  const selectedMap = new Map();

  // Populate defaults if any
  for (const id of defaultClientIds) {
    const found = clients.find(c => c.id === id);
    if (found) selectedMap.set(found.id, found);
  }

  while (true) {
    const selectedNames = Array.from(selectedMap.values()).map(c => c.name);
    const summary = selectedNames.length > 0 ? selectedNames.join(", ") : "None";

    const choices = [
      { name: "📋 Select / Edit from full list", value: "list" },
      { name: "🔍 Search / Add client by keyword", value: "search" },
    ];

    if (selectedMap.size > 0) {
      choices.push({ name: "🗑️ Clear current selection", value: "clear" });
      choices.push({ name: `✅ Done with client selection (${selectedMap.size} selected: ${summary})`, value: "done" });
    }

    const action = await select({
      message: `Client Selection [Current: ${summary}]. Choose an option:`,
      choices,
    });

    if (action === "done") {
      return Array.from(selectedMap.values());
    }

    if (action === "clear") {
      selectedMap.clear();
      console.log("\n🗑️ Selection cleared.\n");
      continue;
    }

    if (action === "list") {
      const chosen = await checkbox({
        message: "Select client(s)",
        choices: clients.map(c => ({
          name: c.name,
          value: c,
          checked: selectedMap.has(c.id),
        })),
        required: selectedMap.size === 0,
      });

      selectedMap.clear();
      for (const c of chosen) {
        selectedMap.set(c.id, c);
      }

      const nextStep = await confirm({
        message: `Confirm selection of ${selectedMap.size} client(s) (${Array.from(selectedMap.values()).map(c => c.name).join(", ")})?`,
        default: true,
      });

      if (nextStep) {
        return Array.from(selectedMap.values());
      }
    }

    if (action === "search") {
      const keyword = await input({
        message: "Enter client search keyword (e.g. Jackal, Kruzz):",
        validate: (value) => value.trim().length > 0 || "Please enter a keyword",
      });

      const term = keyword.toLowerCase().trim();
      const filtered = clients.filter(c => 
        c.name.toLowerCase().includes(term) || 
        (c.tag && c.tag.toLowerCase().includes(term)) || 
        (c.id && c.id.toLowerCase().includes(term))
      );

      if (filtered.length === 0) {
        console.log(`\n⚠️ No clients found matching "${keyword}".\n`);
        continue;
      }

      const picked = await checkbox({
        message: `Matching client(s) for "${keyword}":`,
        choices: filtered.map(c => ({
          name: c.name,
          value: c,
          checked: selectedMap.has(c.id),
        })),
      });

      const pickedIds = new Set(picked.map(c => c.id));
      for (const c of filtered) {
        if (pickedIds.has(c.id)) {
          selectedMap.set(c.id, c);
        } else {
          selectedMap.delete(c.id);
        }
      }

      console.log(`\n✅ Updated client selection (${selectedMap.size}): ${Array.from(selectedMap.values()).map(c => c.name).join(", ")}\n`);
    }
  }
}

export async function askScenario(selectedClients, defaultScenarioIds = []) {
  const availableScenarios = scenarios.filter(scenario =>
    selectedClients.some(client => scenario.supports(client))
  );

  return checkbox({
    message: "Select scenario(s)",
    choices: availableScenarios.map(scenario => ({
      name: scenario.name,
      value: scenario,
      checked: defaultScenarioIds.includes(scenario.id),
    })),
    required: true,
  });
}

export async function askBrowser(defaultBrowser = "chromium") {
  return select({
    message: "Select browser",
    choices: [
      { name: "Chromium", value: "chromium" },
      { name: "Firefox", value: "firefox" },
      { name: "Microsoft Edge", value: "Microsoft Edge" },
    ],
    default: defaultBrowser,
  });
}

export async function askExecutionMode(defaultMode = "headed") {
  return select({
    message: "Select execution mode",
    choices: [
      { name: "Headed (Browser UI visible)", value: "headed" },
      { name: "Headless (Background execution)", value: "headless" },
    ],
    default: defaultMode,
  });
}

export async function askOpenReport(defaultAutoOpen = true) {
  return confirm({
    message: "Auto open HTML report after test finishes?",
    default: defaultAutoOpen,
  });
}

export async function askInitialAction({ hasLastRun, presets }) {
  const choices = [];

  if (hasLastRun) {
    choices.push({ name: "⚡ Quick Run Last Selection", value: "last_run" });
  }

  if (presets && presets.length > 0) {
    choices.push({ name: `⭐ Use Saved Preset (${presets.length} available)`, value: "preset" });
  }

  choices.push({ name: "🎯 New Custom Selection", value: "custom" });

  if (presets && presets.length > 0) {
    choices.push({ name: "⚙️ Manage Saved Presets", value: "manage_presets" });
  }

  return select({
    message: "What would you like to do?",
    choices,
  });
}

export async function askPresetSelection(presets) {
  return select({
    message: "Select a Preset to run",
    choices: presets.map(p => ({
      name: `⭐ ${p.name} [Clients: ${p.clientIds.join(", ")} | Browser: ${p.browser} | Mode: ${p.mode}]`,
      value: p,
    })),
  });
}

export async function askConfirmationAction() {
  return select({
    message: "Choose an action",
    choices: [
      { name: "🚀 Run Playwright", value: "run" },
      { name: "💾 Save as New Preset & Run", value: "save_and_run" },
      { name: "❌ Cancel", value: "cancel" },
    ],
  });
}

export async function askPresetName() {
  return input({
    message: "Enter preset name:",
    validate: (val) => val.trim().length > 0 || "Preset name cannot be empty",
  });
}

export async function askDeletePreset(presets) {
  return select({
    message: "Select preset to delete",
    choices: [
      ...presets.map(p => ({ name: `🗑️ Delete "${p.name}"`, value: p.id })),
      { name: "⬅️ Back", value: null },
    ],
  });
}