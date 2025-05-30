import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Dashboard from "./Dashboard";
import Post from "./Post";
import Admin from "./Admin";
import Login from "./Login";
import SignUp from "./SignUp";
import Write from "./Write";
import { useEffect, useState } from 'react';
import NotFound from './NotFound';


interface userData {
  username: string,
  email: string,
  password: string
}

function App() {

  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem('userData');
    return stored ? JSON.parse(stored) : null;
  });

  // Checking if the local storage already has the user data
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    console.log(storedUserData)
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }
  }, [])

  // 
  const ProtectedRoute = ({ children }) => {
    if (!userData) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/signUp" element={<SignUp setUserData={setUserData} />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>} />
        <Route path="/post/:id" element={
          <ProtectedRoute>
            <Post />
          </ProtectedRoute>} />
          <Route path='*' element={<NotFound/>} />
        <Route path="/login" element={<Login setUserData={setUserData} />} />
        <Route path="/write" element={
          <ProtectedRoute>
            <Write />
          </ProtectedRoute>} />

      </Routes>
    </Router>
  )

}

export default App
