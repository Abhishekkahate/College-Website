import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Loader2, AlertCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Login = () => {
    const [role, setRole] = useState<'student' | 'admin'>('student');
    const [id, setId] = useState(''); // Roll No for student, Email for admin
    const [section, setSection] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const success = await login(id, password, role, section);
            if (success) {
                navigate(role === 'admin' ? '/admin' : '/');
            } else {
                setError('Invalid credentials. Please check your details.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-surface-200"
            >
                <div className={clsx(
                    "p-8 text-center transition-colors duration-300",
                    role === 'admin' ? "bg-surface-900" : "bg-primary-900"
                )}>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 text-white shadow-lg mb-4 backdrop-blur-sm border border-white/20">
                        {role === 'admin' ? <Shield className="h-8 w-8" /> : <GraduationCap className="h-8 w-8" />}
                    </div>
                    <h1 className="text-2xl font-bold text-white">
                        {role === 'admin' ? 'Admin Portal' : 'Student Portal'}
                    </h1>
                    <p className="text-white/80 mt-2">Sign in to your account</p>
                </div>

                <div className="p-8">
                    <div className="flex rounded-lg bg-surface-100 p-1 mb-6">
                        <button
                            onClick={() => setRole('student')}
                            className={clsx(
                                "flex-1 rounded-md py-2 text-sm font-medium transition-all",
                                role === 'student'
                                    ? "bg-white text-surface-900 shadow-sm"
                                    : "text-surface-500 hover:text-surface-700"
                            )}
                        >
                            Student
                        </button>
                        <button
                            onClick={() => setRole('admin')}
                            className={clsx(
                                "flex-1 rounded-md py-2 text-sm font-medium transition-all",
                                role === 'admin'
                                    ? "bg-white text-surface-900 shadow-sm"
                                    : "text-surface-500 hover:text-surface-700"
                            )}
                        >
                            Admin
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1">
                                {role === 'admin' ? 'Email Address' : 'Roll Number'}
                            </label>
                            <input
                                type={role === 'admin' ? 'email' : 'text'}
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                className="input-clean w-full"
                                placeholder={role === 'admin' ? 'admin@college.edu' : 'e.g. CS2024001'}
                                required
                            />
                        </div>

                        {role === 'student' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <label className="block text-sm font-medium text-surface-700 mb-1">Section</label>
                                <input
                                    type="text"
                                    value={section}
                                    onChange={(e) => setSection(e.target.value)}
                                    className="input-clean w-full"
                                    placeholder="e.g. A"
                                    required
                                />
                            </motion.div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-clean w-full"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={clsx(
                                "w-full flex items-center justify-center gap-2 text-white font-semibold py-2.5 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm",
                                role === 'admin'
                                    ? "bg-surface-900 hover:bg-surface-800"
                                    : "bg-primary-900 hover:bg-primary-800"
                            )}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-surface-500">
                            Forgot your password? <a href="#" className="text-primary-700 font-medium hover:underline">Contact Admin</a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
