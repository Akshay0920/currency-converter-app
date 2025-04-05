async function fetchConversionRate(fromCurrency, toCurrency) {
    const apiKey = '7525a7f1a8b98df7a8423e14';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.result === 'success') {
            return data.conversion_rate;
        } else {
            console.error('Error fetching conversion rate:', data.error);
            return null;
        }
    } catch (error) {
        console.error('Error fetching conversion rate:', error);
        return null;
    }
}

async function saveConversionToFirebase(username, fromCurrency, toCurrency, amount, result) {
    try {
        const response = await fetch('/api/save-conversion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, fromCurrency, toCurrency, amount, result }),
        });
        const data = await response.json();
        if (!response.ok) {
            console.error('Error saving conversion to Firebase:', data.error);
        }
    } catch (error) {
        console.error('Error saving conversion to Firebase:', error);
    }
}

async function fetchConversionHistoryFromFirebase(username) {
    try {
        const response = await fetch(`/api/recent-conversions?username=${username}`);
        const data = await response.json();
        if (response.ok) {
            return data.conversions || [];
        } else {
            console.error('Error fetching conversion history:', data.error);
            return [];
        }
    } catch (error) {
        console.error('Error fetching conversion history:', error);
        return [];
    }
}

async function displayConversionHistory(username) {
    const history = await fetchConversionHistoryFromFirebase(username);
    const conversionList = document.getElementById('conversion-list');
    conversionList.innerHTML = '';

    if (history.length === 0) {
        const noConversionsMessage = document.createElement('div');
        noConversionsMessage.className = 'conversion-item';
        noConversionsMessage.textContent = 'No recent conversions found.';
        conversionList.appendChild(noConversionsMessage);
        return;
    }

    history.forEach((conversion) => {
        const conversionItem = document.createElement('div');
        conversionItem.className = 'conversion-item';
        conversionItem.textContent = `${conversion.amount} ${conversion.fromCurrency} → ${conversion.result} ${conversion.toCurrency}`;
        conversionList.prepend(conversionItem);
    });
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;
    const username = localStorage.getItem('username');

    if (!amount || isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }

    const rate = await fetchConversionRate(fromCurrency, toCurrency);

    if (rate === null) {
        alert('Error fetching conversion rate. Please try again.');
        return;
    }

    const convertedAmount = (amount * rate).toFixed(2);
    const conversionText = `${amount} ${fromCurrency} → ${convertedAmount} ${toCurrency}`;
    await saveConversionToFirebase(username, fromCurrency, toCurrency, amount, convertedAmount);
    displayConversionHistory(username);
    document.getElementById('amount').value = '';
}

function logout() {
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

window.addEventListener('load', async () => {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = 'index.html';
    } else {
        document.getElementById('username-display').textContent = username;
        await displayConversionHistory(username);
    }
});

document.getElementById('convert-button').addEventListener('click', (e) => {
    e.preventDefault();
    convertCurrency();
});

document.getElementById('logout-button').addEventListener('click', logout);
