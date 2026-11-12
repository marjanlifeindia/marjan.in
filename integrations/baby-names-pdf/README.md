# MARJAN.IN — 120 Baby Names PDF email capture setup

## Features
- Validates the requested email address.
- Saves timestamp, email, source and optional marketing consent to the private `Leads` sheet.
- Emails the PDF link and provides a fallback link on the response page.
- Does not collect phone numbers. Marketing consent remains optional.
- Reads the private spreadsheet ID from Apps Script Script Properties.

## Setup
1. Open Google Apps Script and paste `Code.gs` into a project owned by the spreadsheet owner.
2. In Project Settings → Script Properties, add `SHEET_ID` with the spreadsheet ID as the value. Do not commit this ID to GitHub.
3. Verify the PDF's Drive sharing permissions.
4. Save and deploy as a Web App. Execute as the owner; choose public access only if appropriate for the public form.
5. Authorize Sheets and email permissions, then copy the Web App URL.
6. Test with your own email. Confirm the `Leads` row is saved and the PDF link email arrives (check Spam).
7. Verify the website form points to this deployment before launch.

## Safety
- Keep the Sheet private.
- The PDF link is emailed, not attached.
- The endpoint is public-facing; consider anti-abuse controls if spam appears.
- Do not merge or launch until Apps Script and email delivery are tested.
