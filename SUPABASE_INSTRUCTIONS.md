# Supabase Integration Setup

To enable the Supabase integration, you need to configure your project credentials.

1.  **Create a Supabase Project**:
    - Go to [supabase.com](https://supabase.com) and create a new project.

2.  **Create the Table**:
    - Go to the **SQL Editor** in your Supabase dashboard.
    - Copy the contents of `SUPABASE_SETUP.sql` from this repository.
    - Paste and run the query. This creates the `leads` table and sets up security policies.

3.  **Get Credentials**:
    - Go to **Project Settings** > **API**.
    - Copy the **Project URL**.
    - Copy the **anon** / **public** key.

4.  **Update the Code**:
    - Open `script.js`.
    - Replace `YOUR_SUPABASE_PROJECT_URL` with your actual URL.
    - Replace `YOUR_SUPABASE_ANON_KEY` with your actual key.

5.  **Deploy**:
    - Commit and push your changes to GitHub:
      ```bash
      git add script.js
      git commit -m "Configure Supabase credentials"
      git push
      ```
