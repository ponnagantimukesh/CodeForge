# CitizenScheme AI 🇮🇳
> **"Government Schemes, Made Simple."**  
> *A Generative AI & Explainable Rule Engine that converts dense, complicated government scheme documents into simple, personalized eligibility summaries for any citizen.*

---

## 🏛️ Problem Statement
> *“ A generative AI tool that converts long government scheme documents into simple, personalized eligibility summaries for citizens. ”*

Citizens across India frequently miss out on life-changing welfare schemes due to:
1. **Dense Bureaucratic Jargon**: Gazette notifications span 15–50 pages of complex legal criteria.
2. **Eligibility Ambiguity**: Citizens struggle to know if they qualify without paying middlemen.
3. **Language Barriers**: Documents are predominantly in formal administrative English or Hindi, alienating non-native speakers.
4. **Missing Document Traps**: Applications get rejected after months of waiting due to minor unverified documents.

**CitizenScheme AI** solves this with a **universal, gender-neutral, accessible platform** that translates official policy into plain-language citizen action.

---

## 🌟 Key Features

| Feature | Description |
| :--- | :--- |
| **Universal & Gender-Neutral** | Open to **ALL citizens** (Farmers, Students, Youth, Senior Citizens, Divyangjan/Persons with Disabilities) across all genders. |
| **Explainable Rule Engine** | **Decouples deterministic rule evaluation from LLM summarization.** Rules are matched transparently (Age, Income, Domicile, Occupation) to prevent AI hallucinations. |
| **PDF Document Simplifier** | Drag-and-drop or 1-click sample gazettes (PM-KISAN, PM-JAY, Post-Matric) with a 6-stage animated extraction pipeline. |
| **Structured Summaries** | Breaks down schemes into 10 structured sections: *What is this?, What do I get?, Who can/cannot apply?, Structured Conditions Table, Interactive Document Checklist, Step-by-Step Timeline, Deadlines & Official Portal links.* |
| **Personalized Eligibility** | Real-time match scoring (e.g., 92% Match) with transparent criterion-by-criterion explanations, "Why You Match", and missing-document alerts. |
| **Citizen Document Locker** | **Secure digital vault** for verified citizen documents (Aadhaar, Ration Card, Land Passbooks, Income/Caste Certificates). Includes 1-click **DigiLocker Sync**, preview modal with official watermark, and automatic cross-scheme eligibility integration. |
| **Preset Demo Personas** | Switch instantly between **Farmer Ramesh, Student Priya, Senior Sunita, Divyangjan Lakshmi, and Youth Arun** to demonstrate instant recalculations during live judging. |
| **Multilingual (EN / TE / HI)** | Seamless switching across **English, Telugu (తెలుగు), and Hindi (हिन्दी)** with full UI and summary localization. |
| **Voice Assistant** | Native voice interaction with speech-to-text, animated soundwave visualizer, and grounded text-to-speech audio readouts. |
| **Application Tracker** | 5-stage visual progress pipeline (*Submitted → Verified → Under Review → Decision → Released*) with missing document uploads. |
| **Admin Panel with Rule Review** | **Human-in-the-loop governance:** Government administrators review and approve AI-extracted criteria from newly uploaded gazettes before they go live. |

---

## 🏗️ Architecture & Technology Stack

```
CitizenScheme AI
├── Frontend: React 19 + TypeScript + Vite + Tailwind CSS v4 + Lucide Icons
│   ├── Responsive GovTech Aesthetic (Navy, Ashoka Green, Saffron, Clean Off-White)
│   ├── Multilingual Localization Engine (English, Telugu, Hindi)
│   ├── Web Speech API (SpeechRecognition & SpeechSynthesis)
│   ├── Citizen Document Locker (Digital Vault, DigiLocker Sync, Certificate Preview)
│   └── Client-side Resilient Evaluation Engine (Zero-fail offline fallback)
│
└── Backend: Python 3.11 + FastAPI + Uvicorn + PyPDF + Pydantic v2
    ├── /api/schemes                      -> Catalog of Central & State Schemes
    ├── /api/schemes/matches/all          -> Explainable Rule Matching across all schemes
    ├── /api/schemes/calculate-eligibility -> Criterion-by-criterion evaluation
    ├── /api/schemes/simplify-file        -> PDF text extraction & structured simplification
    ├── /api/schemes/simplify-text        -> Sample gazettes processing
    ├── /api/locker                       -> Citizen Document Locker (Vault storage & retrieval)
    ├── /api/locker/upload                -> Secure document upload & profile auto-linking
    ├── /api/locker/sync-digilocker       -> 1-click simulated DigiLocker National Vault sync
    ├── /api/assistant/chat               -> Grounded conversational QA (strictly no hallucinations)
    ├── /api/profile                      -> Citizen profile management & persona switching
    ├── /api/applications                 -> Application tracking & document uploads
    └── /api/admin/reviews                -> AI Extracted Rules review workflow
```

---

## ⚡ Quick Start & Run Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1. Launch All (One-Click)
In Windows PowerShell:
```powershell
.\start.ps1
```

### 2. Manual Startup

#### Backend:
```bash
cd backend
python run.py
# Server runs on http://127.0.0.1:8000
# Interactive OpenAPI documentation: http://127.0.0.1:8000/docs
```

#### Frontend:
```bash
cd frontend
npm install
npm run dev
# Vite runs on http://localhost:5173
```

#### Automated Backend Test:
```bash
cd backend
python test_api.py
```

---

## ⏱️ 3-Minute Hackathon Presentation Flow

1. **Dashboard & Personas (0:00 - 0:30)**:
   - Open `http://localhost:5173`.
   - Point out the clean government aesthetic, matched statistics, and Top Matches.
   - Use the **Persona dropdown** in the header to switch from **Ramesh Kumar (Farmer)** to **Priya Sharma (Student)**. Notice how **National Post-Matric Scholarship** instantly jumps to the top (95% match)!

2. **Core Feature: Document Simplification (0:30 - 1:20)**:
   - Navigate to **"Simplify Scheme"**.
   - Select the pre-loaded **PM-KISAN Operational Guidelines** gazette (or upload your own PDF).
   - Click **"✨ Simplify Selected Gazette"**.
   - Watch the 6-stage AI animated pipeline (`Uploading` → `Reading text` → `Identifying rules` → `Extracting eligibility` → `Creating simple summary` → `Ready`).
   - Tour the structured output:
     - *One-Line Explanation*
     - *What is this scheme?*
     - *Direct Benefit Highlight (₹6,000 / year via DBT)*
     - *Who can apply vs Who cannot apply*
     - *Structured Conditions Table*
     - *Interactive Required Documents Checklist*
     - *Step-by-Step Timeline*

3. **Explainable Eligibility Engine (1:20 - 1:50)**:
   - Scroll down to the **"Your Eligibility for this Scheme"** section.
   - Show the 88% Match score and the individual checks:
     - `✓ Age Requirement satisfied`
     - `✓ Income within permissible limit`
     - `✓ Farmer / Landholder status verified`
     - `— Gender is not a restriction (open to all citizens)`
     - `⚠ Missing documents: Land Pattadar Passbook`
   - Expand the **"Why You Match"** audit trail.

4. **Multilingual & Voice Mode (1:50 - 2:30)**:
   - Click the language selector in the top bar: Switch **English → తెలుగు (Telugu)**.
   - All UI labels, simplified scheme summaries, and badge texts dynamically switch to natural Telugu.
   - Click the **Voice Assistant** button.
   - Ask or click: *"నాకు ఏ ప్రభుత్వ పథకాలు ఉన్నాయి?"*
   - Watch the audio wave animation and hear the assistant read back matching schemes in Telugu!

5. **Applications & Admin Verification (2:30 - 3:00)**:
   - Visit **"My Applications"**: Show the 5-stage progress pipeline. Click **"Upload Missing Document"** to resolve a pending document and watch the status advance to *Under Review*.
   - Visit **"Admin Panel"**: Showcase the **"AI Extracted Rules — Review Required"** human-in-the-loop dashboard where government officials review AI-extracted criteria before publishing.

---

## 🔒 Trust & Safety Policy
- **Zero Hallucinations**: The conversational assistant refuses to fabricate criteria. If a fact cannot be verified from government data, it states: *"I could not verify that information from the available scheme data."*
- **Explainability**: Eligibility results explicitly state they are AI-assisted assessments. Final sanctioning authority remains with the concerned government department.
- **Privacy First**: Citizen data is stored locally and used strictly for eligibility matching without third-party tracking.
#   C o d e F o r g e  
 #   C o d e F o r g e  
 