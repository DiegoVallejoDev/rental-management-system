export type Language = "es" | "en";

export interface Translations {
  // Common
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  add: string;
  yes: string;
  no: string;
  loading: string;

  // Navigation
  rentals: string;
  equipment: string;
  clients: string;
  settings: string;

  // Rentals
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

  // Equipment
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

  // Maintenance
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

  // Clients
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

  // Settings
  businessConfiguration: string;
  businessName: string;
  nextInvoiceNumber: string;
  businessLogo: string;
  logoPreview: string;
  saveSettings: string;
  dataManagement: string;
  exportBackup: string;
  importBackup: string;
  language: string;
  settingsSaved: string;
  backupExported: string;
  backupImported: string;
  exportFailed: string;
  importFailed: string;
  importConfirmation: string;

  // Rental Form
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

  // Status
  active: string;
  returned: string;
  overdue: string;

  // Validation messages
  fillRequiredFields: string;
  quantityMustBeGreaterThanZero: string;
  selectValidEquipment: string;
  notEnoughStockForMaintenance: string;

  // Rental Ticket
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
  ticketFolio: string;
}

export const translations: Record<Language, Translations> = {
  es: {
    // Common
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    add: "Agregar",
    yes: "Sí",
    no: "No",
    loading: "Cargando...",

    // Navigation
    rentals: "Rentas",
    equipment: "Equipos",
    clients: "Clientes",
    settings: "Configuración",

    // Rentals
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
    noRentalsYet: "No se han creado rentas aún.",
    returnConfirmation:
      "¿Está seguro de que desea devolver la renta #{folio} de {client}? Esto marcará la renta como devuelta y restaurará el inventario del equipo.",

    // Equipment
    equipmentTitle: "Equipos",
    addNewEquipment: "+ Agregar Nuevo Equipo",
    editEquipment: "Editar Equipo",
    equipmentName: "Nombre del Equipo",
    pricePerHour: "Precio por Hora",
    pricePerDay: "Precio por Día",
    stock: "Inventario",
    availableStock: "Stock Disponible",
    image: "Imagen",
    noEquipmentYet: "No se han agregado equipos aún.",
    deleteEquipmentConfirm: "¿Está seguro de que desea eliminar este equipo?",
    sendToMaintenance: "Enviar a Mantenimiento",
    returnFromMaintenance: "Devolver de Mantenimiento",

    // Maintenance
    maintenanceTitle: "Mantenimiento",
    addMaintenanceRecord: "+ Agregar Registro de Mantenimiento",
    editMaintenanceRecord: "Editar Registro de Mantenimiento",
    maintenanceReason: "Razón del Mantenimiento",
    maintenanceQuantity: "Cantidad",
    maintenanceStartDate: "Fecha de Inicio",
    expectedReturnDate: "Fecha Esperada de Retorno",
    actualReturnDate: "Fecha Real de Retorno",
    maintenanceCost: "Costo de Mantenimiento",
    maintenanceNotes: "Notas",
    inMaintenance: "En Mantenimiento",
    maintenanceCompleted: "Mantenimiento Completado",
    noMaintenanceYet: "No hay registros de mantenimiento aún.",
    maintenanceConfirmation:
      "¿Está seguro de que desea enviar {quantity} unidad(es) de {equipment} a mantenimiento?",
    returnMaintenanceConfirmation:
      "¿Está seguro de que desea devolver {quantity} unidad(es) de {equipment} del mantenimiento?",

    // Clients
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
    noClientsYet: "No se han agregado clientes aún.",
    deleteClientConfirm: "¿Está seguro de que desea eliminar este cliente?",
    saveClient: "Guardar Cliente",

    // Settings
    businessConfiguration: "Configuración del Negocio",
    businessName: "Nombre del Negocio",
    nextInvoiceNumber: "Próximo Número de Factura (Folio)",
    businessLogo: "Logo del Negocio",
    logoPreview: "Vista Previa del Logo:",
    saveSettings: "Guardar Configuración",
    dataManagement: "Gestión de Datos",
    exportBackup: "Exportar Respaldo Completo",
    importBackup: "Importar desde Respaldo",
    language: "Idioma",
    settingsSaved: "¡Configuración guardada exitosamente!",
    backupExported: "¡Respaldo exportado exitosamente!",
    backupImported: "¡Importación exitosa! La aplicación se recargará ahora.",
    exportFailed:
      "Error al exportar respaldo. Asegúrese de que la base de datos exista.",
    importFailed: "Error al importar respaldo.",
    importConfirmation:
      "¿Está seguro? Esto sobrescribirá todos los datos actuales.",

    // Rental Form
    createRental: "Crear Nueva Renta",
    selectClient: "Seleccionar Cliente",
    selectAClient: "Seleccionar un cliente",
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

    // Status
    active: "Activo",
    returned: "Devuelto",
    overdue: "Vencido",

    // Validation messages
    fillRequiredFields: "Por favor complete todos los campos requeridos",
    quantityMustBeGreaterThanZero: "La cantidad debe ser mayor que 0",
    selectValidEquipment: "Por favor seleccione un equipo válido",
    notEnoughStockForMaintenance:
      "Solo {availableStock} unidades disponibles para mantenimiento",

    // Rental Ticket
    close: "Cerrar",
    printNote: "Imprimir Nota",
    rentalNote: "NOTA DE RENTA",
    date: "Fecha",
    tel: "Tel",
    qty: "CANT",
    description: "DESCRIPCIÓN",
    unitPriceHeader: "PRECIO UNIT",
    subtotalHeader: "SUBTOTAL",
    start: "INICIO",
    return: "DEVOLUCIÓN",
    termsAndConditions:
      "Se aplican términos y condiciones. El cliente es responsable de cualquier daño o pérdida del equipo.",
    clientSignature: "Firma del Cliente",
    unknownItem: "Artículo Desconocido",
    ticketFolio: "Ticket Folio",
  },
  en: {
    // Common
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    yes: "Yes",
    no: "No",
    loading: "Loading...",

    // Navigation
    rentals: "Rentals",
    equipment: "Equipment",
    clients: "Clients",
    settings: "Settings",

    // Rentals
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
      "Are you sure you want to return rental #{folio} for {client}? This will mark the rental as returned and restore the equipment inventory.",

    // Equipment
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
    deleteEquipmentConfirm: "Are you sure you want to delete this equipment?",
    sendToMaintenance: "Send to Maintenance",
    returnFromMaintenance: "Return from Maintenance",

    // Maintenance
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
    noMaintenanceYet: "No maintenance records yet.",
    maintenanceConfirmation:
      "Are you sure you want to send {quantity} unit(s) of {equipment} to maintenance?",
    returnMaintenanceConfirmation:
      "Are you sure you want to return {quantity} unit(s) of {equipment} from maintenance?",

    // Clients
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
    deleteClientConfirm: "Are you sure you want to delete this client?",
    saveClient: "Save Client",

    // Settings
    businessConfiguration: "Business Configuration",
    businessName: "Business Name",
    nextInvoiceNumber: "Next Invoice Number (Folio)",
    businessLogo: "Business Logo",
    logoPreview: "Logo Preview:",
    saveSettings: "Save Settings",
    dataManagement: "Data Management",
    exportBackup: "Export Full Backup",
    importBackup: "Import from Backup",
    language: "Language",
    settingsSaved: "Settings saved successfully!",
    backupExported: "Backup exported successfully!",
    backupImported: "Import successful! The application will now reload.",
    exportFailed: "Failed to export backup. Make sure the database exists.",
    importFailed: "Failed to import backup.",
    importConfirmation: "Are you sure? This will overwrite all current data.",

    // Rental Form
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

    // Status
    active: "Active",
    returned: "Returned",
    overdue: "Overdue",

    // Validation messages
    fillRequiredFields: "Please fill in all required fields",
    quantityMustBeGreaterThanZero: "Quantity must be greater than 0",
    selectValidEquipment: "Please select valid equipment",
    notEnoughStockForMaintenance:
      "Only {availableStock} units available for maintenance",

    // Rental Ticket
    close: "Close",
    printNote: "Print Note",
    rentalNote: "RENTAL NOTE",
    date: "Date",
    tel: "Tel",
    qty: "QTY",
    description: "DESCRIPTION",
    unitPriceHeader: "UNIT PRICE",
    subtotalHeader: "SUBTOTAL",
    start: "START",
    return: "RETURN",
    termsAndConditions:
      "Terms and conditions apply. Renter is responsible for any damage or loss of equipment.",
    clientSignature: "Client Signature",
    unknownItem: "Unknown Item",
    ticketFolio: "Ticket Folio",
  },
};
