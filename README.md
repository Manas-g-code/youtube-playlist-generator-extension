# 🎵 YouTube Playlist Generator Chrome Extension

> **Automatically generate YouTube playlists from your watch history using custom filters.**
>
> Never lose track of valuable videos again.

---

## 🚀 Overview

Have you ever watched an amazing YouTube tutorial or lecture but couldn't find it later?

I built this Chrome Extension to solve exactly that problem.

The extension analyzes your YouTube watch history, lets you apply custom filters, and automatically creates a brand-new playlist in your YouTube account.

Instead of manually searching through hundreds of watched videos, users can organize them into playlists within seconds.

---

## ✨ Features

* 📜 Reads YouTube Watch History
* 🔍 Custom filtering options
* 🎯 Create playlists based on selected criteria
* 🔐 Secure Google OAuth 2.0 authentication
* 🎵 Automatically creates playlists on YouTube
* ⚡ Fast and lightweight Chrome Extension
* 🌐 Full-stack architecture with backend API
* 🔄 Clean and intuitive user experience

---

## 🛠 Tech Stack

### Frontend

* JavaScript
* HTML5
* CSS3
* Chrome Extension Manifest V3

### Backend

* Node.js
* Express.js

### APIs

* YouTube Data API v3
* Google OAuth 2.0

### Tools

* Git
* GitHub

---

## 🏗 Architecture

```text
Chrome Extension
        │
        │
        ▼
Node.js + Express Server
        │
OAuth 2.0 Authentication
        │
        ▼
YouTube Data API
        │
        ▼
Creates Playlist in User's Account
```

---

## ⚙️ How it Works

1. User signs in with Google.
2. OAuth securely authorizes the application.
3. Extension retrieves the user's YouTube watch history.
4. User selects custom filtering options.
5. Backend processes the request.
6. Playlist is automatically created on YouTube.

---

## 💡 Why I Built This

I often discovered excellent tutorials and educational videos on YouTube but struggled to find them later.

Bookmarks became messy.

Search history became overwhelming.

So I built a tool that could automatically organize watched videos into meaningful playlists, saving time and making content easier to revisit.

This project helped me gain practical experience with:

* OAuth authentication
* Chrome Extension development
* REST APIs
* Backend development
* Full-stack architecture
* API integration
* Debugging real-world software

---

## 📂 Project Structure

```
youtube-playlist-generator/
│
├── extension/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── background.js
│   └── assets/
│
├── server/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── package.json
│
└── README.md
```

---

## 🚧 Challenges Faced

Building this project involved solving several real-world engineering challenges:

* Implementing Google OAuth inside a Chrome Extension
* Managing secure authentication tokens
* Integrating multiple Google APIs
* Handling asynchronous API requests
* Designing smooth communication between the extension and backend
* Working around browser security restrictions

---

## 📈 What I Learned

This project significantly strengthened my understanding of:

* Full Stack Development
* Chrome Extension Development
* Authentication & Authorization
* API Design
* Express.js
* OAuth 2.0
* JavaScript Asynchronous Programming
* Software Debugging

---

## 🎯 Future Improvements

* AI-powered playlist categorization
* Keyword-based playlist generation
* Smart duplicate detection
* Playlist scheduling
* Video recommendations
* Export playlists
* Support for multiple Google accounts

---

<img width="532" height="732" alt="Screenshot 2026-06-27 014922" src="https://github.com/user-attachments/assets/c1bb3321-934f-43fb-a250-e1aa0243f7f2" />


## ⭐ If you found this project interesting...

Give this repository a ⭐ and feel free to contribute!
