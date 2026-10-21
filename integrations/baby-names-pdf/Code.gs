/**
 * MARJAN.IN — Baby Names PDF email capture
 *
 * Deploy as a Google Apps Script Web App owned by the site owner.
 * Create a spreadsheet with a sheet named "Leads" and set SHEET_ID below.
 * The form submits to this endpoint; each valid email is appended with timestamp,
 * source and optional marketing consent.
 */
const SHEET_ID = '13OwZiSd2bldhPgc7Z8OOgXtho9mC4uRd0ku9TteR2t4';
const SHEET_NAME = 'Leads';
const PDF_URL = 'https://drive.google.com/file/d/1XpLVPMbSQVqJIP7mNNaXKwnYajgu4n3I/view?usp=drivesdk';

function doPost(e) {
  const params = (e && e.parameter) ? e.parameter : {};
  const email = String(params.email || '').trim().toLowerCase();
  const consent = String(params.marketing_consent || '') === 'yes';
  const source = String(params.source || 'baby-names-120-pdf').slice(0, 120);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return renderPage_('ईमेल सही नहीं लग रहा है', 'कृपया वापस जाकर सही ईमेल पता दर्ज करें।', '');
  }

  if (SHEET_ID === 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE') {
    return renderPage_('सेटअप बाकी है', 'Google Sheet ID अभी सेट नहीं की गई है।', '');
  }

  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Email', 'Source', 'Marketing consent']);
    }
    sheet.appendRow([new Date(), email, source, consent ? 'Yes' : 'No']);
    return renderPage_('धन्यवाद!', 'आपकी ईमेल आईडी सेव हो गई है। अब PDF खोलें या डाउनलोड करें।', PDF_URL);
  } catch (err) {
    return renderPage_('अभी सेव नहीं हो पाया', 'कृपया थोड़ी देर बाद फिर कोशिश करें।', '');
  }
}

function renderPage_(heading, message, link) {
  const safeHeading = escapeHtml_(heading);
  const safeMessage = escapeHtml_(message);
  const linkHtml = link
    ? '<p><a class="button" href="' + escapeHtml_(link) + '" target="_blank" rel="noopener">120 Baby Names PDF खोलें</a></p>'
    : '';
  const html = '<!doctype html><html lang="hi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + safeHeading + ' | MARJAN.IN</title>' +
    '<style>body{font-family:Arial,sans-serif;background:#fffaf8;color:#303747;padding:24px;line-height:1.6}.box{max-width:560px;margin:8vh auto;background:#fff;padding:28px;border:1px solid #eee5e2;border-radius:16px}h1{color:#243047}.button{display:inline-block;background:#e97885;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:bold}</style>' +
    '<main class="box"><h1>' + safeHeading + '</h1><p>' + safeMessage + '</p>' + linkHtml +
    '<p>MARJAN.IN</p></main></html>';
  return HtmlService.createHtmlOutput(html);
}

function escapeHtml_(value) {
  return String(value).replace(/[&<>"']/g, function (c) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]);
  });
}
