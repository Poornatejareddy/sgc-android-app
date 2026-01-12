import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { AlertCircle, Mail, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VerifyEmail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const email = location.state?.email || '';
    const name = location.state?.name || '';

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        if (!email) {
            navigate('/signup');
        }
    }, [email, navigate]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join('');

        if (otpString.length !== 6) {
            setError('Please enter complete OTP');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await authService.verifyEmail({ email, otp: otpString });
            toast.success('Email verified successfully!');

            // Check if student and needs approval
            if (response.user?.role === 'student' && !response.user?.isApproved) {
                navigate('/pending-approval', { state: { user: response.user } });
            } else {
                navigate('/');
            }
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Invalid OTP. Please try again.';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (countdown > 0) return;

        setResending(true);
        try {
            await authService.resendOTP(email);
            toast.success('OTP sent successfully!');
            setCountdown(60);
            setOtp(['', '', '', '', '', '']);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to resend OTP');
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center px-6 py-8">
            <div className="w-full max-w-md mx-auto">
                {/* Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mail className="w-10 h-10 text-blue-600" />
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
                    <p className="text-gray-600">
                        We've sent a 6-digit code to<br />
                        <span className="font-semibold text-gray-900">{email}</span>
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* OTP Input */}
                        <div className="flex gap-3 justify-center">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                                />
                            ))}
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-600 font-medium">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            isLoading={loading}
                            disabled={otp.some(d => !d) || loading}
                            className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
                        >
                            {loading ? 'Verifying...' : 'Verify Email'}
                        </Button>
                    </form>

                    {/* Resend */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Didn't receive the code?{' '}
                            <button
                                onClick={handleResend}
                                disabled={countdown > 0 || resending}
                                className={`font-semibold ${countdown > 0 || resending
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-blue-600 hover:text-blue-700'
                                    }`}
                            >
                                {resending ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
