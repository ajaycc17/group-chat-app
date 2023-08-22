# Full Stack Group Chat App

Under this repository, both the frontend(next.js) and backend are stored collectively.

## For the development server

To start the backend on development mode run the following command in `shell`:

```bash
npm start
```

Similarly, to start the frontend in development mode, run:

```bash
npm run dev
```

## `.env` files

Frontend folder when deployed will use `JWT_SECRET` environment variable. In development environment it should be created in the `env.local` file and it should be same as that used in the backend.

Similarly, backend uses the following environment variables from the `.env` file.

```bash
DB_NAME
DB_USER
DB_PASS
DB_HOST
BUCKET_NAME
USER_KEY
USER_SECRET
JWT_SECRET

```
