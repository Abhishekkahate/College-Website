
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
                    <h1 className="text-2xl font-bold text-surface-900">Faculty Directory</h1>
                    <p className="text-surface-500">Contact information for your professors</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {faculty.map((faculty, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={faculty.id}
                            className="card-clean p-6 bg-white hover:border-primary-300 transition-all group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={faculty.image}
                                    alt={faculty.name}
                                    className="h-16 w-16 rounded-full object-cover border-2 border-surface-100 group-hover:border-primary-200 transition-colors"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-surface-900 group-hover:text-primary-700 transition-colors">{faculty.name}</h3>
                                    <p className="text-sm text-primary-600 font-medium">{faculty.department}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-surface-600">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-50 text-surface-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <span className="truncate">{faculty.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-surface-600">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-50 text-surface-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <span>{faculty.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-surface-600">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-50 text-surface-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
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
