# 🧠 Mental Chat - AI Therapist Chatbot

**Mental Chat** is an AI-powered chatbot designed to simulate a compassionate, thoughtful **mental health therapist**. Users can interact with the bot to receive calming, therapeutic-style responses using OpenAI's GPT model.

Deployed at: [https://mentalchatbot.netlify.app/](https://mentalchatbot.netlify.app/)  
_(replace with your actual URL)_

---

## ✨ Features

- 💬 Human-like conversational UI
- 🧘 Calm, therapist-style responses via GPT-3.5
- 🧠 Prompt tuning for mental health tone
- 🔐 Secure backend API proxy to protect keys
- 🌐 Deployed on Netlify with serverless functions
- ⚡ Render backend auto-handled via proxy to avoid CORS

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Create React App) |
| Backend API | OpenAI (via Render-hosted API server) |
| Hosting | Netlify (with Netlify Functions) |
| Proxy | Serverless function to bypass CORS |
| Styling | CSS / basic layout |

---

## 🚀 Deployment (via Netlify)

1. Connect your GitHub repo to Netlify
2. Ensure this structure exists:

```
netlify/
└── functions/
    └── googling.js
```

3. Install required dependencies:

```bash
npm install node-fetch@2
```

4. In Netlify settings → Environment variables:

```
API_BASE=https://mental-chat-server.onrender.com
```

5. Netlify will auto-build and deploy when you push to `main`.

---

## 🧪 Local Development

1. Clone the repo

```bash
git clone https://github.com/yourusername/mental-chat.git
cd mental-chat
npm install
```

2. Start local dev server with Netlify support:

```bash
netlify dev
```

Your app will be available at [http://localhost:8888](http://localhost:8888)

---

## 💡 Future Improvements

- Add chat memory/context history
- Support multi-language mental health prompts
- Improve UI/UX with animations and avatars
- Integrate basic emotion tracking / emoji feedback

---

## 📄 License

This project is for educational & mental health experimentation purposes. Not a substitute for professional therapy.

---

## 🙏 Acknowledgements

- [OpenAI](https://openai.com)
- [Netlify](https://netlify.com)
- [Render](https://render.com)