# Art Institute Data Table

A **data table web application** built as part of a React + TypeScript project.  
The app fetches artwork data from the **Art Institute of Chicago API** and displays it in a clean, paginated table with row selection and persistent state.

---

## 🚀 Features

- Minimal **landing page** displaying the data table.
- **Server-side pagination**: fetches fresh data on every page change.
- **Row selection** via checkboxes (single & multiple rows).
- **Persistent selection**: maintains selected rows across different pages.
- **Overlay panel** for selecting a number of rows to auto-select.
- Handles edge cases:
  - Empty pages
  - Partial selections

---

## 🛠️ Tech Stack

- ⚛️ React.js (Vite + TypeScript)
- 🎨 Tailwind CSS
- 🧩 PrimeReact (DataTable, Column, OverlayPanel)
- 🌐 Fetch API

---

## 📂 Project Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/erayushs/growme-organic
cd growme-organic
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 🌐 Deployment

The app is deployed on Netlify:
🔗 Live Demo - https://growme-organic-new.netlify.app/

👨‍💻 Author

Ayush Singh
Frontend Developer 🚀
