import type { Equipment as EquipmentType } from '../types';
import { useTranslation, formatTranslation } from '../contexts/TranslationContext';

interface EquipmentProps {
    equipment: EquipmentType[];
    onAdd: () => void;
    onEdit: (equipment: EquipmentType) => void;
    onDelete: (equipmentId: number) => void;
    onSendToMaintenance: (equipment: EquipmentType) => void;
}

export function Equipment({ equipment, onAdd, onEdit, onDelete, onSendToMaintenance }: EquipmentProps) {
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-purple-950 rounded-2xl p-8 shadow-2xl border border-purple-900/30">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-extrabold text-purple-300 tracking-tight drop-shadow-lg flex items-center gap-2">
                    <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    {t.equipmentTitle}
                </h1>
                <button onClick={onAdd} className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200 text-base flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    {t.addNewEquipment}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {equipment.length === 0 && (
                    <p className="text-gray-400 col-span-full text-center text-lg font-medium py-8">{t.noEquipmentYet}</p>
                )}
                {equipment.map((item) => (
                    <div key={item.id} className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg flex flex-col border border-purple-900/20 hover:border-purple-700/40 transition-all duration-200">
                        <img src={item.imageBase64 || 'https://via.placeholder.com/300x200?text=No+Image'} alt={item.name} className="w-full h-40 object-cover bg-gray-700" />
                        <div className="p-4 flex-grow flex flex-col">
                            <h3 className="text-lg font-bold text-white mb-3">{item.name}</h3>
                            <div className="text-sm text-gray-300 space-y-2 mb-4 flex-grow">
                                <p className="flex justify-between">
                                    <span>{t.pricePerHour}:</span>
                                    <span className="font-semibold text-green-400">${item.pricePerHour.toFixed(2)}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>{t.pricePerDay}:</span>
                                    <span className="font-semibold text-green-400">${item.pricePerDay.toFixed(2)}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>{t.stock}:</span>
                                    <span className="font-semibold text-yellow-400">{item.stock}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>{t.availableStock}:</span>
                                    <span className="font-semibold text-cyan-400">{item.availableStock}</span>
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                <button onClick={() => onEdit(item)} className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-xs font-bold py-1 px-3 rounded-md transition-all duration-150 flex-1">
                                    {t.edit}
                                </button>
                                <button onClick={() => onDelete(item.id)} className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white text-xs font-bold py-1 px-3 rounded-md transition-all duration-150 flex-1">
                                    {t.delete}
                                </button>
                                {item.availableStock > 0 && (
                                    <button
                                        onClick={() => {
                                            const confirmMessage = formatTranslation(t.maintenanceConfirmation, {
                                                quantity: '1',
                                                equipment: item.name
                                            });
                                            if (window.confirm(confirmMessage)) {
                                                onSendToMaintenance(item);
                                            }
                                        }}
                                        className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white text-xs font-bold py-1 px-3 rounded-md transition-all duration-150 w-full mt-1"
                                    >
                                        {t.sendToMaintenance}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}