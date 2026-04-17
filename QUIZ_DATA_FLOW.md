# MeNova Health Quiz — Data Flow & Storage Guide

## Overview: Where Does the Data Go?

When a customer takes the quiz on your website, here's the **complete data journey**:

```
Customer takes quiz on website
        ↓
Clicks "View My Results"
        ↓
Data sent to Make.com webhook
        ↓
Make.com creates Google Doc
        ↓
Google Doc saved to Google Drive
        ↓
(Optional) Email sent to customer + you
```

---

## Step 1: Data Sent from Website to Make.com

### What happens when customer clicks "View My Results"

The website sends this JSON to your Make.com webhook:

```json
{
  "name": "Sarah Johnson",
  "email": "sarah@example.com",
  "timestamp": "2026-04-06T14:32:15.789Z",
  "score": 24,
  "maxScore": 48,
  "tier": "Moderate",
  "answers": "{\"stage\":[\"peri_mid\"],\"hot_flashes\":[\"moderate\"],\"sleep\":[\"moderate\"],\"mood\":[\"mild\"],\"brain_fog\":[\"moderate\"],\"symptoms_multi\":[\"joint_pain\",\"weight_gain\",\"dry_skin\"],\"impact\":[\"work\"],\"treatment_history\":[\"no\"]}",
  "recommendation": "Based on your assessment, you're experiencing moderate menopause symptoms..."
}
```

**Note:** The `answers` field is now a **stringified JSON** (because we changed it), so it's easier for Make.com to handle.

---

## Step 2: Make.com Receives & Processes Data

### Where to see the data in Make.com

1. Go to [make.com](https://make.com)
2. Open your scenario
3. Click on the **Webhook module** (the first box)
4. Look for **"Output"** section or **"Execution history"**
5. You'll see all recent webhook calls with the data

### What Make.com shows you

```
Execution #1 (Today at 2:30 PM)
├─ name: "Sarah Johnson"
├─ email: "sarah@example.com"
├─ timestamp: "2026-04-06T14:32:15.789Z"
├─ score: 24
├─ maxScore: 48
├─ tier: "Moderate"
├─ answers: "{...stringified JSON...}"
└─ recommendation: "Based on your assessment..."
```

---

## Step 3: Google Doc Created & Saved to Drive

### Where the data ends up

1. Go to [Google Drive](https://drive.google.com)
2. Open the **"Patient Assessments"** folder
3. You'll see documents named like:
   - `Sarah Johnson — Assessment — 2026-04-06T14:32:15.789Z`
   - `Jane Doe — Assessment — 2026-04-06T15:45:22.123Z`

### What's in each Google Doc

The document contains all the data formatted nicely:

```
═══════════════════════════════════════════════════════════════════
                    MENOVA HEALTH
            PATIENT SYMPTOM ASSESSMENT REPORT
═══════════════════════════════════════════════════════════════════

PATIENT INFORMATION
───────────────────────────────────────────────────────────────────
Name:                   Sarah Johnson
Email:                  sarah@example.com
Assessment Date:        2026-04-06T14:32:15.789Z

═══════════════════════════════════════════════════════════════════
SYMPTOM BURDEN SCORE
═══════════════════════════════════════════════════════════════════

Score:                  24 / 48
Severity Tier:          Moderate

═══════════════════════════════════════════════════════════════════
DETAILED ASSESSMENT RESPONSES
═══════════════════════════════════════════════════════════════════

1. MENOPAUSE STAGE
   Answer: Perimenopause — symptoms are affecting my daily life

2. HOT FLASHES & NIGHT SWEATS
   Answer: Daily — noticeable but I push through

3. SLEEP QUALITY
   Answer: Often disrupted — I feel tired most mornings

4. MOOD & MENTAL WELLBEING
   Answer: Mild irritability or occasional anxiety

5. BRAIN FOG & MEMORY
   Answer: Regularly struggle to concentrate or recall things

6. ADDITIONAL SYMPTOMS
   Answer: Joint pain, Weight gain, Dry skin

7. IMPACT ON QUALITY OF LIFE
   Answer: Affecting my work

8. PREVIOUS TREATMENT HISTORY
   Answer: No, I haven't tried hormone therapy before

═══════════════════════════════════════════════════════════════════
PERSONALIZED RECOMMENDATION
═══════════════════════════════════════════════════════════════════

Based on your assessment, you're experiencing moderate menopause 
symptoms that are affecting your daily life. A personalized 
Bioidentical Hormone Replacement Therapy (BHRT) plan could help 
you regain your energy and quality of life...

═══════════════════════════════════════════════════════════════════
```

---

## All Variables Captured & How to Use Them

### Basic Info Variables

| Variable | What it contains | Example |
|---|---|---|
| `name` | Customer's first and last name | "Sarah Johnson" |
| `email` | Customer's email address | "sarah@example.com" |
| `timestamp` | When they submitted the quiz (ISO format) | "2026-04-06T14:32:15.789Z" |

### Score Variables

| Variable | What it contains | Example |
|---|---|---|
| `score` | Their total symptom score | 24 |
| `maxScore` | Maximum possible score | 48 |
| `tier` | Severity category | "Moderate" (or "Early Stage", "Significant") |

### Answer Variables (Individual Questions)

| Variable | What it contains | Example |
|---|---|---|
| `answers.stage` | Which menopause stage they selected | `["peri_mid"]` |
| `answers.hot_flashes` | Hot flash frequency | `["moderate"]` |
| `answers.sleep` | Sleep quality | `["moderate"]` |
| `answers.mood` | Mood changes | `["mild"]` |
| `answers.brain_fog` | Brain fog severity | `["moderate"]` |
| `answers.symptoms_multi` | Multiple symptoms they selected | `["joint_pain", "weight_gain", "dry_skin"]` |
| `answers.impact` | How symptoms affect daily life | `["work"]` |
| `answers.treatment_history` | Previous hormone therapy | `["no"]` |

### Recommendation Variable

| Variable | What it contains |
|---|---|
| `recommendation` | Full personalized text based on their score and tier |

---

## How to Access the Data in Make.com

### Method 1: View in Execution History

1. Open your Make.com scenario
2. Click **Scenario** → **Execution history**
3. Click on any execution to see the full payload
4. All variables are listed with their values

### Method 2: Use Variables in Other Modules

When you add a **Gmail**, **Google Docs**, or other module, click in any field and you'll see:

```
Available variables:
├─ name
├─ email
├─ timestamp
├─ score
├─ maxScore
├─ tier
├─ answers (stringified JSON)
└─ recommendation
```

Select any variable to insert it. For example:
- Click in an email subject field → select `name` → it becomes `{{name}}`
- Click in email body → select `recommendation` → it becomes `{{recommendation}}`

### Method 3: Parse the Answers JSON

Since `answers` is now a **stringified JSON**, you might need to parse it in Make.com:

1. In Make.com, add a **JSON** module (or use a **Text** function)
2. Use `JSON.parse()` to convert the string back to an object
3. Then access individual answers like `answers.stage[0]`

**Example in Make.com:**
```
Module: JSON → Parse JSON
Input: {{answers}}
Output: Parsed object with stage, hot_flashes, sleep, etc.
```

---

## Real-World Example: How to Use This Data

### Scenario: Send a personalized email to the customer

1. In Make.com, add a **Gmail** module
2. Set **To:** `{{email}}`
3. Set **Subject:** `Your MeNova Assessment Results — {{name}}`
4. Set **Body:**
```
Hi {{name}},

Thank you for completing the MeNova Health assessment!

Your Results:
• Symptom Score: {{score}} / {{maxScore}}
• Severity: {{tier}}

{{recommendation}}

Next Step: Book Your Consultation
Ready to get started? Schedule your appointment:
https://cal.com/menova/30min

Best regards,
MeNova Health Team
```

When Make.com sends this email, it automatically replaces:
- `{{name}}` → "Sarah Johnson"
- `{{email}}` → "sarah@example.com"
- `{{score}}` → 24
- `{{maxScore}}` → 48
- `{{tier}}` → "Moderate"
- `{{recommendation}}` → Full personalized text

---

## How to See All Your Customer Results

### In Google Drive (Easiest)

1. Go to [Google Drive](https://drive.google.com)
2. Open **"Patient Assessments"** folder
3. All customer assessments are there as documents
4. Click any document to view full details
5. You can download as PDF, share with your NP, etc.

### In Make.com (For Automation)

1. Open your scenario
2. Click **Scenario** → **Execution history**
3. Filter by date to see who took the quiz when
4. Click any execution to see raw data

### In Google Sheets (Optional - Advanced)

You can also set up Make.com to write each submission to a **Google Sheet**:

| Name | Email | Score | Tier | Date |
|---|---|---|---|---|
| Sarah Johnson | sarah@example.com | 24 | Moderate | 2026-04-06 |
| Jane Doe | jane@example.com | 31 | Significant | 2026-04-06 |
| Lisa Chen | lisa@example.com | 12 | Early Stage | 2026-04-07 |

This creates a simple dashboard you can sort and filter.

---

## Troubleshooting: Data Not Appearing

| Problem | Solution |
|---|---|
| **No data in Make.com webhook** | Make sure scenario is ON. Take quiz and click "View My Results". Check browser console for errors. |
| **Google Doc not created** | Check Make.com execution history for errors. Verify Template Document ID and Folder ID are correct. |
| **Answers showing as `[object Object]`** | The answers are stringified. You need to parse the JSON in Make.com first. |
| **Email not sent** | Check Gmail connection is authorized. Verify email address is correct. |
| **Data looks incomplete** | Make sure customer answered ALL 8 questions before clicking "View My Results". |

---

## Summary: The Complete Data Flow

```
1. Customer takes quiz on website
   ↓
2. Submits name, email, and all answers
   ↓
3. Website sends JSON to Make.com webhook
   ↓
4. Make.com receives data (visible in Execution history)
   ↓
5. Make.com creates Google Doc from template
   ↓
6. Doc saved to Google Drive "Patient Assessments" folder
   ↓
7. (Optional) Make.com sends email to customer
   ↓
8. (Optional) Make.com sends admin alert to you
   ↓
9. You can view all results in Google Drive or Make.com
```

---

## Next Steps

1. **Take a test quiz** on your website
2. **Check Make.com execution history** to see the data
3. **Check Google Drive** to see the created document
4. **Verify all fields are mapped correctly** in the Google Doc
5. **Set up email notifications** (customer confirmation + admin alert)
6. **Launch to real customers!**

Good luck! 🌿
