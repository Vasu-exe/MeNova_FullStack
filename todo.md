# MeNova Health — Full-Stack Upgrade TODO

## Backend Infrastructure
- [x] Upgrade project to full-stack (Express + DB)
- [x] Create quiz_submissions table
- [x] Create follow_up_requests table
- [x] Create waitlist table
- [x] Create pageviews table for analytics
- [x] Write DB query helpers in server/db.ts
- [x] Write tRPC routers (quiz, followUp, waitlist, chat, admin)
- [x] Add Make.com webhook receiver at /api/followup-result
- [x] Add REST bridge API routes for all frontend components
- [x] Set up admin password authentication

## Frontend — Restore Existing Pages
- [x] Restore ScheduleFollowup page with real-time verification polling
- [x] Restore PrivacyPolicy page
- [x] Restore TermsAndConditions page
- [x] Restore CookiePolicy page
- [x] Restore Accessibility page

## Frontend — New Features
- [x] Admin Dashboard at /admin (stats, quiz table, follow-up table, waitlist table, CSV export)
- [x] AI Chat widget (floating bubble on homepage)
- [x] Waitlist / notify-me section on homepage
- [x] Referral/source tracking (UTM params captured and saved)
- [x] Update SymptomQuiz to also save submissions to database via REST API
- [x] Update App.tsx with all routes (/admin, /schedule-followup, policy pages)

## Verification & Testing
- [x] Mount AI Chat widget globally in App.tsx so it appears on all pages
- [x] Write API-level vitest for admin login and protected endpoints
- [x] Verify quiz submission saves to database via API test
- [x] Verify waitlist submission saves to database via API test
- [x] Verify follow-up request + polling + webhook resolution via API test
- [x] Save checkpoint
- [x] Push changes to GitHub

## Patient Portal
- [x] Patient login/registration (email + password)
- [x] Patient dashboard with welcome, next appointment, BHRT status
- [x] Quiz history page with symptom severity trend chart
- [x] BHRT prescription view (hormone type, dosage, frequency, duration)
- [x] Appointment tracking (upcoming, past)
- [x] Document upload (PDF, images, medical records) to S3
- [x] Document list with download/delete
- [x] Messaging with clinic (chat interface)

## NP Portal
- [x] NP login/registration (email + password, role-based)
- [x] Patient management dashboard (list all patients, search, filter)
- [x] Patient profile view (full history, quiz results, documents, notes)
- [x] Treatment plan creator (hormone type, dosage, duration, instructions)
- [x] Treatment plan edit/update
- [x] Appointment management (view, schedule, mark complete)
- [x] View/download patient documents
- [x] Mark documents as reviewed
- [x] Messaging with patients
- [x] Patient progress tracking (symptom improvement chart)
- [x] Analytics (patients on BHRT, avg improvement, common symptoms)
- [x] Export patient data to CSV

## Shared Portal Infrastructure
- [x] Update database schema with all new tables
- [x] Build REST API endpoints for both portals
- [x] Update App.tsx with portal routes
- [x] Write vitest tests for portal APIs
- [x] Push all changes to GitHub (Vasu-exe/MeNova_FullStack)
- [x] Save checkpoint

## Bug Fixes (Session 3)
- [x] Fix NP dashboard returning arrays instead of counts for activePlans/upcomingAppointments
- [x] Add completedAppointments count to NP dashboard response
- [x] Add pendingDocuments count to NP dashboard response
- [x] Add GET /api/np/documents endpoint (was missing)
- [x] Add PATCH routes for treatment plan and appointment status updates
- [x] Add POST /api/np/documents/:id/review route (frontend uses POST)
- [x] Push portal files to GitHub (Vasu-exe/MeNova_FullStack)

## Soft Launch Waitlist Page
- [x] Create WaitlistPage.tsx with MeNova branding (dark forest green theme)
- [x] Add waitlist form (first name, last name, email) with validation
- [x] Connect Make.com webhook (https://hook.us2.make.com/ygbmyty71u7pahms7m7owjvcxpf22v68)
- [x] Swap App.tsx route "/" to WaitlistPage (Home.tsx kept safe at /home)
- [x] Portals remain accessible at /portal, /patient-portal, /np-portal (just not linked from homepage)
- [x] Push to GitHub

## Waitlist Page Update (Session 4)
- [x] Update meta tags (title, description) for SEO
- [x] Update hero section copy (H1, paragraph, sub-line, early-bird offer)
- [x] Update "What is MeNova Health?" section
- [x] Update "Who It's For" cards (3 cards with new copy)
- [x] Update "Why It Matters" stats section
- [x] Add mini-FAQ section
- [x] Update bottom CTA section with 15% off early access offer
- [x] Redesign page with soothing mixed-color palette matching homepage
- [x] Push to GitHub
