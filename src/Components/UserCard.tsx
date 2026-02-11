import type { User } from '../Interfaces/User';

interface UserCardProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h3>
                    <p className="text-indigo-600 font-medium text-sm mb-4 leading-relaxed tracking-wide">
                        {user.company}
                    </p>

                    <div className="space-y-2">
                        <div className="flex items-center text-gray-600 text-sm">
                            <span className="mr-2">📧</span> {user.email}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                            <span className="mr-2">📞</span> {user.phone}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <button
                        onClick={() => onEdit(user)}
                        className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-100 transition-colors inline-flex items-center justify-center"
                    >
                        Düzenle
                    </button>
                    <button
                        onClick={() => onDelete(user.id)}
                        className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg font-semibold hover:bg-rose-100 transition-colors inline-flex items-center justify-center"
                    >
                        Sil
                    </button>
                </div>
            </div>
        </div>
    );
};
