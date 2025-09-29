import type { AppSettings, Client, Equipment, Rental } from '../types';
import { format } from 'date-fns';

interface RentalTicketProps {
    rental: Rental;
    settings: AppSettings;
    client: Client;
    equipmentList: Equipment[];
    onClose: () => void;
}

export function RentalTicket({ rental, settings, client, equipmentList, onClose }: RentalTicketProps) {
    const getEquipmentName = (id: number) => equipmentList.find(e => e.id === id)?.name || 'Unknown Item';

    return (
        <div className="bg-gray-900 text-white p-4 max-h-[90vh] flex flex-col">
            <div className="no-print flex justify-end gap-4 mb-4">
                <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md">Close</button>
                <button onClick={() => window.print()} className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md">Print Note</button>
            </div>

            <div id="ticket" className="bg-white text-black p-6 rounded-md overflow-y-auto">
                {/* Header */}
                <header className="flex flex-col items-center text-center border-b-2 border-dashed border-gray-400 pb-4">
                    {settings.logoBase64 && <img src={settings.logoBase64} alt="Business Logo" className="max-h-20 mb-4" />}
                    <h1 className="text-2xl font-bold">{settings.businessName}</h1>
                    <p className="text-sm">{settings.address}</p>
                    <p className="text-sm">Tel: {settings.phone}</p>
                </header>

                {/* Info Section */}
                <section className="grid grid-cols-2 gap-4 my-4 text-sm">
                    <div>
                        <h2 className="font-bold">RENTAL NOTE</h2>
                        <p>Folio: <span className="font-mono">#{rental.folio}</span></p>
                        <p>Date: {format(new Date(rental.startDate), 'MMM dd, yyyy HH:mm')}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="font-bold">CLIENT</h2>
                        <p>{client.name}</p>
                        <p>Tel: {client.phone}</p>
                    </div>
                </section>

                {/* Details Table */}
                <section className="my-4">
                    <table className="w-full text-sm">
                        <thead className="border-b-2 border-black">
                            <tr>
                                <th className="text-left font-bold py-1">QTY</th>
                                <th className="text-left font-bold py-1">DESCRIPTION</th>
                                <th className="text-right font-bold py-1">UNIT PRICE</th>
                                <th className="text-right font-bold py-1">SUBTOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rental.details.map((item, index) => {
                                const duration = rental.rentalType === 'Hour'
                                    ? Math.max(1, Math.ceil((new Date(rental.returnDate).getTime() - new Date(rental.startDate).getTime()) / (1000 * 60 * 60)))
                                    : Math.max(1, Math.ceil((new Date(rental.returnDate).getTime() - new Date(rental.startDate).getTime()) / (1000 * 60 * 60 * 24)));
                                const subtotal = item.unitPrice * item.quantity * duration;
                                return (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td className="py-1">{item.quantity}</td>
                                        <td className="py-1">{getEquipmentName(item.equipmentId)}</td>
                                        <td className="text-right py-1">${item.unitPrice.toFixed(2)}</td>
                                        <td className="text-right py-1">${subtotal.toFixed(2)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </section>

                {/* Summary and Total */}
                <section className="flex justify-end my-4">
                    <div className="w-1/2 text-sm">
                        <div className="flex justify-between">
                            <span className="font-bold">START:</span>
                            <span>{format(new Date(rental.startDate), 'MMM dd, yyyy HH:mm')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">RETURN:</span>
                            <span>{format(new Date(rental.returnDate), 'MMM dd, yyyy HH:mm')}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold mt-2 border-t-2 border-black pt-2">
                            <span>TOTAL:</span>
                            <span>${rental.total.toFixed(2)}</span>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t-2 border-dashed border-gray-400 pt-4 mt-8 text-center text-xs">
                    <p className="mb-8">Terms and conditions apply. Renter is responsible for any damage or loss of equipment.</p>
                    <div className="w-4/5 h-px bg-gray-400 mx-auto"></div>
                    <p className="mt-1">Client Signature</p>
                </footer>
            </div>
        </div>
    );
}