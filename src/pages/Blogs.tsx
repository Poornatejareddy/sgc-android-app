import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav';
import { blogService, type Blog } from '../services/blogService';
import { Loader2, BookOpen, ThumbsUp, Calendar } from 'lucide-react';
import { format } from 'date-fns';


export default function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const data = await blogService.getAllBlogs();
            if (Array.isArray(data)) {
                setBlogs(data);
            } else {
                setBlogs([]);
            }
        } catch (error) {
            console.error('Failed to fetch blogs', error);
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pb-24 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white px-6 py-4 border-b border-gray-100 sticky top-0 z-30">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">Blogs</h1>
                </div>
            </header>

            <main className="p-6">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center p-8 bg-white rounded-xl border border-gray-100">
                        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No blogs posted yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {blogs.map((blog) => (
                            <Link key={blog._id} to={`/blogs/${blog.slug}`} className="block">
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden active:scale-[0.99] transition-transform">
                                    {blog.image && (
                                        <div className="h-32 w-full overflow-hidden">
                                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 mb-2">
                                            {blog.tags?.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                            {blog.content.replace(/<[^>]*>/g, '')}
                                        </p>

                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3 h-3" />
                                                <span>{format(new Date(blog.createdAt), 'MMM dd')}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <ThumbsUp className="w-3 h-3" />
                                                <span>{blog.likes?.length || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
