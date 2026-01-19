# 🤖 Telegram Bot Flow Builder

![Project Banner](https://via.placeholder.com/1200x400?text=https://imgur.com/a/5AG5EXw)

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0-purple?logo=redux)](https://redux-toolkit.js.org/)
[![React Flow](https://img.shields.io/badge/React_Flow-12-ff0072?logo=reactquery)](https://reactflow.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

**[🚀 Live Demo](https://telegram-bot-messages-builder.vercel.app/)**

## 📝 Overview

The application provides a **node-based visual editor** for designing Telegram bot logic. Users can build workflows by connecting custom nodes, edit their configuration in real time, and persist progress locally.

The main focus of this project is **Frontend Architecture**, **Performance**, and **Complex State Management**, rather than a production-ready bot runtime.

---

## ✨ Features

- **🎨 Drag & Drop Flow Builder** — Intuitive node creation and connection using React Flow.
- **🧩 Custom Node Types** — Domain-specific nodes representing Telegram bot logic (Text, Image, Buttons matrix).
- **🔗 Dynamic Handles** — Node inputs and outputs generated dynamically based on configuration.
- **💾 Local Storage Persistence** — Automatic saving and restoring of flows between sessions.
- **✏️ Sidebar Editing** — Real-time node configuration via a dedicated sidebar panel.
- **⚡ Predictable State Architecture** — Centralized state using **Redux Toolkit** (migrated from Zustand for better scalability).

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React** | UI Library |
| **TypeScript** | Static Typing |
| **React Flow** | Graph Visualization Core |
| **Redux Toolkit** | Primary State Management |
| **Zustand** | *Previously used, fully migrated to Redux* |
| **Shadcn/UI** | Modern, accessible UI components |

---

## 🎯 Project Goals

This project was built to demonstrate engineering skills:
1.  **Architecture:** Practice building complex interactive editors.
2.  **Complexity:** Explore advanced React Flow customization.
3.  **Refactoring:** Demonstrate state management design and migration (Zustand → Redux).
4.  **Portfolio:** Serve as a code example for technical interviews.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the project locally
```bash
npm run dev
```

The app will be available at:
```
http://localhost:5173
```

---

## 📌 Notes

> * **No Telegram Bot API integration** included.
> * **No backend** included (Mock API architecture used for async simulation).
> * **No license specified**.
> * Built for learning, experimentation, and demonstration purposes.

---

## 📬 Feedback

Suggestions, ideas, and constructive feedback are welcome.
This project is intended as an educational and portfolio example.