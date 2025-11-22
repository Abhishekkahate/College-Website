
import { useData } from '../context/DataContext';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';

const Faculty = () => {
    const { faculty } = useData();
    return (
        <PageTransition>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Faculty Directory</h1>
                    <p className="text-gray-500 dark:text-gray-400">Contact information for your professors</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {faculty.map((faculty, index) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            key={faculty.id}
                            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-surface-900 dark:border dark:border-white/10"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={faculty.image}
                                    alt={faculty.name}
                                    className="h-16 w-16 rounded-full object-cover border-2 border-primary-100 dark:border-primary-900"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{faculty.name}</h3>
                                    <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{faculty.department}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 dark:bg-surface-800 text-gray-500 dark:text-gray-400">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <span>{faculty.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 dark:bg-surface-800 text-gray-500 dark:text-gray-400">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <span>{faculty.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 dark:bg-surface-800 text-gray-500 dark:text-gray-400">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <span>{faculty.office}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default Faculty;
