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
- [ ] Push changes to GitHub
