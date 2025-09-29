import React, { useState, useEffect } from 'react';
import type { Equipment } from '../types';

type EquipmentFormData = Omit<Equipment, 'id'> & { id?: number };

interface EquipmentFormProps {
    onSave: (equipment: EquipmentFormData) => void;
    onClose: () => void;
    equipmentToEdit?: Equipment | null;
}

const initialFormState: EquipmentFormData = {
    name: '',
    pricePerHour: 0,
    pricePerDay: 0,
    stock: 1,
    availableStock: 1,
    imageBase64: '',
};

export function EquipmentForm({ onSave, onClose, equipmentToEdit }: EquipmentFormProps) {
    const [formData, setFormData] = useState<EquipmentFormData>(initialFormState);

    useEffect(() => {
        if (equipmentToEdit) {
            setFormData(equipmentToEdit);
        } else {
            setFormData(initialFormState);
        }
    }, [equipmentToEdit]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    imageBase64: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Ensure availableStock is set to stock when creating/editing equipment
        const equipmentData = {
            ...formData,
            availableStock: formData.stock
        };
        onSave(equipmentData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">Equipment Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-gray-800 border-gray-700 rounded-md p-2 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label htmlFor="pricePerHour" className="text-sm font-medium text-gray-300">Price / Hour</label>
                    <input type="number" name="pricePerHour" id="pricePerHour" value={formData.pricePerHour} onChange={handleInputChange} min="0" step="0.01" required className="w-full bg-gray-800 border-gray-700 rounded-md p-2 text-white" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="pricePerDay" className="text-sm font-medium text-gray-300">Price / Day</label>
                    <input type="number" name="pricePerDay" id="pricePerDay" value={formData.pricePerDay} onChange={handleInputChange} min="0" step="0.01" required className="w-full bg-gray-800 border-gray-700 rounded-md p-2 text-white" />
                </div>
            </div>
            <div className="space-y-1">
                <label htmlFor="stock" className="text-sm font-medium text-gray-300">Stock Quantity</label>
                <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleInputChange} min="0" step="1" required className="w-full bg-gray-800 border-gray-700 rounded-md p-2 text-white" />
            </div>
            <div className="space-y-1">
                <label htmlFor="image" className="text-sm font-medium text-gray-300">Image</label>
                <input type="file" name="image" id="image" accept="image/png, image/jpeg" onChange={handleImageChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700" />
            </div>
            {formData.imageBase64 && (
                <div className="flex justify-center bg-gray-800 p-2 rounded-md">
                    <img src={formData.imageBase64} alt="Preview" className="max-h-28 object-contain" />
                </div>
            )}
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md">Cancel</button>
                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md">Save Equipment</button>
            </div>
        </form>
    );
}