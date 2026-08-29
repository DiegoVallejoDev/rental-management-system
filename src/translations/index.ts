export type Language = "en" | "es";

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
  language: string;
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
    language: "Language",
  },
  es: {
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    add: "Agregar",
    yes: "Sí",
    no: "No",
    loading: "Cargando...",
    dashboard: "Panel",
    activeRentalsMetric: "Rentas Activas",
    overdueRentalsMetric: "Rentas Vencidas",
    maintenanceUnitsMetric: "Unidades en Mantenimiento",
    revenueMetric: "Ingresos Totales",
    inventoryHealth: "Estado del Inventario",
    recentAudit: "Actividad Reciente",
    noAuditEvents: "Aún no se ha registrado actividad.",
    rentals: "Rentas",
    equipment: "Equipo",
    clients: "Clientes",
    settings: "Configuración",
    rentalsTitle: "Rentas",
    createNewRental: "+ Crear Nueva Renta",
    folio: "Folio",
    client: "Cliente",
    returnDate: "Fecha de Devolución",
    total: "Total",
    status: "Estado",
    actions: "Acciones",
    viewTicket: "Ver Ticket",
    returnRental: "Devolver",
    noRentalsYet: "Aún no se han creado rentas.",
    returnConfirmation:
      "¿Devolver renta #{folio} para {client}? Esto marca la renta como devuelta y restaura el inventario del equipo.",
    equipmentTitle: "Equipo",
    addNewEquipment: "+ Agregar Nuevo Equipo",
    editEquipment: "Editar Equipo",
    equipmentName: "Nombre del Equipo",
    pricePerHour: "Precio por Hora",
    pricePerDay: "Precio por Día",
    stock: "Existencia",
    availableStock: "Existencia Disponible",
    image: "Imagen",
    noEquipmentYet: "Aún no se ha agregado equipo.",
    deleteEquipmentConfirm: "¿Eliminar este artículo de equipo?",
    sendToMaintenance: "Enviar a Mantenimiento",
    returnFromMaintenance: "Regresar de Mantenimiento",
    maintenanceTitle: "Mantenimiento",
    addMaintenanceRecord: "+ Agregar Registro de Mantenimiento",
    editMaintenanceRecord: "Editar Registro de Mantenimiento",
    maintenanceReason: "Motivo del Mantenimiento",
    maintenanceQuantity: "Cantidad",
    maintenanceStartDate: "Fecha de Inicio",
    expectedReturnDate: "Fecha Esperada de Devolución",
    actualReturnDate: "Fecha Real de Devolución",
    maintenanceCost: "Costo de Mantenimiento",
    maintenanceNotes: "Notas",
    inMaintenance: "En Mantenimiento",
    maintenanceCompleted: "Mantenimiento Completado",
    noMaintenanceYet: "Aún no existen registros de mantenimiento.",
    maintenanceConfirmation:
      "¿Enviar {quantity} unidad(es) de {equipment} a mantenimiento?",
    returnMaintenanceConfirmation:
      "¿Regresar {quantity} unidad(es) de {equipment} de mantenimiento?",
    clientsTitle: "Clientes",
    addNewClient: "+ Agregar Nuevo Cliente",
    editClient: "Editar Cliente",
    clientName: "Nombre del Cliente",
    fullName: "Nombre Completo",
    phone: "Teléfono",
    phoneNumber: "Número de Teléfono",
    address: "Dirección",
    addressOptional: "Dirección (Opcional)",
    name: "Nombre",
    noClientsYet: "Aún no se han agregado clientes.",
    deleteClientConfirm: "¿Eliminar este cliente?",
    saveClient: "Guardar Cliente",
    businessConfiguration: "Configuración del Negocio",
    businessName: "Nombre del Negocio",
    nextInvoiceNumber: "Siguiente Número de Factura (Folio)",
    businessLogo: "Logotipo del Negocio",
    logoPreview: "Vista Previa del Logotipo:",
    saveSettings: "Guardar Configuración",
    dataManagement: "Gestión de Datos",
    exportBackup: "Exportar Respaldo Completo",
    importBackup: "Importar desde Respaldo",
    settingsSaved: "Configuración guardada exitosamente.",
    backupExported: "Respaldo exportado exitosamente.",
    backupImported: "Importación exitosa. La aplicación se recargará ahora.",
    exportFailed: "Error al exportar el respaldo. Confirma que la base de datos existe.",
    importFailed: "Error al importar el respaldo.",
    importConfirmation: "Esto sobrescribirá todos los datos actuales. ¿Continuar?",
    createRental: "Crear Nueva Renta",
    selectClient: "Seleccionar Cliente",
    selectAClient: "Selecciona un cliente",
    rentalType: "Tipo de Renta",
    rentalTypeLabel: "Tipo de Renta",
    hourly: "Por Hora",
    daily: "Por Día",
    byHour: "Por Hora",
    byDay: "Por Día",
    startDate: "Fecha de Inicio",
    startDateTime: "Fecha y Hora de Inicio",
    returnDateTime: "Fecha y Hora de Devolución",
    selectEquipment: "Seleccionar Equipo",
    quantity: "Cantidad",
    unitPrice: "Precio Unitario",
    subtotal: "Subtotal",
    addEquipment: "Agregar Equipo",
    removeEquipment: "Remover Equipo",
    step: "Paso",
    next: "Siguiente",
    back: "Atrás",
    available: "Disponible",
    selected: "Seleccionado",
    setDatesAndConfirm: "Establecer Fechas y Confirmar",
    summary: "Resumen",
    items: "Artículos",
    confirmRental: "Confirmar Renta",
    active: "Activa",
    returned: "Devuelta",
    overdue: "Vencida",
    fillRequiredFields: "Completa todos los campos requeridos.",
    quantityMustBeGreaterThanZero: "La cantidad debe ser mayor a cero.",
    selectValidEquipment: "Selecciona equipo válido.",
    notEnoughStockForMaintenance:
      "No hay suficiente existencia disponible. Existencia disponible: {availableStock}",
    close: "Cerrar",
    printNote: "Imprimir Nota",
    rentalNote: "Nota de Renta",
    date: "Fecha",
    tel: "Tel",
    qty: "Cant",
    description: "Descripción",
    unitPriceHeader: "Precio Unitario",
    subtotalHeader: "Subtotal",
    start: "Inicio",
    return: "Devolución",
    termsAndConditions: "Términos y Condiciones",
    clientSignature: "Firma del Cliente",
    unknownItem: "Artículo Desconocido",
    unknownClient: "Cliente Desconocido",
    ticketFolio: "Folio del Ticket",
    language: "Idioma",
  },
};
