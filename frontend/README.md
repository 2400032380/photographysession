# Frame & Focus — Photography Session Management

## Prerequisites

- Node.js 18 or newer
- The existing Spring Boot backend running on `http://localhost:2008`

## Setup

```bash
npm install
copy .env.example .env
npm run dev
```

The frontend is available at `http://localhost:5173`.

`VITE_API_BASE_URL` controls the backend origin. The default fallback is `http://localhost:2008`.

## Backend endpoints

The frontend uses:

- `GET /photography/all`
- `GET /photography/get/{id}`
- `POST /photography/add`
- `PUT /photography/update`
- `DELETE /photography/delete/{id}`

## Testing

Run `npm run build` to create a production build, or `npm run preview` to serve it locally. The dashboard calculates all statistics from API responses and shows an explicit connection error if the backend cannot be reached.

## Common errors

If requests fail with a CORS error, configure the Spring Boot backend to allow `http://localhost:5173` (and the exact origin shown by Vite). For example, add a Spring MVC CORS mapping for `/photography/**` allowing the frontend origin and the `GET`, `POST`, `PUT`, and `DELETE` methods. Do not put database credentials or secrets in this frontend.
