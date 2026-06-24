import { useEffect, useState } from 'react';
import { relaunch } from '@tauri-apps/plugin-process';
import { version } from '../package.json';
import type { AppSettings, AuditEvent, Client as ClientType, Database, Equipment as EquipmentType, MaintenanceRecord, Rental } from './types';
import { ClientForm } from './components/ClientForm';
import { Clients } from './components/Clients';
import { Dashboard } from './components/Dashboard';
import { Equipment } from './components/Equipment';
import { EquipmentForm } from './components/EquipmentForm';
import { Maintenance } from './components/Maintenance';
import { MaintenanceForm } from './components/MaintenanceForm';
import { Modal } from './components/Modal';
import { RentalForm } from './components/RentalForm';
import { Rentals } from './components/Rentals';
import { RentalTicket } from './components/RentalTicket';
import { Settings } from './components/Settings';
import { applyAvailableStock, buildRentalQuantityByEquipmentId, getNextId } from './domain/selectors';
import { loadDatabase, saveDatabase } from './services/database';
import { TranslationProvider } from './contexts/TranslationContext';
import { useTranslation } from './hooks/useTranslation';

interface AppContentProps {
  db: Database | null;
  error: string | null;
  onDbUpdate: (newDb: Database) => void;
}

type View = 'dashboard' | 'rentals' | 'equipment' | 'clients' | 'settings' | 'maintenance';

function AppContent({ db, error, onDbUpdate }: AppContentProps) {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const { t } = useTranslation();

  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<EquipmentType | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientType | null>(null);
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [editingMaintenance, setEditingMaintenance] = useState<MaintenanceRecord | null>(null);

  const handleImport = async () => {
    await relaunch();
  };

  const withAudit = (
    newDbState: Database,
    type: AuditEvent['type'],
    entityId: number,
    summary: string
  ): Database => ({
    ...newDbState,
    auditLog: [
      ...(newDbState.auditLog || []),
      {
        id: getNextId(newDbState.auditLog || []),
        type,
        entityId,
        summary,
        createdAt: new Date().toISOString(),
      },
    ],
  });

  const updateAndSaveDb = (newDbState: Database) => {
    const finalDbState = applyAvailableStock(newDbState);
    onDbUpdate(finalDbState);
    saveDatabase(finalDbState);
  };

  const handleSaveSettings = async (newSettings: AppSettings) => {
    if (!db) return;
    updateAndSaveDb(withAudit({ ...db, settings: newSettings }, 'settings.updated', newSettings.id, 'Updated business settings'));
  };

  const handleSaveEquipment = (equipmentData: Omit<EquipmentType, 'id'> & { id?: number }) => {
    if (!db) return;
    const entityId = equipmentData.id ?? getNextId(db.equipment);
    let newEquipmentList: EquipmentType[];

    if (equipmentData.id) {
      newEquipmentList = db.equipment.map(item => item.id === equipmentData.id ? { ...item, ...equipmentData } as EquipmentType : item);
    } else {
      newEquipmentList = [...db.equipment, { ...equipmentData, id: entityId }];
    }

    updateAndSaveDb(withAudit({ ...db, equipment: newEquipmentList }, 'equipment.saved', entityId, `Saved equipment: ${equipmentData.name}`));
    setIsEquipmentModalOpen(false);
  };

  const handleDeleteEquipment = (equipmentId: number) => {
    if (!db || !window.confirm(t.deleteEquipmentConfirm)) return;
    const equipment = db.equipment.find(item => item.id === equipmentId);
    updateAndSaveDb(withAudit({ ...db, equipment: db.equipment.filter(item => item.id !== equipmentId) }, 'equipment.deleted', equipmentId, `Deleted equipment: ${equipment?.name ?? equipmentId}`));
  };

  const handleSaveClient = (clientData: Omit<ClientType, 'id'> & { id?: number }) => {
    if (!db) return;
    const entityId = clientData.id ?? getNextId(db.clients);
    let newClientsList: ClientType[];

    if (clientData.id) {
      newClientsList = db.clients.map(client => client.id === clientData.id ? { ...client, ...clientData } as ClientType : client);
    } else {
      newClientsList = [...db.clients, { ...clientData, id: entityId }];
    }

    updateAndSaveDb(withAudit({ ...db, clients: newClientsList }, 'client.saved', entityId, `Saved client: ${clientData.name}`));
    setIsClientModalOpen(false);
  };

  const handleDeleteClient = (clientId: number) => {
    if (!db || !window.confirm(t.deleteClientConfirm)) return;
    const client = db.clients.find(item => item.id === clientId);
    updateAndSaveDb(withAudit({ ...db, clients: db.clients.filter(item => item.id !== clientId) }, 'client.deleted', clientId, `Deleted client: ${client?.name ?? clientId}`));
  };

  const handleSaveRental = (rentalData: Omit<Rental, 'id' | 'folio' | 'status' | 'total'>, total: number) => {
    if (!db) return;

    const folio = db.settings.nextInvoiceNumber;
    const detailQuantityByEquipmentId = buildRentalQuantityByEquipmentId(rentalData.details);
    const updatedSettings = { ...db.settings, nextInvoiceNumber: folio + 1 };
    const updatedEquipment = db.equipment.map(equipment => ({
      ...equipment,
      stock: equipment.stock - (detailQuantityByEquipmentId.get(equipment.id) ?? 0),
    }));
    const newRental: Rental = {
      ...rentalData,
      id: getNextId(db.rentals),
      folio,
      total,
      status: 'Active',
    };

    updateAndSaveDb(withAudit({ ...db, settings: updatedSettings, equipment: updatedEquipment, rentals: [...db.rentals, newRental] }, 'rental.created', newRental.id, `Created rental #${folio}`));
    setIsRentalModalOpen(false);
  };

  const handleReturnRental = (rentalId: number) => {
    if (!db) return;
    const rentalToReturn = db.rentals.find(rental => rental.id === rentalId);
    if (!rentalToReturn || rentalToReturn.status === 'Returned') return;

    const detailQuantityByEquipmentId = buildRentalQuantityByEquipmentId(rentalToReturn.details);
    const updatedEquipment = db.equipment.map(equipment => ({
      ...equipment,
      stock: equipment.stock + (detailQuantityByEquipmentId.get(equipment.id) ?? 0),
    }));
    const updatedRentals = db.rentals.map(rental => rental.id === rentalId ? { ...rental, status: 'Returned' as const } : rental);

    updateAndSaveDb(withAudit({ ...db, equipment: updatedEquipment, rentals: updatedRentals }, 'rental.returned', rentalId, `Returned rental #${rentalToReturn.folio}`));
  };

  const handleViewTicket = (rental: Rental) => {
    setSelectedRental(rental);
    setIsTicketModalOpen(true);
  };

  const handleSendToMaintenance = (equipment: EquipmentType) => {
    setEditingMaintenance({
      id: -1,
      equipmentId: equipment.id,
      quantity: 1,
      reason: '',
      startDate: new Date().toISOString().split('T')[0],
      expectedReturnDate: '',
      actualReturnDate: '',
      status: 'In Maintenance',
      cost: 0,
      notes: '',
    });
    setIsMaintenanceModalOpen(true);
  };

  const handleSaveMaintenance = (maintenanceData: Omit<MaintenanceRecord, 'id'>) => {
    if (!db) return;
    const entityId = editingMaintenance && editingMaintenance.id > 0 ? editingMaintenance.id : getNextId(db.maintenance);
    const newMaintenanceList = editingMaintenance && editingMaintenance.id > 0
      ? db.maintenance.map(record => record.id === editingMaintenance.id ? { ...record, ...maintenanceData } : record)
      : [...db.maintenance, { ...maintenanceData, id: entityId }];

    updateAndSaveDb(withAudit({ ...db, maintenance: newMaintenanceList }, 'maintenance.saved', entityId, `Saved maintenance record for equipment #${maintenanceData.equipmentId}`));
    setIsMaintenanceModalOpen(false);
    setEditingMaintenance(null);
  };

  const handleCompleteMaintenance = (maintenanceId: number) => {
    if (!db) return;
    const updatedMaintenance = db.maintenance.map(record =>
      record.id === maintenanceId
        ? { ...record, status: 'Completed' as const, actualReturnDate: new Date().toISOString().split('T')[0] }
        : record
    );
    updateAndSaveDb(withAudit({ ...db, maintenance: updatedMaintenance }, 'maintenance.completed', maintenanceId, `Completed maintenance record #${maintenanceId}`));
  };

  const handleEditMaintenance = (maintenance: MaintenanceRecord) => {
    setEditingMaintenance(maintenance);
    setIsMaintenanceModalOpen(true);
  };

  const NavButton = ({ view, label }: { view: View; label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`px-4 py-2 text-sm font-medium rounded-md ${currentView === view
        ? 'bg-cyan-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
    >
      {label}
    </button>
  );
  const selectedClient = db && selectedRental ? db.clients.find(client => client.id === selectedRental.clientId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 text-white p-0 md:p-4">
      <header className="shadow-lg bg-gradient-to-r from-cyan-700 to-cyan-900 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-lg">Rental Manager</span>
            <span className="hidden md:inline-block px-3 py-1 rounded-full bg-cyan-600/80 text-xs font-semibold ml-2">v{version}</span>
          </div>
          <nav className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <NavButton view="dashboard" label={t.dashboard} />
            <NavButton view="rentals" label={t.rentals} />
            <NavButton view="equipment" label={t.equipment} />
            <NavButton view="clients" label={t.clients} />
            <NavButton view="maintenance" label={t.maintenanceTitle} />
            <NavButton view="settings" label={t.settings} />
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-2 md:px-0">
        {error && <div className="bg-red-700/80 text-white rounded-lg p-4 text-center font-semibold mb-4 shadow">{error}</div>}
        {!db && !error && <div className="flex justify-center items-center h-40"><span className="animate-pulse text-cyan-300 text-lg font-medium">{t.loading}</span></div>}
        {db && (
          <div className="transition-all duration-300">
            {currentView === 'dashboard' && <Dashboard rentals={db.rentals} equipment={db.equipment} maintenance={db.maintenance} auditLog={db.auditLog} />}
            {currentView === 'settings' && <Settings settings={db.settings} onSave={handleSaveSettings} onImport={handleImport} />}
            {currentView === 'equipment' && <div className="mt-6"><Equipment equipment={db.equipment} onAdd={() => { setEditingEquipment(null); setIsEquipmentModalOpen(true); }} onEdit={(item) => { setEditingEquipment(item); setIsEquipmentModalOpen(true); }} onDelete={handleDeleteEquipment} onSendToMaintenance={handleSendToMaintenance} /></div>}
            {currentView === 'clients' && <div className="mt-6"><Clients clients={db.clients} onAdd={() => { setEditingClient(null); setIsClientModalOpen(true); }} onEdit={(client) => { setEditingClient(client); setIsClientModalOpen(true); }} onDelete={handleDeleteClient} /></div>}
            {currentView === 'maintenance' && <div className="mt-6"><Maintenance maintenance={db.maintenance || []} equipment={db.equipment} onAdd={() => { setEditingMaintenance(null); setIsMaintenanceModalOpen(true); }} onEdit={handleEditMaintenance} onComplete={handleCompleteMaintenance} /></div>}
            {currentView === 'rentals' && <div className="mt-6"><Rentals rentals={db.rentals} clients={db.clients} onAdd={() => setIsRentalModalOpen(true)} onReturn={handleReturnRental} onViewTicket={handleViewTicket} /></div>}
          </div>
        )}
      </main>

      <div className="no-print">
        <Modal isOpen={isEquipmentModalOpen} onClose={() => setIsEquipmentModalOpen(false)} title={editingEquipment ? t.editEquipment : t.addNewEquipment}>
          <EquipmentForm onSave={handleSaveEquipment} onClose={() => { setIsEquipmentModalOpen(false); setEditingEquipment(null); }} equipmentToEdit={editingEquipment} />
        </Modal>
        <Modal isOpen={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} title={editingClient ? t.editClient : t.addNewClient}>
          <ClientForm onSave={handleSaveClient} onClose={() => { setIsClientModalOpen(false); setEditingClient(null); }} clientToEdit={editingClient} />
        </Modal>
        <Modal isOpen={isRentalModalOpen} onClose={() => setIsRentalModalOpen(false)} title={t.createRental}>
          {db && <RentalForm clients={db.clients} equipment={db.equipment} onSave={handleSaveRental} onClose={() => setIsRentalModalOpen(false)} />}
        </Modal>
        <Modal isOpen={isMaintenanceModalOpen} onClose={() => setIsMaintenanceModalOpen(false)} title={editingMaintenance ? t.editMaintenanceRecord : t.addMaintenanceRecord}>
          {db && <MaintenanceForm onSave={handleSaveMaintenance} onClose={() => { setIsMaintenanceModalOpen(false); setEditingMaintenance(null); }} equipment={db.equipment} maintenanceToEdit={editingMaintenance} />}
        </Modal>
      </div>

      {isTicketModalOpen && selectedRental && selectedClient && db && (
        <div id="print-area">
          <Modal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} title={`${t.ticketFolio} #${selectedRental.folio}`}>
            <RentalTicket rental={selectedRental} settings={db.settings} client={selectedClient} equipmentList={db.equipment} onClose={() => setIsTicketModalOpen(false)} />
          </Modal>
        </div>
      )}
      <footer className="mt-12 py-6 text-center text-xs text-gray-400 opacity-80 select-none">
        <span>Rental Management System &copy; <a href='https://github.com/DiegoVallejoDev/'>Diego Vallejo</a> {' '} {new Date().getFullYear()} &mdash; Powered by Tauri + React</span>
      </footer>
    </div>
  );
}

function App() {
  const [db, setDb] = useState<Database | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDatabase()
      .then(setDb)
      .catch(e => {
        console.error('Failed to initialize database:', e);
        setError('Could not load application data.');
      });
  }, []);

  const language = db?.settings?.language || 'en';

  return (
    <TranslationProvider language={language}>
      <AppContent db={db} error={error} onDbUpdate={setDb} />
    </TranslationProvider>
  );
}

export default App;
