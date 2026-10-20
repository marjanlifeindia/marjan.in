# MARJAN.IN — 120 Baby Names PDF email capture setup

This integration is intentionally prepared separately from the live website. Do not paste the script URL into the website until the owner has deployed and tested the Apps Script.

## What it does
- Requires an email address to request the PDF.
- Saves timestamp, email, source and optional marketing consent to a Google Sheet tab named `Leads`.
- Shows a thank-you page with a link to the PDF after the row is saved.
- Does not collect phone numbers.
- Marketing consent is separate and optional; do not add people to promotional mailing lists unless they opted in.

## Setup
1. Open the Google Sheet the owner supplied.
2. Copy the spreadsheet ID from its URL (the long value between `/d/` and `/edit`).
3. Open [Google Apps Script](https://script.google.com/) and create a new project.
4. Paste the contents of `Code.gs` into the editor.
5. Replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with the spreadsheet ID. Keep the PDF URL as supplied for the first test.
6. Save. Choose **Deploy → New deployment → Web app**.
7. Set **Execute as** to the owner and **Who has access** to **Anyone** only if that is acceptable for the public lead form. Review Google's current access warning before confirming.
8. Deploy, authorize the script, and copy the Web app URL.
9. Test with your own email first. Confirm a new row appears in the `Leads` tab and the PDF link opens/downloads.
10. Only after this test, connect the Web app URL to the website form in a separate reviewed change.

## Important checks
- The PDF must be shared so intended visitors can open it. A Drive preview URL may open a preview rather than directly download.
- Treat the Sheet as private; do not publish it or expose it in page source.
- The script URL is public-facing. If spam becomes a problem, add rate-limiting/anti-abuse controls before promotion.
- Do not deploy the website changes until the endpoint and PDF permissions are tested.
