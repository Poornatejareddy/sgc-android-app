import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Mail, Lock, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-12">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                        {/* Logo Placeholder */}
                        <CheckCircle2 size={32} />
                    </div>
                </div>
                <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
                    Welcome back
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Sign in to access your dashboard
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Input
                        label="Email address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        icon={<Mail className="w-5 h-5" />}
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        icon={<Lock className="w-5 h-5" />}
                        required
                    />

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <Button type="submit" isLoading={loading}>
                        Sign in
                    </Button>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link to="/signup" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}
