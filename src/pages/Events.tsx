
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
                    <h1 className="text-2xl font-bold text-surface-900">Events Calendar</h1>
                    <p className="text-surface-500">Upcoming workshops, fests, and sports events</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={event.id}
                            className="card-clean group overflow-hidden bg-white hover:border-primary-300 transition-all"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-surface-900 backdrop-blur-sm shadow-sm">
                                    {event.category}
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="mb-2 text-lg font-bold text-surface-900 group-hover:text-primary-700 transition-colors">{event.title}</h3>
                                <p className="mb-4 text-sm text-surface-500 line-clamp-2">{event.description}</p>

                                <div className="space-y-2.5 text-sm text-surface-600">
                                    <div className="flex items-center gap-2.5">
                                        <Calendar className="h-4 w-4 text-primary-600" />
                                        <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Clock className="h-4 w-4 text-primary-600" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <MapPin className="h-4 w-4 text-primary-600" />
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
