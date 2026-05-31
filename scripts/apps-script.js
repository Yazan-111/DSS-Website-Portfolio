/**
 * Google Apps Script للتحكم بالإعلانات
 * 
 * هذا الملف يجب أن يُرفع على Google Apps Script وليس على GitHub!
 * GitHub فقط للمرجعية.
 * 
 * خطوات التفعيل:
 * ═══════════════
 * 
 * 1. افتح Google Sheets جديد
 * 2. سمّه "DSS Announcements Database"
 * 3. أضف هذه الأعمدة في الصف الأول:
 *    ┌─────┬────────┬──────┬────────┬────────────┐
 *    │  A  │   B    │   C  │   D    │     E      │
 *    ├─────┼────────┼──────┼────────┼────────────┤
 *    │ id  │ title  │ body │  date  │  priority  │
 *    └─────┴────────┴──────┴────────┴────────────┘
 * 
 * 4. من القائمة: Extensions > Apps Script
 * 5. امسح كل الكود واستبدله بهذا الملف
 * 6. اضغط Deploy > New deployment
 * 7. اختر "Web app"
 * 8. Execute as: Me
 * 9. Who has access: Anyone
 * 10. اضغط Deploy
 * 11. انسخ الرابط (Web app URL)
 * 12. ضعه في AnnouncementsPage.tsx و AdminPage.tsx
 *     بدلاً من: YOUR_SCRIPT_ID
 * 
 * مثال الرابط:
 * https://script.google.com/macros/s/ABC123XYZ/exec
 */

// 📌 احصل على Sheet النشط
function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
}

// 🆔 توليد معرف فريد
function generateId() {
  return 'ann_' + new Date().getTime() + '_' + Math.random().toString(36).substr(2, 9);
}

// ✅ معالج GET - يُستخدم لجلب الإعلانات
function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'get') {
    return getAnnouncements();
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ error: 'Invalid action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ✍️ معالج POST - يُستخدم لإضافة إعلان
function doPost(e) {
  const action = e.parameter.action;
  
  if (action === 'add') {
    return addAnnouncement(e);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ error: 'Invalid action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 📥 جلب جميع الإعلانات
function getAnnouncements() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  // أول صف = Headers، نتخطاه
  const announcements = [];
  for (let i = 1; i < data.length; i++) {
    announcements.push({
      id: data[i][0],
      title: data[i][1],
      body: data[i][2],
      date: data[i][3],
      priority: data[i][4]
    });
  }
  
  // ترتيب الأحدث أولاً
  announcements.reverse();
  
  return ContentService
    .createTextOutput(JSON.stringify(announcements))
    .setMimeType(ContentService.MimeType.JSON);
}

// ➕ إضافة إعلان جديد
function addAnnouncement(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet();
    
    const newRow = [
      generateId(),
      data.title,
      data.body,
      data.date,
      data.priority
    ];
    
    sheet.appendRow(newRow);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 🧪 اختبار محلي (اختياري)
 * قم بتشغيل هذه الدالة من Apps Script لتجربة إضافة إعلان تجريبي
 */
function testAddAnnouncement() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        title: "إعلان تجريبي",
        body: "هذا إعلان تجريبي لاختبار النظام. يمكنك حذف هذا الصف من Google Sheet بعد التأكد من عمل النظام.",
        date: new Date().toLocaleString('ar-SA'),
        priority: "تحديثات"
      })
    }
  };
  
  const result = addAnnouncement(mockEvent);
  Logger.log(result.getContent());
}
