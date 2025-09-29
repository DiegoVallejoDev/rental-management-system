# 🏢 Rental Management System

A modern, bilingual rental management application built with Tauri, React, and TypeScript. Designed for businesses that rent out equipment with comprehensive inventory tracking, client management, and rental operations.

## ✨ Features

### 🌐 **Bilingual Support**

- **Spanish (Default)** and **English** language support
- Switchable interface language from Settings
- All text, messages, and confirmations fully translated

### 📦 **Equipment Management**

- Add, edit, and delete equipment items
- Track inventory stock levels
- Set hourly and daily rental rates
- Upload equipment images (Base64 encoded)
- Automatic stock updates with rentals/returns

### 👥 **Client Management**

- Complete client database with contact information
- Add, edit, and delete client records
- Client name, phone, and address tracking
- Quick client selection for rentals

### 📋 **Rental Operations**

- Create new rentals with multiple equipment items
- Automatic folio/invoice number generation
- Support for hourly and daily rental rates
- Real-time total calculation
- Rental status tracking (Active/Returned/Overdue)
- Easy return processing with inventory restoration
- Print-ready rental tickets

### ⚙️ **Business Configuration**

- Customizable business information
- Logo upload and management
- Invoice numbering system
- Language preferences
- Complete backup and restore functionality

### 💾 **Data Management**

- Local JSON database with fallback storage locations
- Export full database backups
- Import from backup files
- Persistent data storage across app restarts
- Multiple storage location fallbacks for reliability

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Desktop Framework**: Tauri 2.8.4
- **Styling**: Tailwind CSS 4.1.13
- **Build Tool**: Vite (Rolldown)
- **Package Manager**: pnpm
- **Date Handling**: date-fns
- **Icons**: Built-in Tauri icons

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **pnpm** package manager
- **Rust** (latest stable version)
- **Tauri CLI** (`cargo install tauri-cli`)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd rental-management-system
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run in Development Mode

```bash
pnpm tauri dev
```

### 4. Build for Production

```bash
pnpm tauri build
```

## 📁 Project Structure

```
rental-management-system/
├── src/
│   ├── components/          # React components
│   │   ├── ClientForm.tsx   # Client creation/editing form
│   │   ├── Clients.tsx      # Client management interface
│   │   ├── Equipment.tsx    # Equipment listing and management
│   │   ├── EquipmentForm.tsx# Equipment creation/editing form
│   │   ├── Modal.tsx        # Reusable modal component
│   │   ├── RentalForm.tsx   # Rental creation form
│   │   ├── Rentals.tsx      # Rental management interface
│   │   ├── RentalTicket.tsx # Printable rental ticket
│   │   └── Settings.tsx     # Application settings
│   ├── contexts/            # React contexts
│   │   └── TranslationContext.tsx # Translation management
│   ├── services/            # Business logic
│   │   └── database.ts      # Database operations
│   ├── translations/        # Internationalization
│   │   └── index.ts         # Translation dictionaries
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Application types
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── src-tauri/               # Tauri backend
│   ├── src/
│   │   ├── lib.rs           # Rust library code
│   │   └── main.rs          # Rust main function
│   ├── Cargo.toml           # Rust dependencies
│   └── tauri.conf.json      # Tauri configuration
├── public/                  # Static assets
├── package.json             # Node.js dependencies and scripts
└── README.md                # This file
```

## 🎯 Usage Guide

### Managing Equipment

1. Navigate to the **Equipment** (Equipos) tab
2. Click **+ Add New Equipment** (+ Agregar Nuevo Equipo)
3. Fill in equipment details including rates and stock
4. Upload an image if desired
5. Save to add to inventory

### Managing Clients

1. Go to the **Clients** (Clientes) tab
2. Click **+ Add New Client** (+ Agregar Nuevo Cliente)
3. Enter client information (name, phone, address)
4. Save to add to client database

### Creating Rentals

1. Navigate to **Rentals** (Rentas)
2. Click **+ Create New Rental** (+ Crear Nueva Renta)
3. Select client from dropdown
4. Choose rental type (Hourly/Daily)
5. Set start and return dates
6. Add equipment items with quantities
7. Review total and create rental

### Returning Rentals

1. In the **Rentals** tab, find the active rental
2. Click **Return** (Devolver) button
3. Confirm the return operation
4. Equipment stock will be automatically restored

### Configuring Settings

1. Go to **Settings** (Configuración)
2. Update business information
3. Change language preference (Spanish/English)
4. Upload business logo
5. Manage invoice numbering
6. Export/Import database backups

## 📊 Database Schema

### Settings

```typescript
{
  id: 1,
  businessName: string,
  address: string,
  phone: string,
  logoBase64: string,
  nextInvoiceNumber: number,
  language: 'es' | 'en'
}
```

### Equipment

```typescript
{
  id: number,
  name: string,
  pricePerHour: number,
  pricePerDay: number,
  stock: number,
  imageBase64: string
}
```

### Clients

```typescript
{
  id: number,
  name: string,
  phone: string,
  address?: string
}
```

### Rentals

```typescript
{
  id: number,
  folio: number,
  clientId: number,
  rentalType: "Hour" | "Day",
  startDate: string,
  returnDate: string,
  status: "Active" | "Returned" | "Overdue",
  total: number,
  details: Array<{
    equipmentId: number,
    quantity: number,
    unitPrice: number,
    subtotal: number
  }>
}
```

## 🔧 Configuration

### Tauri Configuration

The app is configured with the following Tauri settings:

- **App Identifier**: `com.tauri.dev`
- **Window Size**: 800x600 (resizable)
- **File System Access**: Enabled for data storage
- **Dialog Access**: Enabled for file operations

### Database Storage

The application uses multiple fallback locations for data storage:

1. **Primary**: `%APPDATA%/com.tauri.dev/database.json`
2. **Fallback 1**: `%LOCALAPPDATA%/com.tauri.dev/database.json`
3. **Fallback 2**: `%USERPROFILE%/Documents/database.json`

## 🌍 Internationalization

The application supports two languages:

### Spanish (es) - Default

- Default language for the application
- Complete translation coverage
- Business-appropriate terminology

### English (en)

- Full English translation
- Professional rental business terminology
- Consistent UI language

Language can be changed in **Settings > Language** and is persisted across app restarts.

## 🔐 Security Features

- **Local Data Storage**: All data stored locally, no external dependencies
- **Base64 Image Encoding**: Secure image storage within the database
- **Input Validation**: Form validation for all user inputs
- **Confirmation Dialogs**: Confirmation for destructive operations

## 🐛 Troubleshooting

### Database Issues

If you encounter database-related errors:

1. Check if the app has write permissions to the data directories
2. Try manually creating the `%APPDATA%/com.tauri.dev/` directory
3. Use the backup/restore feature to reset the database

### Build Issues

If the build fails:

1. Ensure Rust is properly installed
2. Update Tauri CLI: `cargo install tauri-cli --force`
3. Clear node modules: `rm -rf node_modules && pnpm install`

### Translation Issues

If translations don't appear:

1. Check that the language setting is saved in the database
2. Verify translation files are properly imported
3. Restart the application

## 📝 License

Copyright (c) 2025 Diego Vallejo

All rights reserved.

This project is public for reading and learning purposes only.
Copying, modifying, or distributing the code for commercial purposes is prohibited without explicit permission from the author.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please create an issue in the project repository or contact the development team.

---

**Built with ❤️ using Tauri, React, and TypeScript**
