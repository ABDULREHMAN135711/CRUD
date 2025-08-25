import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ Name: '', Email: '', Age: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch user data by ID when component mounts
  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}`)
      .then(res => {
        setForm({
          Name: res.data?.Name || '',
          Email: res.data?.Email || '',
          Age: res.data?.Age?.toString() || ''
        })
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching user:', err)
        setError('Failed to load user data.')
        setLoading(false)
      })
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!form.Name || !form.Email || !form.Age) {
      setError('All fields are required.')
      return
    }

    axios.put(`http://localhost:3001/users/${id}`, {
      ...form,
      Age: Number(form.Age)
    })
      .then(() => {
        navigate('/Users')
      })
      .catch(err => {
        console.error('Error updating user:', err)
        setError('Failed to update user.')
      })
  }

  if (loading) return <div className="text-center mt-5">Loading user data...</div>

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-4 shadow">
        <h2 className="mb-4">Update User</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="Name"
              value={form.Name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="Email"
              value={form.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              name="Age"
              value={form.Age}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Update</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser