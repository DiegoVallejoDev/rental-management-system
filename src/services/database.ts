import {
  readTextFile,
  writeTextFile,
  BaseDirectory,
  create,
} from "@tauri-apps/plugin-fs";
import type { Database, Equipment } from "../types";

const DB_FILE_NAME = "database.json";

function ensureDatabaseStructure(data: Partial<Database>): Database {
  // Ensure all required fields exist with defaults
  const db: Database = {
    settings: {
      id: 1,
      businessName: data.settings?.businessName || "",
      address: data.settings?.address || "",
      phone: data.settings?.phone || "",
      logoBase64: data.settings?.logoBase64 || "",
      nextInvoiceNumber: data.settings?.nextInvoiceNumber || 1001,
      language: data.settings?.language || "es",
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
  };

  // Recalculate available stock based on maintenance records
  db.equipment = db.equipment.map((equipment) => {
    const inMaintenanceQuantity = db.maintenance
      .filter(
        (m) => m.equipmentId === equipment.id && m.status === "In Maintenance"
      )
      .reduce((sum, m) => sum + m.quantity, 0);

    return {
      ...equipment,
      availableStock: equipment.stock - inMaintenanceQuantity,
    };
  });

  return db;
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
      language: "es",
    },
    clients: [],
    equipment: [],
    rentals: [],
    maintenance: [],
  };
}

export async function loadDatabase(): Promise<Database> {
  // Try to read from AppData first
  try {
    const content = await readTextFile(DB_FILE_NAME, {
      baseDir: BaseDirectory.AppData,
    });
    const data = JSON.parse(content);
    return ensureDatabaseStructure(data);
  } catch (error) {
    console.warn(
      "Database file not found in AppData, trying fallbacks...",
      error
    );

    // Try AppLocalData
    try {
      const content = await readTextFile(DB_FILE_NAME, {
        baseDir: BaseDirectory.AppLocalData,
      });
      const data = JSON.parse(content);
      return ensureDatabaseStructure(data);
    } catch {
      console.warn(
        "Database file not found in AppLocalData, trying Document directory..."
      );

      // Try Document directory
      try {
        const content = await readTextFile(DB_FILE_NAME, {
          baseDir: BaseDirectory.Document,
        });
        const data = JSON.parse(content);
        return ensureDatabaseStructure(data);
      } catch {
        // If file does not exist in any location, create a default database
        console.warn(
          "Database file not found in any location, creating a new one."
        );
        const defaultState = getDefaultDbState();
        await saveDatabase(defaultState);
        return defaultState;
      }
    }
  }
}

export async function saveDatabase(data: Database): Promise<void> {
  const content = JSON.stringify(data, null, 2);
  console.log("Saving database:", { content }, "to file:", DB_FILE_NAME);

  try {
    // Try to create the file with create function which should handle directory creation
    const file = await create(DB_FILE_NAME, {
      baseDir: BaseDirectory.AppData,
    });

    // Write the content to the file
    await file.write(new TextEncoder().encode(content));
    await file.close();

    console.log("Successfully created and wrote database file");
  } catch (error) {
    console.error("Failed to create/write database file:", error);

    // Fallback to writeTextFile with different base directory
    try {
      console.log("Attempting to write to AppLocalData as fallback...");
      await writeTextFile(DB_FILE_NAME, content, {
        baseDir: BaseDirectory.AppLocalData,
      });
      console.log("Successfully wrote database file to AppLocalData");
    } catch (fallbackError) {
      console.error("AppLocalData fallback also failed:", fallbackError);

      // Final fallback - try Document directory
      try {
        console.log(
          "Attempting to write to Document directory as final fallback..."
        );
        await writeTextFile(DB_FILE_NAME, content, {
          baseDir: BaseDirectory.Document,
        });
        console.log("Successfully wrote database file to Document directory");
      } catch (finalError) {
        console.error("All fallbacks failed:", finalError);
        throw error; // Throw original error
      }
    }
  }
}
