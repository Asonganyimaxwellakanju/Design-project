// Multi-angle analysis upload functionality

let uploadedImages = {
    angle1: null,
    angle2: null
};

// File input handlers
document.getElementById('file1').addEventListener('change', function(e) {
    handleFileUpload(e, 'angle1', 'preview1', 'upload1');
});

document.getElementById('file2').addEventListener('change', function(e) {
    handleFileUpload(e, 'angle2', 'preview2', 'upload2');
});

function handleFileUpload(event, angle, previewId, uploadBoxId) {
    const file = event.target.files[0];
    
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Store image data
            uploadedImages[angle] = e.target.result;
            
            // Show preview
            const preview = document.getElementById(previewId);
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            
            // Add uploaded class for styling
            document.getElementById(uploadBoxId).classList.add('uploaded');
            
            // Enable analyze button if both images are uploaded
            checkBothImagesUploaded();
        };
        
        reader.readAsDataURL(file);
    }
}

function checkBothImagesUploaded() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    
    if (uploadedImages.angle1 && uploadedImages.angle2) {
        analyzeBtn.disabled = false;
        analyzeBtn.style.opacity = '1';
        analyzeBtn.style.cursor = 'pointer';
    } else {
        analyzeBtn.disabled = true;
        analyzeBtn.style.opacity = '0.5';
        analyzeBtn.style.cursor = 'not-allowed';
    }
}

// Analyze button
document.getElementById('analyzeBtn').addEventListener('click', function() {
    if (uploadedImages.angle1 && uploadedImages.angle2) {
        // Store images for later use
        localStorage.setItem('analysisImage1', uploadedImages.angle1);
        localStorage.setItem('analysisImage2', uploadedImages.angle2);
        
        // Redirect to questionnaire
        window.location.href = 'questionnaire.html';
    }
});

// Reset form
function resetForm() {
    uploadedImages = {
        angle1: null,
        angle2: null
    };
    
    document.getElementById('preview1').innerHTML = '';
    document.getElementById('preview2').innerHTML = '';
    document.getElementById('file1').value = '';
    document.getElementById('file2').value = '';
    document.getElementById('upload1').classList.remove('uploaded');
    document.getElementById('upload2').classList.remove('uploaded');
    
    checkBothImagesUploaded();
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

// Add uploaded class styling
const style = document.createElement('style');
style.textContent = `
    .upload-box.uploaded {
        border: 2px solid var(--primary);
    }
`;
document.head.appendChild(style);
