# PEELRO API

## Required environment variables

Set these variables in Render under **Environment**:

- `MONGO_URI`: MongoDB connection string for the product database.
- `ADMIN_SECRET_KEY`: random secret with at least 32 characters. This protects `POST /api/products`.

The API can start without `ADMIN_SECRET_KEY` so the public product catalog remains available, but admin product routes will return `401` until a valid key is configured.

## Render start command

```text
npm start
```
