import React, { useState, useEffect } from 'react';
import type { Client } from '../types';
import { useTranslation } from '../hooks/useTranslation';

type ClientFormData = Omit<Client, 'id'> & { id?: number };

interface ClientFormProps {
    onSave: (client: ClientFormData) => void;
    onClose: () => void;
    clientToEdit?: Client | null;
}

const initialFormState: ClientFormData = {
    name: '',
    phone: '',
    address: '',
};

export function ClientForm({ onSave, onClose, clientToEdit }: ClientFormProps) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<ClientFormData>(initialFormState);

    useEffect(() => {
        if (clientToEdit) {
            setFormData(clientToEdit);
        } else {
            setFormData(initialFormState);
        }
    }, [clientToEdit]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">{t.fullName}</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-gray-800 border-gray-700 rounded-md p-2 text-white" />
            </div>
            <div className="space-y-1">
                <label htmlFor="phone" className="text-sm font-medium text-gray-300">{t.phoneNumber}</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-gray-800 border-gray-700 rounded-md p-2 text-white" />
            </div>
            <div className="space-y-1">
                <label htmlFor="address" className="text-sm font-medium text-gray-300">{t.addressOptional}</label>
                <input type="text" name="address" id="address" value={formData.address || ''} onChange={handleInputChange} className="w-full bg-gray-800 border-gray-700 rounded-md p-2 text-white" />
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md">{t.cancel}</button>
                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md">{t.saveClient}</button>
            </div>
        </form>
    );
}