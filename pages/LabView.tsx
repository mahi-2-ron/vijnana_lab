import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SUBJECTS } from '../constants';
import { 
  ChevronRight, AlertTriangle, BookOpen, Activity, Eye, Play, 
  Save, RefreshCw, Volume2, Languages, FileText, HelpCircle, CheckCircle, GraduationCap, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SimulationStage from '../components/SimulationStage';

// Fix for Framer Motion type definitions in strict environments
const MotionDiv = motion.div as any;

const LabView: React.FC = () => {
  const { subjectId, labId } = useParams<{ subjectId: string; labId: string }>();
  const [activeTab, setActiveTab] = useState<'aim' | 'theory' | 'procedure' | 'simulation' | 'observation' | 'viva' | 'quiz' | 'applications'>('aim');
  const [lang, setLang] = useState<'en' | 'hi' | 'kn'>('en');
  const [teacherMode, setTeacherMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const subject = SUBJECTS.find(s => s.id === subjectId);
  const lab = subject?.labs.find(l => l.id === labId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [labId]);

  if (!subject || !lab) return <Navigate to="/subjects" replace />;

  const tabs = [
    { id: 'aim', label: { en: 'Aim & Eq', hi: 'उद्देश्य', kn: 'ಗುರಿ' }, icon: GraduationCap },
    { id: 'theory', label: { en: 'Theory', hi: 'सिद्धांत', kn: 'ಸಿದ್ಧಾಂತ' }, icon: BookOpen },
    { id: 'procedure', label: { en: 'Procedure', hi: 'प्रक्रिया', kn: 'ವಿಧಾನ' }, icon: Activity },
    { id: 'simulation', label: { en: 'Simulation', hi: 'सिमुलेशन', kn: 'ಸಿಮ್ಯುಲೇಶನ್' }, icon: Play },
    { id: 'observation', label: { en: 'Observation', hi: 'अवलोकन', kn: 'ವೀಕ್ಷಣೆ' }, icon: Eye },
    { id: 'applications', label: { en: 'Real World', hi: 'वास्तविक दुनिया', kn: 'ನೈಜ ಜಗತ್ತು' }, icon: Globe },
    { id: 'viva', label: { en: 'Viva Voce', hi: 'मौखिक', kn: 'ಮೌಖಿಕ' }, icon: HelpCircle },
    { id: 'quiz', label: { en: 'Quiz', hi: 'प्रश्नोत्तरी', kn: 'ರಸಪ್ರಶ್ನೆ' }, icon: CheckCircle },
  ];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleQuizSubmit = () => {
    setShowQuizResult(true);
  };

  return (
    <div className="pt-20 min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f172a] overflow-hidden font-sans transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-white/5 backdrop-blur-md px-6 py-3 flex justify-between items-center z-20">
         <div className="flex items-center text-sm text-slate-500 dark:text-gray-400 overflow-hidden whitespace-nowrap">
            <Link to="/" className="hover:text-slate-900 dark:hover:text-white">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to="/subjects" className="hover:text-slate-900 dark:hover:text-white">Subjects</Link>
            <ChevronRight size={14} className="mx-2" />
            <span style={{ color: subject.hex }} className="font-medium">{subject.name}</span>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-slate-900 dark:text-white truncate">{lab.title}</span>
         </div>
         
         <div className="flex items-center gap-4">
            <button 
                onClick={() => setTeacherMode(!teacherMode)}
                className={`text-xs px-2 py-1 rounded border transition-colors ${
                    teacherMode 
                    ? 'bg-blue-600 border-blue-400 text-white' 
                    : 'border-slate-300 dark:border-gray-600 text-slate-500 dark:text-gray-400 hover:border-slate-400 dark:hover:border-gray-500'
                }`}
            >
                {teacherMode ? 'Teacher Mode On' : 'Student Mode'}
            </button>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 rounded-full px-3 py-1 border border-slate-200 dark:border-white/10">
                <Languages size={14} className="text-slate-500 dark:text-gray-300" />
                <select 
                    value={lang} 
                    onChange={(e) => setLang(e.target.value as any)}
                    className="bg-transparent text-xs text-slate-700 dark:text-white focus:outline-none cursor-pointer"
                >
                    <option value="en" className="bg-white dark:bg-slate-800">English</option>
                    <option value="hi" className="bg-white dark:bg-slate-800">Hindi</option>
                    <option value="kn" className="bg-white dark:bg-slate-800">Kannada</option>
                </select>
            </div>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 min-h-0 relative">
        
        {/* Sidebar / Tabs */}
        <div className="lg:w-64 bg-white/50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-white/5 flex lg:flex-col overflow-x-auto lg:overflow-y-auto scrollbar-hide shrink-0">
            <div className="p-4 hidden lg:block">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight transition-colors">{lab.title}</h1>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">{lab.difficulty} • {lab.duration}</p>
            </div>
            
            <nav className="flex lg:flex-col p-2 lg:p-4 gap-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`
                            flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap
                            ${activeTab === tab.id 
                                ? 'bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white shadow-sm border border-slate-300 dark:border-white/10' 
                                : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                            }
                        `}
                        style={activeTab === tab.id ? { borderLeft: `4px solid ${subject.hex}` } : {}}
                    >
                        <tab.icon size={18} style={activeTab === tab.id ? { color: subject.hex } : {}} />
                        <span>{tab.label[lang]}</span>
                    </button>
                ))}
            </nav>

            {teacherMode && (
                 <div className="mt-auto p-4 border-t border-slate-200 dark:border-white/10 bg-blue-50 dark:bg-blue-900/20">
                    <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-2">Teacher Controls</h3>
                    <button className="w-full mb-2 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors">Assign to Class</button>
                    <button className="w-full py-2 rounded border border-blue-400/30 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:text-white text-xs transition-colors">Download Worksheet</button>
                 </div>
            )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative bg-white dark:bg-slate-950 flex flex-col min-w-0 transition-colors">
            
            {/* Toolbar */}
            <div className="h-12 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-6 bg-slate-50/50 dark:bg-white/[0.02]">
                <span className="text-xs text-slate-500 dark:text-gray-500 uppercase tracking-wider font-bold">Virtual Lab Workspace</span>
                <div className="flex gap-3">
                     {activeTab === 'theory' && (
                        <button onClick={() => speakText(lab.content?.theory || '')} className="p-1.5 hover:bg-slate-200 dark:hover:bg-white/10 rounded text-slate-400 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white" title="Read Aloud">
                            <Volume2 size={16} />
                        </button>
                     )}
                </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    
                    {/* AIM & REQUIREMENTS */}
                    {activeTab === 'aim' && (
                        <MotionDiv 
                            key="aim"
                            initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}
                            className="absolute inset-0 overflow-y-auto p-6 md:p-10 custom-scrollbar"
                        >
                            <div className="max-w-3xl mx-auto space-y-8">
                                <section>
                                    <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-white/10 pb-2">Aim</h2>
                                    <p className="text-lg text-slate-700 dark:text-gray-300 leading-relaxed">{lab.content?.aim}</p>
                                </section>

                                {lab.content?.objectives && (
                                    <section>
                                        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-white/10 pb-2">Learning Objectives</h2>
                                        <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-gray-300 text-lg">
                                            {lab.content.objectives.map((obj, i) => (
                                                <li key={i}>{obj}</li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                <section>
                                    <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-white/10 pb-2">Requirements</h2>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {lab.content?.requirements?.map((req, i) => (
                                            <li key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: subject.hex }}></div>
                                                <span className="text-slate-700 dark:text-gray-300">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                                <button onClick={() => setActiveTab('theory')} className="mt-8 px-6 py-3 rounded-full bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 text-white font-medium flex items-center gap-2 transition-colors">
                                    Next: Theory <ChevronRight size={16} />
                                </button>
                            </div>
                        </MotionDiv>
                    )}

                    {/* THEORY */}
                    {activeTab === 'theory' && (
                        <MotionDiv 
                            key="theory"
                            initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}
                            className="absolute inset-0 overflow-y-auto p-6 md:p-10 custom-scrollbar"
                        >
                             <div className="max-w-3xl mx-auto pb-12">
                                <h2 className="text-3xl font-display font-bold mb-6" style={{color: subject.hex}}>Theoretical Background</h2>
                                <div className="text-slate-700 dark:text-gray-300 text-lg leading-relaxed space-y-6">
                                    {lab.content?.theory?.split('\n').map((para, i) => (
                                        para.trim() && <p key={i}>{para}</p>
                                    ))}
                                </div>
                                <button onClick={() => setActiveTab('procedure')} className="mt-8 px-6 py-3 rounded-full bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 text-white font-medium flex items-center gap-2 transition-colors">
                                    Next: Procedure <ChevronRight size={16} />
                                </button>
                            </div>
                        </MotionDiv>
                    )}

                    {/* PROCEDURE */}
                    {activeTab === 'procedure' && (
                         <MotionDiv 
                            key="procedure"
                            initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}
                            className="absolute inset-0 overflow-y-auto p-6 md:p-10 custom-scrollbar"
                        >
                            <div className="max-w-3xl mx-auto pb-12">
                                {lab.content?.safety && (
                                    <div className="mb-8 p-6 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/20">
                                        <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                                            <AlertTriangle size={20} /> Safety Precautions
                                        </h3>
                                        <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-gray-300">
                                            {lab.content.safety.map((s, i) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>
                                )}

                                <h2 className="text-3xl font-display font-bold mb-8" style={{color: subject.hex}}>Step-by-Step Procedure</h2>
                                <div className="space-y-4">
                                    {lab.content?.procedure?.map((step, index) => (
                                        <div key={index} className="flex gap-5 p-5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-lg" style={{backgroundColor: subject.hex}}>
                                                {index + 1}
                                            </div>
                                            <p className="text-slate-700 dark:text-gray-200 text-lg leading-relaxed">{step}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-12 flex justify-center">
                                    <button 
                                        onClick={() => setActiveTab('simulation')}
                                        className="px-8 py-4 rounded-full font-bold text-white flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-blue-500/20"
                                        style={{backgroundColor: subject.hex}}
                                    >
                                        <Play size={20} fill="currentColor" /> Start Simulation
                                    </button>
                                </div>
                            </div>
                        </MotionDiv>
                    )}

                    {/* SIMULATION */}
                    {activeTab === 'simulation' && (
                        <MotionDiv 
                            key="simulation"
                            initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                            className="absolute inset-0 flex flex-col"
                        >
                            <div className="flex-1 relative">
                                <SimulationStage 
                                    subjectId={subject.id} 
                                    labId={lab.id} 
                                    hex={subject.hex} 
                                    isActive={activeTab === 'simulation'} 
                                />
                            </div>
                        </MotionDiv>
                    )}

                     {/* APPLICATIONS */}
                    {activeTab === 'applications' && (
                        <MotionDiv 
                            key="applications"
                            initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}
                            className="absolute inset-0 overflow-y-auto p-6 md:p-10 custom-scrollbar"
                        >
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-3xl font-display font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-3">
                                    <Globe className="text-blue-500 dark:text-blue-400" size={32}/> Real-World Applications
                                </h2>
                                {lab.content?.realWorldApplications ? (
                                    <div className="grid gap-6">
                                        {lab.content.realWorldApplications.map((app, index) => (
                                            <div key={index} className="bg-slate-100 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex gap-4 items-start">
                                                <div className="mt-1 w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400 font-bold">
                                                    {index + 1}
                                                </div>
                                                <p className="text-slate-700 dark:text-gray-200 text-lg leading-relaxed">{app}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center p-12 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                                        <p className="text-slate-500 dark:text-gray-400">Content coming soon...</p>
                                    </div>
                                )}
                            </div>
                        </MotionDiv>
                    )}


                    {/* VIVA */}
                    {activeTab === 'viva' && (
                        <MotionDiv 
                            key="viva"
                            initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}}
                            className="absolute inset-0 overflow-y-auto p-6 md:p-10 custom-scrollbar"
                        >
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-3xl font-display font-bold mb-8 text-slate-900 dark:text-white">Viva Voce</h2>
                                <div className="space-y-6">
                                    {lab.content?.vivaQuestions?.map((q, i) => (
                                        <div key={i} className="bg-slate-100 dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10">
                                            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-2">Q{i+1}: {q.question}</h3>
                                            <div className="mt-2 text-slate-600 dark:text-gray-400 text-sm italic border-l-2 border-slate-400 dark:border-gray-600 pl-3">
                                                Ans: {q.answer}
                                            </div>
                                        </div>
                                    )) || <p className="text-slate-500 dark:text-gray-500">No viva questions available.</p>}
                                </div>
                            </div>
                        </MotionDiv>
                    )}

                    {/* QUIZ */}
                    {activeTab === 'quiz' && (
                        <MotionDiv 
                            key="quiz"
                            initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}}
                            className="absolute inset-0 overflow-y-auto p-6 md:p-10 custom-scrollbar"
                        >
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-3xl font-display font-bold mb-8 text-slate-900 dark:text-white">Post-Lab Quiz</h2>
                                {lab.content?.quizQuestions ? (
                                    <div className="space-y-8">
                                        {lab.content.quizQuestions.map((q, i) => (
                                            <div key={q.id} className="bg-slate-100 dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10">
                                                <p className="text-lg font-medium text-slate-900 dark:text-white mb-4">{i+1}. {q.question}</p>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {q.options.map((opt, optIdx) => (
                                                        <button
                                                            key={optIdx}
                                                            onClick={() => !showQuizResult && setQuizAnswers({...quizAnswers, [q.id]: optIdx})}
                                                            className={`text-left p-3 rounded-lg transition-all border ${
                                                                showQuizResult 
                                                                    ? optIdx === q.correctIndex 
                                                                        ? 'bg-green-100 dark:bg-green-500/20 border-green-500 text-green-700 dark:text-green-300'
                                                                        : quizAnswers[q.id] === optIdx
                                                                            ? 'bg-red-100 dark:bg-red-500/20 border-red-500 text-red-700 dark:text-red-300'
                                                                            : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-500'
                                                                    : quizAnswers[q.id] === optIdx 
                                                                        ? 'bg-blue-600 text-white border-blue-500' 
                                                                        : 'bg-white dark:bg-white/5 text-slate-700 dark:text-gray-300 border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10'
                                                            }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                        {!showQuizResult ? (
                                            <button onClick={handleQuizSubmit} className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg shadow-lg">
                                                Submit Quiz
                                            </button>
                                        ) : (
                                            <div className="p-6 bg-green-100 dark:bg-green-900/20 border border-green-500/30 rounded-xl text-center">
                                                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Quiz Completed!</p>
                                                <button onClick={() => {setShowQuizResult(false); setQuizAnswers({})}} className="text-sm underline text-slate-500 dark:text-gray-400">Retake</button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 dark:text-gray-500">No quiz available for this lab.</p>
                                )}
                            </div>
                        </MotionDiv>
                    )}

                    {/* OBSERVATION */}
                    {activeTab === 'observation' && (
                        <MotionDiv 
                            key="observation"
                            initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}}
                            className="absolute inset-0 overflow-y-auto p-6 md:p-10 custom-scrollbar"
                        >
                             <div className="max-w-5xl mx-auto pb-12">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Observations</h2>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-900/20">
                                        <Save size={18}/> Export Report
                                    </button>
                                </div>
                                
                                {lab.content?.observationTable ? (
                                    <div className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
                                        <table className="w-full text-left">
                                            <thead className="bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 uppercase text-xs font-bold">
                                                <tr>
                                                    <th className="p-4 border-b border-slate-200 dark:border-white/10 w-16">#</th>
                                                    {lab.content.observationTable.columns.map((col, i) => (
                                                        <th key={i} className="p-4 border-b border-slate-200 dark:border-white/10">{col}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-gray-300">
                                                {Array.from({ length: lab.content.observationTable.rows || 5 }).map((_, r) => (
                                                    <tr key={r} className="hover:bg-slate-50 dark:hover:bg-white/5">
                                                        <td className="p-4 font-mono text-slate-500 dark:text-gray-500">{r + 1}</td>
                                                        {lab.content!.observationTable!.columns.map((col, c) => (
                                                            <td key={c} className="p-4">
                                                                <input className="bg-transparent border border-slate-300 dark:border-white/20 rounded px-2 py-1 w-full focus:border-blue-500 focus:outline-none text-sm text-slate-900 dark:text-white" placeholder="..." />
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center p-16 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-gray-400 flex flex-col items-center">
                                         <FileText size={48} className="mb-4 opacity-50" />
                                         <h3 className="text-lg font-medium text-slate-900 dark:text-white">No Structured Table</h3>
                                         <p className="max-w-md mt-2 text-sm">This simulation does not require a standard observation table. Please record your qualitative findings in your notebook.</p>
                                    </div>
                                )}
                            </div>
                        </MotionDiv>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LabView;