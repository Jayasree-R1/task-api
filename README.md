# Task Management API with IVR Simulation

This project shows how a backend API can support both normal application requests and IVR systems. Instead of building a phone system, I simulated how IVR platforms call backend services using intent-based requests.”

## Overview

This project demonstrates a **simple backend service** built with **Node.js** that manages tasks and simulates how an **IVR (phone menu system)** interacts with backend APIs.

The goal is to show **how a real IVR system (like Amazon Connect or Twilio)** would call backend services to perform actions based on user selections such as _“Press 1 to create a task”_ or _“Press 2 to list tasks.”_

---

## What This Project Does

### 1. Task Management

The system allows:

- Creating tasks
- Viewing all tasks
- Viewing a specific task
- Updating task status
- Deleting tasks

Each task has:

- Title
- Optional description
- Status (pending / in-progress / completed)
- Creation timestamp

Tasks are stored **in memory** for simplicity.

---

### 2. IVR Simulation (Key Concept)

Instead of building an actual phone system, this project **simulates IVR behavior**.

- A **single IVR endpoint** receives requests
- Each request contains an **intent** (represents a key press or voice option)
- The backend processes the request and returns a response that an IVR system would read back to the caller

This mirrors how real contact-center systems work internally.

---

## Example IVR Flow

Caller selects option
↓
IVR sends request to backend API
↓
Backend processes request
↓
Response sent back to IVR

### Example

- Press 1 → Create a task
- Press 2 → List all tasks
- Press 3 → Get task details
- Press 4 → Update task status
- Press 5 → Delete task

All of these are handled through **one IVR endpoint** using intent-based logic.

---

## Technology Used

- Node.js
- Express.js
- REST APIs
- UUIDs for unique task identification

---

## Why This Matters

This project demonstrates:

- Clean backend design
- RESTful API development
- How IVR systems integrate with backend services
- Scalable design that can later connect to real IVR platforms

---

## How to Run (Optional)

```bash
npm install
npm run dev
```

http://localhost:3000

Notes

Data is stored in memory and resets on restart

Designed for clarity and interview demonstration

Easily extendable to databases and real IVR system
