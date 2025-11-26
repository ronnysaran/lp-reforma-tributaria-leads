function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    const timestamp = new Date();

    // Map fields to columns
    // A: Timestamp, B: Name, C: Email, D: WhatsApp, E: NPS, F: NPS Reason, G: Role, H: Challenges, I: Question, J: LGPD

    sheet.appendRow([
        timestamp,
        data.name,
        data.email,
        data.whatsapp,
        data.nps,
        data.npsReason || '',
        data.role,
        data.challenges,
        data.question,
        data.lgpd ? 'Yes' : 'No'
    ]);

    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
}

function setup() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const headers = ['Timestamp', 'Name', 'Email', 'WhatsApp', 'NPS', 'NPS Reason', 'Role', 'Challenges', 'Question', 'LGPD'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
}
