import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Clock, Mail, CheckCircle } from 'lucide-react';

export default function PendingApproval() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/welcome');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col justify-center px-6 py-8">
            <div className="w-full max-w-md mx-auto">
                {/* Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
                        <Clock className="w-12 h-12 text-orange-600" />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Account Pending Approval</h1>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Thank you for registering, <span className="font-semibold text-gray-900">{user?.name || 'Student'}</span>!
                    </p>

                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="space-y-4 text-left">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-900">Email Verified</p>
                                    <p className="text-sm text-gray-600">Your email has been successfully verified</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-900">Awaiting Mentor Approval</p>
                                    <p className="text-sm text-gray-600">
                                        Your account is being reviewed by our mentors. You'll receive an email once approved.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-900">Check Your Email</p>
                                    <p className="text-sm text-gray-600">
                                        We'll notify you at <span className="font-medium">{user?.email}</span> when your account is approved
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        <p className="text-sm text-gray-500">
                            This usually takes 24-48 hours
                        </p>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full h-12"
                        >
                            Back to Welcome
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
