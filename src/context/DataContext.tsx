import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type {
    Course,
    Exam,
    Assignment,
    Event,
    LostItem,
    Notice,
    Faculty,
    Note,
    Folder,
    Practical,
    Student
} from '../types';
import * as dbService from '../services/database.service';
import { useAuth } from './AuthContext';

interface DataContextType {
    courses: Course[];
    exams: Exam[];
    assignments: Assignment[];
    events: Event[];
    lostItems: LostItem[];
    notices: Notice[];
    faculty: Faculty[];
    notes: Note[];
    folders: Folder[];
    practicals: Practical[];
    isLoading: boolean;
    refreshData: () => Promise<void>;

    // Actions
    addCourse: (course: Course) => Promise<void>;
    updateCourse: (id: string, course: Course) => Promise<void>;
    deleteCourse: (id: string) => Promise<void>;

    addExam: (exam: Exam) => Promise<void>;
    updateExam: (id: string, exam: Exam) => Promise<void>;
    deleteExam: (id: string) => Promise<void>;

    addAssignment: (assignment: Assignment) => Promise<void>;
    updateAssignment: (id: string, assignment: Assignment) => Promise<void>;
    deleteAssignment: (id: string) => Promise<void>;

    addEvent: (event: Event) => Promise<void>;
    updateEvent: (id: string, event: Event) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;

    addLostItem: (item: LostItem) => Promise<void>;
    updateLostItem: (id: string, item: LostItem) => Promise<void>;
    deleteLostItem: (id: string) => Promise<void>;

    addNotice: (notice: Notice) => Promise<void>;
    deleteNotice: (id: string) => Promise<void>;

    addNote: (note: Note) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    fetchNotesForFolder: (folderId: string | null) => Promise<void>;

    // Folder Actions
    fetchFoldersForParent: (parentId: string | null) => Promise<void>;
    addFolder: (name: string, parentId: string | null, courseId?: string) => Promise<void>;

    // Practical Actions
    addPractical: (practical: Practical) => Promise<void>;
    updateUserGroup: (userId: string, group: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [exams, setExams] = useState<Exam[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [lostItems, setLostItems] = useState<LostItem[]>([]);
    const [notices, setNotices] = useState<Notice[]>([]);
    const [faculty, setFaculty] = useState<Faculty[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [practicals, setPracticals] = useState<Practical[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Get user's section for filtering
    const userSection = user?.role === 'student' ? user.section : undefined;
    const userPracticalGroup = (user?.role === 'student') ? (user as Student).practicalGroup : undefined;

    // Fetch all data
    const refreshData = async () => {
        setIsLoading(true);
        try {
            const [
                coursesData,
                examsData,
                assignmentsData,
                eventsData,
                lostItemsData,
                noticesData,
                facultyData,
                notesData,
                foldersData,
                practicalsData
            ] = await Promise.all([
                dbService.fetchCourses(userSection),
                dbService.fetchExams(userSection),
                dbService.fetchAssignments(userSection, user?.id),
                dbService.fetchEvents(),
                dbService.fetchLostItems(),
                dbService.fetchNotices(),
                dbService.fetchFaculty(),
                dbService.fetchNotes(userSection),
                dbService.fetchFolders(null), // Fetch root folders initially
                dbService.fetchPracticals(userPracticalGroup)
            ]);

            setCourses(coursesData);
            setExams(examsData);
            setAssignments(assignmentsData);
            setEvents(eventsData);
            setLostItems(lostItemsData);
            setNotices(noticesData);
            setFaculty(facultyData);
            setNotes(notesData);
            setFolders(foldersData);
            setPracticals(practicalsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        if (user) {
            refreshData();
        }
    }, [user]);

    // Real-time subscriptions
    useEffect(() => {
        if (!user) return;

        // Subscribe to notices changes
        const noticesChannel = dbService.subscribeToNotices(() => {
            dbService.fetchNotices().then(setNotices);
        });

        // Subscribe to lost items changes
        const lostItemsChannel = dbService.subscribeToLostItems(() => {
            dbService.fetchLostItems().then(setLostItems);
        });

        return () => {
            noticesChannel.unsubscribe();
            lostItemsChannel.unsubscribe();
        };
    }, [user]);

    // Course Actions
    const addCourse = async (course: Course) => {
        await dbService.createCourse(course);
        await refreshData();
    };
    const updateCourse = async (id: string, course: Course) => {
        await dbService.updateCourse(id, course);
        await refreshData();
    };
    const deleteCourse = async (id: string) => {
        await dbService.deleteCourse(id);
        await refreshData();
    };

    // Exam Actions
    const addExam = async (exam: Exam) => {
        await dbService.createExam({ ...exam, section: userSection || 'A' });
        await refreshData();
    };
    const updateExam = async (id: string, exam: Exam) => {
        await dbService.updateExam(id, exam);
        await refreshData();
    };
    const deleteExam = async (id: string) => {
        await dbService.deleteExam(id);
        await refreshData();
    };

    // Assignment Actions
    const addAssignment = async (assignment: Assignment) => {
        await dbService.createAssignment({ ...assignment, section: userSection || 'A' });
        await refreshData();
    };
    const updateAssignment = async (id: string, assignment: Assignment) => {
        await dbService.updateAssignment(id, assignment);
        await refreshData();
    };
    const deleteAssignment = async (id: string) => {
        await dbService.deleteAssignment(id);
        await refreshData();
    };

    // Event Actions
    const addEvent = async (event: Event) => {
        await dbService.createEvent(event);
        await refreshData();
    };
    const updateEvent = async (id: string, event: Event) => {
        await dbService.updateEvent(id, event);
        await refreshData();
    };
    const deleteEvent = async (id: string) => {
        await dbService.deleteEvent(id);
        await refreshData();
    };

    // Lost Item Actions
    const addLostItem = async (item: LostItem) => {
        await dbService.createLostItem({ ...item, postedBy: user?.id });
        await refreshData();
    };
    const updateLostItem = async (id: string, item: LostItem) => {
        await dbService.updateLostItem(id, item);
        await refreshData();
    };
    const deleteLostItem = async (id: string) => {
        await dbService.deleteLostItem(id);
        await refreshData();
    };

    // Notice Actions
    const addNotice = async (notice: Notice) => {
        await dbService.createNotice(notice);
        await refreshData();
    };
    const deleteNotice = async (id: string) => {
        await dbService.deleteNotice(id);
        await refreshData();
    };

    // Note Actions
    const addNote = async (note: Note) => {
        if (!user) return;
        await dbService.createNote({
            ...note,
            authorId: user.id,
            section: userSection || 'A'
        });
        await refreshData();
    };
    const deleteNote = async (id: string) => {
        await dbService.deleteNote(id);
        await refreshData();
    };

    const fetchNotesForFolder = async (folderId: string | null) => {
        const notesData = await dbService.fetchNotes(userSection, folderId);
        setNotes(notesData);
    };

    // Folder Actions
    const fetchFoldersForParent = async (parentId: string | null) => {
        const foldersData = await dbService.fetchFolders(parentId);
        setFolders(foldersData);
    };

    const addFolder = async (name: string, parentId: string | null, courseId?: string) => {
        await dbService.createFolder({ name, parentId, courseId });
        await fetchFoldersForParent(parentId);
    };

    // Practical Actions
    const addPractical = async (practical: Practical) => {
        await dbService.createPractical(practical);
        const practicalsData = await dbService.fetchPracticals(userPracticalGroup);
        setPracticals(practicalsData);
    };

    const updateUserGroup = async (userId: string, group: string) => {
        await dbService.updateUserPracticalGroup(userId, group);
    };

    return (
        <DataContext.Provider value={{
            courses,
            exams,
            assignments,
            events,
            lostItems,
            notices,
            faculty,
            notes,
            folders,
            practicals,
            isLoading,
            refreshData,
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
            deleteNotice,
            addNote,
            deleteNote,
            fetchNotesForFolder,
            fetchFoldersForParent,
            addFolder,
            addPractical,
            updateUserGroup
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
