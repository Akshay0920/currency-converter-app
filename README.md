# 💱 Currency Converter App

A modern, responsive, and secure web application that allows users to convert between currencies in real-time, with authentication and conversion history tracking using Firebase.

---

## 🚀 Features

- 🔒 **Authentication** (Email/Password) via Firebase Auth
- 📈 **Real-Time Currency Conversion** using live API (add your API key)
- 📊 **Conversion History** stored in Firebase Firestore
- ✨ **Modern UI** with Bootstrap & Glassmorphism design
- 📱 **Responsive** design for mobile and desktop
- ⚙ **MVC Architecture** for clean and maintainable code

---

## 📁 Project Structure

```plaintext
currency-converter-app-main/
├── assets/
│   ├── Screenshot1.png
│   ├── Screenshot2.png
├── backend/
│   ├── firebase.js         # Firebase configuration
│   ├── key.json            # Firebase service account key
│   ├── server.js           # Main Express.js server
│   ├── package.json        # Backend dependencies
├── README.md
```

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** Bootstrap 5, HTML/CSS, JavaScript
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **API:** Currency exchange rates (replace with your preferred provider)

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/currency-converter-app.git
cd currency-converter-app/backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Firebase**

- Replace `key.json` with your Firebase Admin SDK credentials.
- Update Firestore security rules if needed.
- Enable **Authentication → Email/Password** in the Firebase Console.

4. **Add Currency API**

- Replace the placeholder API key in your code with a valid one (e.g., from ExchangeRate-API, CurrencyAPI, etc.).

5. **Run the App**

```bash
node server.js
```

---

## 🌐 Usage

1. **Sign up** using your email and password.
2. **Log in** and access the currency converter.
3. **Choose currencies** and enter an amount to convert.
4. **View your past conversions** in the dashboard.

---

## 📸 Screenshots

### Home Page
![Home Page](assets/Screenshot1.png)

### Conversion Result Page
![Conversion Result](assets/Screenshot2.png)

---

## 🔐 Security & Best Practices

- Authentication middleware to protect private routes.
- Input validation and error handling.
- API key is kept server-side and not exposed to users.
- Secure and scalable Firebase integration.

---

## 📤 Deployment

- **Frontend (if static):** Use Firebase Hosting or Vercel.
- Use environment variables (`.env`) to manage sensitive credentials securely.

---

## 👨‍💻 Author

**Akshay** – Full-stack Developer & Project Owner

Feel free to fork this project, suggest improvements, or open an issue!

---

## 🌟 Support

If you like this project, please give it a ⭐ star to support!

---

