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
      env: config.env || "staging",
      browser: config.selectedBrowser || "chromium",
      mode: config.selectedMode || "headed",
      workers: config.workers ?? 1,
      retries: config.retries ?? 0,
      autoOpenReport: config.shouldOpenReport ?? true,
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
    const existingIndex = presets.findIndex(
      p => p.id === preset.id || p.name.toLowerCase() === preset.name.toLowerCase()
    );
    
    const formattedPreset = {
      id: preset.id,
      name: preset.name,
      clientIds: preset.clientIds || [],
      scenarioIds: preset.scenarioIds || [],
      env: preset.env || "staging",
      browser: preset.browser || "chromium",
      mode: preset.mode || "headed",
      workers: preset.workers ?? 1,
      retries: preset.retries ?? 0,
      autoOpenReport: preset.autoOpenReport ?? true,
      createdAt: preset.createdAt || new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      presets[existingIndex] = formattedPreset;
    } else {
      presets.push(formattedPreset);
    }
    
    fs.writeFileSync(PRESETS_FILE, JSON.stringify(presets, null, 2), "utf-8");
    return formattedPreset;
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

export function exportPresetsToFile(targetPath) {
  try {
    const presets = getPresets();
    if (presets.length === 0) {
      return { success: false, message: "No presets available to export." };
    }

    const resolvedPath = path.isAbsolute(targetPath) 
      ? targetPath 
      : path.resolve(process.cwd(), targetPath);

    const dir = path.dirname(resolvedPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(resolvedPath, JSON.stringify(presets, null, 2), "utf-8");
    return { success: true, count: presets.length, path: resolvedPath };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export function importPresetsFromFile(sourcePath) {
  try {
    const resolvedPath = path.isAbsolute(sourcePath) 
      ? sourcePath 
      : path.resolve(process.cwd(), sourcePath);

    if (!fs.existsSync(resolvedPath)) {
      return { success: false, message: `File not found: ${sourcePath}` };
    }

    const content = fs.readFileSync(resolvedPath, "utf-8");
    const imported = JSON.parse(content);

    if (!Array.isArray(imported)) {
      return { success: false, message: "Invalid presets format: Root element must be an array." };
    }

    let addedCount = 0;
    for (const item of imported) {
      if (item.id && item.name && Array.isArray(item.clientIds) && Array.isArray(item.scenarioIds)) {
        savePreset(item);
        addedCount++;
      }
    }

    return { success: true, count: addedCount };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
