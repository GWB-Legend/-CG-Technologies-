================================================================================
CG TECHNOLOGIES — CORPORATE IDENTITY SYSTEM
Assignment 1 — README
================================================================================

Assignment:   Corporate Identity System Design (Logo, Letterhead, Business Card)
Firm:         CG Technologies
Tagline:      Connected Growth
Stack:        HTML + CSS + JavaScript + Supabase (database + storage)
Deliverable:  Printed & mounted A3 board + USB (AI + PDF files)
Year:         2026
Lecturer:     Mr. Ibrahim Barrie


================================================================================
1. PROJECT OVERVIEW
================================================================================
A complete Corporate Identity System for a fictional IT firm "CG Technologies",
built as a browser-based presentation backed by Supabase. The system includes:
  - Primary logo lockup
  - Design tokens (colors + typography)
  - A4 letterhead mockup
  - Business card (front + back)
  - Live consultation feedback form (stored in Supabase)


================================================================================
2. PROJECT STRUCTURE
================================================================================
cg-cis/
  index.html          -> Main page (structure)
  styles.css          -> Presentation (design system)
  app.js              -> Behavior + Supabase client
  supabase_setup.sql  -> Run once in Supabase SQL Editor
  README.txt          -> This file


================================================================================
3. PREREQUISITES
================================================================================
- Modern browser (Chrome, Edge, or Firefox)
- Free Supabase account ......... https://supabase.com
- Internet connection (Google Fonts + Supabase SDK + API)
- Adobe Illustrator (for final .AI deliverables)
- A3 printer access
- USB drive


================================================================================
4. SUPABASE SETUP
================================================================================

4.1 CREATE THE PROJECT
-----------------------
1. Sign in at https://supabase.com/dashboard
2. Click "New project"
3. Name: cg-corporate-identity
4. Set a database password and save it somewhere safe
5. Region: closest to you
6. Plan: Free
7. Click "Create new project" and wait 1-2 minutes

4.2 CONFIRM YOUR CREDENTIALS
----------------------------
Go to Settings -> API and copy:
  - Project URL
  - anon / public key

This project is wired to:
  Project URL: https://kbvtyiokuqnbhuqnfepl.supabase.co

If you rotate your JWT secret, update SUPABASE_ANON_KEY in app.js.

WARNING: Never use the service_role key in a browser app.

4.3 CREATE THE STORAGE BUCKET
-----------------------------
1. Left sidebar -> Storage
2. Click "New bucket"
3. Name: Photos
4. Toggle "Public bucket" ON
5. Click Create
6. Upload your logo file (optional)

4.4 RUN THE SCHEMA
------------------
1. Left sidebar -> SQL Editor
2. Click "+ New query"
3. Paste the entire contents of supabase_setup.sql
4. Click Run (or Ctrl + Enter)
5. Expect: "Success. No rows returned"

4.5 VERIFY
----------
Table Editor should show 5 tables:
  projects        -> 1 row
  design_tokens   -> 6 rows
  research        -> 4 rows
  assets          -> 0 rows
  feedback        -> 0 rows


================================================================================
5. RUNNING THE APP
================================================================================
1. Keep index.html, styles.css, and app.js in the same folder
2. Double-click index.html
3. Page opens in your browser

You should see:
  - Header (CG Technologies / Connected Growth)
  - Row 1: Logo lockup + design tokens
  - Row 2: A4 letterhead + business card (front + back)
  - Row 3: Feedback form + live feedback list

TEST THE CONNECTION
-------------------
1. Type a name and comment, pick a rating
2. Click "Submit Feedback"
3. You should see: "Feedback submitted. Thank you!"
4. Entry appears under "Recent Feedback"
5. In Supabase -> Table Editor -> feedback -> refresh -> new row is present


================================================================================
6. DESIGN SYSTEM REFERENCE
================================================================================

6.1 COLOR PALETTE
-----------------
Primary    Deep Navy       #0A1F44
Accent     Electric Cyan   #00C2FF
Neutral    Cloud White     #F4F6F8
Text       Ink             #1A1A1A

6.2 TYPOGRAPHY
--------------
Headings:  Space Grotesk (500, 700)
Body:      Inter (400, 500, 700)
Fallback:  system-ui, sans-serif

6.3 LOGO RULES
--------------
- Mark: "CG" monogram inside a rounded square with a cyan underline bar
- Minimum size: 24 px digital / 15 mm print
- Clear space: half the height of the "C" on all sides
- Never stretch, recolor, or add drop shadows

6.4 LETTERHEAD
--------------
- Paper size: A4 (210 x 297 mm)
- Margins: 20 mm
- Logo top-left, address top-right, cyan rule below
- Footer: cgtech.io - Connected Growth - ISO-ready IT partner

6.5 BUSINESS CARD
-----------------
- Size: 85 x 55 mm + 3 mm bleed
- Front: navy gradient with cyan mark
- Back: white with name, role, contact details


================================================================================
7. EXPORTING FOR SUBMISSION
================================================================================

7.1 A3 BOARD (PRINTED & MOUNTED)
--------------------------------
1. Open index.html in Chrome
2. Press Ctrl + P (Cmd + P on Mac)
3. Destination: Save as PDF
4. Paper size: A3
5. Margins: None
6. Background graphics: ON   <-- CRITICAL (navy header will vanish otherwise)
7. Save as CG_CIS_A3_Board.pdf
8. Print on A3 paper and mount on 5 mm foam board

7.2 EDITABLE AI FILES
---------------------
1. Open the A3 PDF in Adobe Illustrator (or rebuild from scratch)
2. Recreate the mark:
     - Rounded square, 22 px radius
     - "CG" in Space Grotesk Bold
     - Cyan underline bar at 14 px from bottom
3. Rebuild letterhead at exact A4 (210 x 297 mm)
4. Rebuild business card at 85 x 55 mm + 3 mm bleed
5. Save as .AI and export matching .PDFs

7.3 USB LAYOUT
--------------
/USB_ROOT
  /AI_Files
    CG_Logo.ai
    CG_Letterhead.ai
    CG_BusinessCard.ai
  /PDF_Files
    CG_Logo.pdf
    CG_Letterhead.pdf
    CG_BusinessCard.pdf
    CG_CIS_A3_Board.pdf
  README.txt

7.4 LABELED ENVELOPE
--------------------
Name:          [Your Full Name]
Student ID:    [Your ID]
Module:        Corporate Identity System
Assignment:    1 - CIS Design
Lecturer:      Mr. Ibrahim Barrie
Date:          Week 4


================================================================================
8. TROUBLESHOOTING
================================================================================
Symptom                                       Cause                  Fix
--------------------------------------------------------------------------------
"Loading..." forever                          Wrong URL or anon key  Check app.js lines 8-9
relation "public.projects" does not exist     Schema not run         Re-run supabase_setup.sql
new row violates row-level security policy    Insert policy missing  Re-run policy block
"Project row missing - run the SQL seed"      projects empty         Run projects insert
Failed to fetch                               Ad-blocker or offline  Disable ad-blocker
Feedback appears but UI shows error           Read policy missing    Re-run select policy
Navy header missing on print                  Background graphics off Enable in print dialog
Fonts look wrong                              Google Fonts blocked   Allow fonts.googleapis.com


================================================================================
9. SECURITY NOTES
================================================================================
- The anon key in app.js is designed to be public (browser key)
- Real protection comes from Row Level Security policies
- If the anon key is exposed, rotate it:
    1. Supabase -> Settings -> API -> JWT Settings
    2. Click "Rotate JWT secret"
    3. Copy new anon key -> paste into app.js line 9
    4. Refresh the page
- Never expose the service_role key in browser code

PRODUCTION HARDENING (optional)
-------------------------------
drop policy "public insert feedback" on feedback;

create policy "auth insert feedback"
  on feedback for insert
  to authenticated
  with check (true);

Then add sign-up / login UI using:
  supabase.auth.signUp()
  supabase.auth.signInWithPassword()


================================================================================
10. ASSESSMENT RUBRIC MAPPING (100 MARKS)
================================================================================
Visual Appeal              25   Navy/cyan palette, clean grid, spacing
Readability                15   Inter body + Space Grotesk headings
Concept Clarity            25   "Connected Growth" narrative + node mark
Progression & Research     15   Section 8 of doc + research table
Professional Practice      10   Structured USB, labeled envelope, PDFs
Consultation               10   Feedback form + feedback table
--------------------------------------------------------------------------------
TOTAL                     100


================================================================================
11. SUBMISSION CHECKLIST
================================================================================
[ ] Supabase project created and schema run successfully
[ ] All 5 tables exist and are populated
[ ] app.js has correct URL and anon key
[ ] App loads without console errors (F12 -> Console)
[ ] Test feedback submitted and visible in Supabase
[ ] A3 PDF exported with background graphics ON
[ ] A3 board printed and mounted on foam board
[ ] Envelope labeled with all required info
[ ] .AI files created and verified in Illustrator
[ ] .PDF files exported for logo, letterhead, business card
[ ] USB organized per layout in section 7.3
[ ] USB labeled physically (name + student ID)
[ ] Submitted in class, Week 4 (late = -5 marks/day)


================================================================================
12. ACADEMIC INTEGRITY
================================================================================
- All copy is original - paraphrase competitor research in your own words
- Do not copy-paste from external sources
- Plagiarism results in automatic failure
- Late submission deducts 5 marks per day


================================================================================
13. CREDITS
================================================================================
Design & development:  [Your Name]
Module:                Corporate Identity System
Lecturer:              Mr. Ibrahim Barrie
Year:                  2026


================================================================================
END OF README
================================================================================
