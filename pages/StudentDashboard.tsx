
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Award, BookOpen, FileText, Clock, Zap, ChevronRight, Star, Download, Save, Check, Languages, RefreshCw } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import StudentToolkit from '../components/StudentToolkit';
import { SUBJECTS } from '../constants';
import { auth, db, doc, getDoc, onAuthStateChanged } from '../services/firebase';

const QUOTES = [
  "Science is a way of thinking much more than it is a body of knowledge. – Carl Sagan",
  "The important thing is not to stop questioning. – Albert Einstein",
  "Somewhere, something incredible is waiting to be known. – Carl Sagan",
  "Equipped with his five senses, man explores the universe around him and calls the adventure Science. – Edwin Hubble",
  "Nothing in life is to be feared, it is only to be understood. – Marie Curie"
];

const StudentDashboard: React.FC = () => {
  const [note, setNote] = useState("- Vernier constant is 0.01cm. Remember to check zero error.");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [quote, setQuote] = useState("");
  const [lang, setLang] = useState<'en'|'hi'|'kn'>('en');
  const [userName, setUserName] = useState("Student");

  // Mock data
  const recentLab = SUBJECTS[0].labs[0];
  const progress = {
    physics: 65,
    chemistry: 40,
    biology: 25,
    math: 10,
    cs: 80
  };

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            // 1. Immediate update from Auth Profile
            let display = "Student";
            if (user.displayName) {
                display = user.displayName.split(' ')[0];
            } else if (user.email) {
                // Fallback to email prefix if display name is missing
                display = user.email.split('@')[0];
            }
            setUserName(display);

            // 2. Try to get detailed profile from Database to confirm
            try {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                
                if (userSnap.exists()) {
                    const data = userSnap.data();
                    if (data.name && data.name !== 'Student') {
                        setUserName(data.name.split(' ')[0]);
                    }
                }
            } catch (error) {
                console.warn("Could not fetch extended profile, using basic auth info.");
            }
        }
    });

    return () => unsubscribe();
  }, []);

  const handleSaveNote = () => {
    setIsSaving(true);
    setSaved(false);
    // Simulate API save
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  const handleDownloadCert = (title: string) => {
      const text = `CERTIFICATE OF COMPLETION\n\nThis certifies that ${userName.toUpperCase()} has successfully completed the module: ${title}.\n\nDate: ${new Date().toLocaleDateString()}\nVijnana Lab`;
      const element = document.createElement("a");
      const file = new Blob([text], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${title.replace(/\s+/g, '_')}_Certificate.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
  };

  const greetings = {
      en: "Welcome back",
      hi: "वापस स्वागत है",
      kn: "ಮರಳಿ ಸ್ವಾಗತ"
  };

  return (
    <div className="pt-24 px-6 md:px-12 lg:px-20 min-h-screen pb-12">
      {/* Welcome & Motivation */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
            {greetings[lang]}, <span className="text-blue-400">{userName}</span>! 👋
            </h1>
            <p className="text-gray-400 italic">"{quote}"</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10">
            <Languages size={16} className="text-gray-300" />
            <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as any)}
                className="bg-transparent text-sm text-white focus:outline-none cursor-pointer"
            >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="kn">Kannada</option>
            </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Main Actions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Continue Learning */}
          <GlassCard className="relative overflow-hidden group p-8" color="blue">
             <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
             <div className="relative z-10">
                 <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-blue-400"/> Continue Learning
                 </h2>
                 <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform">
                       <Zap size={32} className="text-blue-400"/>
                    </div>
                    <div className="flex-1">
                       <h3 className="text-2xl font-bold text-white mb-1">{recentLab.title}</h3>
                       <p className="text-gray-400 text-sm mb-3">{SUBJECTS[0].name} • {recentLab.duration} left</p>
                       <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                       </div>
                       <p className="text-xs text-gray-500 text-right">75% Complete</p>
                    </div>
                    <Link to={`/subjects/physics/${recentLab.id}`}>
                        <button className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transition-all z-20 cursor-pointer">
                            <Play size={20} fill="currentColor" className="ml-1"/>
                        </button>
                    </Link>
                 </div>
             </div>
          </GlassCard>
          
          {/* Student Toolkit */}
          <StudentToolkit />

          {/* Recommended Chapters */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Star size={20} className="text-yellow-400"/> Recommended for You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SUBJECTS[1].labs.slice(0, 2).map(lab => (
                    <Link to={`/subjects/${SUBJECTS[1].id}/${lab.id}`} key={lab.id}>
                        <GlassCard className="p-4 hover:bg-white/5 transition-colors h-full" color="green">
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                                    <BookOpen size={20} className="text-green-400"/>
                                </div>
                                <div className="overflow-hidden">
                                    <h4 className="font-bold text-white truncate">{lab.title}</h4>
                                    <p className="text-xs text-gray-400">Chemistry • {lab.difficulty}</p>
                                </div>
                                <ChevronRight size={16} className="ml-auto text-gray-500"/>
                            </div>
                        </GlassCard>
                    </Link>
                ))}
            </div>
          </div>

           {/* Notes Section */}
           <GlassCard className="p-6" color="purple">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <FileText size={20} className="text-purple-400"/> My Notes
                  </h2>
                  <button 
                    onClick={handleSaveNote}
                    className={`text-sm flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${saved ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                  >
                      {isSaving ? <RefreshCw size={14} className="animate-spin"/> : saved ? <Check size={14}/> : <Save size={14}/>}
                      {isSaving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
                  </button>
              </div>
              <textarea 
                className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-4 text-gray-300 focus:outline-none focus:border-purple-500/50 resize-none transition-all"
                placeholder="Jot down your observations here..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
           </GlassCard>

        </div>

        {/* Right Column: Stats & Certs */}
        <div className="space-y-8">
            
            {/* Progress Stats */}
            <GlassCard className="p-6" color="emerald">
                <h2 className="text-xl font-bold text-white mb-6">Subject Progress</h2>
                <div className="space-y-6">
                    {Object.entries(progress).map(([subj, val]) => (
                        <div key={subj}>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="capitalize text-gray-300">{subj}</span>
                                <span className="text-emerald-400 font-bold">{val}%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                                <div 
                                    className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" 
                                    style={{width: `${val}%`}}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>

            {/* Certificates */}
            <GlassCard className="p-6" color="amber">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Award size={20} className="text-amber-400"/> Certificates
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <Award size={18} className="text-amber-400"/>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-white">Physics Master</h4>
                            <p className="text-xs text-gray-400">Completed 5 Labs</p>
                        </div>
                        <button onClick={() => handleDownloadCert("Physics Master")} className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded">
                            <Download size={16}/>
                        </button>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 opacity-50 cursor-not-allowed">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                            <Award size={18} className="text-gray-500"/>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-400">Chemistry Pro</h4>
                            <p className="text-xs text-gray-500">Locked (60% req)</p>
                        </div>
                    </div>
                </div>
            </GlassCard>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
