// Dashboard functionality

// Load user name
window.addEventListener('load', function() {
    const userName = localStorage.getItem('userName') || 'Guest';
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
});

// Profile button
const profileBtn = document.getElementById('profileBtn');
if (profileBtn) {
    profileBtn.addEventListener('click', function() {
        window.location.href = 'profile.html';
    });
}

// Logout functionality
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        }
    });
}

// Upload button
const uploadBtn = document.getElementById('uploadBtn');
if (uploadBtn) {
    uploadBtn.addEventListener('click', function() {
        window.location.href = 'upload.html';
    });
}

// Check authentication
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    }
}

checkAuth();
