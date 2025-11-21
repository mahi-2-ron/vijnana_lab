
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Atom, Twitter, Github, Linkedin, Instagram, Send, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [sent, setSent] = useState(false);

  const handleFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFeedback('');
    }, 2000);
  };

  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-16 pb-8 z-10 relative mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
             <Link to="/" className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 blur-lg opacity-50 group-hover:opacity-80 transition-opacity"></div>
                  <Atom className="w-8 h-8 text-blue-400 relative z-10" />
                </div>
                <span className="text-2xl font-display font-bold text-white tracking-tight">
                  Vijnana<span className="text-blue-400">Lab</span>
                </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering the next generation of scientists with immersive virtual simulations and AI-driven mentorship.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Platform</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/subjects" className="hover:text-blue-400 transition-colors">Virtual Labs</Link></li>
              <li><Link to="/tutor" className="hover:text-blue-400 transition-colors">AI Tutor</Link></li>
              <li><Link to="/student-dashboard" className="hover:text-blue-400 transition-colors">Student Dashboard</Link></li>
              <li><Link to="/teacher-dashboard" className="hover:text-blue-400 transition-colors">Teacher Dashboard</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-white font-bold mb-6">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Feedback Form */}
          <div>
            <h3 className="text-white font-bold mb-6">Feedback</h3>
            <p className="text-xs text-gray-400 mb-4">Help us improve your experience.</p>
            <form onSubmit={handleFeedback} className="space-y-3">
              <div className="relative">
                <textarea 
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Your suggestions..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none h-24 placeholder-gray-600"
                />
                <button 
                  type="submit"
                  className={`absolute bottom-3 right-3 p-2 rounded-full transition-all shadow-lg ${
                    sent ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'
                  }`}
                >
                  {sent ? <Heart size={16} fill="currentColor" /> : <Send size={16} />}
                </button>
              </div>
              {sent && <p className="text-xs text-green-400 animate-pulse">Thank you for your feedback!</p>}
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Vijnana Lab Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Mail size={14} />
            <span>support@vijnanalab.com</span>
          </div>
        </div>
        
        <div className="w-full text-center mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-gray-600">
                by <a href="https://www.linkedin.com/in/mahesh-r-madiwalar-9a468b345/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors font-medium">code_bloodie</a>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
