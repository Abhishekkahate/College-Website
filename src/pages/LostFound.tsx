
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
                    <h1 className="text-2xl font-bold text-surface-900">Lost & Found</h1>
                    <p className="text-surface-500">Report and find lost items on campus</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {lostItems.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={item.id}
                            className="card-clean group overflow-hidden bg-white hover:border-primary-300 transition-all"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div
                                    className={clsx(
                                        'absolute top-4 right-4 rounded-lg px-3 py-1 text-xs font-bold backdrop-blur-sm shadow-sm',
                                        item.status === 'Lost'
                                            ? 'bg-red-500/90 text-white'
                                            : 'bg-green-500/90 text-white'
                                    )}
                                >
                                    {item.status}
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="mb-2 text-lg font-bold text-surface-900 group-hover:text-primary-700 transition-colors">{item.title}</h3>
                                <p className="mb-4 text-sm text-surface-500 line-clamp-2">{item.description}</p>

                                <div className="space-y-2.5 text-sm text-surface-600">
                                    <div className="flex items-center gap-2.5">
                                        <MapPin className="h-4 w-4 text-primary-600" />
                                        <span>{item.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Calendar className="h-4 w-4 text-primary-600" />
                                        <span>{new Date(item.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Phone className="h-4 w-4 text-primary-600" />
                                        <span>{item.contact}</span>
                                    </div>
                                </div>

                                <button className="mt-5 w-full rounded-lg bg-surface-50 px-4 py-2.5 text-sm font-bold text-surface-700 transition-colors hover:bg-primary-50 hover:text-primary-700 border border-surface-200 hover:border-primary-200">
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
