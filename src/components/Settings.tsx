import React, { useEffect, useState } from 'react';
import { downloadDir } from '@tauri-apps/api/path';
import { open, save } from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import { useTranslation } from '../hooks/useTranslation';
import { readDatabaseContent, writeDatabaseContent } from '../services/database';
import type { AppSettings } from '../types';

interface SettingsProps {
    settings: AppSettings;
    onSave: (newSettings: AppSettings) => Promise<void>;
    onImport: () => void;
}

export function Settings({ settings, onSave, onImport }: SettingsProps) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<AppSettings>(settings);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        setFormData(settings);
    }, [settings]);

    const showMessage = (text: string, type: 'success' | 'error') => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 4000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
        }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, logoBase64: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave({ ...formData, language: 'en' });
        showMessage(t.settingsSaved, 'success');
    };

    const handleExport = async () => {
        try {
            const dbContent = await readDatabaseContent();
            const defaultPath = await downloadDir();
            const filePath = await save({
                title: 'Save Backup',
                defaultPath: `${defaultPath}/rental-backup-${new Date().toJSON()}.json`,
                filters: [{ name: 'JSON', extensions: ['json'] }]
            });

            if (filePath) {
                await writeTextFile(filePath, dbContent);
                showMessage(t.backupExported, 'success');
            }
        } catch (err) {
            console.error(err);
            showMessage(t.exportFailed, 'error');
        }
    };

    const handleImport = async () => {
        try {
            const filePath = await open({
                title: 'Import Backup',
                multiple: false,
                filters: [{ name: 'JSON', extensions: ['json'] }]
            });

            if (filePath && typeof filePath === 'string') {
                if (!window.confirm(t.importConfirmation)) return;

                await writeDatabaseContent(await readTextFile(filePath));
                showMessage(t.backupImported, 'success');
                setTimeout(() => {
                    onImport();
                }, 1200);
            }
        } catch (err) {
            console.error(err);
            showMessage(t.importFailed, 'error');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-lg p-8 shadow-lg space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className="text-3xl font-bold text-cyan-400 border-b border-gray-700 pb-4">{t.businessConfiguration}</h1>

                {message.text && (
                    <div className={`p-3 rounded-md text-white ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-1">{t.businessName}</label>
                        <input
                            type="text"
                            name="businessName"
                            id="businessName"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">{t.phone}</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">{t.address}</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>

                <div>
                    <label htmlFor="nextInvoiceNumber" className="block text-sm font-medium text-gray-300 mb-1">{t.nextInvoiceNumber}</label>
                    <input
                        type="number"
                        name="nextInvoiceNumber"
                        id="nextInvoiceNumber"
                        value={formData.nextInvoiceNumber}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>

                <div>
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-300 mb-1">{t.businessLogo}</label>
                    <input
                        type="file"
                        id="logo"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                    />
                    {formData.logoBase64 && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-400 mb-2">{t.logoPreview}</p>
                            <img src={formData.logoBase64} alt="Business logo preview" className="max-h-24 rounded-md bg-white p-2" />
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-md">
                        {t.saveSettings}
                    </button>
                </div>
            </form>

            <div className="border-t border-gray-700 pt-8 space-y-4">
                <h2 className="text-2xl font-bold text-cyan-400">{t.dataManagement}</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">
                        {t.exportBackup}
                    </button>
                    <button onClick={handleImport} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md">
                        {t.importBackup}
                    </button>
                </div>
            </div>
        </div>
    );
}
