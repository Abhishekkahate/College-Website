
import { useData } from '../context/DataContext';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';

const Events = () => {
    const { events } = useData();
    return (
        <PageTransition>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Events Calendar</h1>
                    <p className="text-gray-500 dark:text-gray-400">Upcoming workshops, fests, and sports events</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event, index) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            key={event.id}
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-surface-900 dark:border dark:border-white/10"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-gray-900 backdrop-blur-sm dark:bg-black/50 dark:text-white">
                                    {event.category}
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{event.title}</h3>
                                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{event.description}</p>

                                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary-500" />
                                        <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-primary-500" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-primary-500" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default Events;
