
import { useData } from '../context/DataContext';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';

const Assignments = () => {
    const { assignments } = useData();
    return (
        <PageTransition>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assignments</h1>
                    <p className="text-gray-500 dark:text-gray-400">Track your upcoming deadlines and grades</p>
                </div>

                <div className="space-y-4">
                    {assignments.map((assignment, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={assignment.id}
                            className="group flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md md:flex-row md:items-center md:justify-between dark:bg-surface-900 dark:border dark:border-white/10"
                        >
                            <div className="flex items-start gap-4">
                                <div className={clsx(
                                    'flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
                                    assignment.status === 'Submitted' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                                        assignment.status === 'Pending' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                                            'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                )}>
                                    {assignment.status === 'Submitted' ? <CheckCircle className="h-6 w-6" /> :
                                        assignment.status === 'Pending' ? <Clock className="h-6 w-6" /> :
                                            <AlertCircle className="h-6 w-6" />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{assignment.title}</h3>
                                    <p className="text-sm font-medium text-primary-600 dark:text-primary-400">{assignment.courseName}</p>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{assignment.description}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 border-t border-gray-100 pt-4 md:border-0 md:pt-0 dark:border-white/10">
                                <div className="text-right">
                                    <p className="text-xs font-medium text-gray-400 uppercase">Due Date</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                                </div>
                                {assignment.grade && (
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-gray-400 uppercase">Grade</p>
                                        <p className="font-bold text-green-600 dark:text-green-400">{assignment.grade}</p>
                                    </div>
                                )}
                                <div className={clsx(
                                    'rounded-full px-3 py-1 text-xs font-bold',
                                    assignment.status === 'Submitted' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                        'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                )}>
                                    {assignment.status}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default Assignments;
