# Kanban Board

A task management app built with React, TypeScript, and Tailwind CSS. Organize tasks across workflow columns, manage priorities, and keep your changes saved locally.

## Features

- **Task management** — Create, edit, and delete tasks.
- **Workflow columns** — Organize tasks into To Do, In Progress, and Done.
- **Drag and drop** — Move tasks between columns.
- **Priority management** — Increase or decrease task priorities, with tasks automatically sorted by priority.
- **Inline editing** — Update task titles and descriptions.
- **Persistent storage** — Tasks remain saved after refreshing the page using browser localStorage.
- **Responsive UI** — A clean interface for managing tasks.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- dnd-kit
- Browser localStorage

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

## How It Works

Tasks are stored in React state and assigned a status: `todo`, `doing`, or `done`.

The board groups tasks by status and sorts them by priority. When a task is moved to another column, its status updates and the board re-renders automatically.

Task data is persisted in the browser's localStorage, so changes survive page refreshes on the same browser.

## What I Learned

Building this project helped me practice:

- React component composition and reusable UI.
- TypeScript types and component props.
- State management with `useState`.
- Updating arrays immutably.
- Passing callbacks between components.
- Handling drag-and-drop interactions.
- Persisting application state with `useEffect` and localStorage.

## Current Limitations

- Task data is stored locally in the browser.
- There is no backend, database, or user authentication.
- Tasks are not synchronized across devices or browsers.

## Future Improvements

- Backend integration and database persistence.
- User authentication and individual boards.
- Due dates, labels, and task search.
- Improved accessibility and mobile drag-and-drop interactions.

## License

This project is open source. Add a license file if you intend to distribute it under a specific license.
