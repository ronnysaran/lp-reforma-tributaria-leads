# How to Deploy to GitHub

Since I don't have direct access to your GitHub account, please follow these steps to push your code:

1.  **Create a Repository**:
    - Go to [github.com/new](https://github.com/new).
    - Name your repository (e.g., `landing-page-reforma-tributaria`).
    - **Do not** initialize with README, .gitignore, or License (we already have them).
    - Click **Create repository**.

2.  **Push the Code**:
    - Copy the commands under "…or push an existing repository from the command line".
    - They will look like this (run them in your terminal):

    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/landing-page-reforma-tributaria.git
    git branch -M main
    git push -u origin main
    ```

3.  **Enable GitHub Pages (Optional)**:
    - Go to your repository **Settings** > **Pages**.
    - Under **Source**, select `main` branch.
    - Click **Save**.
    - Your page will be live at `https://YOUR_USERNAME.github.io/landing-page-reforma-tributaria/`.
