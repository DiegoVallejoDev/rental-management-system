import { isPast } from 'date-fns';
import { useMemo } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { AuditEvent, Equipment, MaintenanceRecord, Rental } from '../types';

interface DashboardProps {
    rentals: Rental[];
    equipment: Equipment[];
    maintenance: MaintenanceRecord[];
    auditLog: AuditEvent[];
}

export function Dashboard({ rentals, equipment, maintenance, auditLog }: DashboardProps) {
    const { t } = useTranslation();

    const metrics = useMemo(() => {
        const activeRentals = rentals.filter(rental => rental.status !== 'Returned');
        const overdueRentals = activeRentals.filter(rental => isPast(new Date(rental.returnDate)));
        const maintenanceUnits = maintenance.reduce((sum, record) => (
            record.status === 'In Maintenance' ? sum + record.quantity : sum
        ), 0);
        const revenue = rentals.reduce((sum, rental) => sum + rental.total, 0);
        const totalStock = equipment.reduce((sum, item) => sum + item.stock, 0);
        const availableStock = equipment.reduce((sum, item) => sum + item.availableStock, 0);

        return {
            activeRentals: activeRentals.length,
            overdueRentals: overdueRentals.length,
            maintenanceUnits,
            revenue,
            totalStock,
            availableStock,
        };
    }, [equipment, maintenance, rentals]);

    const recentAudit = useMemo(
        () => [...auditLog].sort((a, b) => b.id - a.id).slice(0, 5),
        [auditLog]
    );

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6">
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Metric label={t.activeRentalsMetric} value={metrics.activeRentals.toString()} />
                <Metric label={t.overdueRentalsMetric} value={metrics.overdueRentals.toString()} />
                <Metric label={t.maintenanceUnitsMetric} value={metrics.maintenanceUnits.toString()} />
                <Metric label={t.revenueMetric} value={`$${metrics.revenue.toFixed(2)}`} />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-xl p-6 border border-cyan-900/30 shadow-lg">
                    <h2 className="text-xl font-bold text-cyan-300 mb-4">{t.inventoryHealth}</h2>
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>{t.availableStock}</span>
                        <span>{metrics.availableStock} / {metrics.totalStock}</span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-cyan-500"
                            style={{ width: `${metrics.totalStock === 0 ? 0 : (metrics.availableStock / metrics.totalStock) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-cyan-900/30 shadow-lg">
                    <h2 className="text-xl font-bold text-cyan-300 mb-4">{t.recentAudit}</h2>
                    {recentAudit.length === 0 && <p className="text-gray-400">{t.noAuditEvents}</p>}
                    <ul className="space-y-3">
                        {recentAudit.map(event => (
                            <li key={event.id} className="border-b border-gray-800 pb-2 last:border-0">
                                <p className="text-white text-sm">{event.summary}</p>
                                <p className="text-gray-500 text-xs">{new Date(event.createdAt).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}

function Metric({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-gradient-to-br from-gray-900 to-cyan-950 rounded-xl p-5 border border-cyan-900/30 shadow-lg">
            <p className="text-sm text-cyan-200 uppercase tracking-wide">{label}</p>
            <p className="text-3xl font-extrabold text-white mt-2">{value}</p>
        </div>
    );
}
