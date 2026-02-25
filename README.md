# 🤖 n8n AI Lead Agent — Railway Deploy

> Lead form submit ho → AI email likhta hai → Gmail se send hota hai → Sab kuch automatic!

![Railway](https://img.shields.io/badge/Deploy_on-Railway-7B2FBE?style=for-the-badge&logo=railway)
![n8n](https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white)

---

## ✨ Kya karta hai yeh?

Koi bhi form fill kare:
1. 🤖 **AI lead score karta hai** (1-10, Hot/Warm/Cold)
2. ✉️ **Personalized email likhta hai aur bhejta hai** (Gmail se)
3. 📊 **Airtable CRM mein save karta hai** (optional)
4. 🔔 **Slack pe team notify karta hai** (optional)

**Sab kuch 10 seconds mein — fully automatic!**

---

## 🚀 Deploy Karo — 4 Steps

### Step 1: GitHub pe Push Karo

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/n8n-lead-agent.git
git push -u origin main
```

---

### Step 2: Railway pe Deploy Karo

1. **[railway.app](https://railway.app)** pe jao → Login with GitHub
2. **New Project** → **Deploy from GitHub repo**
3. Apna repo select karo
4. Railway automatically detect karega aur deploy karega ✅

---

### Step 3: Environment Variables Add Karo

Railway dashboard mein jao → **Variables** tab → Add karo:

| Variable | Value | Required |
|---|---|---|
| `N8N_ENCRYPTION_KEY` | Koi bhi 32 char random string | ✅ |
| `N8N_USER_MANAGEMENT_DISABLED` | `true` | ✅ |
| `OPENAI_API_KEY` | `sk-xxxx` | ✅ |
| `SLACK_WEBHOOK_URL` | Slack webhook URL | ❌ Optional |
| `AIRTABLE_API_KEY` | Airtable token | ❌ Optional |
| `AIRTABLE_BASE_ID` | `appXXXXXX` | ❌ Optional |

> 💡 **Sirf Gmail use karna chahte ho?** Sirf `N8N_ENCRYPTION_KEY` aur `OPENAI_API_KEY` daalna zaroori hai. Baaki optional hain.

---

### Step 4: n8n Setup Karo

Railway deploy hone ke baad:

1. **Railway > Settings > Domains** se apna URL copy karo
   - Example: `https://n8n-lead-agent-production.up.railway.app`

2. Us URL pe jao → n8n khulega

3. Account banao (first time)

4. **Credentials** → **Add New** → **Gmail OAuth2** setup karo:
   - Google Cloud Console mein OAuth app banao
   - Redirect URI: `YOUR_RAILWAY_URL/rest/oauth2-credential/callback`
   - Client ID & Secret paste karo n8n mein

5. **Workflows** → **Import from File** → `workflow/lead-agent.json` upload karo

6. Workflow mein **Send Email** node pe click karo → Gmail credential select karo

7. Top right mein **Activate** toggle ON karo ✅

---

### Step 5: Form Connect Karo

`form/index.html` file kholo aur yeh line update karo:

```javascript
// Line ~120
const WEBHOOK_URL = 'YOUR_RAILWAY_URL/webhook/new-lead';
// ↓ Change to:
const WEBHOOK_URL = 'https://n8n-lead-agent-production.up.railway.app/webhook/new-lead';
```

Form ko GitHub Pages pe host karo:
- GitHub repo → **Settings** → **Pages** → **Source: main branch, /form folder**
- URL milega: `https://YOUR_USERNAME.github.io/n8n-lead-agent`

---

## 📁 Project Structure

```
n8n-lead-agent/
├── 📄 README.md
├── 📦 package.json          ← Railway yahan se n8n install karta hai
├── 🚂 railway.json          ← Railway config
├── 🔒 .env.example          ← Variables reference
├── 🚫 .gitignore
│
├── workflow/
│   └── 🔄 lead-agent.json   ← n8n mein import karo yeh
│
├── form/
│   └── 🌐 index.html        ← Contact form (GitHub Pages pe host karo)
│
└── scripts/
    └── ⚙️ import-workflow.js
```

---

## 🧪 Test Karo

Form submit karo ya curl use karo:

```bash
curl -X POST https://YOUR_RAILWAY_URL/webhook/new-lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Khan",
    "email": "ahmed@example.com",
    "company": "TechStart",
    "phone": "+92-300-1234567",
    "message": "Need automation for our business with 500 leads per month"
  }'
```

**Expected:**
```json
{
  "success": true,
  "lead_id": "LEAD-1234567890",
  "score": 8,
  "message": "Lead received! Check your email."
}
```

---

## ❓ Common Issues

**Railway deploy fail ho raha hai?**
→ Logs dekho: Railway Dashboard > Deployments > View Logs

**n8n nahi khul raha?**
→ Railway > Settings > Networking > Generate Domain pe click karo

**Gmail email nahi ja raha?**
→ n8n mein Gmail OAuth2 credential dobara authenticate karo

**Webhook kaam nahi kar raha?**
→ n8n mein workflow **Active** hai check karo (top right toggle)

---

## 📄 License

MIT — Free to use!

---

*Built with ❤️ | n8n + OpenAI + Railway | 2026*
