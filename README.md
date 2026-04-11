# 💬 MERN Chat App with Socket.io

A real-time chat application built using the **MERN stack (MongoDB, Express, React, Node.js)** and **Socket.io** for instant messaging. This app enables users to communicate seamlessly with features like live messaging, online status, and more.

---

## 🚀 Features

* 🔐 User Authentication (JWT-based)
* 💬 Real-time Messaging with Socket.io
* 🟢 Online / Offline User Status
* 🧑‍🤝‍🧑 One-to-One Chat Support
* 📦 RESTful API with Express
* ⚡ Responsive UI with React
* 🗂️ Chat History stored in MongoDB
* 🔔 Typing Indicators (optional enhancement)
* 📎 Media/File Sharing (optional enhancement)
* 🌙 Dark Mode (optional enhancement)

---

## 🛠️ Tech Stack

### Frontend:

* React.js
* Axios
* CSS / Tailwind / Bootstrap (your choice)

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB (Mongoose)

### Real-Time:

* Socket.io

---

## 📁 Project Structure

```
chat-app/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── socket/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2. Install dependencies

#### Backend:

```bash
cd backend
npm install
```

#### Frontend:

```bash
cd frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

---

## ▶️ Running the App

### Start Backend:

```bash
cd backend
npm run dev
```

### Start Frontend:

```bash
cd frontend
npm start
```

---

## 🔌 Socket.io Integration (Overview)

* Server initializes Socket.io with HTTP server
* On client connection:

  * Join user-specific room
  * Listen for `sendMessage`
  * Emit `receiveMessage` to recipient
* Handle disconnect events

---

## 📸 Screenshots (Add Your Own)

* Login Page
* Chat Interface
* User List

---

## 🧪 Future Improvements

* ✅ Group Chats
* ✅ Message Reactions (emoji support)
* ✅ Read Receipts
* ✅ Push Notifications
* ✅ End-to-End Encryption
* ✅ Voice/Video Calling (WebRTC)

---

## 🐛 Common Issues

* **CORS Errors** → Ensure frontend URL is whitelisted in backend
* **Socket not connecting** → Check correct port and URL
* **MongoDB connection failed** → Verify connection string

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

* Socket.io Docs
* MongoDB Docs
* React Community

---

## ⭐ Support

If you like this project, please ⭐ the repo and share it!

---
