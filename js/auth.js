// Authentication handling for login and signup pages

// Login form handling
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('userEmail', data.user.email);
                localStorage.setItem('userName', data.user.fullName);
                localStorage.setItem('userId', data.user.id);
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login');
        }
    });
}

// Signup form handling
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('userName', fullName);
                localStorage.setItem('userEmail', email);
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                alert(data.error || 'Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during signup');
        }
    });
}

// Check if user is already logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();

    if (isLoggedIn === 'true' && (currentPage === 'login.html' || currentPage === 'signup.html' || currentPage === '')) {
        window.location.href = 'dashboard.html';
    }

    if (isLoggedIn !== 'true' && currentPage !== 'login.html' && currentPage !== 'signup.html') {
        window.location.href = 'login.html';
    }
}

// Run auth check on page load
window.addEventListener('load', checkAuth);
