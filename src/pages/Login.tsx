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
        <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950 p-4 transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white dark:bg-surface-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-white/10"
            >
                <div className={clsx(
                    "p-8 text-center transition-colors duration-300",
                    role === 'admin' ? "bg-surface-800" : "bg-primary-600"
                )}>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white shadow-lg mb-4 backdrop-blur-sm">
                        {role === 'admin' ? <Shield className="h-8 w-8" /> : <GraduationCap className="h-8 w-8" />}
                    </div>
                    <h1 className="text-2xl font-bold text-white">
                        {role === 'admin' ? 'Admin Portal' : 'Student Portal'}
                    </h1>
                    <p className="text-white/80 mt-2">Sign in to your account</p>
                </div>

                <div className="p-8">
                    <div className="flex rounded-xl bg-gray-100 dark:bg-surface-800 p-1 mb-6">
                        <button
                            onClick={() => setRole('student')}
                            className={clsx(
                                "flex-1 rounded-lg py-2 text-sm font-medium transition-all",
                                role === 'student'
                                    ? "bg-white dark:bg-surface-700 text-gray-900 dark:text-white shadow-sm"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            )}
                        >
                            Student
                        </button>
                        <button
                            onClick={() => setRole('admin')}
                            className={clsx(
                                "flex-1 rounded-lg py-2 text-sm font-medium transition-all",
                                role === 'admin'
                                    ? "bg-white dark:bg-surface-700 text-gray-900 dark:text-white shadow-sm"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            )}
                        >
                            Admin
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {role === 'admin' ? 'Email Address' : 'Roll Number'}
                            </label>
                            <input
                                type={role === 'admin' ? 'email' : 'text'}
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-4 py-2.5 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 outline-none transition-all"
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
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section</label>
                                <input
                                    type="text"
                                    value={section}
                                    onChange={(e) => setSection(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-4 py-2.5 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 outline-none transition-all"
                                    placeholder="e.g. A"
                                    required
                                />
                            </motion.div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-4 py-2.5 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={clsx(
                                "w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg",
                                role === 'admin'
                                    ? "bg-surface-800 hover:bg-surface-900 shadow-surface-900/30"
                                    : "bg-primary-600 hover:bg-primary-700 shadow-primary-500/30"
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
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Forgot your password? <a href="#" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">Contact Admin</a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
