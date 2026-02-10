// Diagnosis results functionality

// Load results on page load
window.addEventListener('load', function() {
    // In a real application, this would fetch results from backend
    // For now, we'll display static results
    
    // Animate confidence badge
    animateConfidence();
});

function animateConfidence() {
    const badge = document.querySelector('.confidence-badge');
    let count = 0;
    const target = 95;
    const duration = 1500;
    const increment = target / (duration / 16);
    
    const counter = setInterval(function() {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(counter);
        }
        badge.textContent = Math.floor(count) + '%';
    }, 16);
}

// Video card click handlers
const videoCards = document.querySelectorAll('.video-card');
videoCards.forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h4').textContent;
        alert(`Video: ${title}\n\nThis would open the video player in a real application.`);
    });
});

// Logout functionality
const logoutBtns = document.querySelectorAll('.nav-link');
logoutBtns.forEach(btn => {
    if (btn.textContent.includes('Log out')) {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to log out?')) {
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'login.html';
            }
        });
    }
    
    if (btn.textContent.includes('Profile')) {
        btn.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
    }
});

// Reset button functionality
const resetButtons = document.querySelectorAll('button');
resetButtons.forEach(button => {
    if (button.textContent === 'Reset') {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to start a new analysis? This will clear current results.')) {
                // Clear stored data
                localStorage.removeItem('analysisImage1');
                localStorage.removeItem('analysisImage2');
                localStorage.removeItem('questionnaireData');
                
                // Redirect to upload page
                window.location.href = 'upload.html';
            }
        });
    }
});

// Share with Doctor functionality
const shareButton = Array.from(document.querySelectorAll('button')).find(
    btn => btn.textContent === 'Share with Doctor'
);

if (shareButton) {
    shareButton.addEventListener('click', function() {
        // In real app, this would generate a PDF or send email
        alert('Diagnosis report prepared!\n\nIn a full application, this would:\n- Generate a PDF report\n- Send to your doctor\'s email\n- Create a shareable link');
    });
}

// Print/Save functionality for diagnosis
function saveDiagnosis() {
    window.print();
}
