import { useAuth } from '../context/AuthContext';
import BottomNav from '../components/layout/BottomNav';
import { Button } from '../components/ui/Button';

export default function Profile() {
    const { user, logout } = useAuth();

    return (
        <div className="pb-24 min-h-screen bg-gray-50">
            <header className="bg-white px-6 py-4 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-900">Profile</h1>
            </header>
            <main className="p-6 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                    <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {user?.name?.charAt(0)}
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">{user?.name}</h2>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                    <div className="mt-2 inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium uppercase">
                        {user?.role}
                    </div>
                </div>

                <Button variant="outline" onClick={logout} className="border-red-200 text-red-600 hover:bg-red-50">
                    Log Out
                </Button>
            </main>
            <BottomNav />
        </div>
    );
}
