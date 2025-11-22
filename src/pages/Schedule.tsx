import { courses } from '../data/mockData';

const Schedule = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];

    const getCourseForSlot = (day: string, time: string) => {
        return courses.find(course =>
            course.schedule.some(s => s.day === day && s.time === time)
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Weekly Schedule</h1>
                <div className="flex gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        Current Week
                    </span>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] border-collapse text-sm">
                        <thead>
                            <tr>
                                <th className="border-b border-r border-gray-200 bg-gray-50 p-4 text-left font-medium text-gray-500 w-24">Time</th>
                                {days.map(day => (
                                    <th key={day} className="border-b border-gray-200 bg-gray-50 p-4 text-left font-medium text-gray-900">
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {timeSlots.map(time => (
                                <tr key={time}>
                                    <td className="border-b border-r border-gray-200 p-4 text-xs font-medium text-gray-500 whitespace-nowrap">
                                        {time}
                                    </td>
                                    {days.map(day => {
                                        const course = getCourseForSlot(day, time);
                                        return (
                                            <td key={`${day}-${time}`} className="border-b border-gray-200 p-2 h-24 align-top">
                                                {course && (
                                                    <div className="h-full rounded-lg bg-primary-50 p-3 border border-primary-100">
                                                        <p className="font-bold text-primary-900">{course.code}</p>
                                                        <p className="text-xs text-primary-700 mt-1">{course.name}</p>
                                                        <p className="text-xs text-primary-600 mt-2 flex items-center gap-1">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
                                                            {course.schedule.find(s => s.day === day && s.time === time)?.room}
                                                        </p>
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
