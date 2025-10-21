# Checkout

This web application simulates a **complete checkout flow**, including user authentication, product selection, and payment, using only mocked data (no real backend). The goal is to create a smooth and consistent user experience with proper state handling, feedback, and simulated payment processes.

Stack used:

- **ReactJS**
- **Next.js**
- **Shadcn UI**
- **Tailwind CSS**
- **TypeScript**

---

## Features

### 1. Authentication (mocked)

- Single page for login or account creation.
- Simulated session persistence in the browser (localStorage or cookies).
- Checkout access blocked for unauthenticated users.
- Simple field validation with error messages.

## User Flow

1. **Login / Signup**

---

## Suggested Folder Structure

```bash

/src
 ├─ /app
 │   ├─ /(private)        # Private routes, accessible only by authenticated users
 │   │   └─ /home         # Home page for logged-in users
 │   ├─ /(public)         # Public routes, accessible without authentication
 │   │   └─ /login        # Login and signup page
 │   └─ layout.tsx        # Main app layout, wrapping pages with header/footer/etc.
 ├─ /components
 │   ├─ /ui               # Reusable UI components (buttons, inputs, modals)
 │   └─ /auth             # Authentication-related components (login forms, signup forms)
 ├─ /context              # React contexts for global state (auth, cart, etc.)
 ├─ /hooks                # Custom React hooks for reusable logic
 ├─ /lib
 │   ├─ cookies.ts        # Functions for handling cookies
 │   ├─ js-cookie.d.ts    # Type definitions for js-cookie library
 │   ├─ utils.ts          # Generic utility functions used across the app
 │   └─ validators.ts     # Input validation schemas (e.g., with Zod)
 ├─ /mock
 │   └─ users.ts          # Mocked user data for testing authentication
 ├─ /service
 │   └─ authService.ts    # Mocked authentication service (login/signup logic)
 ├─ /styles
 │   └─ global.css        # Global CSS styles (Tailwind overrides, base styles)
 ├─ /types
 │   └─ user.ts           # TypeScript types/interfaces for user-related data
 └─ middleware.ts         # Next.js middleware for route protection and auth checks

```

---

## Best Practices Applied

- **TypeScript** for type safety and maintainability.
- Consistent UI using **Shadcn UI** components.
- Proper handling of states (loading, error, empty, success).
- Simulated latency and failures for realistic scenarios.
- Responsive and accessible layout.

---

## How to Run

1. Clone the repository:

```bash
git clone https://github.com/GabrielGuerreir0/colmeia.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open the app at: http://localhost:3000

## Notes

- The application is **fully mocked**, with no real backend involved.
