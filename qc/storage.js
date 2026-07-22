import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "data");
const LAST_RUN_FILE = path.join(DATA_DIR, "last_run.json");
const PRESETS_FILE = path.join(DATA_DIR, "presets.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getLastRun() {
  try {
    ensureDataDir();
    if (!fs.existsSync(LAST_RUN_FILE)) return null;
    const content = fs.readFileSync(LAST_RUN_FILE, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

export function saveLastRun(config) {
  try {
    ensureDataDir();
    const data = {
      clientIds: config.selectedClients.map(c => c.id),
      scenarioIds: config.selectedScenarios.map(s => s.id),
      browser: config.selectedBrowser,
      mode: config.selectedMode,
      autoOpenReport: config.shouldOpenReport,
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(LAST_RUN_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save last run storage:", error.message);
  }
}

export function getPresets() {
  try {
    ensureDataDir();
    if (!fs.existsSync(PRESETS_FILE)) return [];
    const content = fs.readFileSync(PRESETS_FILE, "utf-8");
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export function savePreset(preset) {
  try {
    ensureDataDir();
    const presets = getPresets();
    const existingIndex = presets.findIndex(p => p.id === preset.id || p.name.toLowerCase() === preset.name.toLowerCase());
    
    if (existingIndex >= 0) {
      presets[existingIndex] = preset;
    } else {
      presets.push(preset);
    }
    
    fs.writeFileSync(PRESETS_FILE, JSON.stringify(presets, null, 2), "utf-8");
    return preset;
  } catch (error) {
    console.error("Failed to save preset:", error.message);
    return null;
  }
}

export function deletePreset(presetId) {
  try {
    ensureDataDir();
    const presets = getPresets().filter(p => p.id !== presetId);
    fs.writeFileSync(PRESETS_FILE, JSON.stringify(presets, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Failed to delete preset:", error.message);
    return false;
  }
}
