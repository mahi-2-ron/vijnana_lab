
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Atom, LogIn, LogOut, User } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { auth, onAuthStateChanged, signOut } from '../services/firebase';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
      try {
          await signOut(auth);
          navigate('/login');
      } catch (error) {
          console.error("Logout Error:", error);
      }
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-nav h-20 px-6 md:px-12 flex items-center justify-between transition-colors duration-300">
      {/* Logo */}
      <Link to="/home" className="flex items-center gap-2 group">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 blur-lg opacity-50 group-hover:opacity-80 transition-opacity"></div>
          <Atom className="w-8 h-8 text-blue-600 dark:text-blue-400 relative z-10 transition-colors" />
        </div>
        <span className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
          Vijnana <span className="text-blue-600 dark:text-blue-400">Lab</span>
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative text-sm font-medium transition-colors duration-300 ${
              isActive(item.path) 
                ? 'text-slate-900 dark:text-white' 
                : 'text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300'
            }`}
          >
            {item.label}
            {isActive(item.path) && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.8)] rounded-full" />
            )}
          </Link>
        ))}
      </div>

      {/* Auth Button */}
      <div className="hidden md:flex items-center">
         {user ? (
             <div className="flex items-center gap-3">
                 <Link to="/profile" className="group flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                    <div className={`w-8 h-8 rounded-full ${user.photoURL && user.photoURL.includes('bg-') ? user.photoURL : 'bg-blue-500'} flex items-center justify-center text-white text-xs font-bold`}>
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User size={14}/>}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-gray-400 hidden lg:inline group-hover:text-blue-500 transition-colors">
                        {user.displayName?.split(' ')[0] || 'Profile'}
                    </span>
                 </Link>
                 
                 <button 
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-red-500/10 border border-black/10 dark:border-white/10 hover:border-red-500/50 text-sm font-bold text-slate-700 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-all flex items-center gap-2"
                    title="Log Out"
                 >
                    <LogOut size={16} />
                 </button>
             </div>
         ) : (
             <Link to="/login">
                <button 
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5"
                >
                    <LogIn size={16} /> Log In
                </button>
             </Link>
         )}
      </div>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full glass-nav border-t border-gray-200 dark:border-white/10 flex flex-col p-6 gap-4 md:hidden animate-fade-in-down h-[calc(100vh-5rem)] overflow-y-auto bg-slate-50 dark:bg-[#0f172a] transition-colors">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium ${
                isActive(item.path) ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-gray-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <hr className="border-gray-200 dark:border-white/10 my-2" />
          {user ? (
              <>
                <Link 
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-slate-700 dark:text-white font-bold"
                >
                    <User size={18} /> My Profile
                </Link>
                <button 
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-600/10 dark:bg-red-600/20 text-red-600 dark:text-red-400 font-bold border border-red-500/30"
                >
                    <LogOut size={18} /> Log Out
                </button>
              </>
          ) : (
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-600 text-white font-bold"
              >
                <LogIn size={18} /> Log In
              </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
