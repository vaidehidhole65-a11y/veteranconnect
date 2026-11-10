
# VeteranConnect – Ex-Servicemen Skill Certification & Civilian Job Transition Portal

## About the Project

VeteranConnect is a web-based platform designed to support ex-servicemen in transitioning from military service to civilian careers.

The platform provides a place for veterans to explore career opportunities and training information, while employers can access a dedicated employer account.

## Project Objectives

- Support ex-servicemen in their civilian career transition.
- Provide access to career and training information.
- Offer separate registration and login for veterans and employers.
- Provide role-based dashboard access.
- Deliver a responsive and user-friendly interface.

## Technology Stack

### Frontend
- React.js
- Vite
- CSS
- React Router
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- CORS
- dotenv

## Main Features

- Home page
- About section
- Career Opportunities section
- Training section
- User registration and login
- Veteran and employer roles
- Password hashing
- JWT-based authentication
- Protected dashboard routes

## Project Structure

```text
veteranconnect/
├── public/
├── src/
│   ├── assets/
│   ├── pages/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── Careers.jsx
│   ├── Dashboard.jsx
│   ├── index.css
│   └── main.jsx
├── ex-servicemen-portal/
│   └── backend/
│       ├── server.js
│       ├── package.json
│       └── package-lock.json
├── index.html
├── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/vaidehidhole65-a11y/veteranconnect.git
cd veteranconnect
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

### 4. Backend setup

```bash
cd ex-servicemen-portal/backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=your_frontend_url
```

Never upload real secret values to GitHub.

Start the backend:

```bash
npm start
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check API status |
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get authenticated user |
| GET | `/api/dashboard` | Protected dashboard |
| GET | `/api/veteran/dashboard` | Veteran dashboard |
| GET | `/api/employer/dashboard` | Employer dashboard |

## Live Deployment

- **Frontend:** https://veteranconnect-ex-servicemen-portal.vercel.app
- **Backend:** https://veteranconnect.onrender.com
- **GitHub Repository:** https://github.com/vaidehidhole65-a11y/veteranconnect

## Future Enhancements

- Verified civilian job listings
- Skill assessment and certification modules
- Employer-veteran communication
- Resume-building assistance
- Additional training resources

## Conclusion

VeteranConnect aims to make the transition from military service to civilian employment easier by bringing career information, training resources, and user authentication together in one platform.

Developed as an internship project.
