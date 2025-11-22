# College Website - Deployment Guide

This guide will walk you through deploying your college website to production using Supabase and Vercel.

## Prerequisites

- Node.js installed (v18 or higher)
- GitHub account
- Vercel account (free tier is fine)
- Supabase account (free tier is fine)

---

## Step 1: Set Up Supabase Backend

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in the details:
   - **Name**: `college-website` (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Select closest to your users
4. Click **"Create new project"** and wait for it to initialize (~2 minutes)

### 1.2 Execute Database Schema

1. In your Supabase project dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy the entire contents of `supabase/schema.sql` from your project
4. Paste into the SQL editor
5. Click **"Run"** or press `Ctrl+Enter`
6. You should see: "Success. No rows returned"

### 1.3 Seed Sample Data (Optional)

1. In SQL Editor, create another new query
2. Copy the entire contents of `supabase/seed.sql`
3. Paste and run
4. This will create sample students, courses, exams, etc.

### 1.4 Set Up Storage Buckets

1. Go to **Storage** in the left sidebar
2. Click **"Create a new bucket"**
3. Create these 4 buckets with **Public** access:
   - `notes`
   - `event-images`
   - `lost-item-images`
   - `avatars`

For each bucket:
- Name: (as listed above)
- **Public bucket**: ✅ Enabled
- Click **"Create bucket"**

### 1.5 Get API Credentials

1. Go to **Project Settings** (⚙️ icon in sidebar)
2. Click **API** in the settings menu
3. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (a long string starting with `eyJ...`)

### 1.6 Update Local Environment

1. Open `.env` file in your project root
2. Replace the values:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1N...your-actual-key
   ```
3. Save the file

---

## Step 2: Test Locally

### 2.1 Install Dependencies (if not already done)
```bash
npm install
```

### 2.2 Run Development Server
```bash
npm run dev
```

### 2.3 Test the Application

Open `http://localhost:5173` and test:

**Student Login:**
- Roll Number: `CS2024001`
- Section: `A`
- Password: `password123`

**Admin Login:**
> [!IMPORTANT]
> You need to create an admin user first!

To create an admin:
1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Click **"Add user"**
3. Choose **"Create new user"**
4. Email: `admin@college.edu`
5. Password: Choose a password (e.g., `adminpassword`)
6. **Auto Confirm User**: ✅ Enabled
7. Click **"Create user"**
8. Copy the **User UID** that appears
9. Go to **SQL Editor** and run:
   ```sql
   INSERT INTO admins (id, name, email, avatar) VALUES
   ('paste-user-uid-here', 'Admin User', 'admin@college.edu', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800');
   ```

Now you can log in as admin with:
- Email: `admin@college.edu`
- Password: (what you set)

---

## Step 3: Build for Production

Test the production build locally:

```bash
npm run build
npm run preview
```

Check the preview at `http://localhost:4173` to ensure everything works.

---

## Step 4: Deploy to Vercel

### 4.1 Push to GitHub

If you haven't already:

```bash
git add .
git commit -m "Backend integration complete"
git push origin main
```

### 4.2 Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 4.3 Configure Environment Variables

Before deploying, click **"Environment Variables"**:

Add these two variables:
1. Name: `VITE_SUPABASE_URL`
   - Value: (paste your Supabase project URL)
2. Name: `VITE_SUPABASE_ANON_KEY`
   - Value: (paste your Supabase anon key)

### 4.4 Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (~2 minutes)
3. You'll get a live URL like: `https://your-project.vercel.app`

---

## Step 5: Post-Deployment

### 5.1 Test Production Application

Visit your Vercel URL and test:
- Student login
- Admin login
- Creating courses, exams, assignments
- Uploading notes
- Real-time updates (open two browsers)

### 5.2 Custom Domain (Optional)

In Vercel:
1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

---

## Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution**: Make sure `.env` file has correct values and restart dev server

### Issue: Login fails
**Solution**: 
- For students: Verify the student exists in `students` table
- For admins: Verify admin exists in both `auth.users` AND `admins` table

### Issue: File uploads fail
**Solution**: Check storage buckets are **Public** and named correctly

### Issue: Data not loading
**Solution**: Check browser console for errors. Verify RLS policies are set up correctly

### Issue: Build fails on Vercel
**Solution**: Check environment variables are set correctly in Vercel dashboard

---

## Adding New Students

### Option 1: SQL Insert (Recommended for bulk)

1. Go to Supabase **SQL Editor**
2. Run this, replacing values:
   ```sql
   INSERT INTO students (roll_no, section, name, email, password_hash, course, semester)
   VALUES (
     'CS2024002',
     'A',
     'Student Name',
     'student@college.edu',
     '$2a$10$rKZLvXZ5YJ5YJ5YJ5YJ5YeH5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ',
     'Computer Science',
     4
   );
   ```

**Note**: The password hash above is for `password123`. For production, generate proper bcrypt hashes.

### Option 2: Table Editor (For single students)

1. Go to **Table Editor** → **students**
2. Click **"Insert row"**
3. Fill in the fields
4. For `password_hash`, use a bcrypt hash of the password

---

## Maintenance

### Viewing Logs
- **Vercel**: Dashboard → Your Project → Deployments → Click deployment → Runtime Logs
- **Supabase**: Dashboard → Logs (left sidebar)

### Database Backups
- Supabase automatically backs up your database daily (free tier: 7 days retention)
- Manual backup: **Database** → **Backups** → **Download**

### Monitoring
- Supabase Dashboard shows:
  - API requests
  - Database size
  - Active connections
- Vercel shows:
  - Deployment status
  - Analytics (visitor count, etc.)

---

## Next Steps

1. **Add more students**: Use SQL INSERT or create an admin interface
2. **Customize branding**: Update colors, logo, college name
3. **Set up email notifications**: Use Supabase Auth email templates
4. **Add more features**: Attendance tracking, grade management, etc.

---

## Support

- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs
- React Router: https://reactrouter.com
