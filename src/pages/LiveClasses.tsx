import { useEffect, useState } from 'react';
import BottomNav from '../components/layout/BottomNav';
import { liveClassService, type LiveClass } from '../services/liveClassService';
import { Loader2, Video, Calendar, Clock, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../components/ui/Button';

export default function LiveClasses() {
    const [classes, setClasses] = useState<LiveClass[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const data = await liveClassService.getUpcomingClasses();
                setClasses(data);
            } catch (error) {
                console.error('Failed to fetch live classes', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'live': return 'bg-red-100 text-red-700 animate-pulse';
            case 'scheduled': return 'bg-blue-100 text-blue-700';
            case 'completed': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="pb-24 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white px-6 py-4 border-b border-gray-100 sticky top-0 z-30">
                <h1 className="text-xl font-bold text-gray-900">Live Classes</h1>
            </header>

            <main className="p-6">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                ) : classes.length === 0 ? (
                    <div className="text-center p-8 bg-white rounded-xl border border-gray-100">
                        <Video className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No upcoming live classes</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {classes.map((liveClass) => (
                            <div key={liveClass._id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 mb-1">{liveClass.title}</h3>
                                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(liveClass.status)}`}>
                                            {liveClass.status === 'live' && '🔴 '}{liveClass.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                {liveClass.description && (
                                    <p className="text-sm text-gray-600 mb-3">{liveClass.description}</p>
                                )}

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 flex-shrink-0" />
                                        <span>{format(new Date(liveClass.scheduledAt), 'EEEE, MMMM dd, yyyy')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="w-4 h-4 flex-shrink-0" />
                                        <span>{format(new Date(liveClass.scheduledAt), 'hh:mm a')} - {liveClass.duration} mins</span>
                                    </div>
                                </div>

                                {liveClass.meetingLink && (liveClass.status === 'live' || liveClass.status === 'scheduled') && (
                                    <a
                                        href={liveClass.meetingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <Button
                                            className={`w-full ${liveClass.status === 'live' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                                        >
                                            <Video className="w-4 h-4 mr-2" />
                                            {liveClass.status === 'live' ? 'Join Now' : 'Join Meeting'}
                                            <ExternalLink className="w-4 h-4 ml-2" />
                                        </Button>
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
