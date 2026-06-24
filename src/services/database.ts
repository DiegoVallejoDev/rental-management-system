import {
  BaseDirectory,
  create,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import { applyAvailableStock } from "../domain/selectors";
import type { Database, Equipment } from "../types";

const DB_FILE_NAME = "database.json";
const DB_LOCATIONS = [
  BaseDirectory.AppData,
  BaseDirectory.AppLocalData,
  BaseDirectory.Document,
] as const;

function ensureDatabaseStructure(data: Partial<Database>): Database {
  return applyAvailableStock({
    settings: {
      id: 1,
      businessName: data.settings?.businessName || "",
      address: data.settings?.address || "",
      phone: data.settings?.phone || "",
      logoBase64: data.settings?.logoBase64 || "",
      nextInvoiceNumber: data.settings?.nextInvoiceNumber || 1001,
      language: "en",
    },
    clients: data.clients || [],
    equipment: (data.equipment || []).map((eq: Partial<Equipment>) => ({
      id: eq.id || 0,
      name: eq.name || "",
      pricePerHour: eq.pricePerHour || 0,
      pricePerDay: eq.pricePerDay || 0,
      stock: eq.stock || 0,
      availableStock:
        eq.availableStock !== undefined ? eq.availableStock : eq.stock || 0,
      imageBase64: eq.imageBase64 || "",
    })),
    rentals: data.rentals || [],
    maintenance: data.maintenance || [],
    auditLog: data.auditLog || [],
  });
}

function getDefaultDbState(): Database {
  return {
    settings: {
      id: 1,
      businessName: "",
      address: "",
      phone: "",
      logoBase64: "",
      nextInvoiceNumber: 1001,
      language: "en",
    },
    clients: [],
    equipment: [],
    rentals: [],
    maintenance: [],
    auditLog: [],
  };
}

export async function readDatabaseContent(): Promise<string> {
  let lastError: unknown;

  for (const baseDir of DB_LOCATIONS) {
    try {
      return await readTextFile(DB_FILE_NAME, { baseDir });
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

export async function writeDatabaseContent(content: string): Promise<void> {
  let lastError: unknown;

  for (const baseDir of DB_LOCATIONS) {
    try {
      if (baseDir === BaseDirectory.AppData) {
        const file = await create(DB_FILE_NAME, { baseDir });
        await file.write(new TextEncoder().encode(content));
        await file.close();
      } else {
        await writeTextFile(DB_FILE_NAME, content, { baseDir });
      }
      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

export async function loadDatabase(): Promise<Database> {
  try {
    return ensureDatabaseStructure(JSON.parse(await readDatabaseContent()));
  } catch {
    const defaultState = getDefaultDbState();
    await saveDatabase(defaultState);
    return defaultState;
  }
}

export async function saveDatabase(data: Database): Promise<void> {
  await writeDatabaseContent(JSON.stringify(applyAvailableStock(data), null, 2));
}
