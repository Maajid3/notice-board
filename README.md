# Notice Board

A responsive notice board web application built with Next.js, Tailwind CSS, Prisma, Supabase, and Lucide React.

The Notice Board app allows users to create, view, edit, and delete notices through a simple and intuitive interface. It provides an organized way to manage and display important announcements efficiently.

## Tech stack

- Next.js (Pages Router)
- Prisma
- PostgreSQL
- Tailwind CSS

## Features

- Create, read, update, and delete notices
- Shared add/edit form
- Server-side validation in API routes
- Urgent notices sorted first in the database query
- Delete confirmation modal
- Responsive card layout for mobile and desktop

## Project setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your_postgres_connection_string"
```

### 3. Generate Prisma client

```bash
npx prisma generate
```

### 4. Sync the database

If you are starting fresh, push the schema to the database:

```bash
npx prisma db push
```

Or create and apply a migration:

```bash
npx prisma migrate dev --name init
```

### 5. Run the app

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Available scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - start production server
- `npm run lint` - run ESLint

## API routes

- `GET /api/notices`
- `POST /api/notices`
- `GET /api/notices/:id`
- `PUT /api/notices/:id`
- `DELETE /api/notices/:id`

## Database model

The app uses a `Notice` table with:

- `title`
- `body`
- `category`
- `priority`
- `publishDate`
- `createdAt`

## Deployment

This app is intended to be deployed on Vercel with a hosted PostgreSQL database such as Supabase or Neon.

## What I would improve with more time

I would add automated end-to-end tests for create, edit, delete, and validation flows.

## AI usage

AI was used to help review the assignment requirements, identify gaps, and draft documentation. All code, final changes were reviewed and adjusted manually.