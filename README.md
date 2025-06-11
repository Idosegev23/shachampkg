# KA × שחם אורלן - עמוד נחיתה

## איך זה עובד עכשיו (כפולה!)

✅ **דרך 1: Make.com** - webhook ישיר לאוטומציה  
✅ **דרך 2: Nodemailer** - מייל ישיר באמצעות Gmail  
✅ **גיבוי כפול** - אם אחד נכשל, השני עובד!

## הפעלה מקומית

### לעמוד הנחיתה:
פתח את אחד הקבצים האלה בדפדפן:
- `index-modular.html` (המבנה החדש המודולרי)
- `index.html` (הדף המקורי)

### לסרבר המיילים (אופציונלי):
```bash
# צור קובץ .env עם הפרטים שלך:
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

# התקן והפעל:
npm install
npm start
```

הסרבר יפעל על `http://localhost:3001`

## איך הטופס עובד

1. **משתמש ממלא טופס** ולוחץ "שלח"
2. **JavaScript שולח בו-זמנית ל-2 מקומות:**
   - **Make.com webhook** לאוטומציה
   - **Nodemailer server** לשליחת מייל ישיר
3. **אם לפחות אחד מצליח** - המשתמש מקבל הודעת הצלחה
4. **Make.com יכול להוסיף** גם CRM, SMS, WhatsApp וכו'

## מה נשלח ל-Make.com

```json
{
  "name": "שם הלקוח",
  "phone": "054-123-4567", 
  "email": "client@example.com",
  "company": "שם החברה",
  "package": "Starter AI - 1,200₪",
  "message": "הודעת הלקוח",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "source": "KA Shaham Landing Page"
}
```

## הגדרה ב-Make.com

1. **צור scenario חדש** ב-Make.com
2. **התחל עם Webhook trigger**
3. **השתמש ב-URL:** `https://hook.eu2.make.com/98h5wvl2h95w1wph3swguk62ahtjqoh1`
4. **הוסף modules:**
   - Email (לשליחת מייל)
   - Google Sheets (לשמירת leads)
   - WhatsApp Business (להתראות)
   - וכל מה שתרצה...

## יתרונות הפתרון החדש

- 🚀 **פשוט מאוד** - אין סרבר לתחזק
- 💰 **זול** - אין עלויות hosting
- 🔧 **גמיש** - כל הלוגיקה ב-Make.com
- 🛡️ **בטוח** - אין secrets בקוד
- ⚡ **מהיר** - פחות moving parts

## קבצים במערכת

### Frontend (עמוד הנחיתה)
- `index-modular.html` - דף ראשי מודולרי
- `index.html` - דף מקורי (backup)
- `components/` - קומפוננטות HTML
- `styles/` - קבצי CSS
- `scripts/main.js` - JavaScript עם הטופס

### תמונות
- `public/images/` - לוגואים ותמונות

## מידע קשר בעמוד

- **נייד:** 054-640-0839
- **WhatsApp:** 054-640-0839
- **אימייל:** meravn@shaham-orlan.co.il  
- **כתובת:** בית מגדל, היצירה 3, פתח תקווה

---

**זה הכל!** פתח את הדף ותתחיל לקבל leads ישירות ל-Make.com 🎉 