export type Language = "en";

export interface Translations {
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  add: string;
  yes: string;
  no: string;
  loading: string;
  dashboard: string;
  activeRentalsMetric: string;
  overdueRentalsMetric: string;
  maintenanceUnitsMetric: string;
  revenueMetric: string;
  inventoryHealth: string;
  recentAudit: string;
  noAuditEvents: string;
  rentals: string;
  equipment: string;
  clients: string;
  settings: string;
  rentalsTitle: string;
  createNewRental: string;
  folio: string;
  client: string;
  returnDate: string;
  total: string;
  status: string;
  actions: string;
  viewTicket: string;
  returnRental: string;
  noRentalsYet: string;
  returnConfirmation: string;
  equipmentTitle: string;
  addNewEquipment: string;
  editEquipment: string;
  equipmentName: string;
  pricePerHour: string;
  pricePerDay: string;
  stock: string;
  availableStock: string;
  image: string;
  noEquipmentYet: string;
  deleteEquipmentConfirm: string;
  sendToMaintenance: string;
  returnFromMaintenance: string;
  maintenanceTitle: string;
  addMaintenanceRecord: string;
  editMaintenanceRecord: string;
  maintenanceReason: string;
  maintenanceQuantity: string;
  maintenanceStartDate: string;
  expectedReturnDate: string;
  actualReturnDate: string;
  maintenanceCost: string;
  maintenanceNotes: string;
  inMaintenance: string;
  maintenanceCompleted: string;
  noMaintenanceYet: string;
  maintenanceConfirmation: string;
  returnMaintenanceConfirmation: string;
  clientsTitle: string;
  addNewClient: string;
  editClient: string;
  clientName: string;
  fullName: string;
  phone: string;
  phoneNumber: string;
  address: string;
  addressOptional: string;
  name: string;
  noClientsYet: string;
  deleteClientConfirm: string;
  saveClient: string;
  businessConfiguration: string;
  businessName: string;
  nextInvoiceNumber: string;
  businessLogo: string;
  logoPreview: string;
  saveSettings: string;
  dataManagement: string;
  exportBackup: string;
  importBackup: string;
  settingsSaved: string;
  backupExported: string;
  backupImported: string;
  exportFailed: string;
  importFailed: string;
  importConfirmation: string;
  createRental: string;
  selectClient: string;
  selectAClient: string;
  rentalType: string;
  rentalTypeLabel: string;
  hourly: string;
  daily: string;
  byHour: string;
  byDay: string;
  startDate: string;
  startDateTime: string;
  returnDateTime: string;
  selectEquipment: string;
  quantity: string;
  unitPrice: string;
  subtotal: string;
  addEquipment: string;
  removeEquipment: string;
  step: string;
  next: string;
  back: string;
  available: string;
  selected: string;
  setDatesAndConfirm: string;
  summary: string;
  items: string;
  confirmRental: string;
  active: string;
  returned: string;
  overdue: string;
  fillRequiredFields: string;
  quantityMustBeGreaterThanZero: string;
  selectValidEquipment: string;
  notEnoughStockForMaintenance: string;
  close: string;
  printNote: string;
  rentalNote: string;
  date: string;
  tel: string;
  qty: string;
  description: string;
  unitPriceHeader: string;
  subtotalHeader: string;
  start: string;
  return: string;
  termsAndConditions: string;
  clientSignature: string;
  unknownItem: string;
  unknownClient: string;
  ticketFolio: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    yes: "Yes",
    no: "No",
    loading: "Loading...",
    dashboard: "Dashboard",
    activeRentalsMetric: "Active Rentals",
    overdueRentalsMetric: "Overdue Rentals",
    maintenanceUnitsMetric: "Units in Maintenance",
    revenueMetric: "Total Revenue",
    inventoryHealth: "Inventory Health",
    recentAudit: "Recent Activity",
    noAuditEvents: "No activity has been recorded yet.",
    rentals: "Rentals",
    equipment: "Equipment",
    clients: "Clients",
    settings: "Settings",
    rentalsTitle: "Rentals",
    createNewRental: "+ Create New Rental",
    folio: "Folio",
    client: "Client",
    returnDate: "Return Date",
    total: "Total",
    status: "Status",
    actions: "Actions",
    viewTicket: "View Ticket",
    returnRental: "Return",
    noRentalsYet: "No rentals have been created yet.",
    returnConfirmation:
      "Return rental #{folio} for {client}? This marks the rental as returned and restores equipment inventory.",
    equipmentTitle: "Equipment",
    addNewEquipment: "+ Add New Equipment",
    editEquipment: "Edit Equipment",
    equipmentName: "Equipment Name",
    pricePerHour: "Price per Hour",
    pricePerDay: "Price per Day",
    stock: "Stock",
    availableStock: "Available Stock",
    image: "Image",
    noEquipmentYet: "No equipment has been added yet.",
    deleteEquipmentConfirm: "Delete this equipment item?",
    sendToMaintenance: "Send to Maintenance",
    returnFromMaintenance: "Return from Maintenance",
    maintenanceTitle: "Maintenance",
    addMaintenanceRecord: "+ Add Maintenance Record",
    editMaintenanceRecord: "Edit Maintenance Record",
    maintenanceReason: "Maintenance Reason",
    maintenanceQuantity: "Quantity",
    maintenanceStartDate: "Start Date",
    expectedReturnDate: "Expected Return Date",
    actualReturnDate: "Actual Return Date",
    maintenanceCost: "Maintenance Cost",
    maintenanceNotes: "Notes",
    inMaintenance: "In Maintenance",
    maintenanceCompleted: "Maintenance Completed",
    noMaintenanceYet: "No maintenance records exist yet.",
    maintenanceConfirmation:
      "Send {quantity} unit(s) of {equipment} to maintenance?",
    returnMaintenanceConfirmation:
      "Return {quantity} unit(s) of {equipment} from maintenance?",
    clientsTitle: "Clients",
    addNewClient: "+ Add New Client",
    editClient: "Edit Client",
    clientName: "Client Name",
    fullName: "Full Name",
    phone: "Phone",
    phoneNumber: "Phone Number",
    address: "Address",
    addressOptional: "Address (Optional)",
    name: "Name",
    noClientsYet: "No clients have been added yet.",
    deleteClientConfirm: "Delete this client?",
    saveClient: "Save Client",
    businessConfiguration: "Business Configuration",
    businessName: "Business Name",
    nextInvoiceNumber: "Next Invoice Number (Folio)",
    businessLogo: "Business Logo",
    logoPreview: "Logo Preview:",
    saveSettings: "Save Settings",
    dataManagement: "Data Management",
    exportBackup: "Export Full Backup",
    importBackup: "Import from Backup",
    settingsSaved: "Settings saved successfully.",
    backupExported: "Backup exported successfully.",
    backupImported: "Import successful. The application will reload now.",
    exportFailed: "Backup export failed. Confirm that the database exists.",
    importFailed: "Backup import failed.",
    importConfirmation: "This will overwrite all current data. Continue?",
    createRental: "Create New Rental",
    selectClient: "Select Client",
    selectAClient: "Select a client",
    rentalType: "Rental Type",
    rentalTypeLabel: "Rental Type",
    hourly: "Hourly",
    daily: "Daily",
    byHour: "By Hour",
    byDay: "By Day",
    startDate: "Start Date",
    startDateTime: "Start Date & Time",
    returnDateTime: "Return Date & Time",
    selectEquipment: "Select Equipment",
    quantity: "Quantity",
    unitPrice: "Unit Price",
    subtotal: "Subtotal",
    addEquipment: "Add Equipment",
    removeEquipment: "Remove Equipment",
    step: "Step",
    next: "Next",
    back: "Back",
    available: "Available",
    selected: "Selected",
    setDatesAndConfirm: "Set Dates and Confirm",
    summary: "Summary",
    items: "Items",
    confirmRental: "Confirm Rental",
    active: "Active",
    returned: "Returned",
    overdue: "Overdue",
    fillRequiredFields: "Fill in all required fields.",
    quantityMustBeGreaterThanZero: "Quantity must be greater than zero.",
    selectValidEquipment: "Select valid equipment.",
    notEnoughStockForMaintenance:
      "Not enough stock available. Available stock: {availableStock}",
    close: "Close",
    printNote: "Print Note",
    rentalNote: "Rental Note",
    date: "Date",
    tel: "Tel",
    qty: "Qty",
    description: "Description",
    unitPriceHeader: "Unit Price",
    subtotalHeader: "Subtotal",
    start: "Start",
    return: "Return",
    termsAndConditions: "Terms and Conditions",
    clientSignature: "Client Signature",
    unknownItem: "Unknown Item",
    unknownClient: "Unknown Client",
    ticketFolio: "Ticket Folio",
  },
};
