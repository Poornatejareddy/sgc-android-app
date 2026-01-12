import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

export default function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student'
    });

    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        uppercase: false,
        number: false,
        special: false
    });

    const handlePasswordChange = (value: string) => {
        setFormData({ ...formData, password: value });

        setPasswordChecks({
            length: value.length >= 8,
            uppercase: /[A-Z]/.test(value),
            number: /[0-9]/.test(value),
            special: /[^A-Za-z0-9]/.test(value)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!PASSWORD_REGEX.test(formData.password)) {
            setError('Password does not meet requirements');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            await authService.signup({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

            toast.success('OTP sent to your email!');

            // Navigate to OTP verification
            navigate('/verify-email', {
                state: { email: formData.email, name: formData.name }
            });
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to create account';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const allChecksPassed = Object.values(passwordChecks).every(check => check);

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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Join ShreeGuruCool</h1>
                    <p className="text-gray-600">Create your account to start learning</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Full Name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            icon={<User className="w-5 h-5" />}
                            placeholder="John Doe"
                            required
                            className="h-14 text-base"
                        />

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

                        <div>
                            <Input
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                icon={<Lock className="w-5 h-5" />}
                                placeholder="Create a strong password"
                                required
                                className="h-14 text-base"
                            />

                            {/* Password Requirements */}
                            <div className="mt-3 space-y-2 text-xs">
                                <PasswordCheck met={passwordChecks.length} text="At least 8 characters" />
                                <PasswordCheck met={passwordChecks.uppercase} text="One uppercase letter" />
                                <PasswordCheck met={passwordChecks.number} text="One number" />
                                <PasswordCheck met={passwordChecks.special} text="One special character" />
                            </div>
                        </div>

                        <Input
                            label="Confirm Password"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            icon={<Lock className="w-5 h-5" />}
                            placeholder="Confirm your password"
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
                            disabled={!allChecksPassed || loading}
                            className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </form>
                </div>

                {/* Footer */}
                <p className="mt-8 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                        Sign in
                    </Link>
                </p>

                <Link to="/welcome" className="block mt-4 text-center text-sm text-gray-500 hover:text-gray-700">
                    ← Back to Welcome
                </Link>
            </div>
        </div>
    );
}

function PasswordCheck({ met, text }: { met: boolean; text: string }) {
    return (
        <div className={`flex items-center gap-2 ${met ? 'text-green-600' : 'text-gray-400'}`}>
            {met ? (
                <CheckCircle className="w-4 h-4" />
            ) : (
                <div className="w-4 h-4 rounded-full border-2 border-current" />
            )}
            <span>{text}</span>
        </div>
    );
}
