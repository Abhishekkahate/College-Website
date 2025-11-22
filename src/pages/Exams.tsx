import { Calendar, Clock, MapPin } from 'lucide-react';
import { exams } from '../data/mockData';

const Exams = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Exam Timetable</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {exams.map((exam) => (
                    <div key={exam.id} className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-200 hover:border-primary-500 transition-all hover:shadow-md">
                        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-primary-50 transition-transform group-hover:scale-150"></div>

                        <div className="relative">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{exam.courseName}</h3>
                                    <p className="text-sm text-gray-500">{exam.courseId}</p>
                                </div>
                                <div className="rounded-lg bg-primary-100 px-3 py-1 text-xs font-bold text-primary-700">
                                    {exam.duration}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span>{new Date(exam.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span>{exam.time}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span>{exam.room}</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                    View Syllabus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Exams;
