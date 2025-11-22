import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type {
    Course,
    Exam,
    Assignment,
    Event,
    LostItem,
    Notice,
    Faculty
} from '../types';
import {
    courses as initialCourses,
    exams as initialExams,
    mockAssignments as initialAssignments,
    mockEvents as initialEvents,
    mockLostItems as initialLostItems,
    mockNotices as initialNotices,
    mockFaculty as initialFaculty
} from '../data/mockData';

interface DataContextType {
    courses: Course[];
    exams: Exam[];
    assignments: Assignment[];
    events: Event[];
    lostItems: LostItem[];
    notices: Notice[];
    faculty: Faculty[];

    // Actions
    addCourse: (course: Course) => void;
    updateCourse: (id: string, course: Course) => void;
    deleteCourse: (id: string) => void;

    addExam: (exam: Exam) => void;
    updateExam: (id: string, exam: Exam) => void;
    deleteExam: (id: string) => void;

    addAssignment: (assignment: Assignment) => void;
    updateAssignment: (id: string, assignment: Assignment) => void;
    deleteAssignment: (id: string) => void;

    addEvent: (event: Event) => void;
    updateEvent: (id: string, event: Event) => void;
    deleteEvent: (id: string) => void;

    addLostItem: (item: LostItem) => void;
    updateLostItem: (id: string, item: LostItem) => void;
    deleteLostItem: (id: string) => void;

    addNotice: (notice: Notice) => void;
    deleteNotice: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [exams, setExams] = useState<Exam[]>(initialExams);
    const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [lostItems, setLostItems] = useState<LostItem[]>(initialLostItems);
    const [notices, setNotices] = useState<Notice[]>(initialNotices);
    const [faculty] = useState<Faculty[]>(initialFaculty); // Faculty usually static for this scope

    // Course Actions
    const addCourse = (course: Course) => setCourses([...courses, course]);
    const updateCourse = (id: string, updatedCourse: Course) => {
        setCourses(courses.map(c => c.id === id ? updatedCourse : c));
    };
    const deleteCourse = (id: string) => setCourses(courses.filter(c => c.id !== id));

    // Exam Actions
    const addExam = (exam: Exam) => setExams([...exams, exam]);
    const updateExam = (id: string, updatedExam: Exam) => {
        setExams(exams.map(e => e.id === id ? updatedExam : e));
    };
    const deleteExam = (id: string) => setExams(exams.filter(e => e.id !== id));

    // Assignment Actions
    const addAssignment = (assignment: Assignment) => setAssignments([...assignments, assignment]);
    const updateAssignment = (id: string, updatedAssignment: Assignment) => {
        setAssignments(assignments.map(a => a.id === id ? updatedAssignment : a));
    };
    const deleteAssignment = (id: string) => setAssignments(assignments.filter(a => a.id !== id));

    // Event Actions
    const addEvent = (event: Event) => setEvents([...events, event]);
    const updateEvent = (id: string, updatedEvent: Event) => {
        setEvents(events.map(e => e.id === id ? updatedEvent : e));
    };
    const deleteEvent = (id: string) => setEvents(events.filter(e => e.id !== id));

    // Lost Item Actions
    const addLostItem = (item: LostItem) => setLostItems([...lostItems, item]);
    const updateLostItem = (id: string, updatedItem: LostItem) => {
        setLostItems(lostItems.map(i => i.id === id ? updatedItem : i));
    };
    const deleteLostItem = (id: string) => setLostItems(lostItems.filter(i => i.id !== id));

    // Notice Actions
    const addNotice = (notice: Notice) => setNotices([notice, ...notices]);
    const deleteNotice = (id: string) => setNotices(notices.filter(n => n.id !== id));

    return (
        <DataContext.Provider value={{
            courses,
            exams,
            assignments,
            events,
            lostItems,
            notices,
            faculty,
            addCourse,
            updateCourse,
            deleteCourse,
            addExam,
            updateExam,
            deleteExam,
            addAssignment,
            updateAssignment,
            deleteAssignment,
            addEvent,
            updateEvent,
            deleteEvent,
            addLostItem,
            updateLostItem,
            deleteLostItem,
            addNotice,
            deleteNotice
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
