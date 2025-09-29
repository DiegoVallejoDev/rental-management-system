import type { Client as ClientType } from '../types';

interface ClientsProps {
    clients: ClientType[];
    onAdd: () => void;
    onEdit: (client: ClientType) => void;
    onDelete: (clientId: number) => void;
}

export function Clients({ clients, onAdd, onEdit, onDelete }: ClientsProps) {
    return (
        <div className="w-full max-w-6xl mx-auto bg-gray-900 rounded-lg p-8 shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-cyan-400">Clients</h1>
                <button onClick={onAdd} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md">
                    + Add New Client
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg">
                    <thead className="bg-gray-950">
                        <tr>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Name</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Phone</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300 hidden md:table-cell">Address</th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-gray-400">No clients have been added yet.</td>
                            </tr>
                        )}
                        {clients.map((client) => (
                            <tr key={client.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="py-3 px-4 text-white font-medium">{client.name}</td>
                                <td className="py-3 px-4 text-gray-300">{client.phone}</td>
                                <td className="py-3 px-4 text-gray-300 hidden md:table-cell">{client.address}</td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => onEdit(client)} className="text-blue-400 hover:text-blue-300 text-sm font-semibold">Edit</button>
                                        <button onClick={() => onDelete(client.id)} className="text-red-400 hover:text-red-300 text-sm font-semibold">Delete</button>
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