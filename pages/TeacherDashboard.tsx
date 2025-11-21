
import React, { useState } from 'react';
import { Users, Plus, FileText, MessageSquare, Download, Search, CheckCircle, Send, Trash2, Upload, Cloud, UserPlus } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const TeacherDashboard: React.FC = () => {
  // Mock Data State
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Sharma", grade: "12-A", progress: 85, status: "Active" },
    { id: 2, name: "Priya Patel", grade: "12-A", progress: 92, status: "Active" },
    { id: 3, name: "Amit Singh", grade: "12-B", progress: 45, status: "Late" },
    { id: 4, name: "Sneha Gupta", grade: "11-A", progress: 78, status: "Active" },
    { id: 5, name: "Vikram Malhotra", grade: "11-B", progress: 30, status: "Inactive" },
  ]);

  const [doubts, setDoubts] = useState([
    { id: 1, studentId: "RS", name: "Rahul Sharma", question: "Sir, I'm getting a parallax error in the optics lab simulation. How do I fix it?", time: "2m ago" },
    { id: 2, studentId: "SG", name: "Sneha Gupta", question: "Can we submit the Salt Analysis report by tomorrow evening?", time: "15m ago" }
  ]);

  const [assignments, setAssignments] = useState([
      { id: 1, title: "Physics Lab 01", grade: "12-A", submitted: 42, total: 45, due: "Tomorrow" }
  ]);

  const [classes, setClasses] = useState(["12-A", "12-B", "11-A"]);

  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);

  // Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReplyDoubt = (id: number) => {
      // Simulate replying and removing doubt from list
      const updated = doubts.filter(d => d.id !== id);
      setDoubts(updated);
      alert("Reply sent successfully!");
  };

  const handleCreateClass = () => {
      const name = prompt("Enter new class name (e.g., 10-C):");
      if (name) {
          setClasses([...classes, name]);
          alert(`Class Group '${name}' created successfully.`);
      }
  };

  const handleAssignLab = () => {
      const title = prompt("Enter Lab Title (e.g., Chemistry - Titration):");
      if(title) {
          const newAssignment = {
              id: Date.now(),
              title: title,
              grade: "12-A", // Defaulting for demo
              submitted: 0,
              total: 45,
              due: "Next Week"
          };
          setAssignments([newAssignment, ...assignments]);
      }
  };

  const handleUpload = () => {
      setUploading(true);
      setTimeout(() => {
          setUploading(false);
          alert("Lecture notes uploaded successfully!");
      }, 1500);
  };

  const handleDownloadReport = () => {
      const text = "CLASS REPORT - 2024\n\nAverage Performance: Good\nTop Student: Priya Patel\n\nVijnana Lab Analytics";
      const element = document.createElement("a");
      const file = new Blob([text], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "Class_Report_2024.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
  };

  return (
    <div className="pt-24 px-6 md:px-12 lg:px-20 min-h-screen pb-12">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
             <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Teacher Dashboard</h1>
             <p className="text-gray-400">Manage your classes, assignments, and student progress.</p>
        </div>
        <div className="flex gap-4">
            <button 
                onClick={handleCreateClass}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
                <Plus size={18}/> Create Class
            </button>
            <button 
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold flex items-center gap-2 transition-all"
            >
                <UserPlus size={18} className="text-gray-400"/> Invite Students
            </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         <GlassCard className="p-6" color="blue">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-400 text-sm mb-1">Total Students</p>
                    <h3 className="text-3xl font-bold text-white">{students.length}</h3>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400"><Users size={24}/></div>
            </div>
         </GlassCard>
         <GlassCard className="p-6" color="green">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-400 text-sm mb-1">Avg. Completion</p>
                    <h3 className="text-3xl font-bold text-white">76%</h3>
                </div>
                <div className="p-3 rounded-xl bg-green-500/20 text-green-400"><CheckCircle size={24}/></div>
            </div>
         </GlassCard>
         <GlassCard className="p-6" color="purple">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-400 text-sm mb-1">Pending Doubts</p>
                    <h3 className="text-3xl font-bold text-white">{doubts.length}</h3>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400"><MessageSquare size={24}/></div>
            </div>
         </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Student Table */}
        <div className="lg:col-span-2">
            <GlassCard className="p-6 h-full" color="gray">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Student Performance</h2>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                        <input 
                            type="text" 
                            placeholder="Search student..." 
                            value={searchQuery}
                            onChange={handleSearch}
                            className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-blue-500 transition-colors w-48 focus:w-64"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs text-gray-500 uppercase border-b border-white/10">
                                <th className="pb-4 pl-4">Student Name</th>
                                <th className="pb-4">Grade</th>
                                <th className="pb-4">Progress</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {filteredStudents.length > 0 ? filteredStudents.map(student => (
                                <tr key={student.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 pl-4 font-medium text-white">{student.name}</td>
                                    <td className="py-4 text-gray-400">{student.grade}</td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 bg-white/10 rounded-full h-1.5">
                                                <div className="bg-blue-500 h-1.5 rounded-full" style={{width: `${student.progress}%`}}></div>
                                            </div>
                                            <span className="text-xs text-gray-400">{student.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            student.status === 'Active' ? 'bg-green-500/10 text-green-400' :
                                            student.status === 'Late' ? 'bg-red-500/10 text-red-400' : 'bg-gray-500/10 text-gray-400'
                                        }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-gray-400 hover:text-white cursor-pointer">
                                        <button className="text-xs bg-white/5 px-2 py-1 rounded hover:bg-white/20">Give Feedback</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-500">No students found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 text-center">
                    <button className="text-sm text-blue-400 hover:underline">View All Students</button>
                </div>
            </GlassCard>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-8">
            
            {/* Manage Assignments */}
            <GlassCard className="p-6" color="amber">
                <h2 className="text-xl font-bold text-white mb-4">Assignments</h2>
                <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-hide">
                    {assignments.map(assign => (
                        <div key={assign.id} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
                            <div className="flex justify-between mb-2">
                                <h4 className="font-bold text-white text-sm">{assign.title}</h4>
                                <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded">Due {assign.due}</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-3">{assign.grade} • {assign.submitted}/{assign.total} Submitted</p>
                            <div className="w-full bg-white/10 rounded-full h-1">
                                <div className="bg-amber-500 h-1 rounded-full" style={{width: `${(assign.submitted/assign.total)*100}%`}}></div>
                            </div>
                        </div>
                    ))}
                    
                    <button 
                        onClick={handleAssignLab}
                        className="w-full py-3 rounded-lg border border-dashed border-gray-500 text-gray-400 hover:border-amber-400 hover:text-amber-400 transition-colors flex items-center justify-center gap-2 text-sm group"
                    >
                        <Plus size={16} className="group-hover:rotate-90 transition-transform"/> Assign New Experiment
                    </button>
                </div>
            </GlassCard>

            {/* Doubts / Queries */}
            <GlassCard className="p-6" color="red">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Doubts</h2>
                    {doubts.length > 0 && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">{doubts.length} New</span>}
                </div>
                <div className="space-y-4">
                    {doubts.length > 0 ? doubts.map(doubt => (
                        <div key={doubt.id} className="bg-white/5 p-3 rounded-xl border border-white/10">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                    {doubt.studentId}
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-gray-300">{doubt.name}</span>
                                        <span className="text-[10px] text-gray-500">{doubt.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-300 line-clamp-2 mb-2">"{doubt.question}"</p>
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => handleReplyDoubt(doubt.id)}
                                            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                        >
                                            <Send size={10}/> Reply
                                        </button>
                                        <button className="text-xs text-gray-500 hover:text-white">Ignore</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-4 text-gray-500 text-sm">No pending doubts!</div>
                    )}
                </div>
            </GlassCard>
            
            {/* Resources */}
             <GlassCard className="p-6" color="indigo">
                <h2 className="text-xl font-bold text-white mb-4">Class Resources</h2>
                <button 
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full py-3 bg-indigo-600/20 hover:bg-indigo-600/30 rounded-lg border border-indigo-500/30 text-indigo-300 flex items-center justify-center gap-2 text-sm mb-3 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
                >
                    {uploading ? <Cloud size={16} className="animate-bounce"/> : <Upload size={16}/>} 
                    {uploading ? "Uploading..." : "Upload Lecture Notes"}
                </button>
                <button 
                    onClick={handleDownloadReport}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-gray-300 flex items-center justify-center gap-2 text-sm transition-all"
                >
                    <Download size={16}/> Download Class Report
                </button>
            </GlassCard>

        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
