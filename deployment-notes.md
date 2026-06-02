# Deployment Notes

## Project Structure
This repository is a monorepo containing:
- `frontend/`: React + Vite application (Deploy to Vercel)
- `backend/`: Supabase Edge Functions (Deploy to Supabase)

---

## 🚀 Frontend Deployment (Vercel)

1. **Connect Repository**: Import this repository into Vercel.
2. **Root Directory**: Set the **"Root Directory"** to `frontend`.
   - *Note: This is crucial. Do not leave it as root.*
3. **Framework Preset**: Select **Vite**.
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Environment Variables**:
   Add the following variables in the Vercel Dashboard (Settings > Environment Variables):
   - `VITE_SUPABASE_URL`: Your Supabase Project URL.
   - `VITE_SUBMIT_LEAD_URL`: The URL of your deployed `submit-lead` Edge Function.

---

## ⚡ Backend Deployment (Supabase Edge Functions)

Logic resides in `backend/supabase/functions/submit-lead`.

### Prerequisites
- Supabase CLI installed.
- Logged in via `supabase login`.

### Deploy Command
Run from the root of the repository:

```bash
supabase functions deploy submit-lead --project-ref <your-project-id> --workdir backend
```

*Note: The function handles CORS (`Access-Control-Allow-Origin: *`). You can restrict this in the code if needed.*

### Environment Variables
The Edge Function requires access to your database. Ensure your Supabase project has the standard `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` available to Edge Functions (default behavior).

---

## 🛠 Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend (Local Testing)
You can serve the function locally using Supabase CLI:
```bash
supabase functions serve submit-lead
```
Then update your local .env to point `VITE_SUBMIT_LEAD_URL` to the local address.
