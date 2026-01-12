import { Home, BookOpen, User, MessageSquare } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { name: 'Home', icon: <Home className="w-6 h-6" />, path: '/' },
        { name: 'Courses', icon: <BookOpen className="w-6 h-6" />, path: '/courses' },
        { name: 'Chat', icon: <MessageSquare className="w-6 h-6" />, path: '/messages' },
        { name: 'Profile', icon: <User className="w-6 h-6" />, path: '/profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 pb-6 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
            {tabs.map((tab) => {
                const isActive = location.pathname === tab.path;
                return (
                    <button
                        key={tab.name}
                        onClick={() => navigate(tab.path)}
                        className={cn(
                            "flex flex-col items-center gap-1 transition-colors",
                            isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                        )}
                    >
                        {tab.icon}
                        <span className="text-[10px] font-medium">{tab.name}</span>
                    </button>
                );
            })}
        </div>
    );
}
