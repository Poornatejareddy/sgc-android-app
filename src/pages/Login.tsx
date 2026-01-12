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
            await login(formData);
            toast.success('Welcome back!');
            navigate('/');
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Failed to login. Please check your credentials.';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center px-6 py-8">
            <div className="w-full max-w-md mx-auto">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center p-3 border-4 border-blue-100">
                        <img src="/logo.png" alt="ShreeGuruCool" className="w-full h-full object-contain" />
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
                    <p className="text-gray-600">Sign in to continue learning</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            icon={<Mail className="w-5 h-5" />}
                            placeholder="your.email@example.com"
                            required
                            className="h-14 text-base"
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            icon={<Lock className="w-5 h-5" />}
                            placeholder="Enter your password"
                            required
                            className="h-14 text-base"
                        />

                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-600 font-medium">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            isLoading={loading}
                            className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </div>

                {/* Footer */}
                <p className="mt-8 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                        Create one now
                    </Link>
                </p>

                <Link to="/welcome" className="block mt-4 text-center text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Welcome
                </Link>
            </div>
        </div>
    );
}
