import React, { useEffect, useState } from 'react';
import type { AppSettings } from '../types';
import { save, open } from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';
import { downloadDir } from '@tauri-apps/api/path';
import { useTranslation } from '../hooks/useTranslation';

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
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, logoBase64: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(formData);
        showMessage(t.settingsSaved, 'success');
    };

    const findDatabaseFile = async (): Promise<string> => {
        // Try to read from AppData first
        try {
            const content = await readTextFile('database.json', { baseDir: BaseDirectory.AppData });
            return content;
        } catch {
            console.warn('Database file not found in AppData, trying fallbacks...');

            // Try AppLocalData
            try {
                const content = await readTextFile('database.json', { baseDir: BaseDirectory.AppLocalData });
                return content;
            } catch {
                console.warn('Database file not found in AppLocalData, trying Document directory...');

                // Try Document directory
                try {
                    const content = await readTextFile('database.json', { baseDir: BaseDirectory.Document });
                    return content;
                } catch {
                    throw new Error('Database file not found in any location');
                }
            }
        }
    };

    const handleExport = async () => {
        try {
            const dbContent = await findDatabaseFile();
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

    const writeToDatabase = async (content: string): Promise<void> => {
        // Try to write to AppData first
        try {
            await writeTextFile('database.json', content, { baseDir: BaseDirectory.AppData });
        } catch {
            console.warn('Failed to write to AppData, trying AppLocalData...');

            // Try AppLocalData
            try {
                await writeTextFile('database.json', content, { baseDir: BaseDirectory.AppLocalData });
            } catch {
                console.warn('Failed to write to AppLocalData, trying Document directory...');

                // Try Document directory as final fallback
                await writeTextFile('database.json', content, { baseDir: BaseDirectory.Document });
            }
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
                if (!window.confirm(t.importConfirmation)) {
                    return;
                }
                const backupContent = await readTextFile(filePath.toString());
                await writeToDatabase(backupContent);
                showMessage(t.backupImported, 'success');
                setTimeout(() => {
                    onImport(); // Reload the app
                }, 2000);
            }
        } catch (err) {
            console.error(err);
            showMessage(t.importFailed, 'error');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Business Configuration Form */}
            <div className="bg-gray-900 rounded-lg p-8 shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">{t.businessConfiguration}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="businessName" className="block text-sm font-medium text-gray-300">{t.businessName}</label>
                            <input type="text" name="businessName" id="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">{t.phone}</label>
                            <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="language" className="block text-sm font-medium text-gray-300">{t.language}</label>
                            <select name="language" id="language" value={formData.language} onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value as 'es' | 'en' }))} className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500">
                                <option value="es">Español</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-300">{t.address}</label>
                        <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <div className="space-y-2">
                            <label htmlFor="nextInvoiceNumber" className="block text-sm font-medium text-gray-300">{t.nextInvoiceNumber}</label>
                            <input type="number" name="nextInvoiceNumber" id="nextInvoiceNumber" value={formData.nextInvoiceNumber} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="logo" className="block text-sm font-medium text-gray-300">{t.businessLogo}</label>
                            <input type="file" name="logo" id="logo" accept="image/png, image/jpeg" onChange={handleLogoChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700" />
                        </div>
                    </div>
                    {formData.logoBase64 && (
                        <div className="space-y-2">
                            <p className="block text-sm font-medium text-gray-300">{t.logoPreview}</p>
                            <div className="mt-2 p-4 border border-dashed border-gray-600 rounded-md flex justify-center bg-gray-800">
                                <img src={formData.logoBase64} alt="Logo Preview" className="max-h-24" />
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end items-center pt-4">
                        <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300">
                            {t.saveSettings}
                        </button>
                    </div>
                </form>
            </div>

            {/* Backup and Restore Section */}
            <div className="bg-gray-900 rounded-lg p-8 shadow-lg mt-8">
                <h2 className="text-2xl font-bold mb-4 text-cyan-400">{t.dataManagement}</h2>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <button onClick={handleExport} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                        {t.exportBackup}
                    </button>
                    <button onClick={handleImport} className="w-full md:w-auto bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md">
                        {t.importBackup}
                    </button>
                    <div className="flex-grow h-10">
                        {message.text && (
                            <p className={`text-sm font-semibold ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message.text}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}