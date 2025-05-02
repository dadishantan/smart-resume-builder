# 🚀 Smart Resume Builder

A full-stack, AI-powered resume generation platform built with **React**, **Firebase**, and **OpenAI GPT**.

Create your profile once, and generate tailored:
- ✅ Professional Resumes
- ✅ Cover Letters
- ✅ Cold Emails

All based on a job description — and downloadable as beautifully formatted PDFs.

---

## 🔍 Features

- ✨ Auto-extract profile info from your existing resume (PDF upload)
- 💾 Firebase Firestore integration for persistent profile storage
- 🧠 OpenAI GPT-4 (or GPT-3.5) API integration for AI-generated content
- 🖨️ Download resume/letters as print-ready PDFs
- 🔒 Authentication and protected routes
- 🎨 Styled with Tailwind CSS

---

## 🛠️ Tech Stack

| Frontend | Backend | AI | Database | Auth |
|----------|---------|----|----------|------|
| React.js | Node.js / Express | OpenAI GPT | Firebase Firestore | Firebase Auth |

---

## ⚙️ Setup Instructions

### 📁 1. Clone the repo

```bash
git clone https://github.com/dadishantan/smart-resume-builder.git
cd smart-resume-builder
```

### 📦 2. Install dependencies

```bash
cd client
npm install
```

### 🔑 3. Create `.env` file in `/client` folder

```bash
touch .env
```

#### Paste the following and replace values with your credentials:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

REACT_APP_OPENAI_API_KEY=your_openai_api_key
```

> 💡 Get Firebase keys from your [Firebase Console → Project Settings](https://console.firebase.google.com)  
> 💡 Get OpenAI API key from [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

---

### ▶️ 4. Run the app locally

```bash
npm start
```

---

## 📤 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Enable **Authentication → Email/Password**
4. Enable **Firestore Database**
5. Grab your config keys from **Project Settings → General**

---

## 💡 How It Works

1. **Sign up / Log in**
2. **Fill out your profile** (or upload a resume PDF)
3. **Paste a job description**
4. Click:
   - ✏️ `Generate Resume`
   - 📨 `Generate Cover Letter`
   - 💬 `Generate Cold Email`
5. Click `📄 Download as PDF` to export!

---

## 🧠 Credits

- Built by [Shantan Dadi](https://github.com/dadishantan)
- Powered by [OpenAI](https://platform.openai.com/) and [Firebase](https://firebase.google.com/)

---

## 📃 License

This project is licensed under the MIT License.
