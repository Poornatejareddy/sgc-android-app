import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav';
import { assignmentService, type Assignment } from '../services/assignmentService';
import { Loader2, Calendar, CheckCircle, Clock, FileText } from 'lucide-react';
import { format } from 'date-fns';

export default function Assignments() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const data = await assignmentService.getMyAssignments();
                setAssignments(data);
            } catch (error) {
                console.error('Failed to fetch assignments', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'graded': return 'bg-green-100 text-green-700';
            case 'submitted': return 'bg-blue-100 text-blue-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'graded': return <CheckCircle className="w-4 h-4" />;
            case 'submitted': return <Clock className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    const filteredAssignments = filter === 'all'
        ? assignments
        : assignments.filter(a => a.status === filter);

    return (
        <div className="pb-24 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white px-6 py-4 border-b border-gray-100 sticky top-0 z-30">
                <h1 className="text-xl font-bold text-gray-900 mb-4">Assignments</h1>

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto">
                    {['all', 'pending', 'submitted', 'graded'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === f
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </header>

            <main className="p-6">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                ) : filteredAssignments.length === 0 ? (
                    <div className="text-center p-8 bg-white rounded-xl border border-gray-100">
                        <p className="text-gray-500">No {filter !== 'all' ? filter : ''} assignments</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredAssignments.map((assignment) => (
                            <Link key={assignment._id} to={`/assignment/${assignment._id}`} className="block">
                                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm active:scale-[0.99] transition-transform">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-bold text-gray-900 flex-1 pr-2">{assignment.title}</h3>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(assignment.status || 'pending')}`}>
                                            {getStatusIcon(assignment.status || 'pending')}
                                            {assignment.status || 'pending'}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{assignment.description}</p>

                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>Due: {format(new Date(assignment.dueDate), 'MMM dd, yyyy')}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="font-semibold">Max: {assignment.maxScore} pts</span>
                                        </div>
                                    </div>

                                    {assignment.submission && assignment.submission.score !== undefined && (
                                        <div className="mt-3 pt-3 border-t border-gray-100">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Your Score:</span>
                                                <span className="font-bold text-green-600">
                                                    {assignment.submission.score}/{assignment.maxScore}
                                                </span>
                                            </div>
                                        </div>
                                    )}
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
