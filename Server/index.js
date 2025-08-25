const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./Users');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/CRUD');

// Create a new user
app.post('/createUser', (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Failed to create user' });
    });
});

// Get all users
app.get('/users', (req, res) => {
  UserModel.find()
    .then(users => res.json(users))
    .catch(err => {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    });
});

// Get a single user by ID
app.get('/users/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  UserModel.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Failed to fetch user' });
    });
});

// ✅ Update user by ID (RESTful route)
app.put('/users/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Failed to update user' });
    });
});

// Delete user by ID
app.delete('/deleteUser/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  UserModel.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully', user });
    })
    .catch(err => {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Failed to delete user' });
    });
});
// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});