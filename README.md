# THREDACT

A rich, dark-themed e-commerce storefront built with React, Vite, TypeScript and Tailwind CSS v4.
Public visitors can browse Home, Category, Service, About Us, and download admin-uploaded
Templates/Images/PDFs. Admins sign in (via a gated "Admin Login" button in the footer) with
Firebase Authentication to upload and manage those files.

## Getting started

```bash
npm install
npm run dev
```

## Firebase setup (required for admin login & uploads)

1. Create a project at https://console.firebase.google.com
2. Enable **Authentication → Sign-in method → Email/Password**, then add an admin user
   (Authentication → Users → Add user) with the email/password you want to sign in with.
3. Enable **Firestore Database** (start in production mode) and **Storage**.
4. Copy your Web App config (Project settings → General → Your apps → SDK setup) into a
   `.env` file at the project root, based on `.env.example`:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

5. Recommended Firestore/Storage security rules (only the authenticated admin can write, anyone
   can read/download):

**Firestore rules:**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /resources/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**Storage rules:**
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /resources/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Until `.env` is configured, the site runs fully for public browsing; the Admin Login modal will
show a message that sign-in is not yet configured.

## Project structure

```
src/
  assets/            Brand logo assets (TD logo, TD wordmark)
  components/
    admin/           Admin login modal, upload form, resource management
    auth/            ProtectedRoute for /admin
    common/          Shared PageHeader
    downloads/       Resource card & grid (used by public Downloads page + Admin)
    home/            Hero, category highlights, downloads preview, social links
    layout/          Header, Footer, Layout wrapper
    ui/              Button, Input, Modal, Card, Badge, Spinner, ProgressBar
  constants/         Navigation items, mock category/service content
  context/           AuthContext (Firebase auth), ToastContext (notifications)
  firebase/          Firebase app initialization
  hooks/             useResources (Firestore + Storage CRUD)
  pages/             Home, Category, Service, About, Downloads, AdminDashboard
  types/             Shared TypeScript types
  utils/             Formatters (file size, date, resource type label)
```
