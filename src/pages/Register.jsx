
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import '../App.css'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: ''
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })

    setMessage('')
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setMessage('Please enter a valid 10-digit phone number.')
      return
    }

    if (formData.password.length < 8) {
      setMessage('Password must contain at least 8 characters.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match. Please try again.')
      return
    }

    setMessage(
      'Registration form validated! Backend connection is pending.'
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <ShieldCheck size={45} color="#123b35" />

        <h2>Create Your Account</h2>
        <p>Join VeteranConnect and build your future</p>

        <form onSubmit={handleRegister}>

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your 10-digit phone number"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            required
          />

          <label>Select Your Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select your role</option>
            <option value="veteran">Veteran</option>
            <option value="employer">Employer</option>
          </select>

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            minLength={8}
            required
          />

          <button type="submit" className="register-btn">
            Create Account
          </button>

        </form>

        {message && <p className="form-message">{message}</p>}

        <p>
          Already have an account?
          <Link to="/login"> Login here</Link>
        </p>

        <Link to="/">Back to Home</Link>

      </div>
    </div>
  )
}

export default Register
