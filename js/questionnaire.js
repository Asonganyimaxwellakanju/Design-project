// Patient questionnaire functionality

// Handle form submission
const questionnaireForm = document.getElementById('questionnaireForm');
if (questionnaireForm) {
    questionnaireForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect questionnaire data
        const questionnaireData = {
            symptomsDuration: document.getElementById('symptoms').value,
            flareUp: document.querySelector('input[name="flareup"]:checked').value,
            affectedAreas: document.getElementById('areas').value,
            triggers: document.getElementById('triggers').value,
            familyHistory: document.querySelector('input[name="family"]:checked').value,
            previousTreatments: document.getElementById('treatments').value,
            timestamp: new Date().toISOString()
        };

        // Store questionnaire data
        localStorage.setItem('questionnaireData', JSON.stringify(questionnaireData));

        // Show loading state
        const submitBtn = questionnaireForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="animation: spin 1s linear infinite;">
                <circle cx="12" cy="12" r="10" stroke-width="3" stroke-dasharray="31.4 31.4"/>
            </svg>
            Analyzing...
        `;
        submitBtn.disabled = true;

        // Add spin animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        // Send to API for prediction
        const image1 = localStorage.getItem('analysisImage1');

        async function getPrediction() {
            try {
                // Convert data URL to Blob
                const fetchRes = await fetch(image1);
                const blob = await fetchRes.blob();

                const formData = new FormData();
                formData.append('image', blob, 'image.jpg');

                const response = await fetch('http://localhost:3000/api/predict', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('diagnosisResult', JSON.stringify(data));
                    window.location.href = 'results.html';
                } else {
                    alert('Analysis failed');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during analysis');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }

        getPrediction();
    });
}

// Logout functionality
const logoutBtns = document.querySelectorAll('.nav-link');
logoutBtns.forEach(btn => {
    if (btn.textContent.includes('Log out')) {
        btn.addEventListener('click', function () {
            if (confirm('Are you sure you want to log out?')) {
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'login.html';
            }
        });
    }

    if (btn.textContent.includes('Profile')) {
        btn.addEventListener('click', function () {
            window.location.href = 'profile.html';
        });
    }
});
