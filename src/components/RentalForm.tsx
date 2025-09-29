import { useState, useMemo } from 'react';
import type { Client, Equipment, Rental } from '../types';
import { differenceInHours, differenceInCalendarDays, format } from 'date-fns';
import { useTranslation } from '../hooks/useTranslation';

type RentalFormData = Omit<Rental, 'id' | 'folio' | 'status' | 'total'>;
type CartItem = { equipment: Equipment; quantity: number };

interface RentalFormProps {
    clients: Client[];
    equipment: Equipment[];
    onSave: (rentalData: RentalFormData, total: number) => void;
    onClose: () => void;
}

export function RentalForm({ clients, equipment, onSave, onClose }: RentalFormProps) {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [clientId, setClientId] = useState<number | ''>('');
    const [rentalType, setRentalType] = useState<'Hour' | 'Day'>('Hour');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
    const [returnDate, setReturnDate] = useState('');

    const availableEquipment = useMemo(() => {
        return equipment.filter(e => {
            const inCart = cart.find(item => item.equipment.id === e.id);
            const remainingStock = e.stock - (inCart?.quantity || 0);
            return remainingStock > 0;
        });
    }, [equipment, cart]);

    const total = useMemo(() => {
        if (!startDate || !returnDate || cart.length === 0) return 0;
        const start = new Date(startDate);
        const end = new Date(returnDate);
        if (end <= start) return 0;

        let duration = 0;
        if (rentalType === 'Hour') {
            duration = differenceInHours(end, start);
        } else {
            duration = differenceInCalendarDays(end, start) + 1; // inclusive of start and end day
        }
        duration = Math.max(1, duration);

        return cart.reduce((acc, item) => {
            const price = rentalType === 'Hour' ? item.equipment.pricePerHour : item.equipment.pricePerDay;
            return acc + (price * item.quantity * duration);
        }, 0);
    }, [cart, rentalType, startDate, returnDate]);

    const addToCart = (item: Equipment) => {
        setCart(prev => {
            const existing = prev.find(i => i.equipment.id === item.id);
            if (existing) {
                if (existing.quantity < item.stock) {
                    return prev.map(i => i.equipment.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
                }
                return prev;
            }
            return [...prev, { equipment: item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId: number) => {
        setCart(prev => prev.filter(i => i.equipment.id !== itemId));
    };

    const handleSubmit = () => {
        const rentalData: RentalFormData = {
            clientId: Number(clientId),
            rentalType,
            startDate: new Date(startDate).toISOString(),
            returnDate: new Date(returnDate).toISOString(),
            details: cart.map(item => ({
                equipmentId: item.equipment.id,
                quantity: item.quantity,
                unitPrice: rentalType === 'Hour' ? item.equipment.pricePerHour : item.equipment.pricePerDay,
                subtotal: 0 // Will be calculated again on display if needed
            }))
        };
        onSave(rentalData, total);
    };

    return (
        <div>
            {/* Step 1: Client and Type */}
            {step === 1 && (
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">{t.step} 1: {t.selectClient} {t.rentalTypeLabel}</h3>
                    <div>
                        <label className="text-sm">{t.client}</label>
                        <select value={clientId} onChange={e => setClientId(Number(e.target.value))} className="w-full bg-gray-800 p-2 rounded-md">
                            <option value="" disabled>{t.selectAClient}</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm">{t.rentalTypeLabel}</label>
                        <div className="flex gap-4 mt-1">
                            <button onClick={() => setRentalType('Hour')} className={`flex-1 p-2 rounded-md ${rentalType === 'Hour' ? 'bg-cyan-600' : 'bg-gray-700'}`}>{t.byHour}</button>
                            <button onClick={() => setRentalType('Day')} className={`flex-1 p-2 rounded-md ${rentalType === 'Day' ? 'bg-cyan-600' : 'bg-gray-700'}`}>{t.byDay}</button>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button onClick={() => setStep(2)} disabled={!clientId} className="bg-blue-600 px-4 py-2 rounded-md disabled:bg-gray-600">{t.next}</button>
                    </div>
                </div>
            )}

            {/* Step 2: Select Equipment */}
            {step === 2 && (
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">{t.step} 2: {t.selectEquipment}</h3>
                    <div className="grid grid-cols-2 gap-4 max-h-96">
                        {/* Left: Available Equipment */}
                        <div className="space-y-2 overflow-y-auto pr-2">
                            <h4 className="font-semibold">{t.available}</h4>
                            {availableEquipment.map(e => (
                                <div key={e.id} className="bg-gray-800 p-2 rounded-md flex justify-between items-center">
                                    <span>{e.name} <span className="text-xs text-gray-400">({t.stock}: {e.stock})</span></span>
                                    <button onClick={() => addToCart(e)} className="bg-green-600 text-xs px-2 py-1 rounded-md">+</button>
                                </div>
                            ))}
                        </div>
                        {/* Right: Cart */}
                        <div className="space-y-2 overflow-y-auto pr-2">
                            <h4 className="font-semibold">{t.selected}</h4>
                            {cart.map(item => (
                                <div key={item.equipment.id} className="bg-gray-700 p-2 rounded-md flex justify-between items-center">
                                    <span>{item.equipment.name} (x{item.quantity})</span>
                                    <button onClick={() => removeFromCart(item.equipment.id)} className="bg-red-600 text-xs px-2 py-1 rounded-md">-</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between pt-4">
                        <button onClick={() => setStep(1)} className="bg-gray-600 px-4 py-2 rounded-md">{t.back}</button>
                        <button onClick={() => setStep(3)} disabled={cart.length === 0} className="bg-blue-600 px-4 py-2 rounded-md disabled:bg-gray-600">{t.next}</button>
                    </div>
                </div>
            )}

            {/* Step 3: Dates and Confirmation */}
            {step === 3 && (
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">{t.step} 3: {t.setDatesAndConfirm}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm">{t.startDateTime}</label>
                            <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-gray-800 p-2 rounded-md" />
                        </div>
                        <div>
                            <label className="text-sm">{t.returnDateTime}</label>
                            <input type="datetime-local" value={returnDate} onChange={e => setReturnDate(e.target.value)} className="w-full bg-gray-800 p-2 rounded-md" />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold">{t.summary}</h4>
                        <div className="bg-gray-800 p-3 mt-2 rounded-md space-y-1 text-sm">
                            <p>{t.client}: {clients.find(c => c.id === clientId)?.name}</p>
                            <p>{t.items}: {cart.reduce((sum, i) => sum + i.quantity, 0)}</p>
                            <p className="text-lg font-bold">{t.total}: <span className="text-green-400">${total.toFixed(2)}</span></p>
                        </div>
                    </div>
                    <div className="flex justify-between pt-4">
                        <button onClick={onClose} className="bg-gray-500 px-4 py-2 rounded-md">{t.cancel}</button>
                        <div className="flex gap-2">
                            <button onClick={() => setStep(2)} className="bg-gray-600 px-4 py-2 rounded-md">{t.back}</button>
                            <button onClick={handleSubmit} disabled={total <= 0} className="bg-green-600 px-4 py-2 rounded-md disabled:bg-gray-600">{t.confirmRental}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}