import { useEffect, useState } from 'react';
import BottomNav from '../components/layout/BottomNav';
import { courseService, type Course } from '../services/courseService';
import { Loader2, Search } from 'lucide-react';
import { Input } from '../components/ui/Input';

export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await courseService.getAllCourses();
                setCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pb-24 min-h-screen bg-gray-50">
            <header className="bg-white px-6 py-4 border-b border-gray-100 sticky top-0 z-30">
                <h1 className="text-xl font-bold text-gray-900 mb-4">Courses</h1>
                <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<Search className="w-5 h-5" />}
                    className="bg-gray-50"
                />
            </header>

            <main className="p-6">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredCourses.map((course) => (
                            <div key={course._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden active:scale-[0.99] transition-transform">
                                <div className="h-32 bg-gray-200 relative">
                                    {course.image && (
                                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                    )}
                                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                        ₹{course.price}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{course.description}</p>
                                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                        <span>{course.instructorName || 'Instructor'}</span>
                                        {/* <span>{course.batchCount || 0} Batches</span> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredCourses.length === 0 && (
                            <p className="text-center text-gray-500 mt-8">No courses found matching "{searchTerm}"</p>
                        )}
                    </div>
                )}
            </main>
            <BottomNav />
        </div>
    );
}
