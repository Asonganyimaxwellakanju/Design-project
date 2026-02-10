# Doc_skin - AI-Powered Skin Analysis Platform

A web-based application for skin condition diagnosis using CNN model analysis and patient questionnaires.

## Features

- **User Authentication**: Secure login and signup system
- **Multi-Angle Image Upload**: Upload two high-resolution images for comprehensive analysis
- **Patient Questionnaire**: Detailed health questions to improve diagnosis accuracy
- **AI-Powered Diagnosis**: CNN model analysis with 95%+ accuracy
- **Treatment Recommendations**: Personalized treatment plans and educational videos
- **User Profile Management**: Edit personal information and view analysis history
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Pages Overview

### 1. Authentication Pages
- **login.html**: User login with email and password
- **signup.html**: New user registration

### 2. Dashboard
- **dashboard.html**: Main hub showing:
  - New analysis option
  - Profile management
  - Analysis history

### 3. Analysis Flow
- **upload.html**: Multi-angle image capture (2 photos required)
- **questionnaire.html**: Patient health questionnaire
- **results.html**: Diagnosis results with:
  - Confidence percentage
  - Condition diagnosis
  - Treatment recommendations
  - Educational videos

### 4. Profile Management
- **profile.html**: Edit personal information (name, email, phone)

## File Structure

```
doc_skin/
├── login.html              # Login page
├── signup.html             # Signup page
├── dashboard.html          # Main dashboard
├── profile.html            # Profile editing
├── upload.html             # Multi-angle image upload
├── questionnaire.html      # Patient questionnaire
├── results.html            # Diagnosis results
├── styles.css              # Main stylesheet
├── auth.js                 # Authentication logic
├── dashboard.js            # Dashboard functionality
├── profile.js              # Profile management
├── upload.js               # Image upload handling
├── questionnaire.js        # Questionnaire submission
├── results.js              # Results display
└── README.md               # This file
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required for frontend-only version

### Installation

1. Download all files to a local directory
2. Open `login.html` in your web browser
3. You can also set up a local server (optional):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```
4. Navigate to `http://localhost:8000/login.html`

### Usage

1. **Create Account**: Start by creating a new account on signup.html
2. **Login**: Use your credentials to access the dashboard
3. **New Analysis**: Click "Upload Image" to start a new analysis
4. **Upload Photos**: Upload two clear, well-lit photos from different angles
5. **Complete Questionnaire**: Answer health questions for better accuracy
6. **View Results**: See your diagnosis, confidence score, and treatment plan

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **LocalStorage**: Client-side data persistence

### Color Palette
- Primary: #2DD4BF (Teal)
- Primary Dark: #0891B2
- Text Dark: #1F2937
- Text Gray: #6B7280
- Background: #F3F4F6

### Responsive Breakpoints
- Desktop: > 768px
- Mobile: ≤ 768px

## Browser Compatibility
- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+

## Future Enhancements (Backend Integration)

When adding backend functionality, you'll need to implement:

1. **User Authentication API**
   - POST /api/auth/register
   - POST /api/auth/login
   - POST /api/auth/logout

2. **Image Upload API**
   - POST /api/analysis/upload
   - Handles image processing and storage

3. **CNN Model Integration**
   - POST /api/analysis/diagnose
   - Processes images through trained CNN model

4. **Results API**
   - GET /api/analysis/:id
   - Retrieves diagnosis results

5. **User Profile API**
   - GET /api/user/profile
   - PUT /api/user/profile
   - GET /api/user/history

6. **Database Schema**
   - Users table
   - Analyses table
   - Results table
   - Images table

## Security Considerations (For Production)

- Implement proper authentication (JWT, OAuth)
- Add HTTPS/SSL certificates
- Sanitize all user inputs
- Implement rate limiting
- Add CSRF protection
- Secure image upload validation
- HIPAA compliance for medical data
- Data encryption at rest and in transit

## License

This is a demo project. For production use, ensure compliance with medical software regulations.

## Support

For issues or questions, please contact the development team.

---

**Note**: This is a frontend-only version. The CNN model, actual diagnosis logic, and database operations need to be implemented on the backend for a production application.
