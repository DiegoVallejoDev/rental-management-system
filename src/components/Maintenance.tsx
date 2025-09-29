import type { MaintenanceRecord, Equipment } from '../types';
import { format } from 'date-fns';
import { useTranslation, formatTranslation } from '../contexts/TranslationContext';

interface MaintenanceProps {
    maintenance: MaintenanceRecord[];
    equipment: Equipment[];
    onAdd: () => void;
    onEdit: (maintenance: MaintenanceRecord) => void;
    onComplete: (maintenanceId: number) => void;
}

export function Maintenance({ maintenance, equipment, onAdd, onEdit, onComplete }: MaintenanceProps) {
    const { t } = useTranslation();

    const getEquipmentName = (equipmentId: number) => {
        return equipment.find(e => e.id === equipmentId)?.name || 'Unknown Equipment';
    };

    const getStatusColor = (status: MaintenanceRecord['status']) => {
        switch (status) {
            case 'In Maintenance':
                return 'bg-yellow-500 text-black';
            case 'Completed':
                return 'bg-green-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-orange-950 rounded-2xl p-8 shadow-2xl border border-orange-900/30">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-extrabold text-orange-300 tracking-tight drop-shadow-lg flex items-center gap-2">
                    <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t.maintenanceTitle}
                </h1>
                <button onClick={onAdd} className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200 text-base flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    {t.addMaintenanceRecord}
                </button>
            </div>

            <div className="overflow-x-auto rounded-xl shadow-inner">
                <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
                    <thead className="bg-orange-950/90">
                        <tr>
                            <th className="text-left py-3 px-4 text-sm font-bold text-orange-200 uppercase tracking-wider">{t.equipmentName}</th>
                            <th className="text-left py-3 px-4 text-sm font-bold text-orange-200 uppercase tracking-wider">{t.maintenanceQuantity}</th>
                            <th className="text-left py-3 px-4 text-sm font-bold text-orange-200 uppercase tracking-wider">{t.maintenanceReason}</th>
                            <th className="text-left py-3 px-4 text-sm font-bold text-orange-200 uppercase tracking-wider">{t.maintenanceStartDate}</th>
                            <th className="text-left py-3 px-4 text-sm font-bold text-orange-200 uppercase tracking-wider">{t.expectedReturnDate}</th>
                            <th className="text-left py-3 px-4 text-sm font-bold text-orange-200 uppercase tracking-wider">{t.status}</th>
                            <th className="text-right py-3 px-4 text-sm font-bold text-orange-200 uppercase tracking-wider">{t.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintenance.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-8 text-gray-400 text-lg font-medium bg-gray-900/60">
                                    {t.noMaintenanceYet}
                                </td>
                            </tr>
                        )}
                        {maintenance
                            .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                            .map((record, idx) => (
                                <tr key={record.id} className={`transition-all duration-150 ${idx % 2 === 0 ? 'bg-gray-900/60' : 'bg-gray-800/60'} border-b border-orange-900/20 hover:bg-orange-900/30`}>
                                    <td className="py-3 px-4 text-orange-100 font-medium">{getEquipmentName(record.equipmentId)}</td>
                                    <td className="py-3 px-4 text-orange-100">{record.quantity}</td>
                                    <td className="py-3 px-4 text-orange-100">{record.reason}</td>
                                    <td className="py-3 px-4 text-orange-100">{format(new Date(record.startDate), 'MMM dd, yyyy')}</td>
                                    <td className="py-3 px-4 text-orange-100">
                                        {record.expectedReturnDate ? format(new Date(record.expectedReturnDate), 'MMM dd, yyyy') : '-'}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full shadow ${getStatusColor(record.status)}`}>
                                            {record.status === 'In Maintenance' ? t.inMaintenance : t.maintenanceCompleted}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <div className="flex justify-end gap-3 items-center">
                                            <button
                                                onClick={() => onEdit(record)}
                                                className="text-orange-300 hover:text-orange-100 text-sm font-semibold underline underline-offset-2 transition-all duration-150"
                                            >
                                                {t.edit}
                                            </button>
                                            {record.status === 'In Maintenance' && (
                                                <button
                                                    onClick={() => {
                                                        const confirmMessage = formatTranslation(t.returnMaintenanceConfirmation, {
                                                            quantity: record.quantity.toString(),
                                                            equipment: getEquipmentName(record.equipmentId)
                                                        });
                                                        if (window.confirm(confirmMessage)) {
                                                            onComplete(record.id);
                                                        }
                                                    }}
                                                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-xs font-bold py-1 px-4 rounded-lg shadow transition-all duration-150"
                                                >
                                                    {t.returnFromMaintenance}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}