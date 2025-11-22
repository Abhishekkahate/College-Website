import { useData } from '../context/DataContext';
import { MapPin, Phone, Calendar } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';

const LostFound = () => {
    const { lostItems } = useData();
    return (
        <PageTransition>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lost & Found</h1>
                    <p className="text-gray-500 dark:text-gray-400">Report and find lost items on campus</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {lostItems.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            key={item.id}
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-surface-900 dark:border dark:border-white/10"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div
                                    className={clsx(
                                        'absolute top-4 right-4 rounded-lg px-3 py-1 text-xs font-bold backdrop-blur-sm',
                                        item.status === 'Lost'
                                            ? 'bg-red-500/90 text-white'
                                            : 'bg-green-500/90 text-white'
                                    )}
                                >
                                    {item.status}
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{item.description}</p>

                                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-primary-500" />
                                        <span>{item.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary-500" />
                                        <span>{new Date(item.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-primary-500" />
                                        <span>{item.contact}</span>
                                    </div>
                                </div>

                                <button className="mt-4 w-full rounded-xl bg-primary-50 px-4 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/30">
                                    Contact
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default LostFound;
