
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Building, BookOpen, Globe, Save, Edit2, Loader2, Check, X, Shield, GraduationCap } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { auth, db, doc, getDoc, updateUserData, onAuthStateChanged } from '../services/firebase';

const AVATARS = [
  'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500', 
  'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
];

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    grade: '',
    institution: '',
    language: 'English',
    avatar: 'bg-blue-500',
    uid: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
            try {
                // Try to fetch detailed profile from Firestore
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserData({
                        name: data.name || currentUser.displayName || 'Student',
                        email: data.email || currentUser.email || '',
                        role: data.role || 'Student',
                        grade: data.grade || '',
                        institution: data.institution || '',
                        language: data.language || 'English',
                        avatar: data.avatar || currentUser.photoURL || 'bg-blue-500',
                        uid: currentUser.uid
                    });
                } else {
                    // Fallback: Use basic auth data if Firestore doc doesn't exist yet
                    setUserData({
                        name: currentUser.displayName || 'Student',
                        email: currentUser.email || '',
                        role: 'Student',
                        grade: '',
                        institution: '',
                        language: 'English',
                        avatar: currentUser.photoURL || 'bg-blue-500',
                        uid: currentUser.uid
                    });
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                // Even if fetch fails, show what we have from Auth to avoid logout feel
                setUserData(prev => ({
                    ...prev,
                    name: currentUser.displayName || 'Student',
                    email: currentUser.email || '',
                    uid: currentUser.uid
                }));
            } finally {
                setIsLoading(false);
            }
        } else {
            // Not logged in
            // Delay slightly to avoid flash if auth is initializing
            const timer = setTimeout(() => {
                 navigate('/login');
            }, 100);
            return () => clearTimeout(timer);
        }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
        await updateUserData(userData.uid, {
            name: userData.name,
            institution: userData.institution,
            language: userData.language,
            avatar: userData.avatar
        });
        setIsEditing(false);
    } catch (error) {
        console.error("Failed to update profile", error);
        alert("Failed to save changes.");
    } finally {
        setIsSaving(false);
    }
  };

  if (isLoading) {
      return (
          <div className="min-h-screen pt-20 flex items-center justify-center">
              <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
      );
  }

  return (
    <div className="pt-28 px-6 md:px-12 lg:px-20 min-h-screen pb-12 relative overflow-hidden">
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
             <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
             <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">My Profile</h1>
            <p className="text-gray-400 mb-8">Manage your personal information and account settings.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Col: Identity Card */}
                <GlassCard className="flex flex-col items-center text-center p-8 h-fit" color="blue">
                    <div className="relative mb-6 group">
                        <div className={`w-32 h-32 rounded-full ${userData.avatar} flex items-center justify-center shadow-2xl border-4 border-white/10 transition-all duration-300`}>
                            <span className="text-4xl font-bold text-white">{userData.name.charAt(0).toUpperCase()}</span>
                        </div>
                        {isEditing && (
                            <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
                                <span className="bg-black/50 text-xs text-white px-2 py-1 rounded-full backdrop-blur">Editable</span>
                            </div>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-1">{userData.name}</h2>
                    <div className="flex items-center gap-2 mb-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${userData.role === 'Teacher' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {userData.role}
                        </span>
                    </div>

                    <div className="w-full border-t border-white/10 pt-6 space-y-4 text-left">
                         <div className="flex items-center gap-3 text-gray-300">
                             <div className="p-2 bg-white/5 rounded-lg"><Mail size={16} className="text-blue-400" /></div>
                             <div>
                                 <p className="text-xs text-gray-500">Email</p>
                                 <p className="text-sm font-medium truncate">{userData.email}</p>
                             </div>
                         </div>
                         <div className="flex items-center gap-3 text-gray-300">
                             <div className="p-2 bg-white/5 rounded-lg"><Shield size={16} className="text-purple-400" /></div>
                             <div>
                                 <p className="text-xs text-gray-500">User ID</p>
                                 <p className="text-sm font-mono opacity-70">{userData.uid.substring(0, 8)}...</p>
                             </div>
                         </div>
                    </div>
                </GlassCard>

                {/* Right Col: Editable Details */}
                <div className="lg:col-span-2">
                    <GlassCard className="p-8 relative h-full" color="purple">
                        
                        {/* Action Buttons */}
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-white">Account Details</h3>
                            {!isEditing ? (
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-colors"
                                >
                                    <Edit2 size={16} /> Edit
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setIsEditing(false)}
                                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 transition-colors border border-red-500/20"
                                    >
                                        <X size={20} />
                                    </button>
                                    <button 
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-bold transition-colors shadow-lg shadow-green-600/20"
                                    >
                                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <div className="space-y-6">
                            
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                                    <User size={16} /> Full Name
                                </label>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        value={userData.name}
                                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500/50 focus:outline-none transition-all"
                                    />
                                ) : (
                                    <div className="p-3 bg-white/5 rounded-xl text-gray-200 border border-transparent font-medium">{userData.name}</div>
                                )}
                            </div>

                            {/* Institution Input */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                                    <Building size={16} /> Institution
                                </label>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        value={userData.institution}
                                        onChange={(e) => setUserData({...userData, institution: e.target.value})}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500/50 focus:outline-none transition-all"
                                    />
                                ) : (
                                    <div className="p-3 bg-white/5 rounded-xl text-gray-200 border border-transparent">{userData.institution}</div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Grade (Read Only) */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                                        <GraduationCap size={16} /> Grade / Class
                                    </label>
                                    <div className="p-3 bg-white/5 rounded-xl text-gray-400 border border-white/5 flex justify-between items-center cursor-not-allowed">
                                        {userData.grade}
                                        <span className="text-[10px] uppercase bg-white/5 px-2 py-0.5 rounded text-gray-500">Fixed</span>
                                    </div>
                                </div>

                                {/* Language Input */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                                        <Globe size={16} /> Preferred Language
                                    </label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <select 
                                                value={userData.language}
                                                onChange={(e) => setUserData({...userData, language: e.target.value})}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
                                            >
                                                <option className="bg-slate-900" value="English">English</option>
                                                <option className="bg-slate-900" value="Hindi">Hindi</option>
                                                <option className="bg-slate-900" value="Kannada">Kannada</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-3 bg-white/5 rounded-xl text-gray-200 border border-transparent">{userData.language}</div>
                                    )}
                                </div>
                            </div>

                            {/* Avatar Selection */}
                            {isEditing && (
                                <div className="pt-6 border-t border-white/10">
                                    <label className="block text-sm font-medium text-gray-400 mb-3">Update Avatar Theme</label>
                                    <div className="flex flex-wrap gap-3">
                                        {AVATARS.map((av) => (
                                            <button
                                                key={av}
                                                onClick={() => setUserData({...userData, avatar: av})}
                                                className={`w-10 h-10 rounded-full ${av} transition-all relative ${userData.avatar === av ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`}
                                                type="button"
                                            >
                                                {userData.avatar === av && <Check size={14} className="text-white absolute inset-0 m-auto"/>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Profile;
