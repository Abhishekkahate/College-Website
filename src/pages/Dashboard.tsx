<p className="text-xs text-gray-500 dark:text-gray-400">{note.courseName}</p>
                                    </motion.div >
                                ))}
                            </div >
                        </section >

                    </div >

    {/* Right Column */ }
    < div className = "space-y-8" >

        {/* Upcoming Exam */ }
{
    upcomingExam && (
        <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Exam</h2>
            <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-6 text-white shadow-lg shadow-indigo-500/20">
                <div className="flex items-center justify-between mb-6">
                    <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                        <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-indigo-100">{upcomingExam.duration}</span>
                </div>
                <h3 className="text-2xl font-bold">{upcomingExam.courseName}</h3>
                <p className="text-indigo-100">{upcomingExam.courseId}</p>

                <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-indigo-100">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(upcomingExam.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-indigo-100">
                        <Clock className="h-4 w-4" />
                        <span>{upcomingExam.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-indigo-100">
                        <MapPin className="h-4 w-4" />
                        <span>{upcomingExam.room}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

{/* Upcoming Events */ }
<section>
    <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Events</h2>
    </div>
    <div className="space-y-4">
        {mockEvents.slice(0, 2).map((event) => (
            <div key={event.id} className="flex gap-4 rounded-xl bg-white p-3 shadow-sm dark:bg-surface-900 dark:border dark:border-white/10">
                <img src={event.image} alt={event.title} className="h-16 w-16 rounded-lg object-cover" />
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{event.title}</h4>
                    <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">{new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{event.location}</p>
                </div>
            </div>
        ))}
    </div>
</section>

{/* Recently Lost or Found */ }
<section>
    <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lost & Found</h2>
    </div>
    <div className="space-y-4">
        {mockLostItems.slice(0, 2).map((item) => (
            <div key={item.id} className="rounded-xl border border-gray-100 bg-white p-4 dark:bg-surface-900 dark:border-white/10">
                <div className="flex items-center justify-between mb-2">
                    <span className={clsx(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        item.status === 'Lost' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    )}>
                        {item.status}
                    </span>
                    <span className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{item.location}</p>
            </div>
        ))}
    </div>
</section>

                    </div >
                </div >
            </div >
        </PageTransition >
    );
};

export default Dashboard;
