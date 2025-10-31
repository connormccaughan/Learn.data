import React from 'react';
import { useAppContext } from '../App';
import { COURSES_DATA } from '../constants';
import { Course, UserActivity } from '../types';
import { BookIcon, CheckCircleIcon, LogoIcon } from './IconComponents';

const StatCard: React.FC<{ title: string; value: number | string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-bg-secondary p-6 rounded-lg flex items-center gap-4">
        <div className="bg-bg-tertiary p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-3xl font-bold text-text-primary">{value}</p>
            <p className="text-sm text-text-secondary">{title}</p>
        </div>
    </div>
);

const ActivityCalendar: React.FC<{ activityLog: UserActivity }> = ({ activityLog }) => {
    const today = new Date();
    const endDate = new Date(today);
    const daysToShow = 119; // 17 weeks * 7 days
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - daysToShow);

    // Align start date to the beginning of the week (Sunday)
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const days = [];
    let currentDate = new Date(startDate);
    while (days.length < daysToShow + 7) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    const getColor = (count: number) => {
        if (count === 0) return 'bg-bg-tertiary/50';
        if (count <= 2) return 'bg-accent-primary/20';
        if (count <= 5) return 'bg-accent-primary/50';
        if (count <= 8) return 'bg-accent-primary/80';
        return 'bg-accent-primary';
    };
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthLabels = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
        const firstDayOfMonth = week.find(day => day.getDate() === 1);
        if (firstDayOfMonth && firstDayOfMonth.getMonth() !== lastMonth) {
            monthLabels.push({ name: monthNames[firstDayOfMonth.getMonth()], index: weekIndex });
            lastMonth = firstDayOfMonth.getMonth();
        } else if (weekIndex === 0) {
             monthLabels.push({ name: monthNames[week[0].getMonth()], index: weekIndex });
             lastMonth = week[0].getMonth();
        }
    });


    return (
        <div className="bg-bg-secondary p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4 text-text-primary">Learning Activity</h3>
            <div className="flex justify-start gap-4 overflow-x-auto pb-2">
                 <div className="flex flex-col">
                    <div className="flex text-xs text-text-tertiary h-4">
                       <div className="w-10"></div>
                       {monthLabels.map(m => <span key={m.name} style={{gridColumnStart: m.index + 1}}>{m.name}</span>)}
                    </div>
                    <div className="flex">
                        <div className="flex flex-col gap-1 mr-2 text-xs text-text-tertiary shrink-0">
                           <div className="h-4"></div>
                           <div className="h-4 flex items-center">Mon</div>
                           <div className="h-4"></div>
                           <div className="h-4 flex items-center">Wed</div>
                           <div className="h-4"></div>
                           <div className="h-4 flex items-center">Fri</div>
                           <div className="h-4"></div>
                        </div>
                        <div className="grid grid-flow-col grid-rows-7 gap-1">
                            {days.map(day => {
                                const dateString = day.toISOString().split('T')[0];
                                const count = activityLog[dateString] || 0;
                                return (
                                    <div 
                                        key={dateString} 
                                        className={`w-4 h-4 rounded-sm ${getColor(count)}`}
                                        title={`${count} lessons on ${day.toDateString()}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Dashboard: React.FC = () => {
    const { progress, setViewMode, setSelectedCourseId, setSelectedLanguage } = useAppContext();

    const { totalLessonsCompleted, coursesStarted, startedCourses } = React.useMemo(() => {
        let completedCount = 0;
        const startedCourseIds = new Set<string>();
        
        Object.keys(progress.courses).forEach(courseId => {
            const courseProgress = progress.courses[courseId];
            if (courseProgress && courseProgress.completedLessons) {
                const lessonsInCourse = courseProgress.completedLessons.length;
                if (lessonsInCourse > 0) {
                    completedCount += lessonsInCourse;
                    startedCourseIds.add(courseId);
                }
            }
        });

        const allCourses = (Object.values(COURSES_DATA) as Course[][]).flat();
        const startedCoursesData = allCourses.filter(course => startedCourseIds.has(course.id));

        return {
            totalLessonsCompleted: completedCount,
            coursesStarted: startedCourseIds.size,
            startedCourses: startedCoursesData,
        };
    }, [progress.courses]);

    const handleCourseClick = (course: Course) => {
        // Find the language for this course
        for (const lang of Object.keys(COURSES_DATA)) {
            if (COURSES_DATA[lang].some(c => c.id === course.id)) {
                setSelectedLanguage(lang as any);
                break;
            }
        }
        setSelectedCourseId(course.id);
        setViewMode('courses');
    };

    return (
        <main className="flex-grow bg-bg-primary text-text-primary flex flex-col h-screen overflow-y-auto">
            <header className="p-6">
                 <div className="h-8 mb-4">
                    <LogoIcon className="h-full w-auto" />
                 </div>
                 <h1 className="text-3xl font-bold">Your Learning Dashboard</h1>
            </header>
            <div className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatCard title="Lessons Completed" value={totalLessonsCompleted} icon={<CheckCircleIcon className="w-6 h-6 text-accent-primary" />} />
                    <StatCard title="Courses Started" value={coursesStarted} icon={<BookIcon className="w-6 h-6 text-accent-primary" />} />
                </div>

                <ActivityCalendar activityLog={progress.activityLog} />

                <div>
                    <h3 className="text-lg font-bold mb-4 text-text-primary">My Courses</h3>
                    {startedCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {startedCourses.map(course => {
                                const totalLessons = course.modules.reduce((total, module) => total + module.classes.reduce((subTotal, cls) => subTotal + cls.lessons.length, 0), 0);
                                const completedCount = progress.courses[course.id]?.completedLessons.length || 0;
                                const percentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

                                return (
                                    <button 
                                        key={course.id}
                                        onClick={() => handleCourseClick(course)}
                                        className="bg-bg-secondary p-6 rounded-lg text-left hover:ring-2 hover:ring-accent-primary transition-all"
                                    >
                                        <h4 className="font-bold text-text-primary">{course.title}</h4>
                                        <p className="text-sm text-text-secondary mt-1 h-10">{course.description}</p>
                                        <div className="mt-4">
                                            <div className="flex justify-between items-center text-xs text-text-secondary mb-1">
                                                <span>{completedCount} / {totalLessons} lessons</span>
                                                <span>{Math.round(percentage)}%</span>
                                            </div>
                                            <div className="w-full bg-bg-tertiary rounded-full h-2">
                                                <div className="bg-accent-primary h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                         <div className="text-center py-12 bg-bg-secondary rounded-lg">
                            <p className="text-text-secondary">You haven't started any courses yet.</p>
                            <button onClick={() => setViewMode('courses')} className="mt-4 px-4 py-2 bg-accent-primary text-text-on-accent font-semibold rounded-md hover:bg-accent-primary-hover">
                                Explore Courses
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Dashboard;