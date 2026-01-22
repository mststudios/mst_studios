# MST Studios Deployment Guide

This project is now consolidated for production. The root folder contains both the backend and the built frontend.

## Deployment Steps

1. **Environment Variables**:
   - Create a `.env` file in the root based on `.env.example`.
   - Fill in your Hostinger MySQL database credentials.

2. **Backend**:
   - The backend is located in `server.js`.
   - It is configured to serve the frontend build from the `dist/` folder.
   - Run `npm install` (if not already done).
   - Start the server using `npm start`.

3. **Frontend**:
   - The frontend is already built into the `dist/` folder.
   - If you make changes to the source files (`src/`, `App.tsx`, etc.), run `npm run build` to update the `dist/` folder.

## Essential Files for Deployment
You only need to copy these to your Hostinger server:
- `dist/`
- `server.js`
- `package.json`
- `package-lock.json`
- `.env` (your production file)
