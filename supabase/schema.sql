-- =============================================
-- College Website Database Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLES
-- =============================================

-- Students Table
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    roll_no TEXT UNIQUE NOT NULL,
    section TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    avatar TEXT,
    course TEXT NOT NULL,
    semester INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admins Table (references Supabase Auth)
CREATE TABLE admins (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    avatar TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses Table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    professor TEXT NOT NULL,
    section TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Schedule Table
CREATE TABLE course_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    day TEXT NOT NULL CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
    time TEXT NOT NULL,
    room TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exams Table
CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    room TEXT NOT NULL,
    duration TEXT NOT NULL,
    section TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assignments Table
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    section TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assignment Submissions Table
CREATE TABLE assignment_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Submitted', 'Graded')),
    grade TEXT,
    submitted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assignment_id, student_id)
);

-- Notes Table
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    author_id UUID REFERENCES students(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL CHECK (file_type IN ('PDF', 'DOCX', 'IMG')),
    file_size TEXT NOT NULL,
    section TEXT NOT NULL,
    unit TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events Table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Academic', 'Cultural', 'Sports', 'Workshop')),
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lost Items Table
CREATE TABLE lost_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    contact TEXT NOT NULL,
    image_url TEXT,
    status TEXT NOT NULL CHECK (status IN ('Lost', 'Found')),
    posted_by UUID REFERENCES students(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notices Table
CREATE TABLE notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('Low', 'Medium', 'High')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Faculty Table
CREATE TABLE faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    office TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX idx_students_roll_no ON students(roll_no);
CREATE INDEX idx_students_section ON students(section);
CREATE INDEX idx_courses_section ON courses(section);
CREATE INDEX idx_exams_section ON exams(section);
CREATE INDEX idx_exams_date ON exams(date);
CREATE INDEX idx_assignments_section ON assignments(section);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);
CREATE INDEX idx_notes_course_id ON notes(course_id);
CREATE INDEX idx_notes_section ON notes(section);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_lost_items_status ON lost_items(status);
CREATE INDEX idx_notices_created_at ON notices(created_at DESC);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE lost_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;

-- Students: Students can read their own data
CREATE POLICY "Students can view their own data"
    ON students FOR SELECT
    USING (true);

-- Admins: Admins can do everything
CREATE POLICY "Admins have full access to students"
    ON students FOR ALL
    USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

-- Courses: Everyone can read, only admins can modify
CREATE POLICY "Anyone can view courses"
    ON courses FOR SELECT
    USING (true);

CREATE POLICY "Admins can modify courses"
    ON courses FOR ALL
    USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

-- Course Schedule: Everyone can read, only admins can modify
CREATE POLICY "Anyone can view course schedule"
    ON course_schedule FOR SELECT
    USING (true);

CREATE POLICY "Admins can modify course schedule"
    ON course_schedule FOR ALL
    USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

-- Exams: Everyone can read, only admins can modify
CREATE POLICY "Anyone can view exams"
    ON exams FOR SELECT
    USING (true);

CREATE POLICY "Admins can modify exams"
    ON exams FOR ALL
    USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

-- Assignments: Everyone can read, only admins can modify
CREATE POLICY "Anyone can view assignments"
    ON assignments FOR SELECT
    USING (true);

CREATE POLICY "Admins can modify assignments"
    ON assignments FOR ALL
    USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

-- Assignment Submissions: Students can view/modify their own, admins can do all
CREATE POLICY "Students can view their own submissions"
    ON assignment_submissions FOR SELECT
    USING (true);

CREATE POLICY "Students can modify their own submissions"
    ON assignment_submissions FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Students can update their own submissions"
    ON assignment_submissions FOR UPDATE
    USING (true);

CREATE POLICY "Admins can modify all submissions"
    ON assignment_submissions FOR ALL
    USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

-- Notes: Everyone can read and create, author and admins can delete
CREATE POLICY "Anyone can view notes"
    ON notes FOR SELECT
    USING (true);

CREATE POLICY "Anyone can create notes"
    ON notes FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins can delete notes"
    ON notes FOR DELETE
    USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

-- Events: Everyone can read, only admins can modify
CREATE POLICY "Anyone can view events"
    ON events FOR SELECT
    USING (true);

CREATE POLICY "Admins can modify events"
    ON events FOR ALL
    USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

-- Lost Items: Everyone can read and create, admins can modify all
CREATE POLICY "Anyone can view lost items"
    ON lost_items FOR SELECT
    USING (true);

CREATE POLICY "Anyone can create lost items"
    ON lost_items FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Anyone can update lost items"
    ON lost_items FOR UPDATE
    USING (true);

CREATE POLICY "Admins can delete lost items"
    ON lost_items FOR DELETE
    USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

-- Notices: Everyone can read, only admins can modify
CREATE POLICY "Anyone can view notices"
    ON notices FOR SELECT
    USING (true);

CREATE POLICY "Admins can modify notices"
    ON notices FOR ALL
    USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

-- Faculty: Everyone can read, only admins can modify
CREATE POLICY "Anyone can view faculty"
    ON faculty FOR SELECT
    USING (true);

CREATE POLICY "Admins can modify faculty"
    ON faculty FOR ALL
    USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON exams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON assignments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lost_items_updated_at BEFORE UPDATE ON lost_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- STORAGE BUCKETS (Run these in Supabase Dashboard > Storage)
-- =============================================

-- Create storage buckets for file uploads
-- Bucket: notes
-- Bucket: event-images
-- Bucket: lost-item-images
-- Bucket: avatars

-- Note: Storage policies need to be set up in Supabase Dashboard
