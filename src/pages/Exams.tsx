import { motion } from 'framer-motion';
import { Clock, MapPin, AlertCircle, CheckCircle, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import { useData } from '../context/DataContext';

const Exams = () => {
    const { exams } = useData();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Exams</h1>
                    <p className="text-surface-500">View your exam schedule and syllabus</p>
                </div>
                <div className="bg-white border border-surface-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
                    <AlertCircle className="h-5 w-5 text-primary-600" />
                    <span className="text-sm font-medium text-surface-600">Next Exam in 5 days</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {exams.map((exam, index) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        key={exam.id}
                        className="group relative flex flex-col sm:flex-row overflow-hidden rounded-xl bg-white shadow-sm border border-surface-200 hover:shadow-md transition-all"
                    >
                        {/* Left Side - Date & Time */}
                        <div className={clsx(
                            "flex flex-col items-center justify-center p-6 sm:w-40 text-white relative overflow-hidden",
                            new Date(exam.date) < new Date() ? "bg-surface-500" : "bg-primary-900"
                        )}>
                            <div className="text-3xl font-bold">{new Date(exam.date).getDate()}</div>
                            <div className="text-sm font-medium uppercase tracking-wider opacity-90">{new Date(exam.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                            <div className="mt-2 text-xs opacity-75">{new Date(exam.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>

                            {new Date(exam.date) < new Date() && (
                                <div className="mt-3 px-2 py-1 rounded bg-black/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3" /> Done
                                </div>
                            )}
                        </div>

                        {/* Right Side - Details */}
                        <div className="flex-1 p-6 flex flex-col justify-between relative">
                            {/* Dashed Line Separator */}
                            <div className="absolute left-0 top-4 bottom-4 w-[1px] border-l-2 border-dashed border-surface-200 hidden sm:block"></div>
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-surface-50 hidden sm:block"></div>

                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-surface-900 group-hover:text-primary-700 transition-colors">
                                            {exam.courseName}
                                        </h3>
                                        <p className="text-sm text-primary-600 font-medium">{exam.courseName} • {exam.duration} mins</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-surface-100 text-surface-500">
                                        <BookOpen className="h-5 w-5" />
                                    </div>
                                </div>

                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center gap-3 text-sm text-surface-600">
                                        <Clock className="h-4 w-4 text-primary-500" />
                                        <span>{exam.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-surface-600">
                                        <MapPin className="h-4 w-4 text-primary-500" />
                                        <span>{exam.room}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-surface-100">
                                <p className="text-xs text-surface-500">
                                    <span className="font-semibold text-surface-700">Syllabus:</span> Check course details
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Exams;
