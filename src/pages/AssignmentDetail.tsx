import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assignmentService } from '../services/assignmentService';
import { ArrowLeft, Upload, CheckCircle, Loader2, Calendar, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function AssignmentDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [textSubmission, setTextSubmission] = useState('');

    useEffect(() => {
        const fetchAssignment = async () => {
            if (!id) return;

            try {
                const data = await assignmentService.getAssignmentById(id);
                setAssignment(data);
            } catch (error) {
                console.error('Failed to fetch assignment', error);
                toast.error('Failed to load assignment');
            } finally {
                setLoading(false);
            }
        };

        fetchAssignment();
    }, [id]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Check file size (max 10MB)
            if (selectedFile.size > 10 * 1024 * 1024) {
                toast.error('File size must be less than 10MB');
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id || (!file && !textSubmission.trim())) {
            toast.error('Please provide a file or text submission');
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
            }
            if (textSubmission.trim()) {
                formData.append('text', textSubmission.trim());
            }

            await assignmentService.submitAssignment(id, formData);
            toast.success('Assignment submitted successfully!');
            navigate('/assignments');
        } catch (error: any) {
            console.error('Failed to submit assignment', error);
            toast.error(error.response?.data?.message || 'Failed to submit assignment');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!assignment) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Assignment not found</p>
                    <Button variant="outline" onClick={() => navigate('/assignments')}>Go Back</Button>
                </div>
            </div>
        );
    }

    const isSubmitted = assignment.status === 'submitted' || assignment.status === 'graded';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="px-4 py-4 flex items-center gap-3">
                    <button
                        onClick={() => navigate('/assignments')}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg font-bold text-gray-900 truncate">Assignment Details</h1>
                    </div>
                </div>
            </header>

            <main className="p-6 space-y-6">
                {/* Assignment Info */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{assignment.title}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{assignment.description}</p>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">Due Date</span>
                            </div>
                            <p className="text-gray-900 font-semibold">
                                {format(new Date(assignment.dueDate), 'MMM dd, yyyy')}
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <FileText className="w-4 h-4" />
                                <span className="font-medium">Max Score</span>
                            </div>
                            <p className="text-gray-900 font-semibold">{assignment.maxScore} points</p>
                        </div>
                    </div>
                </div>

                {/* Submission Status */}
                {isSubmitted && assignment.submission && (
                    <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                        <div className="flex items-center gap-3 mb-3">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            <h3 className="font-bold text-green-900">Submitted</h3>
                        </div>
                        <p className="text-sm text-green-700 mb-2">
                            Submitted on {format(new Date(assignment.submission.submittedAt), 'MMM dd, yyyy hh:mm a')}
                        </p>
                        {assignment.submission.score !== undefined && (
                            <div className="mt-3 pt-3 border-t border-green-200">
                                <p className="text-sm text-green-700 mb-1">Your Score:</p>
                                <p className="text-2xl font-bold text-green-900">
                                    {assignment.submission.score}/{assignment.maxScore}
                                </p>
                                {assignment.submission.feedback && (
                                    <div className="mt-3">
                                        <p className="text-sm text-green-700 mb-1">Feedback:</p>
                                        <p className="text-sm text-gray-700">{assignment.submission.feedback}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Submission Form */}
                {!isSubmitted && (
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
                        <h3 className="font-bold text-gray-900 mb-4">Submit Assignment</h3>

                        {/* Text Submission */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Text Submission (Optional)
                            </label>
                            <textarea
                                value={textSubmission}
                                onChange={(e) => setTextSubmission(e.target.value)}
                                placeholder="Enter your submission text..."
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            />
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload File (Optional)
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                    accept=".pdf,.doc,.docx,.zip,.jpg,.jpeg,.png"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="flex items-center justify-center gap-2 w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                                >
                                    <Upload className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm text-gray-600">
                                        {file ? file.name : 'Click to upload file (Max 10MB)'}
                                    </span>
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Accepted formats: PDF, DOC, DOCX, ZIP, JPG, PNG
                            </p>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={submitting || (!file && !textSubmission.trim())}
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5 mr-2" />
                                    Submit Assignment
                                </>
                            )}
                        </Button>
                    </form>
                )}
            </main>
        </div>
    );
}
