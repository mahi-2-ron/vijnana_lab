import React from 'react';
import GlassCard from '../components/GlassCard';

const Contact: React.FC = () => {
  return (
    <div className="pt-28 px-6 flex justify-center min-h-screen">
        <GlassCard className="w-full max-w-lg h-fit p-8" color="blue">
            <h1 className="text-3xl font-display font-bold text-white mb-2">Get in Touch</h1>
            <p className="text-gray-400 mb-8">Have questions or suggestions? We'd love to hear from you.</p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500/50" placeholder="Your Name" />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500/50" placeholder="your@email.com" />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Message</label>
                    <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500/50 h-32" placeholder="How can we help?" />
                </div>
                <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30 transition-all">
                    Send Message
                </button>
            </form>
        </GlassCard>
    </div>
  );
};

export default Contact;
