# Tipovačka ⚽️

Kompletní React + Vite projekt napojený na Firebase (Realtime Database + Auth).

## 🚀 Funkce
- Přihlášení (Firebase Auth, email/heslo)
- Tipování zápasů (výsledek + střelec)
- "Zápas kola" = bonus body
- Vyhodnocování tipů adminem
- Žebříček soutěžících
- Přehled tipů všech hráčů
- Admin sekce chráněná (frontend i backend)

## 🔑 Firebase Security Rules
Vlož do Firebase Console → Database → Rules:

```json
{
  "rules": {
    ".read": true,

    "tipy": {
      "$zapasId": {
        "$userId": {
          ".write": "auth != null && auth.token.email.replace('.', '_') === $userId"
        }
      }
    },

    "zapasy": {
      ".write": "root.child('admins').child(auth.token.email.replace('.', '_')).val() === true"
    },

    "body": {
      "$userId": {
        ".write": "root.child('admins').child(auth.token.email.replace('.', '_')).val() === true"
      }
    },

    "admins": {
      "$adminId": {
        ".write": "false"
      }
    }
  }
}
```

## 🛠️ Admin
V databázi už je připraven admin:

```json
"admins": {
  "brejchajakub79@gmail_com": true
}
```

## ▶️ Spuštění lokálně
```bash
npm install
npm run dev
```

## 🌍 Nasazení na Netlify
1. Přihlas se na [Netlify](https://app.netlify.com)
2. Vytvoř novou stránku, propojit repozitář nebo použij drag&drop složky `dist/`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Přidej do Firebase Auth → Settings → Authorized domains: `netlify.app`

Hotovo ✅
