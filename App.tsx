
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Subjects from './pages/Subjects';
import SubjectView from './pages/SubjectView';
import LabView from './pages/LabView';
import AITutor from './pages/AITutor';
import About from './pages/About';
import Contact from './pages/Contact';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';

// ScrollToTop component to handle scroll behavior on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  // Check if it is the immersive lab view or login view to hide footer
  const isLabView = /^\/subjects\/[\w-]+\/[\w-]+$/.test(location.pathname);
  const isLoginView = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="font-sans antialiased text-slate-200 selection:bg-blue-500 selection:text-white min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:subjectId" element={<SubjectView />} />
            <Route path="/subjects/:subjectId/:labId" element={<LabView />} />
            <Route path="/tutor" element={<AITutor />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      {(!isLabView && !isLoginView) && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
