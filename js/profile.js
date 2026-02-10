// Profile page functionality

// Load user data
window.addEventListener('load', function() {
    const userName = localStorage.getItem('userName') || '';
    const userEmail = localStorage.getItem('userEmail') || '';
    const userPhone = localStorage.getItem('userPhone') || '';
    
    document.getElementById('fullName').value = userName;
    document.getElementById('email').value = userEmail;
    document.getElementById('phone').value = userPhone;
});

// Profile form submission
const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        
        // Save to localStorage
        localStorage.setItem('userName', fullName);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPhone', phone);
        
        // Show success message
        alert('Profile updated successfully!');
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
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

// Profile button
const profileBtn = document.getElementById('profileBtn');
if (profileBtn) {
    profileBtn.addEventListener('click', function() {
        window.location.href = 'profile.html';
    });
}
