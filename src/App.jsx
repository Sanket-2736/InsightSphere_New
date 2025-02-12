import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import Latest from "./pages/Latest/Latest";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import { useAuthStore } from "./stores/authStore";
import { Toaster } from "react-hot-toast";
import {ToastContainer} from 'react-toastify'

function App() {
  const authUser = useAuthStore((state) => state.authUser); // Zustand hook

  return (
    <>
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="*" element={<div className="text-xl text-red-700 text-justify">Page not found!</div>} />
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/latest" element={!authUser ? <Login/> :<Latest />} />
        <Route path="/notifications" element={!authUser ? <Navigate to="/login" /> : <NotificationPage />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
        <Route path="/profile" element={!authUser ? <Navigate to="/login" /> : <ProfilePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <ToastContainer/>
    </>
  );
}

export default App;