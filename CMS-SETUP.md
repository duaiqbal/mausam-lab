# Mausam Lab — CMS Setup Guide

Follow these steps exactly **once** to get the admin panel working on the live Vercel site.

---

## Step 1 — Create a Supabase project

1. Go to **https://supabase.com** → Sign in → **New project**
2. Give it any name (e.g. `mausam-lab`), choose a region close to Pakistan (e.g. Singapore), set a strong database password → **Create project**
3. Wait ~2 minutes for the project to be ready

---

## Step 2 — Run the database schema

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **New query**
3. Open the file `supabase-schema.sql` from this project folder
4. Copy the entire contents and paste into the SQL editor
5. Click **Run** (green button)
6. You should see "Success. No rows returned" — that means it worked

This creates all 7 tables, RLS policies, storage bucket, and triggers.

---

## Step 3 — Get your Supabase API keys

1. In your Supabase project go to **Settings → API** (left sidebar)
2. Copy these two values:
   - **Project URL** — looks like `https://xxxxxxxxxxxx.supabase.co`
   - **anon public** key — the long string under "Project API keys"

---

## Step 4 — Create your admin user

1. In Supabase go to **Authentication → Users** (left sidebar)
2. Click **Invite user** (or **Add user** → **Create new user**)
3. Enter the admin's email and a strong password
4. Click **Create user**

> This is the email + password the admin will use to log in at `/admin/login`

---

## Step 5 — Add environment variables to Vercel

1. Go to **https://vercel.com** → your `mausam-lab` project
2. Click **Settings** → **Environment Variables**
3. Add these two variables (for **Production**, **Preview**, and **Development**):

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | your Project URL from Step 3 |
| `VITE_SUPABASE_ANON_KEY` | your anon public key from Step 3 |

4. Click **Save** for each one

---

## Step 6 — Redeploy on Vercel

After adding the environment variables:

1. Go to **Deployments** tab in your Vercel project
2. Click the three-dot menu on the latest deployment → **Redeploy**
3. Wait ~1 minute for it to finish

---

## Step 7 — Test the admin login

1. Go to: **https://mausam-lab.vercel.app/admin/login**
2. Enter the admin email and password you created in Step 4
3. You should land on the CMS dashboard

---

## Step 8 — For local development

Create / update the file `.env.local` in the project root (it already exists):

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Then run:
```
npm run dev
```

The admin panel will be at `http://localhost:5173/admin/login`

---

## How the CMS works

```
Admin logs in at /admin/login
       ↓
Supabase Auth verifies email + password
       ↓
Admin dashboard at /admin
       ↓
Admin edits content (research, publications, team, etc.)
       ↓
Changes saved to Supabase database
       ↓
Live website at mausam-lab.vercel.app fetches from Supabase
       ↓
Changes appear immediately — no redeploy needed
```

---

## Admin panel URL map

| URL | What you can edit |
|-----|-------------------|
| `/admin` | Dashboard overview |
| `/admin/research` | Research articles (title, body, category, author, image) |
| `/admin/publications` | Publications (title, type, download link, image) |
| `/admin/initiatives` | Initiatives (name, description, image) |
| `/admin/projects` | Projects (title, status, focus area, description, image) |
| `/admin/team` | Team members (name, role, bio, department, photo) |
| `/admin/opportunities` | Opportunities (title, category, deadline, status, link) |
| `/admin/site` | Brand info, social links, contact email, entire About page content |

---

## Fallback behaviour

If the Supabase database is empty for a section, the public website automatically
shows the static placeholder data from `src/data/*.js` — the site never shows
a blank page. Once you add real content via the CMS, it replaces the placeholders.

---

## Troubleshooting

**"Invalid login credentials"** — Wrong email/password. Reset it in Supabase → Authentication → Users.

**"Missing Supabase environment variables"** — The `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
environment variables are not set in Vercel. Repeat Step 5 and redeploy.

**Content not showing on live site** — Check that you ran the SQL schema (Step 2) and that
RLS policies were created. In Supabase → Table Editor → your table → check that rows exist.

**Image uploads failing** — Go to Supabase → Storage → Buckets and confirm `cms-images`
exists and is set to **Public**. If not, create it manually with public access enabled.
