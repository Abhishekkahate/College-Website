import { courses } from '../data/mockData';
import clsx from 'clsx';

const Schedule = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];

    const today = new Date();
    const currentDayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const currentHour = today.getHours();

    // Logic for holidays
    const isSecondOrFourthSaturday = () => {
        if (today.getDay() !== 6) return false;
        const dayOfMonth = today.getDate();
        const weekOfMonth = Math.ceil(dayOfMonth / 7);
        return weekOfMonth === 2 || weekOfMonth === 4;
    };

    const fixedHolidays = [
        '2024-01-26', // Republic Day
        '2024-08-15', // Independence Day
        '2024-10-02', // Gandhi Jayanti
        '2024-12-25', // Christmas
    ];

    const isHoliday = isSecondOrFourthSaturday() || fixedHolidays.includes(today.toISOString().split('T')[0]);

    const getCourseForSlot = (day: string, time: string) => {
        return courses.find(course =>
            course.schedule.some(s => s.day === day && s.time === time)
        );
    };

    const isCurrentSlot = (day: string, time: string) => {
        if (day !== currentDayName) return false;

        // Convert time string (e.g., "09:00 AM") to 24-hour format hour
        const [timePart, modifier] = time.split(' ');
        let [hours] = timePart.split(':').map(Number);
        if (hours === 12) {
            hours = modifier === 'PM' ? 12 : 0;
        } else {
            hours = modifier === 'PM' ? hours + 12 : hours;
        }

        return currentHour === hours;
    };

    if (isHoliday) {
        return (
            <div className="flex h-[60vh] flex-col items-center justify-center space-y-4 text-center">
                <div className="rounded-full bg-green-100 p-6 dark:bg-green-900/20">
                    <span className="text-4xl">🎉</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">It's a Holiday!</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    {isSecondOrFourthSaturday() ? 'Enjoy your Saturday off!' : 'Enjoy the public holiday!'}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Weekly Schedule</h1>
                <div className="flex gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        Current Week
                    </span>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:bg-surface-900 dark:border-white/10">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] border-collapse text-sm">
                        <thead>
                            <tr>
                                <th className="border-b border-r border-gray-200 bg-gray-50 p-4 text-left font-medium text-gray-500 w-24 dark:bg-surface-800 dark:border-white/10 dark:text-gray-400">Time</th>
                                {days.map(day => (
                                    <th key={day} className={clsx(
                                        "border-b border-gray-200 p-4 text-left font-medium dark:border-white/10",
                                        day === currentDayName
                                            ? "bg-primary-50 text-primary-900 dark:bg-primary-900/20 dark:text-primary-400"
                                            : "bg-gray-50 text-gray-900 dark:bg-surface-800 dark:text-white"
                                    )}>
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {timeSlots.map(time => (
                                <tr key={time}>
                                    <td className="border-b border-r border-gray-200 p-4 text-xs font-medium text-gray-500 whitespace-nowrap dark:border-white/10 dark:text-gray-400">
                                        {time}
                                    </td>
                                    {days.map(day => {
                                        const course = getCourseForSlot(day, time);
                                        const isActive = isCurrentSlot(day, time);

                                        return (
                                            <td key={`${day}-${time}`} className={clsx(
                                                "border-b border-gray-200 p-2 h-24 align-top dark:border-white/10",
                                                isActive && "bg-primary-50/50 dark:bg-primary-900/10"
                                            )}>
                                                {course && (
                                                    <div className={clsx(
                                                        "h-full rounded-lg p-3 border transition-all",
                                                        isActive
                                                            ? "bg-primary-100 border-primary-200 shadow-md scale-[1.02] dark:bg-primary-900/40 dark:border-primary-700"
                                                            : "bg-primary-50 border-primary-100 dark:bg-primary-900/20 dark:border-primary-800"
                                                    )}>
                                                        <p className="font-bold text-primary-900 dark:text-primary-100">{course.code}</p>
                                                        <p className="text-xs text-primary-700 mt-1 dark:text-primary-300">{course.name}</p>
                                                        <p className="text-xs text-primary-600 mt-2 flex items-center gap-1 dark:text-primary-400">
                                                            <span className={clsx(
                                                                "w-1.5 h-1.5 rounded-full",
                                                                isActive ? "bg-green-500 animate-pulse" : "bg-primary-400"
                                                            )}></span>
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
