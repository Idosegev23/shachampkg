# KA × שחם אורלן - פתרונות AI לסוכני ביטוח

דף נחיתה לשירותי AI של KA בשיתוף עם שחם אורלן, המתמחה בפתרונות בינה מלאכותית לסוכני ביטוח בישראל.

## 🚀 פריסה ב-Vercel

### הגדרה מהירה

1. **Clone הפרויקט:**
   ```bash
   git clone https://github.com/Idosegev23/shachampkg.git
   cd shachampkg
   ```

2. **התקנת dependencies:**
   ```bash
   npm install
   ```

3. **הגדרת משתני סביבה ב-Vercel:**
   - `EMAIL_USER` - כתובת Gmail לשליחת מיילים
   - `EMAIL_PASS` - App Password של Gmail

### פריסה ב-Vercel

הפרויקט מוכן לפריסה ב-Vercel עם התצורה הבאה:

- **Static Files:** index.html, CSS, JavaScript מוגשים מהתיקייה הראשית
- **API Functions:** `/api/send-email` לשליחת אימיילים
- **Auto-deployment:** מחובר ל-GitHub לפריסה אוטומטית

### מבנה הפרויקט

```
├── index.html              # דף הבית הראשי
├── api/
│   └── send-email.js      # Serverless function לשליחת אימיילים
├── styles/
│   ├── main.css           # עיצוב ראשי
│   ├── global.css         # משתנים גלובליים
│   ├── packages.css       # עיצוב חבילות
│   ├── contact.css        # עיצוב טופס יצירת קשר
│   ├── faq.css           # עיצוב שאלות נפוצות
│   └── comparison.css     # עיצוב השוואת חבילות
├── scripts/
│   └── main.js           # JavaScript ראשי
├── public/
│   ├── images/           # תמונות ומדיה
│   └── ...              # קבצים סטטיים נוספים
└── vercel.json           # תצורת Vercel

```

## 🎯 תכונות

### חבילות AI
- **Starter AI** (1,200₪) - כלים בסיסיים לסוכנים קטנים
- **Efficiency Pro** (3,500₪) - אוטומציה מתקדמת 
- **Smart Office AI** (9,800₪) - פתרון משרדי מלא
- **Enterprise** (25,000₪) - פתרון ארגוני מקיף

### תכונות טכניות
- 📱 Responsive Design
- 🎨 עיצוב מודרני עם CSS Grid/Flexbox
- ⚡ JavaScript vanilla ללא תלויות
- 📧 שליחת אימיילים דרך Nodemailer
- 🔗 אינטגרציה עם Make.com webhook
- 🎯 טפסים דינמיים עם validations

## 🛠️ פיתוח מקומי

```bash
# התקנת Vercel CLI
npm i -g vercel

# הרצה מקומית
vercel dev

# גישה ל-http://localhost:3000
```

## 📧 הגדרת Email

1. **יצירת App Password ב-Gmail:**
   - הגדרות Google → אבטחה → 2-Step Verification
   - App Passwords → Select App: Mail
   - Copy הסיסמה שנוצרה

2. **הגדרת משתני סביבה:**
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

## 🔧 Vercel Configuration

הפרויקט כולל `vercel.json` עם:
- Functions configuration for API routes
- Rewrites for clean URLs  
- Environment variables setup
- CORS handling

## 📞 יצירת קשר

- **מייל:** meravn@shaham-orlan.co.il
- **טלפון:** 054-640-0839
- **אתר:** שחם אורלן פתרונות דיגיטליים

---

**© 2024 KA × שחם אורלן. כל הזכויות שמורות.** 