# Auth Template

This is a robust Next.js starter kit designed to provide a solid foundation for web applications requiring secure authentication. It integrates Firebase for client-side authentication, a custom JWT-based session management system, and MongoDB for user data persistence. Built with Next.js Server Actions, Zustand for state management, and Shadcn UI for a modern interface, this template streamlines the development of authenticated web experiences.

## Features

-   **Next.js 15+**: Latest features including Server Actions for efficient data mutations.
-   **Authentication**: Secure user authentication flow:
    -   **Firebase Integration**: Client-side authentication using Firebase (e.g., Google Sign-In).
    -   **Custom JWT**: Server-side generation and verification of JSON Web Tokens for session management.
    -   **MongoDB**: User data persistence using Mongoose.
    -   **Secure Cookies**: `httpOnly` and `secure` cookies for storing authentication tokens.
-   **Protected Routes**: Middleware to safeguard routes based on authentication status.
-   **State Management**: Global authentication state management with Zustand.
-   **UI Components**: Beautiful and accessible UI components powered by Shadcn UI.
-   **Styling**: Utility-first CSS framework with Tailwind CSS.
-   **Theming**: Dark/Light mode toggle with `next-themes`.
-   **Environment Variables**: Easy configuration using `.env` files.

## Technologies Used

-   **Framework**: Next.js 15+
-   **Language**: TypeScript
-   **Authentication**: Firebase, JWT (jose), Firebase Admin SDK
-   **Database**: MongoDB (Mongoose ORM)
-   **State Management**: Zustand
-   **UI Library**: Shadcn UI
-   **Styling**: Tailwind CSS
-   **Theming**: next-themes

## Getting Started

Follow these steps to get your development environment set up.

### 1. Clone the repository

```bash
npm install -g pnpm
git clone <repository-url>
cd next-auth
```

### 2. Install Dependencies

Using pnpm:

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the root directory of the project and populate it with the necessary environment variables. You can use `.env.example` as a reference.

```
# Server Configuration
NEXT_PUBLIC_SERVER_URL=http://localhost:8000
MONGO_URI=mongodb://localhost:27017/nextauth
TOKEN_SECRET=YOUR_JWT_SECRET_KEY

# Firebase Admin SDK Configuration (for server-side token verification)
FIREBASE_CLIENT_EMAIL=your-firebase-client-email@your-project-id.iam.gserviceaccount.com
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_FIREBASE_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"

# Firebase Client SDK Configuration (for client-side authentication)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
```

**Important:**
-   Replace placeholders with your actual Firebase project credentials.
-   Ensure `MONGO_URI` points to your MongoDB instance.
-   Generate a strong, unique `TOKEN_SECRET` for JWT signing.

### 4. Run the Development Server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

-   `pnpm run dev`: Runs the app in development mode.
-   `pnpm run build`: Builds the application for production.
-   `pnpm run start`: Starts the production server.
-   `pnpm run lint`: Runs ESLint to check for code quality issues.
-   `pnpm run format`: Formats code using Prettier.

```