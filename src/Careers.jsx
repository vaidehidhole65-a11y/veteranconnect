
import { useState } from 'react'

import {
  ShieldCheck,
  BriefcaseBusiness,
  GraduationCap,
  ArrowRight,
  Users,
  MapPin,
  Clock,
  Search,
  Award
} from 'lucide-react'

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

// SAMPLE JOB DATA
const jobs = [
  {
    title: 'Security Manager',
    company: 'National Security Services',
    location: 'Nagpur, Maharashtra',
    type: 'Full Time',
    category: 'Security',
    description: 'Lead security operations and manage safety teams.'
  },
  {
    title: 'Operations Manager',
    company: 'Logistics India',
    location: 'Pune, Maharashtra',
    type: 'Full Time',
    category: 'Management',
    description: 'Manage daily operations and team coordination.'
  },
  {
    title: 'Training Instructor',
    company: 'Defence Skills Academy',
    location: 'Mumbai, Maharashtra',
    type: 'Full Time',
    category: 'Training',
    description: 'Train and mentor candidates using your experience.'
  },
  {
    title: 'Administration Officer',
    company: 'Corporate Solutions',
    location: 'Nagpur, Maharashtra',
    type: 'Full Time',
    category: 'Management',
    description: 'Handle administration and organizational activities.'
  },
  {
    title: 'Safety Supervisor',
    company: 'Industrial Safety Group',
    location: 'Nashik, Maharashtra',
    type: 'Full Time',
    category: 'Security',
    description: 'Ensure workplace safety and supervise procedures.'
  },
  {
    title: 'Fitness Trainer',
    company: 'Elite Fitness Academy',
    location: 'Pune, Maharashtra',
    type: 'Part Time',
    category: 'Training',
    description: 'Guide individuals through physical fitness programs.'
  }
]

// HOME PAGE
function Home() {
  return (
    <div className="app">

      <nav className="navbar">
        <Link to="/" className="logo">
          <ShieldCheck size={32} />
          <span>VeteranConnect</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="/#about">About</a>
          <Link to="/careers">Career Opportunities</Link>
          <a href="/#training">Training</a>
        </div>

        <div className="nav-buttons">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      </nav>

      <section className="hero-section">

        <div className="hero-content">

          <p className="tagline">
            YOUR SERVICE. YOUR NEXT CHAPTER.
          </p>

          <h1>
            From Military Service
            <br />
            To <span>Civilian Success.</span>
          </h1>

          <p className="hero-description">
            Your military experience has prepared you for more.
            Discover civilian career opportunities, develop new skills
            and connect with employers who value your service.
          </p>

          <div className="hero-buttons">

            <Link to="/careers">
              <button className="primary-btn">
                Explore Careers <ArrowRight size={18} />
              </button>
            </Link>

            <Link to="/register">
              <button className="secondary-btn">
                Create Your Profile
              </button>
            </Link>

          </div>
        </div>

        <div className="hero-visual">
          <ShieldCheck size={150} strokeWidth={1} />
          <p>Honouring Service, Empowering Futures</p>
        </div>

      </section>

      <section className="features" id="about">

        <h2>Build Your Future Beyond Service</h2>

        <p className="section-description">
          Everything you need to transition into civilian employment.
        </p>

        <div className="feature-cards">

          <div className="feature-card">
            <BriefcaseBusiness size={35} />
            <h3>Find Civilian Jobs</h3>
            <p>
              Explore job opportunities from employers
              looking for experienced veterans.
            </p>
          </div>

          <div className="feature-card" id="training">
            <GraduationCap size={35} />
            <h3>Learn New Skills</h3>
            <p>
              Discover training programs and certifications
              to support your career transition.
            </p>
          </div>

          <div className="feature-card">
            <Users size={35} />
            <h3>Connect With Employers</h3>
            <p>
              Create your professional profile and connect
              with veteran-friendly employers.
            </p>
          </div>

        </div>
      </section>

      <footer className="footer">
        <ShieldCheck size={25} />
        <p>VeteranConnect © 2026. Honouring Service, Empowering Futures.</p>
      </footer>

    </div>
  )
}

// CAREER OPPORTUNITIES PAGE
function Careers() {

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const navigate = useNavigate()

  const filteredJobs = jobs.filter(job => {

    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || job.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <div className="app">

      <nav className="navbar">

        <Link to="/" className="logo">
          <ShieldCheck size={32} />
          <span>VeteranConnect</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/careers">Career Opportunities</Link>
        </div>

        <div className="nav-buttons">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>
        </div>

      </nav>

      <section className="careers-header">

        <p className="tagline">YOUR NEXT MISSION STARTS HERE</p>

        <h1>Explore Career Opportunities</h1>

        <p>
          Discover rewarding civilian careers that value your
          military experience, skills and leadership.
        </p>

      </section>

      <main className="careers-container">

        <div className="job-search">
          <Search size={22} />

          <input
            type="text"
            placeholder="Search jobs, companies or locations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="job-filters">

          {['All', 'Security', 'Management', 'Training'].map(item => (

            <button
              key={item}
              className={category === item ? 'active-filter' : ''}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>

          ))}

        </div>

        <div className="jobs-heading">

          <div>
            <h2>Available Opportunities</h2>
            <p>Find a role that matches your experience.</p>
          </div>

          <span>{filteredJobs.length} Jobs Found</span>

        </div>

        <div className="jobs-grid">

          {filteredJobs.length > 0 ? (

            filteredJobs.map((job, index) => (

              <div className="job-card" key={index}>

                <div className="job-icon">
                  <BriefcaseBusiness size={27} />
                </div>

                <span className="job-category">
                  {job.category}
                </span>

                <h3>{job.title}</h3>

                <h4>{job.company}</h4>

                <p className="job-description">
                  {job.description}
                </p>

                <div className="job-info">

                  <span>
                    <MapPin size={16} />
                    {job.location}
                  </span>

                  <span>
                    <Clock size={16} />
                    {job.type}
                  </span>

                </div>

                <button
                  className="apply-btn"
                  onClick={() => navigate('/login')}
                >
                  Apply Now <ArrowRight size={17} />
                </button>

              </div>

            ))

          ) : (

            <div className="no-jobs">
              <Search size={35} />
              <h3>No jobs found</h3>
              <p>Try changing your search or category.</p>
            </div>

          )}

        </div>

      </main>

      <footer className="footer">
        <ShieldCheck size={25} />
        <p>VeteranConnect © 2026. Honouring Service, Empowering Futures.</p>
      </footer>

    </div>
  )
}

// MAIN APP
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/careers" element={<Careers />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Home />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App
