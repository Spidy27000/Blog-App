
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./Pages/App";
import './index.css'
import SignUp from "./Pages/SignUp";
import Admin from "./Pages/Admin";
import Post from "./Pages/Post";
import Login from "./Pages/Login";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/:id" element={<Post/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  </BrowserRouter>
);
