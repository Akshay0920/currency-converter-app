const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db, admin } = require('./firebase');
const axios = require('axios');
const path = require('path');
const bcrypt = require('bcrypt'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const EXCHANGE_RATE_API_KEY = '7525a7f1a8b98df7a8423e14';


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRef = db.collection('users').doc(email);
    const user = await userRef.get();

    if (!user.exists) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.data().password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', username: user.data().username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/signup', async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const userRef = db.collection('users').doc(email);
    const user = await userRef.get();

    if (user.exists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    await userRef.set({ email, password: hashedPassword, username });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/exchange-rates', async (req, res) => {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/USD`);
    res.status(200).json(response.data.conversion_rates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/save-conversion', async (req, res) => {
  const { username, fromCurrency, toCurrency, amount, result } = req.body;
  try {
    const conversionsRef = db.collection('conversions').doc(username);
    await conversionsRef.set({
      conversions: admin.firestore.FieldValue.arrayUnion({
        fromCurrency,
        toCurrency,
        amount,
        result,
        timestamp: new Date(),
      }),
    }, { merge: true });

    res.status(200).json({ message: 'Conversion saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/recent-conversions', async (req, res) => {
  const { username } = req.query;
  try {
    const conversionsRef = db.collection('conversions').doc(username);
    const conversions = await conversionsRef.get();

    if (!conversions.exists) {
      return res.status(200).json({ conversions: [] });
    }

    const data = conversions.data();
    res.status(200).json({ conversions: data.conversions || [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
