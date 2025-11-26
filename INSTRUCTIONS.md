# Google Sheets Integration Instructions

To save the form data to a Google Sheet, follow these steps:

1.  **Create a new Google Sheet**:
    - Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
    - Name it "Leads - Reforma Tributária" (or similar).

2.  **Open Apps Script**:
    - In the spreadsheet, go to **Extensions** > **Apps Script**.

3.  **Paste the Code**:
    - Delete any code in the `Code.gs` file.
    - Copy the contents of `google-sheet-script.js` from this project.
    - Paste it into the Apps Script editor.

4.  **Run Setup**:
    - Select the `setup` function from the dropdown in the toolbar.
    - Click **Run**.
    - Grant the necessary permissions when prompted.
    - This will create the headers in your sheet.

5.  **Deploy as Web App**:
    - Click **Deploy** > **New deployment**.
    - Click the gear icon (Select type) > **Web app**.
    - **Description**: "Lead Form API".
    - **Execute as**: "Me" (your email).
    - **Who has access**: **Anyone** (This is crucial for the form to work without login).
    - Click **Deploy**.

6.  **Copy the URL**:
    - Copy the **Web App URL** provided (it starts with `https://script.google.com/macros/s/...`).

7.  **Update the Code**:
    - Open `script.js` in this project.
    - Find the `GOOGLE_SCRIPT_URL` constant at the top (I will add this for you).
    - Paste your Web App URL there.

Done! Your form will now save data to the Google Sheet.
