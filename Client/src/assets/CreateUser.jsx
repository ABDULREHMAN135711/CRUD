import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {
  const [form, setForm] = useState({ Name: '', Email: '', Age: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/createUser', form)
      .then(response => {
        console.log('User created:', response.data)
        navigate('/Users')
      })
      .catch(error => {
        console.error('There was an error creating the user!', error)
      })
  }
  
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Add User</h2>
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
            />
          </div>
          <button type="submit" className="btn btn-success">Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateUser
