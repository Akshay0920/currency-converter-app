document.getElementById('signupLink').addEventListener('click', (e) => {
  e.preventDefault();
  toggleForms();
});

document.getElementById('loginLink').addEventListener('click', (e) => {
  e.preventDefault();
  toggleForms();
});

function toggleForms() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const signupLink = document.getElementById('signupLink');
  const loginLink = document.getElementById('loginLink');

  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    signupLink.style.display = 'inline';
    loginLink.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    signupLink.style.display = 'none';
    loginLink.style.display = 'inline';
  }
}

document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const username = document.getElementById('signupUsername').value;

  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
    });
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      localStorage.setItem('username', username);
      toggleForms();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error(error);
  }
});

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('username', data.username);
      window.location.href = 'dashboard.html';
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error(error);
  }
});
