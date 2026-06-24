# Rental Management System

A local-first rental management desktop application for equipment rental businesses. It combines inventory control, client records, rental operations, maintenance tracking, backup import/export, and a lightweight operations dashboard.

## Features

### Dashboard

- Active rental, overdue rental, maintenance, and revenue metrics
- Inventory availability summary
- Recent audit activity for important business events

### Equipment Management

- Add, edit, and delete equipment items
- Track stock and available stock
- Set hourly and daily rental rates
- Upload equipment images
- Send equipment to maintenance

### Client Management

- Maintain client contact records
- Add, edit, and delete client records
- Select existing clients during rental creation

### Rental Operations

- Create rentals with multiple equipment items
- Generate folio numbers automatically
- Support hourly and daily rental rates
- Calculate totals from one shared billing function
- Mark rentals as returned and restore inventory
- Print rental tickets

### Maintenance Tracking

- Record equipment maintenance events
- Track quantities, dates, cost, notes, and status
- Exclude units in maintenance from available stock

### Data Management

- Store data locally in `database.json`
- Export and import full JSON backups
- Normalize legacy database structures on load

## Technology Stack

- Frontend: React 19 with TypeScript
- Desktop framework: Tauri 2
- Styling: Tailwind CSS 4
- Build tool: Vite via Rolldown
- Package manager: pnpm
- Date handling: date-fns

## Prerequisites

- Node.js 22 or newer
- pnpm
- Rust stable
- Linux Tauri system dependencies when building on Linux

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

For the full Tauri desktop shell:

```bash
pnpm tauri dev
```

## Verification

```bash
pnpm lint
pnpm type-check
pnpm build
cargo check --manifest-path src-tauri/Cargo.toml
```

## Production Build

```bash
pnpm tauri build
```

## Project Structure

```text
src/
  components/       React UI components
  contexts/         Translation context
  domain/           Pure selectors and billing helpers
  hooks/            Shared React hooks
  services/         Persistence logic
  translations/     English UI copy
  types/            Application types
src-tauri/          Tauri backend and permissions
.github/workflows/  CI and release automation
```

## Release Automation

The release workflow publishes builds when a push to `main` introduces a new `package.json` version. If tag `vX.Y.Z` does not exist, the workflow creates it and builds platform artifacts for the GitHub Release. Reusing an existing version skips publication.
