<div align="center">
  <h1 align="center">Next.js MongoDB Authentication Starter Kit</h1>
  <p align="center">
    A full-stack authentication starter kit built with Next.js, MongoDB, and Firebase for OAuth.
    <br />
    <a href="https://clean-auth-next.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/sinanptm/clean-auth-next-mongo/issues/new?labels=bug&template=bug-report.md">Report Bug</a>
    ·
    <a href="https://github.com/sinanptm/clean-auth-next-mongo/issues/new?labels=feature-request&template=feature-request.md">Request Feature</a>
  </p>
</div>

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## About The Project

This project is a comprehensive starter kit for building applications that require robust user authentication. It combines the power of Next.js for the frontend and backend, MongoDB for the database, and Firebase for seamless OAuth integration.

### Features

- **Next.js 14 with App Router:** The latest and greatest from Next.js for building modern web applications.
- **MongoDB Integration:** Uses Mongoose for elegant MongoDB object modeling.
- **Firebase OAuth:** Easily integrate with Google, GitHub, and other providers.
- **Credential-Based Authentication:** Standard email and password authentication.
- **Secure JWT Sessions:** Uses `jose` for secure JSON Web Token handling.
- **Form Handling with `react-hook-form`:** Efficient and easy form validation.
- **Beautiful UI Components:** Built with `shadcn/ui` and `Radix UI`.
- **State Management with `Zustand`:** Simple and powerful state management.
- **TypeScript:** For type safety and improved developer experience.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **ESLint and Prettier:** For code quality and consistent formatting.

---

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [pnpm](https://pnpm.io/installation)
- A [MongoDB](https://www.mongodb.com/try/download/community) instance (local or cloud)
- A [Firebase](https://console.firebase.google.com/) project

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/sinanptm/clean-auth-next-mongo.git
   cd clean-auth-next-mongo
   ```

2. **Install dependencies:**
   ```sh
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root of the project and add the following variables. You can use the `.env.example` file as a template.

   ```env
   # MongoDB
   MONGO_URI=your_mongodb_connection_string

   # JWT
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d

   # Firebase (Client)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

   # Firebase (Admin)
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   ```

4. **Run the development server:**
   ```sh
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Available Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Creates a production build.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Lints the codebase.
- `pnpm format`: Formats the code with Prettier.

---

## License

Distributed under the MIT License. See <a href="https://github.com/sinanptm/clean-auth-next-mongo/blob/main/LICENSE.md">LICENSE</a> for more information.

