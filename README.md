# Frontend Challenge — Checkout Flow (100% Mocked)

This web application simulates a **complete checkout flow** with fully mocked data (no real backend).  
The goal is to implement a smooth and predictable user experience, including authentication, product selection, and payment, with proper state handling, feedback, and simulated payment processes.

## Stack Used

- **ReactJS**
- **Next.js**
- **Shadcn UI**
- **Tailwind CSS**
- **TypeScript**

---

## Environment & Versions

To ensure full compatibility, use the following versions (or higher compatible ones):

| Tool / Library   | Version         |
| ---------------- | --------------- |
| **Node.js**      | `18.18.0` (LTS) |
| **npm**          | `>=9.0.0`       |
| **Next.js**      | `15.5.6`        |
| **React**        | `19.1.0`        |
| **TypeScript**   | `5.x`           |
| **Tailwind CSS** | `4.x`           |
| **ESLint**       | `9.x`           |

---

## Minimum Scope

### 1) Authentication (mocked)

- Single page for login or account creation.
- Simulated session persistence in the browser (localStorage or cookies).
- Checkout access blocked for unauthenticated users.
- Simple field validation with error messages.

- **Mocked Users:**

  **TI User:**

  - Email: `ti@colmeia.io`
  - Password: `Colmeia`

  **Regular User:**

  - Name: `Gabriel Guerrero`
  - Email: `gabriel@example.com`

### 2) Product Selection

- Simple product list with prices.
- Add to cart and order summary.
- Quantity updates and removal from cart.

### 3) Payment

- Choice of payment method: Pix, Credit Card, or Boleto.
- Fields specific to each payment method (proper UI per method).
- Order confirmation and simulated processing.
- Status evolution: initial → processing → paid | failed | expired (rules simulated).
- **Card validation rule:** Only cards starting with common valid prefixes (3, 4, 5, 6) are accepted.

### 4) States and Feedback

- Loading, empty, error, success states.
- Clear and actionable messages.
- Basic responsiveness and accessibility (focus, labels, keyboard navigation).

---

## Expected User Flow

1. **Login / Signup**
2. **Product Catalog**
3. **Cart**
4. **Checkout**
   - Buyer information (pre-filled from logged-in user)
   - Payment method (Pix / Card / Boleto)
   - Review and confirm order
   - Track order status until completion
   - Result screen (paid / failed / expired) with option to retry if applicable

---

## Suggested Folder Structure

```bash

/src
 ├─ /app
 │   ├─ /(private)        # Private routes, accessible only to authenticated users
 │   ├─ /(public)         # Public routes, accessible without authentication
 │   └─ layout.tsx        # Main app layout, wraps pages with header/footer/etc.
 ├─ /components
 │   └─ /ui               # Reusable UI components (buttons, inputs, modals)
 ├─ /context              # React contexts for global state management (auth, cart, etc.)
 ├─ /hooks                # Custom React hooks for reusable logic
 ├─ /services             # API calls and service logic
 ├─ /shared               # Shared utilities and types used across the app
 │   ├─ lib               # Utility functions (e.g., cookie handling)
 │   ├─ mock              # Mock data for testing or development
 │   └─ types             # TypeScript type definitions and interfaces
 ├─ /lib
 │   ├─ js-cookie.d.ts    # Type definitions for the js-cookie library
 │   ├─ utils.ts          # Generic utility functions
 │   └─ validators.ts     # Input validation schemas (e.g., using Zod)
 ├─ /styles               # Global styles and CSS/SCSS files
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
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app at: http://localhost:3000

## Notes

- The application is **fully mocked**, with no real backend involved.
- Payment processing and status transitions are simulated for realistic UX.
- **Card validation:** Only credit cards starting with common valid prefixes (3, 4, 5, 6) are considered valid.
