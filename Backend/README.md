# Lore Backend

Express backend for the Lore app, powered by Supabase.

## Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Create your environment file

   ```bash
   copy .env.example .env
   ```

3. Fill in your Supabase project URL, service role key, and storage bucket.

4. Start the server

   ```bash
   npm start
   ```

## Available routes

- `GET /health`
- `GET /api/profiles`
- `GET /api/profiles/:id`
- `POST /api/profiles`
- `GET /api/lore-posts`
- `POST /api/lore-posts`
- `POST /api/lore-posts/:postId/like`
- `POST /api/lore-posts/:postId/comments`
- `GET /api/discover`
- `POST /api/upload`

## Environment variables

```bash
PORT=4000
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=lore-uploads
```

## Notes

- The upload route expects a multipart field named `file`.
- The Supabase bucket should exist before using `/api/upload`.