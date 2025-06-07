# BCard - Business Card Management Web App

BCard is a modern web application for creating, managing, and sharing digital business cards. Built as a school project, it demonstrates best practices in React development, state management, and responsive UI design.

## Features

- **User Authentication:** Sign up, log in, and manage your profile securely.
- **Business Card Management:** Create, edit, and delete your own digital business cards.
- **Favorites:** Browse cards from other users and add them to your favorites.
- **Admin CRM:** Admin users can view, edit, and delete all cards and users.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.
- **Search & Pagination:** Quickly find cards and navigate large lists.
- **Dark Mode:** Toggle between light and dark themes for comfortable viewing.

## Tech Stack

- **Frontend:** React, TypeScript
- **State Management:** Redux Toolkit
- **UI Components:** Flowbite React, Material UI
- **Styling:** Tailwind CSS
- **Form Validation:** Joi
- **Routing:** React Router
- **HTTP Requests:** Axios

## Project Structure

- `src/Pages/` — Main app pages (About, Login, Signup, Profile, MyCards, CRM, etc.)
- `src/comps/` — Reusable UI components (Nav, Footer, Cards, etc.)
- `src/comps3D/` — 3D visual components (BrandText, Links3D)
- `src/data/` — Theme and style configuration
- `src/Hooks/` — Custom React hooks
- `src/Validations/` — Joi validation schemas
- `src/store/` — Redux store setup
- `src/slices/` — Redux slices for state management
- `src/types/` — TypeScript type definitions
- `src/Styles/` — Tailwind and custom CSS files

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) to view the app.
