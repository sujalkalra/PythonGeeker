# 🐍 PythonGeeker

> **Smart way to learn Python in 2026**  
> Learn Python by *running real code*, not by watching endless videos.

---

## 🚀 What is PythonGeeker?

**PythonGeeker** is an interactive Python learning platform designed for beginners and intermediate learners who want to learn Python the **smart way** — by reading, modifying, and running real code directly in the browser.

No fluff.  
No unnecessary theory.  
Just **clean explanations + runnable Python code**.

---

## 🎯 Key Features (v1)

- 📚 **Structured Roadmap**
  - 10 well-organized Python modules
  - Each module contains multiple sub-topics
- 🧠 **Learn by Doing**
  - Every topic comes with pre-written Python code
  - Users can run code instantly and see output
- 💻 **In-Browser Code Editor**
  - VS Code-like editor experience
  - Dark mode by default
- 🖥️ **Live Console Output**
  - See `stdout` and errors instantly
  - Perfect for understanding how code works
- 🔐 **Secure Code Execution**
  - Python code runs inside isolated Docker containers
  - Time and memory limited for safety

---

## 🧩 Platform Architecture

```
Frontend (Next.js + Tailwind)
          |
          | REST API
          |
Backend (FastAPI)
          |
          | MongoDB (content & metadata)
          |
          | Docker Sandbox (Python code execution)
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js** (App Router)
- **Tailwind CSS**
- **Monaco Editor** (VS Code editor)
- **xterm.js** (terminal output)
- **ShadCN/UI**

### Backend
- **FastAPI**
- **Python 3.12**
- **Docker**
- **MongoDB**

---

## 📦 Project Structure

```
pythongeeker/
│
├── frontend/                # Next.js frontend
│   ├── app/
│   ├── components/
│   └── styles/
│
├── backend/                 # FastAPI backend
│   ├── main.py
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── executor/            # Docker-based code runner
│
├── docker/
│   └── python-runner/       # Secure Python execution image
│
└── docker-compose.yml
```

---

## 🧪 How Code Execution Works

1. User clicks **Run Code**
2. Frontend sends Python code to backend
3. Backend spins up a temporary Docker container
4. Code executes inside a sandboxed environment
5. Output / errors are captured
6. Container is destroyed after execution

✔️ No internet access  
✔️ Execution time & memory limits  
✔️ Fully isolated environment  

---

## 🧠 Learning Modules (Planned)

1. Python Basics  
2. Control Flow  
3. Loops & Iterations  
4. Data Structures  
5. Functions  
6. Modules & Packages  
7. Error Handling  
8. Object Oriented Programming  
9. Advanced Python  
10. Best Practices  

---

## 🗺️ Roadmap

### v1 (Current)
- Core learning platform
- Interactive code execution
- Static content (no login)

### v2 (Future)
- User authentication
- Progress tracking
- Challenges & quizzes
- AI explanations
- Certificates

---

## 🤝 Contributing

Contributions are welcome!

- Fork the repo
- Create a new branch
- Make your changes
- Open a Pull Request

---

## 📄 License

MIT License © 2026  
Built with ❤️ for Python learners

---

## ⭐ Support

If you find **PythonGeeker** useful:
- ⭐ Star the repository
- 🐛 Report issues
- 💡 Suggest features

---

> *Python is best learned by writing and running code — PythonGeeker is built around that philosophy.*
