
import React from 'react';
import { Link } from 'react-router-dom';
import { SUBJECTS } from '../constants';
import GlassCard from '../components/GlassCard';
import { ArrowRight } from 'lucide-react';

const Subjects: React.FC = () => {
  return (
    <div className="pt-28 px-6 md:px-12 lg:px-20 min-h-screen">
        <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Virtual Laboratories</h1>
            <p className="text-gray-400 text-lg">Select a department to access equipment and simulations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
            {SUBJECTS.map((subject) => (
                <Link to={`/subjects/${subject.id}`} key={subject.id}>
                    <GlassCard className="flex flex-row items-center h-full gap-6 group" color={subject.color}>
                        <div 
                            className="w-24 h-24 min-w-[96px] rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: `${subject.hex}20`, border: `1px solid ${subject.hex}40` }}
                        >
                            <subject.icon size={40} style={{ color: subject.hex }} />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                {subject.name}
                                <ArrowRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" style={{color: subject.hex}}/>
                            </h2>
                            <p className="text-gray-400 text-sm mb-4">{subject.description}</p>
                            <div className="flex gap-2">
                                <span className="text-xs py-1 px-2 rounded bg-white/5 border border-white/10 text-gray-300">
                                    {subject.labs.length} Simulations
                                </span>
                            </div>
                        </div>
                    </GlassCard>
                </Link>
            ))}
        </div>
    </div>
  );
};

export default Subjects;
