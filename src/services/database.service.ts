import { supabase } from '../lib/supabase';
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
    Practical
} from '../types';

// =============================================
// COURSES
// =============================================

export async function fetchCourses(section?: string) {
    const query = supabase.from('courses').select(`
        *,
        schedule:course_schedule(*)
    `);

    if (section) {
        query.eq('section', section);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching courses:', error);
        return [];
    }

    // Transform to match frontend type
    return data.map(course => ({
        id: course.id,
        code: course.code,
        name: course.name,
        professor: course.professor,
        schedule: course.schedule.map((s: any) => ({
            day: s.day,
            time: s.time,
            room: s.room
        }))
    })) as Course[];
}

export async function createCourse(course: Omit<Course, 'id'>) {
    // Insert course
    const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .insert({
            code: course.code,
            name: course.name,
            professor: course.professor,
            section: 'A' // Default section
        })
        .select()
        .single();

    if (courseError) {
        console.error('Error creating course:', courseError);
        throw new Error(courseError.message);
    }

    // Insert schedule
    const scheduleInserts = course.schedule.map(s => ({
        course_id: courseData.id,
        day: s.day,
        time: s.time,
        room: s.room
    }));

    const { error: scheduleError } = await supabase
        .from('course_schedule')
        .insert(scheduleInserts);

    if (scheduleError) {
        console.error('Error creating schedule:', scheduleError);
        throw new Error(scheduleError.message);
    }

    return courseData.id;
}

export async function updateCourse(id: string, course: Course) {
    // Update course
    const { error: courseError } = await supabase
        .from('courses')
        .update({
            code: course.code,
            name: course.name,
            professor: course.professor
        })
        .eq('id', id);

    if (courseError) {
        console.error('Error updating course:', courseError);
        throw new Error(courseError.message);
    }

    // Delete old schedule
    await supabase.from('course_schedule').delete().eq('course_id', id);

    // Insert new schedule
    const scheduleInserts = course.schedule.map(s => ({
        course_id: id,
        day: s.day,
        time: s.time,
        room: s.room
    }));

    const { error: scheduleError } = await supabase
        .from('course_schedule')
        .insert(scheduleInserts);

    if (scheduleError) {
        console.error('Error updating schedule:', scheduleError);
        throw new Error(scheduleError.message);
    }
}

export async function deleteCourse(id: string) {
    const { error } = await supabase.from('courses').delete().eq('id', id);

    if (error) {
        console.error('Error deleting course:', error);
        throw new Error(error.message);
    }
}

// =============================================
// EXAMS
// =============================================

export async function fetchExams(section?: string) {
    const query = supabase.from('exams').select(`
        *,
        course:courses(name)
    `);

    if (section) {
        query.eq('section', section);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching exams:', error);
        return [];
    }

    return data.map(exam => ({
        id: exam.id,
        courseId: exam.course_id,
        courseName: exam.course.name,
        date: exam.date,
        time: exam.time,
        room: exam.room,
        duration: exam.duration
    })) as Exam[];
}

export async function createExam(exam: Omit<Exam, 'id'> & { section: string }) {
    const { data, error } = await supabase
        .from('exams')
        .insert({
            course_id: exam.courseId,
            date: exam.date,
            time: exam.time,
            room: exam.room,
            duration: exam.duration,
            section: exam.section
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating exam:', error);
        throw new Error(error.message);
    }

    return data.id;
}

export async function updateExam(id: string, exam: Exam) {
    const { error } = await supabase
        .from('exams')
        .update({
            course_id: exam.courseId,
            date: exam.date,
            time: exam.time,
            room: exam.room,
            duration: exam.duration
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating exam:', error);
        throw new Error(error.message);
    }
}

export async function deleteExam(id: string) {
    const { error } = await supabase.from('exams').delete().eq('id', id);

    if (error) {
        console.error('Error deleting exam:', error);
        throw new Error(error.message);
    }
}

// =============================================
// ASSIGNMENTS
// =============================================

export async function fetchAssignments(section?: string, studentId?: string) {
    const query = supabase.from('assignments').select(`
        *,
        course:courses(name),
        submissions:assignment_submissions(*)
    `);

    if (section) {
        query.eq('section', section);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching assignments:', error);
        return [];
    }

    return data.map(assignment => {
        const submission = studentId
            ? assignment.submissions.find((s: any) => s.student_id === studentId)
            : null;

        return {
            id: assignment.id,
            courseId: assignment.course_id,
            courseName: assignment.course.name,
            title: assignment.title,
            description: assignment.description,
            dueDate: assignment.due_date,
            status: submission?.status || 'Pending',
            grade: submission?.grade
        };
    }) as Assignment[];
}

export async function createAssignment(assignment: Omit<Assignment, 'id' | 'status'> & { section: string }) {
    const { data, error } = await supabase
        .from('assignments')
        .insert({
            course_id: assignment.courseId,
            title: assignment.title,
            description: assignment.description,
            due_date: assignment.dueDate,
            section: assignment.section
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating assignment:', error);
        throw new Error(error.message);
    }

    return data.id;
}

export async function updateAssignment(id: string, assignment: Assignment) {
    const { error } = await supabase
        .from('assignments')
        .update({
            course_id: assignment.courseId,
            title: assignment.title,
            description: assignment.description,
            due_date: assignment.dueDate
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating assignment:', error);
        throw new Error(error.message);
    }
}

export async function deleteAssignment(id: string) {
    const { error } = await supabase.from('assignments').delete().eq('id', id);

    if (error) {
        console.error('Error deleting assignment:', error);
        throw new Error(error.message);
    }
}

// =============================================
// EVENTS
// =============================================

export async function fetchEvents() {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

    if (error) {
        console.error('Error fetching events:', error);
        return [];
    }

    return data.map(event => ({
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        category: event.category,
        description: event.description,
        image: event.image_url
    })) as Event[];
}

export async function createEvent(event: Omit<Event, 'id'>) {
    const { data, error } = await supabase
        .from('events')
        .insert({
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            category: event.category,
            description: event.description,
            image_url: event.image
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating event:', error);
        throw new Error(error.message);
    }

    return data.id;
}

export async function updateEvent(id: string, event: Event) {
    const { error } = await supabase
        .from('events')
        .update({
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            category: event.category,
            description: event.description,
            image_url: event.image
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating event:', error);
        throw new Error(error.message);
    }
}

export async function deleteEvent(id: string) {
    const { error } = await supabase.from('events').delete().eq('id', id);

    if (error) {
        console.error('Error deleting event:', error);
        throw new Error(error.message);
    }
}

// =============================================
// LOST ITEMS
// =============================================

export async function fetchLostItems() {
    const { data, error } = await supabase
        .from('lost_items')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching lost items:', error);
        return [];
    }

    return data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        location: item.location,
        date: item.created_at.split('T')[0],
        contact: item.contact,
        image: item.image_url,
        status: item.status
    })) as LostItem[];
}

export async function createLostItem(item: Omit<LostItem, 'id' | 'date'> & { postedBy?: string }) {
    const { data, error } = await supabase
        .from('lost_items')
        .insert({
            title: item.title,
            description: item.description,
            location: item.location,
            contact: item.contact,
            image_url: item.image,
            status: item.status,
            posted_by: item.postedBy
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating lost item:', error);
        throw new Error(error.message);
    }

    return data.id;
}

export async function updateLostItem(id: string, item: LostItem) {
    const { error } = await supabase
        .from('lost_items')
        .update({
            title: item.title,
            description: item.description,
            location: item.location,
            contact: item.contact,
            image_url: item.image,
            status: item.status
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating lost item:', error);
        throw new Error(error.message);
    }
}

export async function deleteLostItem(id: string) {
    const { error } = await supabase.from('lost_items').delete().eq('id', id);

    if (error) {
        console.error('Error deleting lost item:', error);
        throw new Error(error.message);
    }
}

// =============================================
// NOTICES
// =============================================

export async function fetchNotices() {
    const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching notices:', error);
        return [];
    }

    return data.map(notice => ({
        id: notice.id,
        title: notice.title,
        content: notice.content,
        date: notice.created_at.split('T')[0],
        author: notice.author,
        priority: notice.priority
    })) as Notice[];
}

export async function createNotice(notice: Omit<Notice, 'id' | 'date'>) {
    const { data, error } = await supabase
        .from('notices')
        .insert({
            title: notice.title,
            content: notice.content,
            author: notice.author,
            priority: notice.priority
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating notice:', error);
        throw new Error(error.message);
    }

    return data.id;
}

export async function deleteNotice(id: string) {
    const { error } = await supabase.from('notices').delete().eq('id', id);

    if (error) {
        console.error('Error deleting notice:', error);
        throw new Error(error.message);
    }
}

// =============================================
// FACULTY
// =============================================

export async function fetchFaculty() {
    const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching faculty:', error);
        return [];
    }

    return data.map(faculty => ({
        id: faculty.id,
        name: faculty.name,
        department: faculty.department,
        email: faculty.email,
        phone: faculty.phone,
        office: faculty.office,
        image: faculty.image_url
    })) as Faculty[];
}

// =============================================
// NOTES
// =============================================

export async function fetchNotes(section?: string, folderId?: string | null) {
    let query = supabase.from('notes').select(`
        *,
        course:courses(name)
    `).order('created_at', { ascending: false });

    if (section) {
        query = query.eq('section', section);
    }

    if (folderId !== undefined) {
        if (folderId === null) {
            query = query.is('folder_id', null);
        } else {
            query = query.eq('folder_id', folderId);
        }
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching notes:', error);
        return [];
    }

    return data.map(note => ({
        id: note.id,
        title: note.title,
        courseId: note.course_id,
        courseName: note.course?.name || 'Unknown Course',
        author: note.author_name,
        date: note.created_at.split('T')[0],
        url: note.file_url,
        type: note.file_type,
        size: note.file_size,
        unit: note.unit,
        folderId: note.folder_id
    })) as Note[];
}

export async function createNote(note: Omit<Note, 'id' | 'date' | 'courseName'> & { authorId: string; section: string }) {
    const { data, error } = await supabase
        .from('notes')
        .insert({
            title: note.title,
            course_id: note.courseId,
            author_id: note.authorId,
            author_name: note.author,
            file_url: note.url,
            file_type: note.type,
            file_size: note.size,
            section: note.section,
            unit: note.unit,
            folder_id: note.folderId
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating note:', error);
        throw new Error(error.message);
    }

    return data.id;
}

export async function deleteNote(id: string) {
    const { error } = await supabase.from('notes').delete().eq('id', id);

    if (error) {
        console.error('Error deleting note:', error);
        throw new Error(error.message);
    }
}

// =============================================
// REAL-TIME SUBSCRIPTIONS
// =============================================

export function subscribeToNotices(callback: (payload: any) => void) {
    return supabase
        .channel('notices-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'notices' }, callback)
        .subscribe();
}

export function subscribeToLostItems(callback: (payload: any) => void) {
    return supabase
        .channel('lost-items-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'lost_items' }, callback)
        .subscribe();
}

// =============================================
// FOLDERS
// =============================================

export async function fetchFolders(parentId: string | null = null, courseId?: string) {
    let query = supabase
        .from('folders')
        .select('*')
        .order('name', { ascending: true });

    if (parentId === null) {
        query = query.is('parent_id', null);
    } else {
        query = query.eq('parent_id', parentId);
    }

    if (courseId) {
        query = query.eq('course_id', courseId);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching folders:', error);
        return [];
    }

    return data.map(folder => ({
        id: folder.id,
        name: folder.name,
        parentId: folder.parent_id,
        courseId: folder.course_id,
        createdAt: folder.created_at
    })) as Folder[];
}

export async function createFolder(folder: { name: string; parentId?: string | null; courseId?: string }) {
    const { data, error } = await supabase
        .from('folders')
        .insert({
            name: folder.name,
            parent_id: folder.parentId,
            course_id: folder.courseId
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating folder:', error);
        throw new Error(error.message);
    }

    return data.id;
}

// =============================================
// PRACTICALS
// =============================================

export async function fetchPracticals(group?: string) {
    let query = supabase
        .from('practicals')
        .select('*')
        .order('date', { ascending: true });

    if (group) {
        query = query.eq('group_id', group);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching practicals:', error);
        return [];
    }

    return data.map(practical => ({
        id: practical.id,
        subject: practical.subject,
        title: practical.title,
        group: practical.group_id,
        date: practical.date,
        time: practical.time,
        room: practical.room
    })) as Practical[];
}

export async function createPractical(practical: Omit<Practical, 'id'>) {
    const { data, error } = await supabase
        .from('practicals')
        .insert({
            subject: practical.subject,
            title: practical.title,
            group_id: practical.group,
            date: practical.date,
            time: practical.time,
            room: practical.room
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating practical:', error);
        throw new Error(error.message);
    }

    return data.id;
}

export async function updateUserPracticalGroup(userId: string, group: string) {
    // Assuming user data is in a 'profiles' table or similar, or updating metadata
    // For this implementation, we'll assume a 'profiles' table as per schema
    const { error } = await supabase
        .from('profiles')
        .update({ practical_group: group })
        .eq('id', userId);

    if (error) {
        console.error('Error updating practical group:', error);
        throw new Error(error.message);
    }
}
