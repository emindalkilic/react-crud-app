import { useState, useEffect } from 'react';
import type { User } from '../Interfaces/User';

interface UserFormProps {
    onSubmit: (user: Omit<User, 'id'> & { id?: number }) => void;
    editUser: User | null;
    onCancel: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onSubmit, editUser, onCancel }) => {
    const [formData, setFormData] = useState<Omit<User, 'id'>>({
        name: '',
        email: '',
        phone: '',
        company: ''
    });

    useEffect(() => {
        if (editUser) {
            setFormData({
                name: editUser.name,
                email: editUser.email,
                phone: editUser.phone,
                company: editUser.company
            });
        } else {
            setFormData({ name: '', email: '', phone: '', company: '' });
        }
    }, [editUser]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...formData, id: editUser?.id });
        setFormData({ name: '', email: '', phone: '', company: '' });
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-3 text-indigo-600">{editUser ? '✏️' : '➕'}</span>
                {editUser ? 'Kullanıcıyı Güncelle' : 'Yeni Kullanıcı Ekle'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Ad Soyad</label>
                    <input
                        type="text"
                        required
                        placeholder="Örn: Ahmet Yılmaz"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50/50"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        required
                        placeholder="Örn: ahmet@mail.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50/50"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Telefon</label>
                    <input
                        type="text"
                        required
                        placeholder="Örn: 0532 123 4567"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50/50"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Şirket</label>
                    <input
                        type="text"
                        required
                        placeholder="Örn: ABC Teknoloji"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50/50"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                </div>

                <div className="md:col-span-2 flex space-x-4 mt-2">
                    <button
                        type="submit"
                        className="flex-1 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transform transition-all active:scale-95 shadow-lg shadow-indigo-100 uppercase tracking-wider"
                    >
                        {editUser ? 'Güncelle' : 'Kullanıcıyı Kaydet'}
                    </button>

                    {editUser && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all uppercase tracking-wider"
                        >
                            Vazgeç
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
