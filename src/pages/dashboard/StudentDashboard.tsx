import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import BottomNav from '../../components/layout/BottomNav';
import { Bell, Loader2 } from 'lucide-react';
import { studentService } from '../../services/studentService';

export default function StudentDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await studentService.getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    const enrolledCourses = stats?.enrolledCourses || [];
    const progressStats = stats?.stats || {};

    return (
        <div className="pb-24 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-40 border-b border-gray-100">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Hello, {user?.name?.split(' ')[0]}</h1>
                    <p className="text-xs text-gray-500">Welcome back to learning</p>
                </div>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <Bell className="w-6 h-6" />
                </button>
            </header>

            {/* Content */}
            <main className="px-6 py-6 space-y-6">
                {/* Stats Card */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
                    <h3 className="text-sm font-medium opacity-90">My Progress</h3>
                    <div className="mt-4 flex justify-between items-end">
                        <div>
                            <span className="text-3xl font-bold">{progressStats.enrolled || 0}</span>
                            <span className="text-sm opacity-80 ml-1">Courses</span>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-bold">{progressStats.avgScore || 0}%</span>
                            <p className="text-xs opacity-80">Avg. Score</p>
                        </div>
                    </div>
                </div>

                {/* Recent Courses */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Continue Learning</h2>
                        {enrolledCourses.length > 0 && (
                            <button className="text-sm text-blue-600 font-medium">See All</button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {enrolledCourses.length === 0 ? (
                            <div className="text-center p-8 bg-white rounded-xl border border-gray-100 text-gray-500">
                                <p>No courses enrolled yet.</p>
                            </div>
                        ) : (
                            enrolledCourses.map((course: any) => (
                                <div key={course.id} className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 shadow-sm active:scale-[0.98] transition-transform">
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                                        {course.image ? (
                                            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold text-xs p-1 text-center">
                                                {course.title.substring(0, 2)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 line-clamp-1">{course.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{course.progress}% Completed</p>
                                        <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
