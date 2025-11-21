
import React from 'react';
import { Atom, Globe, ShieldCheck, Sparkles, Users, Zap, Award, BookOpen } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const About: React.FC = () => {
  return (
    <div className="pt-24 px-6 md:px-12 lg:px-32 min-h-screen pb-12">
       
       {/* Header */}
       <div className="text-center mb-16">
           <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">About Vijnana Lab</h1>
           <p className="text-gray-400 text-lg max-w-2xl mx-auto">
             Bridging the gap between theoretical knowledge and practical application through immersive digital experiences.
           </p>
       </div>
       
       <div className="space-y-16 max-w-6xl mx-auto">
         
         {/* Mission Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="inline-block p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                    <Atom className="text-blue-400 w-8 h-8" />
                </div>
                <h2 className="text-3xl font-display font-bold text-white">Our Mission</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                    Vijnana Lab aims to democratize practical education. We believe that every student, regardless of their access to physical infrastructure, deserves to experience the wonder of scientific discovery. By leveraging advanced web technologies and AI, we bring the laboratory to your fingertips.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    We are building a future where high-quality science education is accessible, safe, and engaging for everyone, everywhere.
                </p>
            </div>
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
                <GlassCard className="relative p-8 md:p-10 border-t border-l border-white/10" color="blue">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl text-center">
                            <div className="text-3xl font-bold text-white mb-1">10k+</div>
                            <div className="text-xs text-gray-400">Active Students</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl text-center">
                            <div className="text-3xl font-bold text-blue-400 mb-1">50+</div>
                            <div className="text-xs text-gray-400">Simulations</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-1">24/7</div>
                            <div className="text-xs text-gray-400">AI Support</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl text-center">
                            <div className="text-3xl font-bold text-green-400 mb-1">100%</div>
                            <div className="text-xs text-gray-400">Free Access</div>
                        </div>
                    </div>
                </GlassCard>
            </div>
         </div>

         {/* Features Grid */}
         <div>
             <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">Why Choose Vijnana Lab?</h2>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <GlassCard color="green" className="p-8">
                    <Zap className="text-green-400 w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Interactive Simulations</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Gone are the days of rote memorization. Manipulate variables, observe outcomes in real-time, and visualize abstract concepts like never before.
                    </p>
                </GlassCard>
                
                <GlassCard color="purple" className="p-8">
                    <Sparkles className="text-purple-400 w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">AI-Powered Guidance</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Our Gemini-integrated tutor provides instant feedback, safety tips, and theoretical explanations, acting as your personal lab assistant.
                    </p>
                </GlassCard>

                <GlassCard color="blue" className="p-8">
                    <ShieldCheck className="text-blue-400 w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Safe Environment</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Perform dangerous chemical reactions and complex physics experiments without the risk of burns, breakage, or exposure to hazardous materials.
                    </p>
                </GlassCard>

                <GlassCard color="amber" className="p-8">
                    <Globe className="text-amber-400 w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Multi-Language Support</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Learning science shouldn't be limited by language. Switch seamlessly between English, Hindi, and Kannada to learn in your preferred medium.
                    </p>
                </GlassCard>

                <GlassCard color="red" className="p-8">
                    <Award className="text-red-400 w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Progress Tracking</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Earn certificates, track your completion rates across subjects, and identify areas for improvement with our detailed dashboard.
                    </p>
                </GlassCard>

                <GlassCard color="cyan" className="p-8">
                    <BookOpen className="text-cyan-400 w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Curriculum Aligned</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Our labs are designed to align with standard Pre-University and High School curriculums (CBSE/State Boards) to directly support your academic goals.
                    </p>
                </GlassCard>
             </div>
         </div>

         {/* Vision Section */}
         <GlassCard className="p-10 text-center relative overflow-hidden" color="indigo">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
                <Users className="text-indigo-400 w-12 h-12 mx-auto mb-6" />
                <h2 className="text-3xl font-display font-bold text-white mb-6">Our Vision</h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    We envision a world where quality STEM education is not a privilege but a fundamental right. By removing physical barriers to entry, we hope to inspire the next generation of scientists, engineers, and innovators who will solve the world's biggest challenges.
                </p>
                <div className="flex justify-center gap-4">
                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">🚀 Innovation First</span>
                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">🎓 Student Centric</span>
                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">🌍 Global Access</span>
                </div>
            </div>
         </GlassCard>
       </div>
    </div>
  );
};

export default About;
