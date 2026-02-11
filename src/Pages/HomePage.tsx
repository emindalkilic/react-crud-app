import { useState, useEffect } from 'react';
import type { User } from '../Interfaces/User';
import { UserForm } from '../Components/UserForm';
import { UserList } from '../Components/UserList';

export const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [editUser, setEditUser] = useState<User | null>(null);

    const formatPhone = (phone: string) => {
        // Sadece uzantıları (x...) temizle, normal boşlukları koru
        return phone.split(/[\s]?x/i)[0].replace(/\./g, '-');
    };

    // Uygulama başlarken verileri direkt LocalStorage'dan al (Sıfır listeyle başlama)
    const [users, setUsers] = useState<User[]>(() => {
        const saved = localStorage.getItem('app_users');
        return saved ? JSON.parse(saved) : [];
    });

    // Verileri yükle - Sadece liste boşsa API'den çek
    useEffect(() => {
        if (users.length === 0) {
            handleRefresh();
        } else {
            setLoading(false);
        }
    }, []);

    const handleRefresh = () => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => {
                const mappedUsers: User[] = data.map((u: any) => ({
                    id: u.id,
                    name: u.name,
                    email: u.email,
                    phone: formatPhone(u.phone),
                    company: u.company.name
                }));
                setUsers(mappedUsers);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    };

    // Sync to LocalStorage
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('app_users', JSON.stringify(users));
        }
    }, [users, loading]);

    const handleAddOrUpdate = (userData: Omit<User, 'id'> & { id?: number }) => {
        if (userData.id) {
            // Update
            setUsers(prev => prev.map(u => u.id === userData.id ? (userData as User) : u));
            setEditUser(null);
        } else {
            // Create
            const newUser: User = {
                ...userData,
                id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
            };
            setUsers(prev => [newUser, ...prev]);
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
            setUsers(prev => prev.filter(u => u.id !== id));
        }
    };

    const handleEditClick = (user: User) => {
        setEditUser(user);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header Section */}
                <header className="text-center space-y-4">
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight">
                        Vite & <span className="text-indigo-600">React</span> CRUD
                    </h1>
                    <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Modern Javascript araçları ile geliştirilmiş ve LocalStorage destekli kullanıcı yönetim sistemi.
                    </p>
                </header>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                        <span className="text-3xl font-black text-indigo-600">{users.length}</span>
                        <span className="text-gray-400 text-sm font-bold uppercase">Toplam Kullanıcı</span>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                        <span className="text-3xl font-black text-emerald-500">
                            {users.filter(u => u.id > 10).length}
                        </span>
                        <span className="text-gray-400 text-sm font-bold uppercase">Yerel Eklenen</span>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                        <span className="text-3xl font-black text-rose-500">
                            {users.filter(u => u.id <= 10).length}
                        </span>
                        <span className="text-gray-400 text-sm font-bold uppercase">API Kökenli</span>
                    </div>
                </div>

                {/* Action Sections */}
                <div className="space-y-12">
                    <section id="form-section">
                        <UserForm
                            onSubmit={handleAddOrUpdate}
                            editUser={editUser}
                            onCancel={() => setEditUser(null)}
                        />
                    </section>

                    <section>
                        {loading ? (
                            <div className="flex flex-col items-center py-20 animate-pulse">
                                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p className="text-indigo-600 font-bold">Veriler Yükleniyor...</p>
                            </div>
                        ) : (
                            <UserList
                                users={users}
                                onEdit={handleEditClick}
                                onDelete={handleDelete}
                            />
                        )}
                    </section>
                </div>

                {/* Footer */}
                <footer className="pt-12 border-t border-gray-200 text-center text-gray-400 text-sm font-medium">
                    <p>© 2026 Web Geliştirme Eğitimi Projesi</p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <span className="bg-indigo-50 text-indigo-500 px-3 py-1 rounded-md text-xs font-bold">VITE</span>
                        <span className="bg-indigo-50 text-indigo-500 px-3 py-1 rounded-md text-xs font-bold">REACT</span>
                        <span className="bg-indigo-50 text-indigo-500 px-3 py-1 rounded-md text-xs font-bold">TYPESCRIPT</span>
                        <span className="bg-indigo-50 text-indigo-500 px-3 py-1 rounded-md text-xs font-bold">TAILWIND</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};
