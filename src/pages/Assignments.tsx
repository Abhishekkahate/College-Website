import { motion } from 'framer-motion';
import { FileText, Calendar, CheckCircle, AlertCircle, Upload, Clock } from 'lucide-react';
import clsx from 'clsx';
import { useData } from '../context/DataContext';

const Assignments = () => {
    const { assignments } = useData();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Submitted': return 'bg-green-50 text-green-700 border-green-200';
            case 'Pending': return 'bg-orange-50 text-orange-700 border-orange-200';
            case 'Overdue': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-surface-100 text-surface-700 border-surface-200';
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Assignments</h1>
                    <p className="text-surface-500">Track and submit your coursework</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white border border-surface-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-orange-500" />
                        <span className="text-sm font-medium text-surface-600">3 Pending</span>
                    </div>
                    <div className="bg-white border border-surface-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm font-medium text-surface-600">1 Submitted</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {assignments.map((assignment, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={assignment.id}
                        className="card-clean p-6 hover:border-primary-300 transition-all group"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className={clsx(
                                        "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                        getStatusColor(assignment.status)
                                    )}>
                                        {assignment.status}
                                    </span>
                                    <span className="text-xs font-medium text-surface-400 flex items-center gap-1">
                                        <FileText className="h-3 w-3" />
                                        {assignment.courseName}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-surface-900 mb-2 group-hover:text-primary-700 transition-colors">
                                    {assignment.title}
                                </h3>
                                <p className="text-sm text-surface-600 mb-4 max-w-3xl">
                                    {assignment.description}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-surface-500">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-4 w-4" />
                                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                    </div>
                                    {assignment.status === 'Pending' && (
                                        <div className="flex items-center gap-1.5 text-orange-600">
                                            <Clock className="h-4 w-4" />
                                            <span>3 days left</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full lg:w-auto border-t lg:border-t-0 border-surface-100 pt-4 lg:pt-0">
                                {assignment.status === 'Pending' ? (
                                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary-900 text-white text-sm font-medium hover:bg-primary-800 transition-colors">
                                        <Upload className="h-4 w-4" />
                                        Submit Work
                                    </button>
                                ) : (
                                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-surface-50 text-surface-600 border border-surface-200 text-sm font-medium hover:bg-surface-100 transition-colors">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        View Submission
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Assignments;
