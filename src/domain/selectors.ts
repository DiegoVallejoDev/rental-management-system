import type { Client, Database, Equipment, MaintenanceRecord, Rental } from "../types";

export function buildMaintenanceQuantityByEquipmentId(
  maintenance: MaintenanceRecord[]
): Map<number, number> {
  const quantities = new Map<number, number>();

  for (const record of maintenance) {
    if (record.status !== "In Maintenance") continue;
    quantities.set(
      record.equipmentId,
      (quantities.get(record.equipmentId) ?? 0) + record.quantity
    );
  }

  return quantities;
}

export function buildRentalQuantityByEquipmentId(
  details: Rental["details"]
): Map<number, number> {
  const quantities = new Map<number, number>();

  for (const detail of details) {
    quantities.set(
      detail.equipmentId,
      (quantities.get(detail.equipmentId) ?? 0) + detail.quantity
    );
  }

  return quantities;
}

export function applyAvailableStock(db: Database): Database {
  const maintenanceQuantityByEquipmentId = buildMaintenanceQuantityByEquipmentId(
    db.maintenance
  );

  return {
    ...db,
    equipment: db.equipment.map((equipment) => ({
      ...equipment,
      availableStock:
        equipment.stock - (maintenanceQuantityByEquipmentId.get(equipment.id) ?? 0),
    })),
  };
}

export function buildClientNameById(clients: Client[]): Map<number, string> {
  return new Map(clients.map((client) => [client.id, client.name]));
}

export function buildEquipmentById(equipment: Equipment[]): Map<number, Equipment> {
  return new Map(equipment.map((item) => [item.id, item]));
}

export function getNextId(records: { id: number }[]): number {
  let nextId = 1;

  for (const record of records) {
    if (record.id >= nextId) nextId = record.id + 1;
  }

  return nextId;
}
