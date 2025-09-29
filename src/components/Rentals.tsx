import type { Client, Rental } from '../types';
import { format, isPast } from 'date-fns';
import { useTranslation, formatTranslation } from '../contexts/TranslationContext';

interface RentalsProps {
    rentals: Rental[];
    clients: Client[];
    onAdd: () => void;
    onReturn: (rentalId: number) => void;
    onViewTicket: (rental: Rental) => void;
}

export function Rentals({ rentals, clients, onAdd, onReturn, onViewTicket }: RentalsProps) {
    const { t } = useTranslation();
    const getClientName = (clientId: number) => clients.find(c => c.id === clientId)?.name || 'Cliente Desconocido';

    const getStatus = (rental: Rental): { text: string, className: string } => {
        if (rental.status === 'Returned') {
            return { text: t.returned, className: 'bg-gray-500 text-white' };
        }
        if (isPast(new Date(rental.returnDate))) {
            return { text: t.overdue, className: 'bg-yellow-500 text-black' };
        }
        return { text: t.active, className: 'bg-blue-500 text-white' };
    };

    return (
        <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-950 rounded-2xl p-8 shadow-2xl border border-cyan-900/30">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-extrabold text-cyan-300 tracking-tight drop-shadow-lg flex items-center gap-2">
                    <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0-5V3m-8 9v6a2 2 0 002 2h8a2 2 0 002-2v-6" /></svg>
                    {t.rentalsTitle}
                </h1>
                <button onClick={onAdd} className="bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200 text-base flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    {t.createNewRental}
                </button>
            </div>
            <div className="overflow-x-auto rounded-xl shadow-inner">
                <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
                    <thead className="bg-cyan-950/90">
                        <tr>
                            <th className="text-left py-3 px-4 text-sm font-bold text-cyan-200 uppercase tracking-wider">{t.folio}</th>
                            <th className="text-left py-3 px-4 text-sm font-bold text-cyan-200 uppercase tracking-wider">{t.client}</th>
                            <th className="text-left py-3 px-4 text-sm font-bold text-cyan-200 uppercase tracking-wider">{t.returnDate}</th>
                            <th className="text-left py-3 px-4 text-sm font-bold text-cyan-200 uppercase tracking-wider">{t.total}</th>
                            <th className="text-left py-3 px-4 text-sm font-bold text-cyan-200 uppercase tracking-wider">{t.status}</th>
                            <th className="text-right py-3 px-4 text-sm font-bold text-cyan-200 uppercase tracking-wider">{t.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentals.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-400 text-lg font-medium bg-gray-900/60">{t.noRentalsYet}</td>
                            </tr>
                        )}
                        {rentals.sort((a, b) => b.folio - a.folio).map((rental, idx) => {
                            const status = getStatus(rental);
                            return (
                                <tr key={rental.id} className={`transition-all duration-150 ${idx % 2 === 0 ? 'bg-gray-900/60' : 'bg-gray-800/60'} border-b border-cyan-900/20 hover:bg-cyan-900/30`}>
                                    <td className="py-3 px-4 text-white font-semibold text-base">#{rental.folio}</td>
                                    <td className="py-3 px-4 text-cyan-100">{getClientName(rental.clientId)}</td>
                                    <td className="py-3 px-4 text-cyan-100">{format(new Date(rental.returnDate), 'MMM dd, yyyy HH:mm')}</td>
                                    <td className="py-3 px-4 text-green-400 font-bold text-base">${rental.total.toFixed(2)}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full shadow ${status.className}`}>{status.text}</span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <div className="flex justify-end gap-3 items-center">
                                            <button onClick={() => onViewTicket(rental)} className="text-cyan-300 hover:text-cyan-100 text-sm font-semibold underline underline-offset-2 transition-all duration-150">{t.viewTicket}</button>
                                            {status.text !== t.returned && (
                                                <button
                                                    onClick={() => {
                                                        const confirmMessage = formatTranslation(t.returnConfirmation, {
                                                            folio: rental.folio.toString(),
                                                            client: getClientName(rental.clientId)
                                                        });
                                                        if (window.confirm(confirmMessage)) {
                                                            onReturn(rental.id);
                                                        }
                                                    }}
                                                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-xs font-bold py-1 px-4 rounded-lg shadow transition-all duration-150"
                                                >
                                                    {t.returnRental}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}