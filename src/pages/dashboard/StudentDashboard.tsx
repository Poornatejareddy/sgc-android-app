import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BottomNav from '../../components/layout/BottomNav';
import { Bell, Loader2, BookOpen, ClipboardList, Video, ArrowRight, MessageSquare, Newspaper } from 'lucide-react';
import { studentService } from '../../services/studentService';
import { assignmentService } from '../../services/assignmentService';
import { liveClassService } from '../../services/liveClassService';
import { format } from 'date-fns';

export default function StudentDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [upcomingAssignments, setUpcomingAssignments] = useState<any[]>([]);
    const [nextClass, setNextClass] = useState<any>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsData, assignmentsData, classesData] = await Promise.all([
                    studentService.getDashboardStats(),
                    assignmentService.getMyAssignments().catch(() => []),
                    liveClassService.getUpcomingClasses().catch(() => [])
                ]);

                setStats(statsData);

                // Get pending assignments
                const pending = assignmentsData
                    .filter((a: any) => a.status === 'pending' || !a.status)
                    .slice(0, 3);
                setUpcomingAssignments(pending);

                // Get next live class
                if (classesData.length > 0) {
                    setNextClass(classesData[0]);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
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

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-3">
                    <Link to="/courses" className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-95 transition-transform">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-xs font-semibold text-gray-900">Courses</p>
                    </Link>

                    <Link to="/assignments" className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-95 transition-transform">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                            <ClipboardList className="w-5 h-5 text-orange-600" />
                        </div>
                        <p className="text-xs font-semibold text-gray-900">Assignments</p>
                    </Link>

                    <Link to="/live-classes" className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-95 transition-transform">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                            <Video className="w-5 h-5 text-purple-600" />
                        </div>
                        <p className="text-xs font-semibold text-gray-900">Live Class</p>
                    </Link>

                    <Link to="/forum" className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-95 transition-transform">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                            <MessageSquare className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-xs font-semibold text-gray-900">Forum</p>
                    </Link>

                    <Link to="/blogs" className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-95 transition-transform">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mb-2">
                            <Newspaper className="w-5 h-5 text-pink-600" />
                        </div>
                        <p className="text-xs font-semibold text-gray-900">Blogs</p>
                    </Link>
                </div>

                {/* Next Live Class */}
                {nextClass && (
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Next Live Class</h2>
                        <Link to="/live-classes" className="block">
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-[0.99] transition-transform">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-gray-900 flex-1">{nextClass.title}</h3>
                                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                                        {format(new Date(nextClass.scheduledAt), 'MMM dd')}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    {format(new Date(nextClass.scheduledAt), 'hh:mm a')} • {nextClass.duration} mins
                                </p>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Pending Assignments */}
                {upcomingAssignments.length > 0 && (
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-bold text-gray-900">Pending Assignments</h2>
                            <Link to="/assignments" className="text-sm text-blue-600 font-medium flex items-center gap-1">
                                View All <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {upcomingAssignments.map((assignment: any) => (
                                <Link key={assignment._id} to={`/assignment/${assignment._id}`} className="block">
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-[0.99] transition-transform">
                                        <h3 className="font-semibold text-gray-900 mb-1">{assignment.title}</h3>
                                        <p className="text-xs text-gray-500">Due: {format(new Date(assignment.dueDate), 'MMM dd, yyyy')}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recent Courses */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Continue Learning</h2>
                        {enrolledCourses.length > 0 && (
                            <Link to="/courses" className="text-sm text-blue-600 font-medium">See All</Link>
                        )}
                    </div>

                    <div className="space-y-4">
                        {enrolledCourses.length === 0 ? (
                            <div className="text-center p-8 bg-white rounded-xl border border-gray-100 text-gray-500">
                                <p>No courses enrolled yet.</p>
                            </div>
                        ) : (
                            enrolledCourses.slice(0, 3).map((course: any) => (
                                <Link key={course.id} to={`/course/${course.slug || course.id}`} className="block">
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 shadow-sm active:scale-[0.98] transition-transform">
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
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
