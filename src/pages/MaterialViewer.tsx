import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { materialService } from '../services/materialService';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function MaterialViewer() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [material, setMaterial] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [marking, setMarking] = useState(false);

    useEffect(() => {
        const fetchMaterial = async () => {
            if (!id) return;

            try {
                const data = await materialService.getMaterialById(id);
                setMaterial(data);
            } catch (error) {
                console.error('Failed to fetch material', error);
                toast.error('Failed to load material');
            } finally {
                setLoading(false);
            }
        };

        fetchMaterial();
    }, [id]);

    const handleMarkAsViewed = async () => {
        if (!id) return;

        setMarking(true);
        try {
            await materialService.markAsViewed(id);
            toast.success('Marked as viewed!');
        } catch (error) {
            console.error('Failed to mark as viewed', error);
            toast.error('Failed to mark as viewed');
        } finally {
            setMarking(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!material) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Material not found</p>
                    <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="px-4 py-4 flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg font-bold text-gray-900 truncate">{material.title}</h1>
                    </div>
                </div>
            </header>

            <main className="p-6 space-y-6">
                {/* Content Viewer */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    {material.type === 'video' && material.url && (
                        <video
                            controls
                            className="w-full"
                            src={material.url}
                            onPlay={handleMarkAsViewed}
                        >
                            Your browser does not support the video tag.
                        </video>
                    )}

                    {material.type === 'pdf' && material.url && (
                        <div className="aspect-[3/4]">
                            <iframe
                                src={material.url}
                                className="w-full h-full"
                                title={material.title}
                            />
                        </div>
                    )}

                    {material.type === 'document' && material.content && (
                        <div className="p-6 prose max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: material.content }} />
                        </div>
                    )}
                </div>

                {/* Description */}
                {material.description && (
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h2 className="font-semibold text-gray-900 mb-2">Description</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">{material.description}</p>
                    </div>
                )}

                {/* Mark as Complete Button */}
                <div className="sticky bottom-6">
                    <Button
                        onClick={handleMarkAsViewed}
                        disabled={marking}
                        className="w-full h-14 bg-green-600 hover:bg-green-700 shadow-lg"
                    >
                        {marking ? (
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        ) : (
                            <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        Mark as Completed
                    </Button>
                </div>
            </main>
        </div>
    );
}
