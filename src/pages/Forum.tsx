import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav';
import { forumService, type ForumPost } from '../services/forumService';
import { Loader2, MessageSquare, ThumbsUp, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../components/ui/Button';

export default function Forum() {
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await forumService.getAllPosts();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch forum posts', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pb-24 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white px-6 py-4 border-b border-gray-100 sticky top-0 z-30">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">Forum</h1>
                    <Link to="/forum/new">
                        <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-1" />
                            New Post
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="p-6">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center p-8 bg-white rounded-xl border border-gray-100">
                        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 mb-4">No forum posts yet</p>
                        <Link to="/forum/new">
                            <Button className="bg-blue-600 hover:bg-blue-700">Start a Discussion</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <Link key={post._id} to={`/forum/${post._id}`} className="block">
                                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm active:scale-[0.99] transition-transform">
                                    {post.category && (
                                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mb-2">
                                            {post.category}
                                        </span>
                                    )}
                                    <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.content}</p>

                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-4">
                                            <span className="font-medium">{post.author.name}</span>
                                            <span>{format(new Date(post.createdAt), 'MMM dd')}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <ThumbsUp className="w-4 h-4" />
                                                <span>{post.likes?.length || 0}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageSquare className="w-4 h-4" />
                                                <span>{post.replyCount || 0}</span>
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
