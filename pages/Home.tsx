
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, FlaskConical, ShieldCheck, Trophy, Clock, Zap, Smile, GraduationCap, Users, Atom, Dna, Calculator, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import StudentToolkit from '../components/StudentToolkit';
import { Atom3D, FloatingFloatingElement } from '../components/ThreeDElements';
import { SUBJECTS } from '../constants';

// Fix for Framer Motion type definitions in strict environments
const MotionDiv = motion.div as any;

const Home: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (saved === 'light') {
          setIsDark(false);
          document.documentElement.classList.remove('dark');
      } else if (saved === 'dark') {
          setIsDark(true);
          document.documentElement.classList.add('dark');
      } else if (!prefersDark) {
          // System preference is light, but default was dark in code. 
          // We can default to system, or stick to dark default.
          // Let's stick to dark default unless explicitly light.
          setIsDark(true);
          document.documentElement.classList.add('dark');
      }
  }, []);

  const toggleTheme = () => {
      const newMode = !isDark;
      setIsDark(newMode);
      if (newMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
      } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
      }
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-12 relative overflow-hidden">
      
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="fixed top-24 right-6 z-50 p-3 rounded-full bg-white/10 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 shadow-lg backdrop-blur-md text-slate-700 dark:text-yellow-300 hover:scale-110 transition-all"
        title="Toggle Theme"
      >
          {isDark ? <Sun size={24} /> : <Moon size={24} className="text-slate-700" />}
      </button>

      {/* Ambient Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {[...Array(15)].map((_, i) => (
            <MotionDiv
              key={i}
              className="absolute rounded-full bg-blue-600/5 dark:bg-white/5 blur-sm"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0.3
              }}
              animate={{
                y: ["0%", "100%"],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
              }}
            />
         ))}
         {/* Floating Atoms Background */}
         <FloatingFloatingElement delay={0} x={20} y={20} className="top-20 left-10 text-blue-600/10 dark:text-blue-500/10">
            <Atom size={120} />
         </FloatingFloatingElement>
         <FloatingFloatingElement delay={2} x={-30} y={40} className="bottom-40 right-10 text-purple-600/10 dark:text-purple-500/10">
            <Dna size={150} />
         </FloatingFloatingElement>
      </div>

      {/* Hero Section */}
      <section className="relative w-full px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between mb-24 z-10">
        <div className="w-full md:w-1/2 z-10 space-y-6">
          <MotionDiv 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider mb-4 animate-pulse">
              NEXT GEN LEARNING
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-lg transition-colors">
              Experience Science <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient-x">
                Like Never Before.
              </span>
            </h1>
            
            <MotionDiv 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="border-l-4 border-blue-500 pl-4 my-4"
            >
                <h2 className="text-xl md:text-2xl font-light text-blue-600 dark:text-blue-200 italic transition-colors">
                    "Where learning becomes interactive, visual, and intelligent."
                </h2>
            </MotionDiv>

            <MotionDiv 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
            >
                <p className="text-lg text-slate-600 dark:text-gray-400 max-w-xl leading-relaxed transition-colors">
                Master PCMB & CS concepts with immersive 3D virtual labs, interactive simulations, and a personalized AI Tutor.
                </p>
            </MotionDiv>
            
            <div className="flex gap-4 mt-8">
              <Link to="/subjects">
                <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 flex items-center gap-2 group">
                    Start Learning <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </MotionDiv>
              </Link>
              <Link to="/tutor">
                 <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button className="px-8 py-4 rounded-full glass-panel text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/20 transition-all duration-300 flex items-center gap-2">
                    AI Tutor <Bot size={20} className="text-purple-600 dark:text-purple-400 animate-bounce" />
                    </button>
                </MotionDiv>
              </Link>
            </div>
          </MotionDiv>
        </div>

        {/* Right Side Animation (3D Atom) */}
        <div className="w-full md:w-1/2 h-[400px] md:h-[500px] relative flex justify-center items-center mt-12 md:mt-0">
            <MotionDiv 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="relative"
            >
                <Atom3D />

                {/* Floating Elements around Atom */}
                <FloatingFloatingElement delay={0} x={-20} y={-15} className="-top-4 -right-4">
                    <div className="glass-panel p-4 rounded-2xl border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)] backdrop-blur-xl">
                        <FlaskConical className="text-purple-600 dark:text-purple-400 w-8 h-8" />
                    </div>
                </FloatingFloatingElement>
                
                <FloatingFloatingElement delay={1.5} x={20} y={15} className="bottom-10 -left-12">
                    <div className="glass-panel p-4 rounded-2xl border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)] backdrop-blur-xl">
                        <div className="text-green-600 dark:text-green-400 font-mono font-bold text-xl">E=mc²</div>
                    </div>
                </FloatingFloatingElement>

                <FloatingFloatingElement delay={3} x={15} y={-10} className="top-1/2 -right-20">
                    <div className="glass-panel p-3 rounded-xl border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)] backdrop-blur-xl">
                         <Calculator className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                    </div>
                </FloatingFloatingElement>
            </MotionDiv>
        </div>
      </section>

      {/* Quick Tools Section */}
      <section className="px-6 md:px-12 lg:px-20 pb-12 z-10 relative">
        <StudentToolkit />
      </section>

      {/* Subjects Grid */}
      <section className="px-6 md:px-12 lg:px-20 py-16 z-10 relative">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-2 transition-colors">Explore Subjects</h2>
            <p className="text-slate-600 dark:text-gray-400 transition-colors">Select a discipline to enter the lab.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {SUBJECTS.map((subject, index) => (
            <Link to={`/subjects/${subject.id}`} key={subject.id}>
              <GlassCard 
                className="h-full flex flex-col items-center justify-center text-center p-8 group" 
                color={subject.color}
              >
                <div 
                    className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: `${subject.hex}20`, boxShadow: `0 0 30px ${subject.hex}40` }}
                >
                  <subject.icon size={32} style={{ color: subject.hex }} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 transition-colors">{subject.name}</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-3 transition-colors">{subject.description}</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Features / Promo */}
      <section className="px-6 md:px-12 lg:px-20 py-16 mb-12 z-10 relative">
        <GlassCard className="relative overflow-hidden !p-0" color="blue">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 animate-gradient-x"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center">
                <div className="p-12 md:w-2/3">
                    <h2 className="text-3xl font-display font-bold mb-4 text-slate-900 dark:text-white">Stuck on a complex problem?</h2>
                    <p className="text-slate-700 dark:text-gray-300 mb-8 text-lg">Our Gemini-powered AI Tutor is available 24/7 to help you understand derivations, logic, and reactions.</p>
                    <Link to="/tutor">
                        <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <button className="px-6 py-3 bg-blue-600 dark:bg-white text-white dark:text-blue-900 font-bold rounded-xl hover:bg-blue-700 dark:hover:bg-gray-100 transition-colors shadow-lg">
                                Ask AI Tutor
                            </button>
                        </MotionDiv>
                    </Link>
                </div>
                <div className="md:w-1/3 flex justify-center p-8">
                    <MotionDiv animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                        <Bot size={120} className="text-slate-800 dark:text-white/80 drop-shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                    </MotionDiv>
                </div>
            </div>
        </GlassCard>
      </section>

      {/* Why Students & Teachers Love This Lab */}
      <section className="px-6 md:px-12 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative">
        
        {/* Students */}
        <GlassCard className="p-8 md:p-10 relative overflow-hidden group" color="purple">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700 text-purple-600 dark:text-white">
                 <Trophy size={120} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <Smile className="text-purple-600 dark:text-purple-400" size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white">Students Love It</h2>
                </div>
                
                <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 mt-1">
                            <ShieldCheck className="text-green-600 dark:text-green-400" size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1">No Fear of Failure</h3>
                            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">Explode virtual beakers or mess up circuits without any real-world consequences. It's the safest place to learn.</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 mt-1">
                            <Zap className="text-yellow-600 dark:text-yellow-400" size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1">Gamified Learning</h3>
                            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">Interactive simulations and instant feedback make mastering complex concepts feel like playing a video game.</p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 mt-1">
                            <Clock className="text-blue-600 dark:text-blue-400" size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1">Learn Anytime</h3>
                            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">The lab is open 24/7. Practice experiments at 2 AM or right before your exam.</p>
                        </div>
                    </div>
                </div>
            </div>
        </GlassCard>

        {/* Teachers */}
         <GlassCard className="p-8 md:p-10 relative overflow-hidden group" color="emerald">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700 text-emerald-600 dark:text-white">
                 <GraduationCap size={120} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Users className="text-emerald-600 dark:text-emerald-400" size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white">Teachers Love It</h2>
                </div>
                
                <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 mt-1">
                            <Clock className="text-yellow-600 dark:text-yellow-400" size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1">Zero Setup Time</h3>
                            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">Skip the tedious apparatus arrangement. Start the class instantly and cover more syllabus in less time.</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 mt-1">
                            <ShieldCheck className="text-blue-600 dark:text-blue-400" size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1">100% Safety</h3>
                            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">Eliminate risks of chemical burns or broken glass. Perfect for large classes where monitoring everyone is hard.</p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 mt-1">
                            <Bot className="text-purple-600 dark:text-purple-400" size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1">AI Co-Pilot</h3>
                            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">Our AI Tutor handles basic doubts and conceptual clarifications, letting you focus on advanced mentoring.</p>
                        </div>
                    </div>
                </div>
            </div>
        </GlassCard>

      </section>

    </div>
  );
};

export default Home;
