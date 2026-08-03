# 💳 CreditPul

CreditPul is a modern credit assessment web application that allows users to securely register, log in, and evaluate their credit information through an intuitive and responsive interface. The project is built with **React**, **Flask**, and **MySQL**, providing a complete full-stack solution for user authentication and credit management.

---

## 🚀 Features

* 🔐 Secure User Authentication (Signup & Login)
* 👤 JWT-based Authorization
* 🗄️ MySQL Database Integration
* 🌐 REST API with Flask
* ⚡ Responsive React Frontend
* 🌍 Multi-language Support
* 🔒 Password Hashing for Security
* 📱 Mobile-Friendly Interface

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript (ES6+)
* HTML5
* CSS3

### Backend

* Flask
* Python
* JWT Authentication
* Flask-CORS

### Database

* MySQL

### Deployment

* Railway

---

## 📂 Project Structure

```text
CreditPul/
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── app.py
│   ├── auth.py
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SyedHadiRaza110/CreditPul.git
cd CreditPul
```

---

### 2. Backend Setup

Create a virtual environment:

```bash
python -m venv venv
```

Activate it:

**Windows**

```bash
venv\Scripts\activate
```

**Linux / macOS**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the backend folder.

```env
MYSQLHOST=your_host
MYSQLPORT=3306
MYSQLUSER=your_username
MYSQLPASSWORD=your_password
MYSQLDATABASE=your_database
JWT_SECRET=your_secret_key
```

---

### 4. Start Backend

```bash
python app.py
```

---

### 5. Start Frontend

```bash
npm install
npm start
```

---

## 🔑 Authentication

The application uses:

* Password Hashing
* JWT Tokens
* Protected API Routes
* Secure Login & Registration

---

---

## 🌐 Live Demo

```text
https://credit-pul.vercel.app
```

---

## 📌 Future Improvements

* Credit Score Dashboard
* Admin Panel
* Email Verification
* Forgot Password
* User Profile
* Analytics Dashboard
* Credit History
* Dark Mode

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Syed Hadi**

GitHub: https://github.com/SyedHadiRaza110

---

⭐ If you found this project useful, don't forget to give it a **Star** on GitHub!
