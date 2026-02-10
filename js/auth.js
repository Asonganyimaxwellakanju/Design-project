// Authentication handling for login and signup pages

// Login form handling
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Store user data (in real app, this would be backend validation)
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Extract name from email for personalization
        const name = email.split('@')[0];
        localStorage.setItem('userName', name.charAt(0).toUpperCase() + name.slice(1));
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    });
}

// Signup form handling
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Store user data
        localStorage.setItem('userName', fullName);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
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
