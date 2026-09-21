# Bhoomi Rakshak

AI-powered national landslide early-warning and risk-intelligence prototype for India.

## GitHub + Vercel / Netlify workflow

This repository is designed to contain **code only**. Real API credentials must never be committed.

- `.env` is ignored by Git.
- `.env.example` contains placeholders only.
- Production credentials are configured in Vercel or Netlify Environment Variables.
- Open data sources do not require secrets.
- Jio Location Platform is simulated for the prototype.

### Important Vite environment-variable detail

For Vite, variables beginning with `VITE_` are injected during the **build** and are available to browser-side code. They are not secret at runtime. Therefore, `VITE_MISTRAL_API_KEY` should only be used for a prototype/demo where browser exposure is acceptable.

For a production system, move the Mistral request behind a Vercel Function, Netlify Function, or other server-side API so the Mistral secret never reaches the browser.

## Data sources

| Source | Purpose | Credentials | Prototype behavior |
|---|---|---|---|
| Open-Meteo | Weather, rainfall, soil moisture | None | Direct fetch + fallback |
| NASA POWER | Historical rainfall | None | Direct fetch + fallback |
| NASA LHASA / GPM | Landslide nowcast | None | Adapter isolated; public page is not treated as a JSON API |
| ISRO Bhuvan / NRSC | Geospatial/disaster layers | None | Integration adapter + fallback |
| IMD | Official warnings | None | Integration adapter + fallback |
| Jio Location Platform | Device density / officials | Enterprise | Simulated |
| Mistral | AI risk analysis | `VITE_MISTRAL_API_KEY` | API call + mock fallback |

The app never treats a failed source as fatal. Each source is isolated behind `try/catch` and returns cached/mock information when unavailable.

## Local development

```bash
git clone <your-repository-url>
cd bhoomi-rakshak
npm install
cp .env.example .env
```

Add your Mistral key to `.env` for local prototype use:

```env
VITE_MISTRAL_API_KEY=your_actual_key
```

Then:

```bash
npm run dev
```

## Deploy to Vercel

1. Push the repository to GitHub **without `.env`**.
2. Import the GitHub repository into Vercel.
3. Add `VITE_MISTRAL_API_KEY` under Environment Variables.
4. Redeploy after adding/changing the variable.
5. Vercel builds the Vite application with that environment value.

`vercel.json` includes the SPA rewrite needed for React Router.

## Deploy to Netlify

1. Push the repository to GitHub **without `.env`**.
2. Import the GitHub repository into Netlify.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add `VITE_MISTRAL_API_KEY` under Site configuration → Environment variables.
6. Trigger a deploy.

`netlify.toml` contains the SPA redirect.

## Demo flow

1. Open `/`
2. Enter Command Center
3. Click a colored risk marker on the national map
4. Run AI Risk Analysis
5. Show the 72-hour forecast
6. Show Jio Network Intelligence
7. Open Citizen Reports and Alerts
8. Finish on About / architecture

## Run

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

## Security

Never commit:

- `.env`
- `.env.local`
- production API keys
- Vercel tokens
- Netlify tokens
- GitHub tokens

The `.gitignore` is configured to exclude environment files and common local/build artifacts.
