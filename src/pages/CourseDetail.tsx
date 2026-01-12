import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { materialService } from '../services/materialService';
import BottomNav from '../components/layout/BottomNav';
import { ArrowLeft, PlayCircle, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function CourseDetail() {
    const { id } = useParams<{ id: string }>();
    const [course, setCourse] = useState<any>(null);
    const [materials, setMaterials] = useState<any[]>([]);
    const [progress, setProgress] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseData = async () => {
            if (!id) return;

            try {
                const [courseData, materialsData, progressData] = await Promise.all([
                    courseService.getCourseBySlug(id),
                    materialService.getCourseMaterials(id),
                    materialService.getCourseProgress(id).catch(() => [])
                ]);

                setCourse(courseData);
                setMaterials(materialsData);
                setProgress(progressData);
            } catch (error) {
                console.error('Failed to fetch course details', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [id]);

    const isViewed = (materialId: string) => {
        return progress.some((p: any) => p.materialId === materialId);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Course not found</p>
                    <Link to="/courses">
                        <Button variant="outline">Go to Courses</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-24 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="px-4 py-4 flex items-center gap-3">
                    <Link to="/courses">
                        <button className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </Link>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg font-bold text-gray-900 truncate">{course.title}</h1>
                    </div>
                </div>
            </header>

            <main className="p-6 space-y-6">
                {/* Course Info */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    {course.image && (
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
                </div>

                {/* Study Materials */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Study Materials</h2>

                    {materials.length === 0 ? (
                        <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
                            <p className="text-gray-500">No materials available yet</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {materials.map((material: any) => (
                                <Link
                                    key={material._id}
                                    to={`/material/${material._id}`}
                                    className="block"
                                >
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-[0.99] transition-transform flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isViewed(material._id) ? 'bg-green-100' : 'bg-blue-100'
                                            }`}>
                                            {material.type === 'video' ? (
                                                <PlayCircle className={`w-6 h-6 ${isViewed(material._id) ? 'text-green-600' : 'text-blue-600'}`} />
                                            ) : (
                                                <FileText className={`w-6 h-6 ${isViewed(material._id) ? 'text-green-600' : 'text-blue-600'}`} />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 line-clamp-1">{material.title}</h3>
                                            <p className="text-xs text-gray-500 mt-1 capitalize">{material.type}</p>
                                        </div>

                                        {isViewed(material._id) && (
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
