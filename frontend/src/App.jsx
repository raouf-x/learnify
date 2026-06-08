import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseWatch from './pages/CourseWatch';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Activate from './pages/Activate';

function NotFound() {
  return <h2 style={{padding:'100px', textAlign:'center'}}>404 — Page Not Found</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/courses"     element={<Courses />} />
        <Route path="/courses/:id" element={<CourseWatch />} />
        <Route path="/login"       element={<Login />} />
        <Route path="/register"    element={<Register />} />
        <Route path="/dashboard"   element={<Dashboard />} />
        <Route path="/activate"    element={<Activate />} />
        <Route path="*"            element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;