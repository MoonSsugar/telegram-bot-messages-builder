Overview

The application provides a node-based editor for visually designing Telegram bot logic. Users can build workflows by connecting custom nodes, edit their configuration in real time, and persist progress locally.

The main focus of this project is frontend architecture, performance, and UX, rather than a production-ready Telegram bot runtime.

Tech Stack

React

TypeScript

React Flow

Redux Toolkit – primary state management

Zustand – previously used, fully migrated away

Shadcn/UI – modern, accessible UI components

Features
Drag & Drop Flow Builder

Intuitive node creation and connection using React Flow.

Custom Node Types

Domain-specific nodes representing Telegram bot logic.

Dynamic Handles

Node inputs and outputs generated dynamically based on node configuration.

Undo / Redo

History tracking to safely experiment with flow changes.

Local Storage Persistence

Automatic saving and restoring of flows between sessions.

Sidebar Node Editing

Real-time node configuration via a dedicated sidebar panel.

Predictable State Architecture

Centralized state using Redux Toolkit, including a completed migration from Zustand.

Project Goals

This project was built to:

Practice building complex interactive editors

Explore advanced React Flow customization

Demonstrate state management design and migration

Serve as a code example for recruiters and technical interviews

Getting Started
Install dependencies
npm install

Run the project locally
npm run dev


The app will be available at:

http://localhost:5173


(or the port configured by your dev environment)

Notes

No Telegram Bot API integration

No backend included

No license specified

Built for learning, experimentation, and demonstration purposes

Feedback

Suggestions, ideas, and constructive feedback are welcome.
This project is intended as an educational and portfolio example.