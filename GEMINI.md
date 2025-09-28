# GEMINI.md

## Project Overview

This project is the official website for the Ehsan Panhwer Coaching Center. It is a modern, responsive, and multilingual web application designed to provide information and resources for students, parents, and staff.

**Key Features:**

*   **Homepage:** Engaging hero section with a video background, mission statement, and key highlights.
*   **Programs:** Detailed overview of academic programs, including subjects and learning outcomes.
*   **Offerings:** Information on school facilities and services like transport, labs, and extracurricular activities.
*   **Contact:** Easy-to-use contact form and location map.
*   **Multilingual Support:** Content available in English, Sindhi, and Urdu.
*   **Responsive Design:** Fully responsive layout for seamless viewing on all devices.

**Technologies:**

*   **Frontend:** React, TypeScript, Tailwind CSS, Motion
*   **UI Components:** shadcn/ui
*   **Build Tool:** Vite

## Building and Running

### Prerequisites

*   Node.js and npm (or yarn/pnpm)

### Installation

1.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

*   **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    This will start the development server, typically at `http://localhost:3000`.

### Building for Production

*   **Build the application for production:**
    ```bash
    npm run build
    ```
    This will create a `build` directory with the optimized production-ready files.

## Development Conventions

*   **Component-Based Architecture:** The project follows a component-based architecture, with reusable components located in `src/components`.
*   **UI Components:** The project uses `shadcn/ui` for its UI components, which are located in `src/components/ui`. These components are built using Radix UI and Tailwind CSS.
*   **Styling:** Styling is primarily handled with Tailwind CSS. Global styles can be found in `src/styles/globals.css`.
*   **Data:** Static data, such as the list of subjects, is stored in the `src/data` directory.
*   **Multilingual Support:** The application supports multiple languages. Text content is managed through translation objects within each component.
*   **Routing:** The application uses a custom routing solution based on the `window.location.pathname`.
