import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import BottomNav from '../components/layout/BottomNav';
import { LogOut, User, Mail, Moon, Sun } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/welcome');
    };

    return (
        <div className="pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <header className="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-30">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Profile</h1>
            </header>

            <main className="p-6 space-y-6">
                {/* User Info */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                            <Mail className="w-5 h-5" />
                            <span className="text-sm">{user?.email}</span>
                        </div>
                    </div>
                </div>

                {/* Theme Toggle */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Appearance</h3>
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            {isDark ? (
                                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            ) : (
                                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            )}
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {isDark ? 'Dark Mode' : 'Light Mode'}
                            </span>
                        </div>
                        <div className={`w-12 h-6 rounded-full transition-colors ${isDark ? 'bg-blue-600' : 'bg-gray-300'} relative`}>
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${isDark ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </div>
                    </button>
                </div>

                {/* Logout Button */}
                <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                </Button>
            </main>

            <BottomNav />
        </div>
    );
}
