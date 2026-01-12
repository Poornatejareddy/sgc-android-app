import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await login(formData);

            // Check for account status issues
            if (response.user.status !== 'active') {
                const statusMsg = `Your account is ${response.user.status}. Please contact support.`;
                setError(statusMsg);
                toast.error(statusMsg);
                localStorage.removeItem('token');
                return;
            }

            // Check for student approval
            if (response.user.role === 'student' && !response.user.isApproved) {
                navigate('/pending-approval', { state: { user: response.user } });
                return;
            }

            toast.success('Welcome back!');
            navigate('/');
        } catch (err: any) {
            let errorMsg = 'Failed to login';

            if (err.response?.status === 403) {
                errorMsg = err.response.data.message || 'Account verification required';
            } else if (err.response?.status === 404) {
                errorMsg = 'User not found. Please check your email.';
            } else if (err.response?.status === 401) {
                errorMsg = 'Invalid email or password';
            } else {
                errorMsg = err.response?.data?.message || 'Failed to login';
            }

            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center p-3 border-4 border-blue-100">
                        <img
                            src="/logo.png"
                            alt="SGC"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                                if (target.parentElement) {
                                    target.parentElement.innerHTML = '<div class="text-3xl font-bold text-blue-600">SGC</div>';
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
                    <p className="text-base text-gray-600">Sign in to continue learning</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            icon={<Mail className="w-5 h-5" />}
                            placeholder="your.email@example.com"
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            icon={<Lock className="w-5 h-5" />}
                            placeholder="Enter your password"
                            required
                        />

                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                <p className="text-sm text-red-600 font-medium">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            isLoading={loading}
                            className="w-full h-12 text-base font-semibold"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-bold text-blue-600 hover:underline">
                        Create one now
                    </Link>
                </p>

                <Link to="/welcome" className="block mt-3 text-center text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Welcome
                </Link>
            </div>
        </div>
    );
}
