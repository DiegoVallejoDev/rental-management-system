import React, { useState, useEffect } from 'react';
import type { MaintenanceRecord, Equipment } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { formatTranslation } from '../utils/translations';

interface MaintenanceFormProps {
    onSave: (maintenanceData: Omit<MaintenanceRecord, 'id'>) => void;
    onClose: () => void;
    equipment: Equipment[];
    maintenanceToEdit?: MaintenanceRecord | null;
}

export function MaintenanceForm({ onSave, onClose, equipment, maintenanceToEdit }: MaintenanceFormProps) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<{
        equipmentId: number;
        quantity: number;
        reason: string;
        startDate: string;
        expectedReturnDate: string;
        actualReturnDate: string;
        status: 'In Maintenance' | 'Completed';
        cost: number;
        notes: string;
    }>({
        equipmentId: 0,
        quantity: 1,
        reason: '',
        startDate: new Date().toISOString().split('T')[0],
        expectedReturnDate: '',
        actualReturnDate: '',
        status: 'In Maintenance',
        cost: 0,
        notes: ''
    });

    useEffect(() => {
        if (maintenanceToEdit) {
            setFormData({
                equipmentId: maintenanceToEdit.equipmentId,
                quantity: maintenanceToEdit.quantity || 1,
                reason: maintenanceToEdit.reason,
                startDate: maintenanceToEdit.startDate,
                expectedReturnDate: maintenanceToEdit.expectedReturnDate || '',
                actualReturnDate: maintenanceToEdit.actualReturnDate || '',
                status: maintenanceToEdit.status,
                cost: maintenanceToEdit.cost || 0,
                notes: maintenanceToEdit.notes || ''
            });
        }
    }, [maintenanceToEdit]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prev => {
            const newData = { ...prev };

            if (name === 'equipmentId') {
                newData.equipmentId = parseInt(value) || 0;
                newData.quantity = 1; // Reset quantity when equipment changes
            } else if (name === 'quantity') {
                newData.quantity = Math.max(1, parseInt(value) || 1);
            } else if (name === 'cost') {
                newData.cost = parseFloat(value) || 0;
            } else if (name === 'reason') {
                newData.reason = value;
            } else if (name === 'startDate') {
                newData.startDate = value;
            } else if (name === 'expectedReturnDate') {
                newData.expectedReturnDate = value;
            } else if (name === 'actualReturnDate') {
                newData.actualReturnDate = value;
            } else if (name === 'status') {
                newData.status = value as 'In Maintenance' | 'Completed';
            } else if (name === 'notes') {
                newData.notes = value;
            }

            return newData;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.equipmentId === 0 || !formData.reason.trim()) {
            alert(t.fillRequiredFields);
            return;
        }

        if (formData.quantity <= 0) {
            alert(t.quantityMustBeGreaterThanZero);
            return;
        }

        const selectedEquipment = equipment.find(eq => eq.id === formData.equipmentId);
        if (!selectedEquipment) {
            alert(t.selectValidEquipment);
            return;
        }

        // Check if we have enough available stock for maintenance
        const isEditing = maintenanceToEdit && maintenanceToEdit.id > 0;
        const originalQuantity = isEditing ? (maintenanceToEdit.quantity || 0) : 0;
        const availableForThisMaintenance = selectedEquipment.availableStock + originalQuantity;

        if (formData.quantity > availableForThisMaintenance) {
            const message = formatTranslation(t.notEnoughStockForMaintenance, {
                availableStock: availableForThisMaintenance.toString()
            });
            alert(message);
            return;
        }

        onSave(formData);
    };

    const getAvailableStock = (equipmentId: number) => {
        const eq = equipment.find(e => e.id === equipmentId);
        return eq ? eq.availableStock : 0;
    };

    return (
        <div className="bg-gray-900 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="equipmentId" className="block text-sm font-medium text-gray-300 mb-1">
                            {t.equipmentName} *
                        </label>
                        <select
                            name="equipmentId"
                            id="equipmentId"
                            value={formData.equipmentId}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            required
                        >
                            <option value={0}>{t.selectEquipment}</option>
                            {equipment.map(eq => (
                                <option key={eq.id} value={eq.id}>
                                    {eq.name} ({t.availableStock}: {eq.availableStock})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">
                            {t.maintenanceQuantity} *
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            min="1"
                            max={formData.equipmentId ? (
                                maintenanceToEdit && maintenanceToEdit.id > 0 ?
                                    getAvailableStock(formData.equipmentId) + (maintenanceToEdit.quantity || 0) :
                                    getAvailableStock(formData.equipmentId)
                            ) : 1}
                            value={formData.quantity || 1}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-1">
                        {t.maintenanceReason} *
                    </label>
                    <input
                        type="text"
                        name="reason"
                        id="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1">
                            {t.maintenanceStartDate} *
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            id="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="expectedReturnDate" className="block text-sm font-medium text-gray-300 mb-1">
                            {t.expectedReturnDate}
                        </label>
                        <input
                            type="date"
                            name="expectedReturnDate"
                            id="expectedReturnDate"
                            value={formData.expectedReturnDate}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        />
                    </div>
                </div>

                {formData.status === 'Completed' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="actualReturnDate" className="block text-sm font-medium text-gray-300 mb-1">
                                {t.actualReturnDate}
                            </label>
                            <input
                                type="date"
                                name="actualReturnDate"
                                id="actualReturnDate"
                                value={formData.actualReturnDate}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="cost" className="block text-sm font-medium text-gray-300 mb-1">
                                {t.maintenanceCost}
                            </label>
                            <input
                                type="number"
                                name="cost"
                                id="cost"
                                min="0"
                                step="0.01"
                                value={formData.cost}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
                        {t.status}
                    </label>
                    <select
                        name="status"
                        id="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                    >
                        <option value="In Maintenance">{t.inMaintenance}</option>
                        <option value="Completed">{t.maintenanceCompleted}</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">
                        {t.maintenanceNotes}
                    </label>
                    <textarea
                        name="notes"
                        id="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200"
                    >
                        {t.cancel}
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800 text-white font-bold rounded-md transition-all duration-200"
                    >
                        {t.save}
                    </button>
                </div>
            </form>
        </div>
    );
}