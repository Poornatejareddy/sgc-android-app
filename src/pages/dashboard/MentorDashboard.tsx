import { useAuth } from '../../context/AuthContext';
import BottomNav from '../../components/layout/BottomNav';
import { Bell, Users, FileText } from 'lucide-react';

export default function MentorDashboard() {
    const { user } = useAuth();

    return (
        <div className="pb-24 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-40 border-b border-gray-100">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Hello, {user?.name?.split(' ')[0]}</h1>
                    <p className="text-xs text-gray-500">Mentor Dashboard</p>
                </div>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <Bell className="w-6 h-6" />
                </button>
            </header>

            {/* Content */}
            <main className="px-6 py-6 space-y-6">
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-transform">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                            <Users className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Students</span>
                    </button>
                    <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-transform">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
                            <FileText className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Materials</span>
                    </button>
                </div>

                {/* Overview Stats */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Overview</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Students</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">48</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Active Classes</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
                        </div>
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
