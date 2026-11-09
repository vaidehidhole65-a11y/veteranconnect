
import { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom'
import {
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Award,
  Users,
  ArrowRight,
  LogOut,
  Menu,
  X,
  Star,
  Target
} from 'lucide-react'
import './App.css'

const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api'

const styles = `
* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; color: #172b43; }
a { text-decoration: none; }
.navbar {
  min-height: 76px; padding: 14px 6%; display: flex;
  align-items: center; justify-content: space-between;
  background: #fff; box-shadow: 0 3px 18px #102b4712;
  position: sticky; top: 0; z-index: 20;
}
.brand { display:flex; align-items:center; gap:10px; color:#12385c; font-size:23px; font-weight:800; }
.brand-icon { background:#12385c; color:#f5c76b; padding:9px; border-radius:10px; display:flex; }
.nav-links { display:flex; align-items:center; gap:25px; }
.nav-links a { color:#253b53; font-weight:600; font-size:14px; }
.nav-links a:hover { color:#c28a28; }
.nav-button { background:#12385c; color:white!important; padding:12px 19px; border-radius:7px; }
.hero {
  min-height:570px; padding:85px 9%; display:flex; align-items:center;
  justify-content:space-between; gap:45px;
  background:linear-gradient(120deg,#071b35,#123f68,#176b83);
  color:white; overflow:hidden;
}
.hero-content { max-width:720px; }
.hero-tag { display:inline-block; color:#f5c76b; font-size:13px;
  font-weight:700; letter-spacing:3px; margin-bottom:25px; }
.hero-title { font-size:clamp(38px,5.2vw,68px); line-height:1.25;
  font-weight:800; letter-spacing:-1.5px; margin:0 0 25px; }
.hero-title span { display:block; color:#f5c76b; margin-top:12px; }
.hero-content p { max-width:590px; font-size:17px; line-height:1.9;
  color:#dce8f3; margin-bottom:32px; }
.hero-buttons { display:flex; flex-wrap:wrap; gap:16px; }
.primary-btn,.secondary-btn { display:inline-flex; align-items:center;
  justify-content:center; gap:10px; padding:15px 25px;
  border-radius:8px; font-weight:700; transition:.25s; }
.primary-btn { background:#f5c76b; color:#102b47; }
.primary-btn:hover { background:#ffdc98; transform:translateY(-3px); }
.secondary-btn { color:white; border:1px solid #ffffffaa; }
.secondary-btn:hover { background:white; color:#102b47; }
.hero-icon { width:260px; height:260px; min-width:260px;
  border:2px solid #f5c76b80; border-radius:50%; display:flex;
  align-items:center; justify-content:center; color:#f5c76b;
  background:#ffffff0d; box-shadow:0 0 70px #f5c76b20; }
.section { padding:75px 8%; text-align:center; }
.section h2 { font-size:34px; color:#12385c; margin:0 0 14px; }
.section-sub { color:#68798a; max-width:650px; margin:0 auto 38px; line-height:1.7; }
.feature-grid,.card-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
.feature-card,.info-card {
  background:white; border:1px solid #e7edf3; border-radius:15px;
  padding:30px 24px; text-align:left; box-shadow:0 8px 28px #12385c0b;
}
.feature-card svg,.info-card svg { color:#c28a28; }
.feature-card h3,.info-card h3 { color:#12385c; margin:17px 0 10px; }
.feature-card p,.info-card p { color:#68798a; line-height:1.7; }
.info-card a { color:#a8751d; font-weight:700; }
.stats { display:grid; grid-template-columns:repeat(3,1fr); gap:20px;
  background:#f1f6fa; padding:35px 8%; text-align:center; }
.stat strong { display:block; font-size:30px; color:#12385c; }
.stat span { color:#68798a; font-size:14px; }
.page-wrap { min-height:75vh; padding:65px 6%; background:#f4f7fa; }
.form-card { max-width:470px; margin:0 auto; background:white; padding:38px;
  border-radius:16px; box-shadow:0 12px 35px #12385c12; }
.form-card h2 { text-align:center; color:#12385c; margin:0 0 10px; }
.form-card > p { text-align:center; color:#718093; margin-bottom:25px; }
.form-card label { display:block; margin:15px 0 7px; font-weight:600; font-size:14px; }
.form-card input,.form-card select {
  width:100%; padding:13px; border:1px solid #d7e0e9; border-radius:7px;
  font-size:15px; outline:none;
}
.form-card input:focus,.form-card select:focus { border-color:#1c6489; }
.submit-btn { width:100%; padding:14px; margin-top:22px; border:0;
  border-radius:8px; background:#12385c; color:white; font-weight:700;
  font-size:15px; cursor:pointer; }
.submit-btn:hover { background:#1a527d; }
.form-message { margin-top:15px; text-align:center; color:#b42318; font-size:14px; }
.form-bottom { text-align:center; margin-top:20px; color:#68798a; font-size:14px; }
.form-bottom a { color:#a8751d; font-weight:700; }
.dashboard-head { background:linear-gradient(120deg,#0b2745,#176080);
  padding:38px; border-radius:15px; color:white; margin-bottom:25px; }
.dashboard-head h1 { margin-top:0; }
.dashboard-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.dashboard-card { background:white; border-radius:12px; padding:25px;
  box-shadow:0 5px 20px #12385c0b; }
.dashboard-card h3 { color:#12385c; }
.footer { background:#071b35; color:#dce8f3; padding:35px 8%;
  text-align:center; line-height:1.8; }
.footer strong { color:#f5c76b; }
.mobile-toggle { display:none; background:none; border:0; color:#12385c; }
@media(max-width:800px) {
  .nav-links { display:none; position:absolute; top:76px; left:0; right:0;
    background:white; padding:25px; flex-direction:column; align-items:flex-start; }
  .nav-links.open { display:flex; }
  .mobile-toggle { display:block; }
  .hero { min-height:auto; padding:65px 7%; flex-direction:column; align-items:flex-start; }
  .hero-title { font-size:40px; }
  .hero-icon { width:155px; height:155px; min-width:155px; }
  .feature-grid,.card-grid,.dashboard-grid { grid-template-columns:1fr; }
  .stats { grid-template-columns:1fr; gap:28px; }
  .section { padding:55px 7%; }
}
`

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const user = JSON.parse(sessionStorage.getItem('user') || 'null')

  function logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    window.location.href = '/'
  }

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon"><ShieldCheck size={27} /></span>
        VeteranConnect
      </Link>
      <button className="mobile-toggle" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      <nav className={`nav-links ${open ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/#about">About</Link>
        <Link to="/careers">Career Opportunities</Link>
        <Link to="/training">Training</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); logout() }}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link className="nav-button" to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">HONOURING SERVICE. EMPOWERING FUTURES.</span>
          <h1 className="hero-title">
            From Military Service
            <span>To Civilian Success.</span>
          </h1>
          <p>
            Your service deserves a future full of opportunities.
            Discover career pathways, skill certification and training
            resources designed to support your transition to civilian life.
          </p>
          <div className="hero-buttons">
            <Link to="/careers" className="primary-btn">Explore Careers <ArrowRight size={18} /></Link>
            <Link to="/register" className="secondary-btn">Join VeteranConnect</Link>
          </div>
        </div>
        <div className="hero-icon"><ShieldCheck size={145} strokeWidth={1.2} /></div>
      </section>

      <section className="stats">
        <div className="stat"><strong>Career</strong><span>New professional pathways</span></div>
        <div className="stat"><strong>Skills</strong><span>Recognise your experience</span></div>
        <div className="stat"><strong>Training</strong><span>Build your next chapter</span></div>
      </section>

      <section className="section" id="about">
        <h2>Your Next Chapter Starts Here</h2>
        <p className="section-sub">
          VeteranConnect brings career information, skill development and
          transition resources together in one place.
        </p>
        <div className="feature-grid">
          <div className="feature-card">
            <Briefcase size={35} />
            <h3>Career Opportunities</h3>
            <p>Explore civilian employment resources and job portals.</p>
            <Link to="/careers">Explore careers →</Link>
          </div>
          <div className="feature-card">
            <GraduationCap size={35} />
            <h3>Skill Development</h3>
            <p>Find training and learning opportunities to build new skills.</p>
            <Link to="/training">Explore training →</Link>
          </div>
          <div className="feature-card">
            <Award size={35} />
            <h3>Skill Recognition</h3>
            <p>Discover resources for recognising your military experience.</p>
            <Link to="/register">Get started →</Link>
          </div>
        </div>
      </section>
    </>
  )
}

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', role: 'veteran', password: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function submit(e) {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    try {
      const response = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Registration failed')
      setMessage('Registration successful! Redirecting to login...')
      setTimeout(() => navigate('/login'), 1200)
    } catch (error) {
      setMessage(error.message || 'Could not connect to the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrap">
      <form className="form-card" onSubmit={submit}>
        <h2>Create Your Account</h2>
        <p>Become a part of VeteranConnect</p>
        <label>Full Name</label>
        <input name="name" value={form.name} onChange={change} required placeholder="Enter your full name" />
        <label>Email Address</label>
        <input name="email" type="email" value={form.email} onChange={change} required placeholder="Enter your email" />
        <label>Phone Number</label>
        <input name="phone" value={form.phone} onChange={change} required placeholder="10-digit phone number" />
        <label>Register As</label>
        <select name="role" value={form.role} onChange={change}>
          <option value="veteran">Ex-Serviceman / Veteran</option>
          <option value="employer">Employer</option>
        </select>
        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={change} required minLength="8" placeholder="Minimum 8 characters" />
        <button className="submit-btn" disabled={loading}>{loading ? 'Creating account...' : 'Create Account'}</button>
        {message && <div className="form-message">{message}</div>}
        <div className="form-bottom">Already registered? <Link to="/login">Login here</Link></div>
      </form>
    </div>
  )
}

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    try {
      const response = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Login failed')
      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('user', JSON.stringify(data.user))
      navigate('/dashboard')
    } catch (error) {
      setMessage(error.message || 'Could not connect to the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrap">
      <form className="form-card" onSubmit={submit}>
        <h2>Welcome Back</h2>
        <p>Login to your VeteranConnect account</p>
        <label>Email Address</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email" />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password" />
        <button className="submit-btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        {message && <div className="form-message">{message}</div>}
        <div className="form-bottom">New here? <Link to="/register">Create an account</Link></div>
      </form>
    </div>
  )
}

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('Loading your dashboard...')

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    fetch(`${API}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async response => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Session expired. Please login again.')
        setUser(data.user || data)
        setMessage('')
      })
      .catch(error => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        setMessage(error.message)
      })
  }, [navigate])

  function logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  if (message) {
    return <div className="page-wrap"><div className="form-card"><p>{message}</p><Link to="/login">Go to Login</Link></div></div>
  }

  if (!user) return <div className="page-wrap">Loading...</div>

  return (
    <div className="page-wrap">
      <div className="dashboard-head">
        <h1>Welcome, {user.name || 'User'}!</h1>
        <p>Your next chapter starts here. Explore opportunities and resources.</p>
        <button className="primary-btn" onClick={logout}><LogOut size={17} /> Logout</button>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card"><Briefcase size={32} /><h3>Career Opportunities</h3><p>Explore civilian career options.</p><Link to="/careers">Explore →</Link></div>
        <div className="dashboard-card"><GraduationCap size={32} /><h3>Training Programs</h3><p>Build new skills for your future.</p><Link to="/training">Explore →</Link></div>
        <div className="dashboard-card"><Users size={32} /><h3>Account Details</h3><p>Email: {user.email}</p><p>Role: {user.role}</p></div>
      </div>
    </div>
  )
}

function Careers() {
  const jobs = [
    {
      title: 'Directorate General Resettlement (DGR)',
      description: 'Government resettlement support and employment-related resources for ex-servicemen.',
      url: 'https://dgrindia.gov.in/'
    },
    {
      title: 'National Career Service',
      description: 'Explore job search, career guidance and employment services.',
      url: 'https://www.ncs.gov.in/'
    },
    {
      title: 'Skill India Digital Hub',
      description: 'Explore skill development and learning opportunities.',
      url: 'https://www.skillindiadigital.gov.in/'
    }
  ]

  return (
    <div className="page-wrap">
      <section className="section">
        <h2>Career Opportunities</h2>
        <p className="section-sub">Explore these official resources for employment and career transition.</p>
        <div className="card-grid">
          {jobs.map(job => (
            <div className="info-card" key={job.title}>
              <Briefcase size={35} />
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <a href={job.url} target="_blank" rel="noreferrer">Visit Official Website →</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function Training() {
  const courses = [
    {
      title: 'Skill India Digital Hub',
      description: 'Explore digital learning and skill development courses.',
      url: 'https://www.skillindiadigital.gov.in/'
    },
    {
      title: 'National Skill Development Corporation',
      description: 'Discover skill training initiatives and certification resources.',
      url: 'https://nsdcindia.org/'
    },
    {
      title: 'Directorate General Resettlement',
      description: 'Find resettlement and training information for ex-servicemen.',
      url: 'https://dgrindia.gov.in/'
    }
  ]

  return (
    <div className="page-wrap">
      <section className="section">
        <h2>Training & Skill Development</h2>
        <p className="section-sub">Explore learning resources to strengthen your civilian career journey.</p>
        <div className="card-grid">
          {courses.map(course => (
            <div className="info-card" key={course.title}>
              <GraduationCap size={35} />
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <a href={course.url} target="_blank" rel="noreferrer">Explore Resource →</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <strong>VeteranConnect</strong>
      <div>Your Service. Your Next Chapter.</div>
      <small>Supporting the transition from military service to civilian opportunities.</small>
    </footer>
  )
}

function App() {
  return (
    <BrowserRouter>
      <style>{styles}</style>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/training" element={<Training />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
