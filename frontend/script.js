document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const error = document.getElementById('error');
  
    // Login form submission
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
  
        const result = await response.json();
        if (response.ok) {
          window.location.href = 'dashboard.html';
        } else {
          error.textContent = result.error || 'Invalid login credentials';
        }
      });
    }
  
    // Logout button
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }
  });
  