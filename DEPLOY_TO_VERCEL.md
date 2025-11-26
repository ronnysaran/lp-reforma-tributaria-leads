# How to Deploy to Vercel

Since your code is already on GitHub, deploying to Vercel is very easy and sets up automatic updates.

1.  **Log in to Vercel**:
    - Go to [vercel.com](https://vercel.com) and log in (you can use your GitHub account).

2.  **Add New Project**:
    - Click **"Add New..."** > **"Project"**.

3.  **Import Git Repository**:
    - You should see your GitHub repositories listed.
    - Find `lp-reforma-tributaria-leads` and click **"Import"**.

4.  **Configure Project**:
    - **Framework Preset**: Vercel should automatically detect it (or select "Other" / "Vite" if applicable, but for this static/HTML project "Other" is fine).
    - **Root Directory**: `./` (default).
    - **Build Command**: Leave empty (or `npm run build` if you were using a framework, but this is static HTML).
    - **Output Directory**: Leave empty (or `dist` if using Vite, but for plain HTML/CSS/JS, Vercel handles it).
    - *Note*: Since this is a simple HTML/CSS/JS project, Vercel will just serve the files.

5.  **Deploy**:
    - Click **"Deploy"**.

6.  **Done!**:
    - Vercel will build and deploy your site. You will get a live URL (e.g., `lp-reforma-tributaria-leads.vercel.app`).
    - Any time you `git push` to GitHub, Vercel will automatically update your site.
