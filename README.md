# Lendsqr User Management Dashboard

A comprehensive frontend implementation for a user management system, built as part of the Lendsqr technical assessment. This application features a rich dashboard, detailed user profiles, advanced filtering, and a responsive design.

## 🚀 Technologies Used

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Sass (SCSS)
- **Mock API**: json-server
- **Icons**: Lucide React
- **Navigation**: React Router DOM v7

## 🛠 Prerequisites

Ensure you have the following installed:

- Node.js (v18 or higher recommended)
- npm

## 🏃‍♂️ Getting Started

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Start the Mock API Server

The application relies on a mock backend served by `json-server`. This must be running for the application to fetch user data.

```bash
npm run mock:api
```

_The server will start at `http://localhost:3000`._

### 3. Start the Development Server

In a new terminal, start the Vite development server:

```bash
npm run dev
```

_The application will be available at `http://localhost:5173`._

## 📂 Project Structure

- `src/api`: API service layer for fetching user data.
- `src/assets`: Static assets including images and SVG icons.
- `src/components`: Reusable UI components (Navbar, Sidebar, FilterModal, etc.).
- `src/pages`: Main page components (Login, Dashboard, UserDetail).
- `src/styles`: SCSS files for global styles and component-specific styling.

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run mock:api`: Runs the `json-server` using `MOCK_DATA.json`.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Locally previews the production build.

## ✨ Key Features

- **Dashboard Overview**: Summary cards for total users, active users, users with loans, and users with savings.
- **User Table**: Paginated view of users with status badges and action menus.
- **Advanced Filtering**: Filter users by Organization, Username, Email, Phone Number, Date Joined, and Status.
- **User Details**: Deep-dive view of individual user information including personal, educational, and social data.
- **Caching**: Implements `localStorage` caching to minimize API calls and improve load times.
- **Responsive UI**: Optimized for mobile, tablet, and desktop screens.

## 🧪 Extra Information

- **Mock Data**: The population of the table is driven by `MOCK_DATA.json`. You can modify this file to test different data scenarios.
- **Persistence**: Once fetched from the API, user data is stored in `lendsqr_users` in your browser's Local Storage to simulate a persistent data layer.
