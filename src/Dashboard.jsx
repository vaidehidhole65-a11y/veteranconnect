```jsx
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Award,
  LogOut,
  User,
  ArrowRight
} from 'lucide-react'
import '../App.css'

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = sessionStorage.getItem('user')

    if (!savedUser) {
      navigate('/login')
      return
    }

    try {
      setUser(JSON.parse(savedUser))
    } catch {
      sessionStorage.removeItem('user')
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) return null

  const isVeteran = user.role === 'veteran'

  const features = isVeteran
    ? [
        {
          title: 'Career Opportunities',
          description: 'Explore civilian jobs matching your skills and experience.',
          icon: <Briefcase size={30} />,
          link: '/careers'
        },
        {
          title: 'Skill Training',
          description: 'Discover courses to develop new professional skills.',
          icon: <GraduationCap size={30} />,
          link: '/training'
        },
        {
          title: 'Certifications',
          description: 'Explore skill certification and learning opportunities.',
          icon: <Award size={30} />,
          link: '/training'
        }
      ]
    : [
        {
          title: 'Explore Candidates',
          description: 'Discover skilled candidates with military experience.',
          icon: <User size={30} />,
          link: '/careers'
        },
        {
          title: 'Job Opportunities',
          description: 'Explore opportunities to connect with veteran talent.',
          icon: <Briefcase size={30} />,
          link: '/careers'
        }
      ]

  return (
    <div className="dashboard-page">

      <header className="dashboard-header">
        <div className="dashboard-brand">
          <ShieldCheck size={32} />
          <h2>VeteranConnect</h2>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={17} />
          Logout
        </button>
      </header>

      <main className="dashboard-container">

        <section className="dashboard-welcome">
          <p className="dashboard-label">YOUR PERSONAL DASHBOARD</p>

          <h1>Welcome, {user.name}!</h1>

          <p>
            {isVeteran
              ? 'Your service has prepared you for a successful civilian career. Explore your next opportunities.'
              : 'Connect with experienced veterans and discover skilled talent for your organization.'}
          </p>

          <span className="role-badge">
            {isVeteran ? 'Veteran Account' : 'Employer Account'}
          </span>
        </section>

        <section className="dashboard-profile">
          <h2>Account Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </section>

        <section className="dashboard-features">
          <h2>{isVeteran ? 'Explore Your Opportunities' : 'Explore Employer Services'}</h2>

          <div className="dashboard-grid">
            {features.map((feature, index) => (
              <div className="dashboard-feature-card" key={index}>
                <div className="feature-icon">
                  {feature.icon}
                </div>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>

                <Link to={feature.link} className="dashboard-link">
                  Explore <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="dashboard-footer">
        © 2026 VeteranConnect. Supporting Your Next Chapter.
      </footer>

    </div>
  )
}

export default Dashboard
```