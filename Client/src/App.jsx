import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './assets/Users'
import CreateUser from './assets/CreateUser'
import UpdateUser from './assets/UpdateUser'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/users/update/:id" element={<UpdateUser />} />  {/* <-- Match this */}
      </Routes>
    </BrowserRouter>
  )
}

export default App