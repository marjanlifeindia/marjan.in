/**
 * MARJAN.IN — Baby Names PDF email capture
 *
 * Deploy as a Google Apps Script Web App owned by the site owner.
 * Set the SHEET_ID script property in Apps Script → Project Settings.
 * The form submits email, optional marketing_consent=yes, and source.
 */
const SHEET_NAME = 'Leads';
const PDF_URL = 'https://drive.google.com/file/d/1XpLVPMbSQVqJIP7mNNaXKwnYajgu4n3I/view?usp=drivesdk';
const PDF_TITLE = 'MARJAN.IN — 120 Baby Names PDF';

function doPost(e) {
  const params = (e && e.parameter) ? e.parameter : {};
  const email = String(params.email || '').trim().toLowerCase();
  const consent = String(params.marketing_consent || '') === 'yes';
  const source = String(params.source || 'baby-names-120-pdf').slice(0, 120);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return renderPage_('ईमेल सही नहीं लग रहा है', 'कृपया वापस जाकर सही ईमेल पता दर्ज करें।', '');
  }

  const sheetId = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if (!sheetId) {
    return renderPage_(
      'सेटअप बाकी है',
      'Google Apps Script में Project Settings → Script Properties के अंदर SHEET_ID सेट करें।',
      ''
    );
  }

  let sheet;
  try {
    const spreadsheet = SpreadsheetApp.openById(sheetId);
    sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Email', 'Source', 'Marketing consent']);
    } else if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Email', 'Source', 'Marketing consent']);
    }
    sheet.appendRow([new Date(), email, source, consent ? 'Yes' : 'No']);
  } catch (err) {
    console.error('Could not save lead: ' + err);
    return renderPage_('अभी सेव नहीं हो पाया', 'Google Sheet में जानकारी सेव नहीं हो सकी। कृपया थोड़ी देर बाद फिर कोशिश करें।', '');
  }

  try {
    const textBody = 'नमस्ते!\n\nआपकी MARJAN.IN 120 Baby Names PDF की रिक्वेस्ट मिल गई है। PDF यहाँ खोलें: ' + PDF_URL +
      '\n\nधन्यवाद,\nMARJAN.IN';
    const htmlBody = '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#303747">' +
      '<h2>आपकी Baby Names PDF तैयार है!</h2>' +
      '<p>नमस्ते! आपकी MARJAN.IN 120 Baby Names PDF की रिक्वेस्ट मिल गई है।</p>' +
      '<p><a href="' + PDF_URL + '" style="display:inline-block;background:#e97885;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:bold">120 Baby Names PDF खोलें</a></p>' +
      '<p>धन्यवाद,<br>MARJAN.IN</p></div>';
    MailApp.sendEmail({
      to: email,
      subject: PDF_TITLE,
      body: textBody,
      htmlBody: htmlBody,
      name: 'MARJAN.IN'
    });
    return renderPage_('धन्यवाद!', 'आपकी ईमेल आईडी सेव हो गई है और PDF का लिंक आपके ईमेल पर भेज दिया गया है।', PDF_URL);
  } catch (err) {
    console.error('Could not send PDF email: ' + err);
    return renderPage_(
      'आपकी जानकारी सेव हो गई है',
      'आपकी ईमेल आईडी सेव हो गई है, लेकिन PDF ईमेल नहीं भेजा जा सका। नीचे दिए गए बटन से PDF खोलें।',
      PDF_URL
    );
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
