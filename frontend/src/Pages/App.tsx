import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Dashboard from "./Dashboard";
import Post from "./Post";
import Admin from "./Admin";
import Login from "./Login";
import SignUp from "./SignUp";
import Write from "./Write";
import { useEffect, useState } from 'react';
import NotFound from './NotFound';
import Edit from './Edit';
import Test from "./Test";

function App() {

  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem('userData');
    return stored ? JSON.parse(stored) : null;
  });

  // Checking if the local storage already has the user data
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');  
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }
  }, [])

  // 
  const ProtectedRoute = ({ children }) => {
    if (!userData) {
      return <Navigate to="/login" replace />;
    }
    return  children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
         
            <Dashboard />
         
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
        <Route path='*' element={<NotFound />} />
        <Route path="/login" element={<Login setUserData={setUserData} />} />
        { /* Tanish:this is my test Route plz dont remove  */}
        <Route path="/test" element={<Test/>} />
        <Route path="/write" element={
          <ProtectedRoute>
            <Write />
          </ProtectedRoute>} />
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )

}

export default App
