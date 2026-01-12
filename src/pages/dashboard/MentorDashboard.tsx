import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BottomNav from '../../components/layout/BottomNav';
import { Bell, Loader2, Users, BookOpen, ClipboardList, Video } from 'lucide-react';

export default function MentorDashboard() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalStudents: 0,
        activeCourses: 0,
        pendingAssignments: 0,
        upcomingClasses: 0
    });

    useEffect(() => {
        // Simulate loading mentor stats
        setTimeout(() => {
            setStats({
                totalStudents: 45,
                activeCourses: 3,
                pendingAssignments: 12,
                upcomingClasses: 2
            });
            setLoading(false);
        }, 500);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

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

            <main className="px-6 py-6 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                        <p className="text-xs text-gray-500 mt-1">Total Students</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                            <BookOpen className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.activeCourses}</p>
                        <p className="text-xs text-gray-500 mt-1">Active Courses</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                            <ClipboardList className="w-6 h-6 text-orange-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.pendingAssignments}</p>
                        <p className="text-xs text-gray-500 mt-1">Pending Reviews</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                            <Video className="w-6 h-6 text-purple-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.upcomingClasses}</p>
                        <p className="text-xs text-gray-500 mt-1">Upcoming Classes</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <Link to="/mentor/students" className="block">
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-[0.99] transition-transform flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Users className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Manage Students</h3>
                                        <p className="text-xs text-gray-500">View and manage your students</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to="/mentor/courses" className="block">
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-[0.99] transition-transform flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">My Courses</h3>
                                        <p className="text-xs text-gray-500">Manage course content</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to="/live-classes" className="block">
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-[0.99] transition-transform flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Video className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Live Classes</h3>
                                        <p className="text-xs text-gray-500">Schedule and manage classes</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
