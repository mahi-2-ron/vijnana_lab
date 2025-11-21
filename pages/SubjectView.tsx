import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SUBJECTS } from '../constants';
import GlassCard from '../components/GlassCard';
import { Clock, BarChart, Play } from 'lucide-react';

const SubjectView: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subject = SUBJECTS.find(s => s.id === subjectId);

  if (!subject) {
    return <Navigate to="/subjects" replace />;
  }

  return (
    <div className="pt-28 px-6 md:px-12 lg:px-20 min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300">
        {/* Header */}
        <div className="mb-12 relative overflow-hidden glass-panel rounded-3xl p-8 md:p-12 border-none">
            <div 
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -mr-20 -mt-20 opacity-20"
                style={{ backgroundColor: subject.hex }}
            ></div>
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/5">
                        <subject.icon size={32} style={{ color: subject.hex }} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white transition-colors">{subject.name} Lab</h1>
                </div>
                <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl transition-colors">{subject.description}</p>
            </div>
        </div>

        {/* Filters & Search (Visual Only) */}
        <div className="flex flex-wrap gap-4 mb-8">
            {['All', 'Easy', 'Medium', 'Hard'].map((filter, idx) => (
                <button 
                    key={filter}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        idx === 0 
                        ? `bg-[${subject.hex}] text-white shadow-lg shadow-${subject.color}-500/30` 
                        : 'glass-panel text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10'
                    }`}
                    style={idx === 0 ? { backgroundColor: subject.hex, textShadow: '0 1px 2px rgba(0,0,0,0.3)' } : {}}
                >
                    {filter}
                </button>
            ))}
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {subject.labs.map((lab) => (
                <GlassCard key={lab.id} className="flex flex-col h-full group" color={subject.color}>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-500 border border-slate-300 dark:border-gray-700 px-2 py-1 rounded">
                            {lab.category}
                        </span>
                        <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                            style={{ backgroundColor: `${subject.hex}20` }}
                        >
                            <Play size={16} style={{ color: subject.hex, fill: subject.hex }} />
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[${subject.hex}] transition-colors">
                        {lab.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400 mb-6 flex-1">{lab.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-gray-500 border-t border-slate-200 dark:border-white/5 pt-4">
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{lab.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <BarChart size={14} />
                            <span className={
                                lab.difficulty === 'Easy' ? 'text-green-600 dark:text-green-400' : 
                                lab.difficulty === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                            }>
                                {lab.difficulty}
                            </span>
                        </div>
                    </div>
                    <Link to={`/subjects/${subject.id}/${lab.id}`} className="absolute inset-0" />
                </GlassCard>
            ))}
        </div>
    </div>
  );
};

export default SubjectView;