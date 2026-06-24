export interface AppSettings {
  id: 1;
  businessName: string;
  address: string;
  phone: string;
  logoBase64: string;
  nextInvoiceNumber: number;
  language: "en";
}

export interface Rental {
  id: number;
  folio: number;
  clientId: number;
  rentalType: "Hour" | "Day";
  startDate: string;
  returnDate: string;
  status: "Active" | "Returned" | "Overdue";
  total: number;
  details: {
    equipmentId: number;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
}

export interface Client {
  id: number;
  name: string;
  phone: string;
  address?: string;
}

export interface Equipment {
  id: number;
  name: string;
  pricePerHour: number;
  pricePerDay: number;
  stock: number;
  availableStock: number;
  imageBase64: string;
}

export interface MaintenanceRecord {
  id: number;
  equipmentId: number;
  quantity: number;
  reason: string;
  startDate: string;
  expectedReturnDate?: string;
  actualReturnDate?: string;
  status: "In Maintenance" | "Completed";
  cost?: number;
  notes?: string;
}

export interface AuditEvent {
  id: number;
  type:
    | "settings.updated"
    | "equipment.saved"
    | "equipment.deleted"
    | "client.saved"
    | "client.deleted"
    | "rental.created"
    | "rental.returned"
    | "maintenance.saved"
    | "maintenance.completed";
  entityId: number;
  summary: string;
  createdAt: string;
}

export interface Database {
  settings: AppSettings;
  clients: Client[];
  equipment: Equipment[];
  rentals: Rental[];
  maintenance: MaintenanceRecord[];
  auditLog: AuditEvent[];
}
