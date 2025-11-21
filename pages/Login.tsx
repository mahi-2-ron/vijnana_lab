
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Atom, Mail, Lock, User, Chrome, ArrowRight, Loader2, AlertCircle, BookOpen, Building, Globe, ArrowLeft, Check } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  updateProfile,
  doc, 
  setDoc, 
  getDoc 
} from '../services/firebase';

// Fix for Framer Motion type definitions
const MotionDiv = motion.div as any;

interface UserData {
  role: string;
  name: string;
  email: string;
  uid: string;
  createdAt: any;
}

const AVATARS = [
  'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500', 
  'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Step 1: Signup Credentials
  const [role, setRole] = useState('Student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Step 2: Profile Setup
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    grade: '',
    institution: '',
    language: 'English',
    avatar: 'bg-blue-500'
  });

  // Helper to handle navigation based on role
  const navigateToDashboard = (userRole: string) => {
      if (userRole === 'Student') navigate('/student-dashboard');
      else if (userRole === 'Teacher') navigate('/teacher-dashboard');
      else navigate('/home');
  };

  const handleNextStep = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.password) {
          setError("Please fill in all fields");
          return;
      }
      setError(null);
      setStep(2);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
        if (isSignup) {
            // SIGN UP LOGIC
            // Ensure all profile fields are ready (validations can be added here)
            
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            if (user) {
                // Update Profile in Auth
                await updateProfile(user, {
                    displayName: formData.name,
                    photoURL: profileData.avatar
                });

                // Create User Profile in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    name: formData.name,
                    email: formData.email,
                    role: role,
                    grade: profileData.grade,
                    institution: profileData.institution,
                    language: profileData.language,
                    avatar: profileData.avatar,
                    createdAt: new Date()
                });

                navigateToDashboard(role);
            }
        } else {
            // LOGIN LOGIC
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            if (user) {
                // Fetch User Role
                const docSnap = await getDoc(doc(db, "users", user.uid));
                if (docSnap.exists()) {
                    const userData = docSnap.data() as UserData;
                    navigateToDashboard(userData?.role || 'Student');
                } else {
                    navigateToDashboard('Student'); 
                }
            }
        }
    } catch (err: any) {
        console.error("Auth Error:", err);
        let msg = "An error occurred.";
        if (err.message) {
             msg = err.message.replace('Firebase: ', '').replace('auth/', '').replace(/-/g, ' ');
        }
        setError(msg.charAt(0).toUpperCase() + msg.slice(1));
    } finally {
        setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data() as UserData;
                navigateToDashboard(userData?.role || 'Student');
            } else {
                // New Google User -> Default to Student & Basic Profile
                await setDoc(docRef, {
                    uid: user.uid,
                    name: user.displayName || "Google User",
                    email: user.email,
                    role: 'Student',
                    grade: '', // Could prompt user later
                    institution: '',
                    language: 'English',
                    avatar: 'bg-blue-500',
                    createdAt: new Date()
                });
                navigateToDashboard('Student');
            }
        }
    } catch (err: any) {
        console.error("Google Auth Error:", err);
        setError("Failed to sign in with Google.");
    } finally {
        setIsLoading(false);
    }
  };

  const toggleSignup = () => {
      setIsSignup(!isSignup);
      setError(null);
      setStep(1); // Reset step when toggling
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden px-4">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <MotionDiv 
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <MotionDiv 
            animate={{ x: [0, -50, 0], y: [0, 100, 0] }} 
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"
        />
      </div>

      <GlassCard className="w-full max-w-md p-8 md:p-10 relative z-10 border-t border-l border-white/10 shadow-2xl backdrop-blur-xl" color="blue">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
             <MotionDiv 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30"
             >
                <Atom size={32} className="text-white" />
             </MotionDiv>
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            {isSignup ? (step === 1 ? 'Create Account' : 'Profile Setup') : 'Welcome Back'}
          </h1>
          <p className="text-gray-400 text-sm">
            {isSignup 
                ? (step === 1 ? 'Step 1: Account Details' : 'Step 2: Personalize your experience') 
                : 'Enter your credentials to access the lab.'}
          </p>
        </div>

        {/* Error Display */}
        {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-300 text-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
            </div>
        )}

        {/* Form */}
        <form onSubmit={isSignup && step === 1 ? handleNextStep : handleAuth} className="space-y-4">
          
          {/* SIGNUP STEP 1: CREDENTIALS */}
          {isSignup && step === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-300">
               {/* Role Selector */}
               <div className="grid grid-cols-2 gap-2 p-1 bg-black/20 rounded-xl border border-white/5">
                  {['Student', 'Teacher'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-2 rounded-lg text-sm font-medium transition-all ${role === r ? 'bg-white/10 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      {r}
                    </button>
                  ))}
               </div>

               <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>
          )}

          {/* SIGNUP STEP 2: PROFILE */}
          {isSignup && step === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-300">
                  <div className="relative group">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="Grade / Class"
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
                      value={profileData.grade}
                      onChange={e => setProfileData({...profileData, grade: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="relative group">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="Institution Name"
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
                      value={profileData.institution}
                      onChange={e => setProfileData({...profileData, institution: e.target.value})}
                      required
                    />
                  </div>

                  <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <select 
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all appearance-none cursor-pointer"
                        value={profileData.language}
                        onChange={e => setProfileData({...profileData, language: e.target.value})}
                    >
                        <option className="bg-slate-900 text-white" value="English">English</option>
                        <option className="bg-slate-900 text-white" value="Hindi">Hindi</option>
                        <option className="bg-slate-900 text-white" value="Kannada">Kannada</option>
                    </select>
                  </div>

                  <div className="pt-2">
                      <label className="block text-xs text-gray-400 mb-2 ml-1 uppercase">Choose Avatar</label>
                      <div className="flex flex-wrap gap-3 justify-center">
                          {AVATARS.map((av) => (
                              <button
                                type="button"
                                key={av}
                                onClick={() => setProfileData({...profileData, avatar: av})}
                                className={`w-10 h-10 rounded-full ${av} transition-transform hover:scale-110 relative ${profileData.avatar === av ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : 'opacity-70 hover:opacity-100'}`}
                              >
                                  {profileData.avatar === av && <Check size={14} className="text-white absolute inset-0 m-auto"/>}
                              </button>
                          ))}
                      </div>
                  </div>
              </div>
          )}

          {/* LOGIN FORM */}
          {!isSignup && (
            <div className="space-y-4 animate-in slide-in-from-left-8 fade-in duration-300">
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <input 
                    type="email" 
                    placeholder="Email Address"
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    required
                    />
                </div>

                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <input 
                    type="password" 
                    placeholder="Password"
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    required
                    />
                </div>
                 <div className="flex justify-end">
                    <button type="button" className="text-xs text-blue-400 hover:text-blue-300 hover:underline">
                        Forgot Password?
                    </button>
                </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-3">
              {isSignup && step === 2 && (
                   <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-white transition-colors"
                   >
                       <ArrowLeft size={20} />
                   </button>
              )}
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    {isSignup ? (step === 1 ? 'Next Step' : 'Complete Setup') : 'Sign In'} <ArrowRight size={18} />
                  </>
                )}
              </button>
          </div>
        </form>

        {!isSignup && (
             <>
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#162032] px-2 text-gray-500">Or continue with</span></div>
                </div>

                <button 
                onClick={handleGoogleLogin}
                type="button"
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-100 text-slate-900 font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-3 mb-6"
                >
                <Chrome size={20} className="text-blue-600" />
                <span>Google</span>
                </button>
             </>
        )}

        <p className="text-center text-sm text-gray-400 mt-6">
          {isSignup ? 'Already have an account?' : "Don't have an account?"} {' '}
          <button 
            onClick={toggleSignup} 
            className="text-white font-bold hover:underline"
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </button>
        </p>

      </GlassCard>
    </div>
  );
};

export default Login;
