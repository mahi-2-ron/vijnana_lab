
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, Pause, RotateCcw, Settings, ZoomIn, ChevronRight, Check, 
    Zap, Thermometer, Activity, Eye, Beaker, Info, MousePointer2, 
    Dna, FlaskConical, Calculator, Ruler, Monitor, Plus, Minus, RefreshCw,
    Lightbulb, AlertTriangle, Gauge, ArrowRight, MoveHorizontal, Search, GripVertical,
    Flame, Droplets, Layers, Timer, Microscope, Grid, Scan, ArrowLeft, Cpu, BarChart, Move
} from 'lucide-react';

interface SimulationStageProps {
  subjectId: string;
  labId: string;
  hex: string;
  isActive: boolean;
}

// Fix for Framer Motion type definitions in strict environments
const MotionDiv = motion.div as any;

// --- SHARED COMPONENTS ---

const Tooltip = ({ text, children }: { text: string, children?: React.ReactNode }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative flex items-center justify-center" onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
            {children}
            <AnimatePresence>
                {show && (
                    <MotionDiv 
                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="absolute bottom-full mb-2 px-3 py-1.5 bg-slate-800/90 backdrop-blur border border-white/10 text-xs text-white rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none"
                    >
                        {text}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800/90"></div>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- RICH PROCEDURAL ENGINE ---

interface SimStep {
    step: number;
    instruction: string;
    user_action: string;
    icon?: React.ReactNode;
    animation?: string;
    output_change?: string;
}

interface UniversalScenario {
    title: string;
    color: string;
    simulation_steps: SimStep[];
    interactive_controls?: {
        buttons: string[];
        inputs: string[];
    };
    tooltips?: string[];
    realtime_outputs?: string[];
    warnings?: string[];
    result_summary: string;
    fact?: string;
}

const RichProceduralLab = ({ 
    scenario 
}: { 
    scenario: UniversalScenario
}) => {
    const { title, simulation_steps, color, result_summary, fact, tooltips, warnings, realtime_outputs } = scenario;
    const [currentStep, setCurrentStep] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState("");
    const isComplete = currentStep >= simulation_steps.length;

    const handleAction = () => {
        if (isComplete) return;
        setAnimating(true);
        setFeedbackMsg(simulation_steps[currentStep].output_change || "Processing...");
        
        setTimeout(() => {
            setAnimating(false);
            setCurrentStep(p => p + 1);
            setFeedbackMsg("");
        }, 2000);
    };

    return (
        <div className="flex flex-col md:flex-row h-full w-full bg-slate-100 dark:bg-slate-900 transition-colors">
            {/* Visual Stage */}
            <div className="flex-1 relative p-8 flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 transition-all">
                {/* Warnings Overlay */}
                {warnings && warnings.length > 0 && (
                     <div className="absolute top-4 right-4 flex flex-col gap-2">
                         {warnings.map((w, i) => (
                             <div key={i} className="bg-red-500/20 border border-red-500/50 p-2 rounded-lg flex items-center gap-2 animate-pulse">
                                 <AlertTriangle size={14} className="text-red-600 dark:text-red-400"/>
                                 <span className="text-xs text-red-800 dark:text-red-200">{w}</span>
                             </div>
                         ))}
                     </div>
                )}

                {/* Realtime Outputs Overlay */}
                {realtime_outputs && realtime_outputs.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {realtime_outputs.map((o, i) => (
                            <div key={i} className="bg-white/60 dark:bg-black/40 backdrop-blur border border-slate-200 dark:border-white/10 p-2 rounded-lg flex items-center gap-2 shadow-sm">
                                <Gauge size={14} style={{color}}/>
                                <span className="text-xs font-mono text-slate-800 dark:text-white">{o}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-64 h-64 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 transition-all duration-500 bg-white dark:bg-white/5 ${animating ? 'scale-105 shadow-'+color+'/20' : ''}`}>
                        <MotionDiv 
                            key={currentStep}
                            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className="text-slate-700 dark:text-white/80"
                        >
                            {isComplete ? <Check size={80} style={{color}} /> : (simulation_steps[currentStep]?.icon || <Beaker size={80} style={{color}} />)}
                        </MotionDiv>
                        
                        {animating && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <RefreshCw className="animate-spin text-slate-800 dark:text-white mb-2" size={32} />
                                    <span className="text-xs font-bold text-slate-800 dark:text-white tracking-wider uppercase">{feedbackMsg}</span>
                                </div>
                            </div>
                        )}

                        {/* Progress Ring */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                            <circle cx="50%" cy="50%" r="120" fill="none" stroke="rgba(128,128,128,0.1)" strokeWidth="4" />
                            <circle 
                                cx="50%" cy="50%" r="120" fill="none" stroke={color} strokeWidth="4" 
                                strokeDasharray="754" 
                                strokeDashoffset={754 - (754 * (currentStep / simulation_steps.length))} 
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>

                        {/* Floating Tooltip Hints */}
                        {tooltips && !isComplete && !animating && (
                            <div className="absolute bottom-4 px-3 py-1 rounded-full bg-slate-800/90 dark:bg-white/10 text-[10px] text-white/90 dark:text-white/60 backdrop-blur border border-white/5 animate-bounce shadow-md">
                                {tooltips[currentStep % tooltips.length]}
                            </div>
                        )}
                    </div>
                    
                    {fact && (
                        <MotionDiv initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="mt-8 max-w-md bg-white/60 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/5 flex gap-3 items-start shadow-sm">
                            <Lightbulb size={20} className="text-yellow-500 dark:text-yellow-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase mb-1">Did You Know?</h4>
                                <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">{fact}</p>
                            </div>
                        </MotionDiv>
                    )}
                </div>
            </div>

            {/* Controls Panel */}
            <div className="w-full md:w-96 bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-white/10 flex flex-col transition-colors">
                <div className="p-6 border-b border-slate-200 dark:border-white/10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{title}</h2>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-400">
                        <span className={`px-2 py-0.5 rounded bg-${color}-100 dark:bg-${color}-500/10 text-${color}-600 dark:text-${color}-500 border border-${color}-200 dark:border-${color}-500/20`}>Simulation</span>
                        <span>Step {Math.min(currentStep + 1, simulation_steps.length)} of {simulation_steps.length}</span>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto">
                    {isComplete ? (
                        <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Lab Completed!</h3>
                            <p className="text-sm text-slate-600 dark:text-gray-400 mb-6">{result_summary}</p>
                            <button onClick={() => setCurrentStep(0)} className="text-sm text-green-600 dark:text-green-400 hover:underline flex items-center justify-center gap-1">
                                <RotateCcw size={14}/> Restart Experiment
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-5 border border-slate-200 dark:border-white/10">
                                <h3 className="text-sm font-bold text-slate-500 dark:text-gray-400 uppercase mb-3">Instruction</h3>
                                <p className="text-lg text-slate-800 dark:text-white font-medium leading-snug">{simulation_steps[currentStep].instruction}</p>
                            </div>
                            
                            <button 
                                onClick={handleAction}
                                disabled={animating}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] rounded-xl font-bold text-white shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                                style={{backgroundColor: color}}
                            >
                                {animating ? <RefreshCw className="animate-spin" /> : <MousePointer2 className="group-hover:-translate-y-1 transition-transform" />}
                                {simulation_steps[currentStep].user_action}
                            </button>
                            
                            <div className="text-center">
                                <button onClick={() => setCurrentStep(0)} className="text-xs text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center gap-1 mx-auto">
                                    <RotateCcw size={12} /> Reset Progress
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- SCENARIO DATABASE ---
const LAB_SCENARIOS: Record<string, UniversalScenario> = {
    // Physics Labs
    'p1': { 
        title: "Vernier Calipers", 
        color: "#3b82f6", 
        simulation_steps: [
            {step: 1, instruction: "Place the object between the jaws of the caliper.", user_action: "Place Object"},
            {step: 2, instruction: "Gently close the jaws using the thumb screw until they just touch the object.", user_action: "Close Jaws"},
            {step: 3, instruction: "Read the main scale reading (MSR) just before the zero of the vernier scale.", user_action: "Read MSR"},
            {step: 4, instruction: "Find the vernier scale division that aligns perfectly with any main scale division.", user_action: "Find Coincidence"},
            {step: 5, instruction: "Calculate the total reading: MSR + (VSD × LC).", user_action: "Calculate"}
        ],
        interactive_controls: {
            buttons: ["Place Object", "Close Jaws", "Take Reading", "Reset"],
            inputs: ["Object Diameter"]
        },
        result_summary: "Diameter of the object measured successfully.",
        fact: "Vernier calipers can measure with an accuracy of 0.1 mm or better, making them essential in precision engineering."
    },
    'p2': { 
        title: "Simple Pendulum", 
        color: "#3b82f6",
        simulation_steps: [
            {step: 1, instruction: "Measure the length of the pendulum from the point of suspension to the center of the bob.", user_action: "Measure Length"},
            {step: 2, instruction: "Displace the bob slightly (less than 10°) and release.", user_action: "Start Oscillation"},
            {step: 3, instruction: "Using a stopwatch, measure the time for 20 complete oscillations.", user_action: "Time Oscillations"},
            {step: 4, instruction: "Calculate the time period (T = total time/20).", user_action: "Calculate T"},
            {step: 5, instruction: "Repeat for different lengths and plot T² vs L to find 'g'.", user_action: "Plot Graph"}
        ],
        interactive_controls: {
            buttons: ["Start Timer", "Stop Timer", "Record Data", "Reset"],
            inputs: ["Pendulum Length (cm)", "Number of Oscillations"]
        },
        result_summary: "Acceleration due to gravity calculated from the slope of T² vs L graph.",
        fact: "The period of a simple pendulum is independent of its mass and amplitude (for small angles), a principle discovered by Galileo."
    },
    'p3': { 
        title: "Screw Gauge", 
        color: "#3b82f6",
        simulation_steps: [
            {step: 1, instruction: "Find the pitch and least count of the screw gauge.", user_action: "Find LC"},
            {step: 2, instruction: "Check for zero error and record it.", user_action: "Zero Error"},
            {step: 3, instruction: "Place the wire between the anvil and spindle.", user_action: "Place Wire"},
            {step: 4, instruction: "Gently rotate the ratchet until it slips.", user_action: "Tighten"},
            {step: 5, instruction: "Take main scale and circular scale readings.", user_action: "Take Reading"},
            {step: 6, instruction: "Calculate the diameter: MSR + (CSR × LC).", user_action: "Calculate"}
        ],
        interactive_controls: {
            buttons: ["Find LC", "Check Zero", "Measure Wire", "Reset"],
            inputs: ["Wire Thickness (mm)"]
        },
        result_summary: "Diameter of the wire measured with high precision.",
        fact: "A screw gauge can measure dimensions up to 0.01 mm, making it more precise than a Vernier caliper."
    },
    'm3': { title: "Unit Circle", color: "#8b5cf6", simulation_steps: [{step: 1, instruction: "Draw circle radius 1.", user_action: "Draw"}, {step: 2, instruction: "Mark point P(x,y).", user_action: "Mark"}, {step: 3, instruction: "Drop perpendicular.", user_action: "Measure"}], result_summary: "Sin² + Cos² = 1 verified." },
    'm4': { title: "Conics", color: "#8b5cf6", simulation_steps: [{step: 1, instruction: "Fix focus and directrix.", user_action: "Setup"}, {step: 2, instruction: "Plot points equidistant.", user_action: "Plot"}, {step: 3, instruction: "Trace locus.", user_action: "Trace"}], result_summary: "Parabola constructed." },
    'm5': { title: "Vectors", color: "#8b5cf6", simulation_steps: [{step: 1, instruction: "Define vector A.", user_action: "Vector A"}, {step: 2, instruction: "Define vector B.", user_action: "Vector B"}, {step: 3, instruction: "Compute Cross Product.", user_action: "Compute"}], result_summary: "Orthogonal vector obtained." },
    'cs5': { title: "Number Systems", color: "#94a3b8", simulation_steps: [ { step: 1, instruction: "Choose binary number 1010.", user_action: "Input", icon: <Monitor size={64} className="text-slate-400"/>, output_change: "Input: 1010" }, { step: 2, instruction: "Identify positions: 8, 4, 2, 1.", user_action: "Parse", icon: <Activity size={64} className="text-slate-400"/>, output_change: "Weights identified" }, { step: 3, instruction: "Sum weights of '1' bits: 8 + 2.", user_action: "Add", icon: <Calculator size={64} className="text-slate-400"/>, output_change: "Sum = 10" }, { step: 4, instruction: "Result is 10.", user_action: "Finish", icon: <Check size={64} className="text-slate-400"/>, output_change: "Conversion Done" } ], result_summary: "Binary 1010 equals Decimal 10.", fact: "Binary is base-2." }
};

// --- MAIN STAGE ---
const SimulationStage: React.FC<SimulationStageProps> = ({ subjectId, labId, hex, isActive }) => {
    const [running, setRunning] = useState(false);
    const requestRef = useRef<number>(0);
    
    // Physics State
    const [pendulum, setPendulum] = useState({ length: 1.0, angle: Math.PI/6, time: 0, period: 2.0 });
    const [circuit, setCircuit] = useState({ v: 2, r: 10 });
    const [vernier, setVernier] = useState({ pos: 0.00, objectWidth: 2.24, showObject: false, zeroError: 0.02, isDragging: false, dragStartX: 0, dragStartPos: 0 });
    const [micrometer, setMicrometer] = useState({ pos: 0, wireWidth: 2.45, showWire: false });
    const [optics, setOptics] = useState({ u: 40, f: 20, showImage: true });

    // Chemistry State
    const [titration, setTitration] = useState({ vol: 0, running: false, flaskColor: '#e2e8f0' }); // Start colorless
    const [saltAnalysis, setSaltAnalysis] = useState({ step: 0, reagent: 'None', result: '...' });
    const [phTest, setPhTest] = useState({ selected: 'none', result: '#e2e8f0', text: 'Dip paper to test' });
    const [funcGroup, setFuncGroup] = useState({ added: false, heated: false, color: '#fee2e2' });
    const [enthalpy, setEnthalpy] = useState({ addedAcid: false, addedBase: false, temp: 25 });

    // Biology State
    const [osmosis, setOsmosis] = useState({ time: 0, sugarLevel: 20, waterLevel: 80 });
    const [chroma, setChroma] = useState({ progress: 0 });
    const [mitosis, setMitosis] = useState({ focus: 0, showLabels: false });
    const [urineTest, setUrineTest] = useState({ step: 0, temp: 20, color: '#3b82f6' }); // Starts Blue
    const [stomata, setStomata] = useState({ focus: 0, surface: 'upper' });

    // CS State
    const [logic, setLogic] = useState({ a: false, b: false, gate: 'AND' });
    const [sortArray, setSortArray] = useState([50, 30, 70, 20, 60, 10, 80, 40]);
    const [sortStep, setSortStep] = useState(0);
    const [stack, setStack] = useState<number[]>([]);

    const resetAll = () => {
        setRunning(false);
        if(requestRef.current) cancelAnimationFrame(requestRef.current);
        setPendulum({ length: 1.0, angle: Math.PI/6, time: 0, period: 2.0 });
        setCircuit({ v: 2, r: 10 });
        setVernier({ pos: 0.00, objectWidth: 2.24, showObject: false, zeroError: 0.00, isDragging: false, dragStartX: 0, dragStartPos: 0 });
        setMicrometer({ pos: 0, wireWidth: 2.45, showWire: false });
        setOptics({ u: 40, f: 20, showImage: true });
        setOsmosis({ time: 0, sugarLevel: 20, waterLevel: 80 });
        setChroma({ progress: 0 });
        setTitration({ vol: 0, running: false, flaskColor: '#e2e8f0' });
        setSaltAnalysis({ step: 0, reagent: 'None', result: '...' });
        setMitosis({ focus: 0, showLabels: false });
        setUrineTest({ step: 0, temp: 20, color: '#3b82f6' });
        setLogic({ a: false, b: false, gate: 'AND' });
        setSortArray([50, 30, 70, 20, 60, 10, 80, 40]);
        setSortStep(0);
        setStack([]);
        setPhTest({ selected: 'none', result: '#e2e8f0', text: 'Dip paper to test' });
        setFuncGroup({ added: false, heated: false, color: '#fee2e2' });
        setEnthalpy({ addedAcid: false, addedBase: false, temp: 25 });
        setStomata({ focus: 0, surface: 'upper' });
    };

    useEffect(() => { resetAll(); }, [labId]);

    // Physics Loop (Pendulum)
    const animatePendulum = () => {
        setPendulum(p => {
            const g = 9.8;
            const omega = Math.sqrt(g / p.length);
            const t = p.time + 0.02;
            const theta = (Math.PI/6) * Math.cos(omega * t) * Math.exp(-0.05 * t);
            return { ...p, angle: theta, time: t, period: 2 * Math.PI * Math.sqrt(p.length/g) };
        });
        if (running) requestRef.current = requestAnimationFrame(animatePendulum);
    };
    useEffect(() => {
        if (running && labId === 'p2') requestRef.current = requestAnimationFrame(animatePendulum);
        return () => { if(requestRef.current) cancelAnimationFrame(requestRef.current); };
    }, [running, labId]);

    // Bio/Chem Loops
    useEffect(() => {
        let interval: any;
        if (running) {
            interval = setInterval(() => {
                if (labId === 'b3') {
                    setOsmosis(prev => {
                        if (prev.time >= 100) { setRunning(false); return prev; }
                        return { 
                            time: prev.time + 0.5, 
                            sugarLevel: Math.min(80, 20 + (prev.time * 0.6)), 
                            waterLevel: Math.max(70, 80 - (prev.time * 0.1)) 
                        };
                    });
                } else if (labId === 'b5') {
                    setChroma(prev => {
                        if (prev.progress >= 100) { setRunning(false); return prev; }
                        return { progress: prev.progress + 0.5 };
                    });
                } else if (labId === 'c1') {
                    setTitration(prev => {
                        if (prev.vol >= 50) { setRunning(false); return prev; }
                        const newVol = prev.vol + 0.1;
                        let color = '#e2e8f0'; // clear
                        if (newVol >= 20 && newVol < 20.5) color = '#fbcfe8'; // pale pink
                        else if (newVol >= 20.5) color = '#ec4899'; // dark pink
                        return { ...prev, vol: newVol, flaskColor: color };
                    });
                } else if (labId === 'b4') {
                    setUrineTest(prev => {
                        if (prev.temp >= 100) { setRunning(false); return prev; }
                        const newTemp = prev.temp + 1;
                        // Color interpolation from Blue -> Green -> Yellow -> Red
                        let color = '#3b82f6'; // Blue
                        if (newTemp > 40 && newTemp < 60) color = '#22c55e'; // Green
                        if (newTemp >= 60 && newTemp < 80) color = '#eab308'; // Yellow
                        if (newTemp >= 80) color = '#ef4444'; // Brick Red
                        return { ...prev, temp: newTemp, color };
                    });
                } else if (labId === 'c5' && enthalpy.addedAcid && enthalpy.addedBase) {
                    setEnthalpy(prev => {
                        if (prev.temp >= 35) { setRunning(false); return prev; }
                        return { ...prev, temp: prev.temp + 0.1 };
                    });
                }
            }, 50);
        }
        return () => clearInterval(interval);
    }, [running, labId, enthalpy.addedAcid, enthalpy.addedBase]);

    // --- RENDERERS ---
    
    // P1: VERNIER CALIPERS
    if (labId === 'p1') {
        const scale = 60; const offset = 80; 
        const handleMouseDown = (e: any) => { const cX = e.touches ? e.touches[0].clientX : e.clientX; setVernier(p => ({ ...p, isDragging: true, dragStartX: cX, dragStartPos: p.pos })); };
        const handleMouseMove = (e: any) => { if (!vernier.isDragging) return; const cX = e.touches ? e.touches[0].clientX : e.clientX; const delta = (cX - vernier.dragStartX) / scale; let newPos = Math.max(0, Math.min(12, vernier.dragStartPos + delta)); if (vernier.showObject && Math.abs(newPos - vernier.objectWidth) < 0.2) newPos = vernier.objectWidth; setVernier(p => ({ ...p, pos: newPos })); };
        const handleMouseUp = () => { setVernier(p => ({ ...p, isDragging: false })); };
        const msr = Math.floor(vernier.pos * 10) / 10; const vsd = Math.round((vernier.pos - msr) * 100); const val = msr + (vsd * 0.01);
        const mTicks = []; for(let i=0;i<=120;i++) { const cm=i%10===0; mTicks.push(<line key={`m${i}`} x1={offset+i*(scale/10)} y1={60} x2={offset+i*(scale/10)} y2={60+(cm?30:i%5===0?20:12)} stroke="currentColor" className="text-slate-400" strokeWidth={cm?2:1} />); if(cm) mTicks.push(<text key={`mt${i}`} x={offset+i*(scale/10)} y={50} fontSize="14" fill="currentColor" className="text-slate-500" textAnchor="middle" fontWeight="bold">{i/10}</text>); }
        const vTicks = []; for(let i=0;i<=10;i++) { vTicks.push(<line key={`v${i}`} x1={i*5.4} y1={0} x2={i*5.4} y2={15} stroke="currentColor" className="text-slate-300" strokeWidth={1.5} />); if(i%5===0) vTicks.push(<text key={`vt${i}`} x={i*5.4} y={28} fontSize="10" fill="currentColor" className="text-slate-200" textAnchor="middle">{i}</text>); }

        return (
            <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onTouchMove={handleMouseMove} onTouchEnd={handleMouseUp}>
                <div className="flex-1 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-950 flex flex-col select-none">
                    <div className="absolute top-4 left-4 bg-white/60 dark:bg-black/40 p-3 rounded-lg border border-slate-300 dark:border-white/10 backdrop-blur z-10 shadow-sm">
                        <div className="text-xs text-slate-500 dark:text-gray-400 mb-1">Least Count</div>
                        <div className="text-xl font-mono text-green-600 dark:text-green-400 font-bold">0.01 cm</div>
                    </div>
                    <div className="flex-1 relative flex items-center justify-center scale-75 md:scale-100 transition-transform">
                         <div className="relative w-[1000px] h-[400px] text-slate-900 dark:text-slate-200">
                            <div className="absolute top-[100px] left-[80px] w-[850px] h-[80px] bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded-r-lg shadow-xl border border-slate-400 dark:border-slate-500"></div>
                            <div className="absolute top-[100px] left-[40px] w-[40px] h-[250px] bg-gradient-to-r from-slate-400 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-l-lg shadow-xl border border-slate-400 dark:border-slate-500"></div> 
                            <div className="absolute top-[20px] left-[40px] w-[40px] h-[80px] bg-gradient-to-r from-slate-400 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-tl-lg shadow-xl border border-slate-400 dark:border-slate-500"></div>
                            <svg className="absolute top-[100px] left-0 w-full h-[100px] pointer-events-none overflow-visible z-0">{mTicks}</svg>
                            <div className="absolute top-[20px] w-[150px] h-[350px] z-20 cursor-grab active:cursor-grabbing" style={{ left: `${offset + vernier.pos * scale}px`, transform: 'translateX(-20px)' }} onMouseDown={handleMouseDown} onTouchStart={handleMouseDown}>
                                <div className="absolute top-[80px] w-[140px] h-[80px] bg-gradient-to-b from-slate-400 to-slate-500 dark:from-slate-500 dark:to-slate-600 rounded border border-slate-400 shadow-2xl">
                                    <div className="absolute bottom-0 left-[20px] w-[100px] h-[40px]"><svg width="100%" height="100%" className="overflow-visible">{vTicks}</svg></div>
                                </div>
                                <div className="absolute top-[160px] left-[0px] w-[40px] h-[170px] bg-gradient-to-r from-slate-500 to-slate-400 dark:from-slate-600 dark:to-slate-500 rounded-bl-lg shadow-xl border border-slate-400 dark:border-slate-500"></div>
                                <div className="absolute top-[0px] left-[0px] w-[40px] h-[80px] bg-gradient-to-r from-slate-500 to-slate-400 dark:from-slate-600 dark:to-slate-500 rounded-tr-lg shadow-xl border border-slate-400 dark:border-slate-500"></div>
                            </div>
                            <AnimatePresence>{vernier.showObject && (<MotionDiv initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute top-[250px] rounded-full bg-yellow-400 border border-yellow-600 z-0 shadow-lg" style={{ left: `${offset + (vernier.pos/2) * scale}px`, width: `${vernier.objectWidth * scale}px`, height: `${vernier.objectWidth * scale}px`, marginLeft: `-${(vernier.objectWidth * scale)/2 + 20}px`, transform: 'translateY(-50%)' }}></MotionDiv>)}</AnimatePresence>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 p-6 flex flex-col md:flex-row gap-8 z-40 transition-colors">
                    <div className="flex-1 space-y-6">
                        <div className="flex gap-4">
                             <button onClick={() => { const w = parseFloat((Math.random() * 2 + 1).toFixed(2)); setVernier(p => ({ ...p, pos: w, objectWidth: w, showObject: true })); }} className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2"><Plus size={18}/> New Object</button>
                             <button onClick={() => setVernier(p => ({...p, showObject: false, pos: 0}))} className="px-4 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl font-bold text-slate-700 dark:text-white border border-slate-200 dark:border-white/5"><RotateCcw size={18}/></button>
                        </div>
                    </div>
                    <div className="w-full md:w-80 bg-slate-100 dark:bg-black/20 rounded-2xl border border-slate-200 dark:border-white/5 p-6">
                         <div className="space-y-3 font-mono">
                             <div className="flex justify-between items-center p-2 bg-white dark:bg-white/5 rounded"><span className="text-slate-500 dark:text-gray-400">M.S.R</span><span className="text-xl text-slate-900 dark:text-white">{msr.toFixed(1)} cm</span></div>
                             <div className="flex justify-between items-center p-2 bg-white dark:bg-white/5 rounded"><span className="text-slate-500 dark:text-gray-400">V.S.D</span><span className="text-xl text-blue-600 dark:text-blue-400">{vsd} div</span></div>
                             <div className="border-t border-slate-300 dark:border-white/10 pt-2 mt-2 flex justify-between items-center"><span className="text-slate-700 dark:text-gray-300 font-bold">Result</span><span className="text-2xl text-green-600 dark:text-green-400 font-bold">{val.toFixed(2)} cm</span></div>
                         </div>
                    </div>
                </div>
            </div>
        );
    }

    // P2: SIMPLE PENDULUM
    if (labId === 'p2') {
        const lengthPx = pendulum.length * 300; 
        const x = Math.sin(pendulum.angle) * lengthPx;
        const y = Math.cos(pendulum.angle) * lengthPx;

        return (
            <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 transition-colors">
                <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-950 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-700 rounded-b-lg shadow-lg z-10"></div>
                    <div className="relative origin-top" style={{ top: '-150px' }}>
                        <svg width="400" height="500" className="overflow-visible">
                            <line x1="200" y1="0" x2={200 + x} y2={y} stroke="currentColor" strokeWidth="2" className="text-slate-400" />
                            <circle cx={200 + x} cy={y} r="15" fill="url(#metallic)" stroke="#475569" strokeWidth="1" className="shadow-xl" />
                            <defs>
                                <radialGradient id="metallic">
                                    <stop offset="0%" stopColor="#94a3b8" />
                                    <stop offset="100%" stopColor="#475569" />
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="absolute top-8 left-8 bg-white/80 dark:bg-black/50 p-4 rounded-xl backdrop-blur font-mono text-sm border border-white/10">
                        <div>Time: <span className="font-bold">{pendulum.time.toFixed(2)}s</span></div>
                        <div>Period (T): <span className="font-bold text-blue-500">{pendulum.period.toFixed(2)}s</span></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 p-6 flex gap-8 z-40">
                    <div className="flex-1">
                        <label className="text-xs text-slate-500 font-bold uppercase">Length (L): {pendulum.length.toFixed(2)}m</label>
                        <input type="range" min="0.2" max="1.5" step="0.1" value={pendulum.length} onChange={(e)=>setPendulum({...pendulum, length: parseFloat(e.target.value)})} className="w-full accent-blue-500"/>
                    </div>
                    <button onClick={()=>setRunning(!running)} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold shadow-lg flex items-center gap-2">
                        {running ? <Pause size={18}/> : <Play size={18}/>} {running ? "Stop" : "Start"}
                    </button>
                </div>
            </div>
        );
    }

    // P3: SCREW GAUGE (Micrometer)
    if (labId === 'p3') {
        const val = micrometer.pos; const pitch = 1; const totalDivs = 100; const lc = 0.01;
        const msr = Math.floor(val); const csr = Math.round(((val - msr) / lc)) % totalDivs;
        const rotate = (amount: number) => {
            let newPos = Math.max(0, micrometer.pos + amount);
            if (micrometer.showWire && Math.abs(newPos - micrometer.wireWidth) < 0.02 && amount > 0) newPos = micrometer.wireWidth;
            setMicrometer({ ...micrometer, pos: newPos });
        };

        return (
            <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900 transition-colors">
                <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200 to-slate-400 dark:from-slate-800 dark:to-slate-950 overflow-hidden">
                    <div className="relative w-[800px] h-[300px] flex items-center scale-75 md:scale-100">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[250px] border-[40px] border-slate-700 dark:border-slate-600 rounded-l-[150px] rounded-r-none border-r-0 z-10 shadow-xl"></div>
                        <div className="absolute left-[260px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-slate-400 dark:bg-slate-500 z-20"></div>
                        <motion.div className="absolute top-1/2 -translate-y-1/2 h-[40px] bg-gradient-to-b from-slate-300 to-slate-500 dark:from-slate-400 dark:to-slate-600 z-20" style={{ left: '300px', width: `${200 - (micrometer.pos * 10)}px` }}></motion.div>
                        <AnimatePresence>{micrometer.showWire && (<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute top-1/2 -translate-y-1/2 left-[300px] w-1 h-[120px] bg-yellow-500 shadow-lg z-10" style={{ marginLeft: '-2px' }}/>)}</AnimatePresence>
                        <div className="absolute left-[500px] top-1/2 -translate-y-1/2 w-[200px] h-[60px] bg-gradient-to-b from-slate-200 to-slate-400 dark:from-slate-300 dark:to-slate-500 border border-slate-500 z-30 flex items-center">
                            <div className="w-full h-[2px] bg-black/50 absolute top-1/2 left-0"></div>
                            {Array.from({length: 20}).map((_, i) => (<div key={i} className="absolute top-1/2 h-[15px] w-[2px] bg-black/60" style={{ left: `${i * 10}px`, marginTop: '-15px' }}>{i % 5 === 0 && <span className="absolute -top-4 -left-1 text-[10px] font-bold text-slate-800">{i}</span>}</div>))}
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 w-[150px] h-[100px] bg-gradient-to-b from-slate-600 to-slate-800 dark:from-slate-700 dark:to-slate-900 z-40 shadow-2xl border-l-4 border-slate-500 flex items-center overflow-hidden" style={{ left: `${500 + (micrometer.pos * 10)}px` }}>
                            <div className="w-full h-full relative">{Array.from({length: 11}).map((_, i) => { const tickVal = (csr + i - 5 + 100) % 100; const yPos = 50 + (i - 5) * 8; return (<div key={i} className="absolute left-0 w-8 h-[1px] bg-white/70 flex items-center" style={{ top: `${yPos}%` }}>{tickVal % 5 === 0 && <span className="ml-10 text-[10px] text-white/90 font-mono">{tickVal}</span>}</div>);})}</div>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 w-[40px] h-[30px] bg-black z-30 rounded-r-lg" style={{ left: `${650 + (micrometer.pos * 10)}px` }}></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 p-6 flex flex-col md:flex-row gap-8 z-40 transition-colors">
                    <div className="flex-1 space-y-6">
                        <div className="flex gap-4">
                             <button onClick={() => setMicrometer({...micrometer, showWire: !micrometer.showWire})} className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2">{micrometer.showWire ? <Minus size={18}/> : <Plus size={18}/>} {micrometer.showWire ? "Remove Wire" : "Insert Wire"}</button>
                             <button onClick={() => setMicrometer({ ...micrometer, pos: 0 })} className="px-4 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl font-bold text-slate-700 dark:text-white border border-slate-200 dark:border-white/5"><RotateCcw size={18}/></button>
                        </div>
                        <div className="flex gap-2 justify-center items-center">
                            <button onMouseDown={() => rotate(-0.5)} className="p-4 bg-blue-600 hover:bg-blue-500 rounded-full text-white shadow-lg active:scale-95"><ArrowLeft size={24}/></button>
                            <span className="text-xs text-slate-500 px-2">ROTATE</span>
                            <button onMouseDown={() => rotate(0.5)} className="p-4 bg-blue-600 hover:bg-blue-500 rounded-full text-white shadow-lg active:scale-95"><ArrowRight size={24}/></button>
                        </div>
                    </div>
                    <div className="w-full md:w-80 bg-slate-100 dark:bg-black/20 rounded-2xl border border-slate-200 dark:border-white/5 p-6">
                         <div className="space-y-3 font-mono text-sm">
                             <div className="flex justify-between"><span className="text-slate-500">M.S.R</span><span className="text-slate-900 dark:text-white font-bold">{msr} mm</span></div>
                             <div className="flex justify-between"><span className="text-slate-500">C.S.R</span><span className="text-blue-500 font-bold">{csr}</span></div>
                             <div className="border-t border-slate-300 dark:border-white/10 pt-2 mt-2 flex justify-between items-center"><span className="font-bold text-slate-700 dark:text-gray-300">Total</span><span className="text-2xl text-green-500 font-bold">{val.toFixed(2)} mm</span></div>
                         </div>
                    </div>
                </div>
            </div>
        );
    }

    // P4: OHM'S LAW
    if (labId === 'p4') {
        const current = circuit.v / circuit.r;
        return (
            <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 transition-colors">
                <div className="flex-1 flex items-center justify-center relative">
                    <div className="w-[600px] h-[300px] border-4 border-slate-300 dark:border-slate-700 rounded-3xl relative bg-white/5">
                        {/* Wire */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-yellow-500"></div>
                        
                        {/* Battery */}
                        <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col items-center bg-slate-100 dark:bg-slate-800 p-2 rounded border border-slate-300 dark:border-slate-600 z-10">
                            <div className="flex gap-1"><div className="w-1 h-8 bg-black"></div><div className="w-1 h-4 bg-black mt-2"></div></div>
                            <span className="text-xs mt-1 font-bold">{circuit.v}V</span>
                        </div>

                        {/* Resistor */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-10 bg-amber-700 relative flex items-center justify-center z-10 rounded shadow-md">
                            <div className="w-full h-1 bg-yellow-500 opacity-50 absolute"></div>
                            <span className="text-white font-bold text-sm">R = {circuit.r}Ω</span>
                        </div>

                        {/* Ammeter */}
                        <div className="absolute right-20 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white dark:bg-black border-4 border-slate-400 flex items-center justify-center z-10 shadow-lg">
                            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{current.toFixed(2)}A</span>
                            <span className="absolute -bottom-6 text-xs text-slate-500">Ammeter</span>
                        </div>

                        {/* Voltmeter (Parallel) */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-16">
                            <div className="w-1 h-16 bg-black absolute left-0 top-16"></div>
                            <div className="w-1 h-16 bg-black absolute right-0 top-16"></div>
                            <div className="w-32 h-1 bg-black absolute bottom-0"></div>
                            <div className="w-16 h-16 rounded-full bg-white dark:bg-black border-4 border-slate-400 flex items-center justify-center absolute -top-8 left-8 shadow-lg">
                                <span className="font-mono font-bold text-green-600 dark:text-green-400">{circuit.v}V</span>
                            </div>
                            <span className="absolute -top-14 left-12 text-xs text-slate-500">Voltmeter</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 p-6 z-40">
                    <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Adjust Voltage (Rheostat)</label>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500">0V</span>
                        <input type="range" min="0" max="10" step="0.1" value={circuit.v} onChange={(e)=>setCircuit({...circuit, v: parseFloat(e.target.value)})} className="flex-1 accent-blue-500"/>
                        <span className="text-sm text-slate-500">10V</span>
                    </div>
                </div>
            </div>
        );
    }

    // P5: CONCAVE MIRROR
    if (labId === 'p5') {
        const { u, f, showImage } = optics;
        const vDist = (u * f) / (u - f); const m = -vDist / u; const isVirtual = u < f;
        const scale = 5; const poleX = 400; const groundY = 200;
        const visualObjX = poleX - u * scale;
        const visualImgX = isVirtual ? poleX + Math.abs(vDist) * scale : poleX - Math.abs(vDist) * scale;
        const visualImgH = 40 * Math.abs(m); 

        return (
            <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900 transition-colors">
                <div className="flex-1 relative bg-slate-900 overflow-hidden flex items-center justify-center border-b border-slate-700">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-500"></div>
                    <div className="absolute top-1/2 left-[400px] -translate-y-1/2 w-4 h-64 border-l-4 border-blue-400 rounded-l-[100%] opacity-80"></div>
                    <div className="absolute top-1/2 left-[400px] w-1 h-4 bg-white -translate-x-1/2"></div> 
                    <div className="absolute top-[52%] left-[400px] text-xs text-blue-300">P</div>
                    <div className="absolute top-1/2 w-2 h-2 bg-yellow-500 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ left: `${poleX - f * scale}px` }}></div>
                    <div className="absolute top-[52%] text-xs text-yellow-500" style={{ left: `${poleX - f * scale}px` }}>F</div>
                    <div className="absolute top-1/2 w-2 h-2 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ left: `${poleX - 2 * f * scale}px` }}></div>
                    <div className="absolute top-[52%] text-xs text-red-500" style={{ left: `${poleX - 2 * f * scale}px` }}>C</div>
                    <motion.div className="absolute top-1/2 -translate-y-full w-2 bg-green-500 cursor-grab active:cursor-grabbing group" style={{ left: `${visualObjX}px`, height: '40px' }}>
                        <div className="absolute -top-4 -left-1 w-4 h-4 bg-orange-500 rounded-full blur-sm animate-pulse"></div>
                        <div className="absolute -bottom-6 text-xs text-green-400 whitespace-nowrap opacity-0 group-hover:opacity-100">Object (u)</div>
                    </motion.div>
                    {showImage && (<div className={`absolute top-1/2 w-2 bg-blue-500/80 transition-all duration-100 ${isVirtual ? '-translate-y-full border-b-2 border-blue-300' : 'border-t-2 border-blue-300'}`} style={{ left: `${visualImgX}px`, height: `${Math.min(visualImgH, 200)}px`, opacity: Math.min(1, 50/Math.abs(vDist)) }}><div className="absolute -bottom-6 text-xs text-blue-400 whitespace-nowrap">Image (v)</div></div>)}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                        <line x1={visualObjX} y1={groundY - 40} x2={poleX} y2={groundY - 40} stroke="yellow" strokeWidth="2" />
                        <line x1={poleX} y1={groundY - 40} x2={visualImgX} y2={isVirtual ? groundY - visualImgH : groundY + visualImgH} stroke="yellow" strokeWidth="2" strokeDasharray={isVirtual ? "5,5" : ""} />
                        <line x1={visualObjX} y1={groundY - 40} x2={poleX} y2={groundY} stroke="cyan" strokeWidth="2" />
                        <line x1={poleX} y1={groundY} x2={visualImgX} y2={isVirtual ? groundY - visualImgH : groundY + visualImgH} stroke="cyan" strokeWidth="2" strokeDasharray={isVirtual ? "5,5" : ""} />
                    </svg>
                </div>
                <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 p-6 flex flex-col md:flex-row gap-8 z-40 transition-colors">
                    <div className="flex-1 space-y-6">
                        <div><div className="flex justify-between text-xs text-slate-500 dark:text-gray-400 mb-1"><span>Object Distance (u)</span><span className="text-green-600 dark:text-green-400 font-bold">{u.toFixed(1)} cm</span></div><input type="range" min="5" max="80" step="0.5" value={u} onChange={e => setOptics({...optics, u: parseFloat(e.target.value)})} className="w-full accent-green-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"/></div>
                        <div><div className="flex justify-between text-xs text-slate-500 dark:text-gray-400 mb-1"><span>Focal Length (f)</span><span className="text-yellow-600 dark:text-yellow-400 font-bold">{f} cm</span></div><input type="range" min="10" max="40" step="1" value={f} onChange={e => setOptics({...optics, f: parseFloat(e.target.value)})} className="w-full accent-yellow-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"/></div>
                    </div>
                    <div className="w-full md:w-80 bg-slate-100 dark:bg-black/20 rounded-2xl border border-slate-200 dark:border-white/5 p-6">
                         <div className="space-y-3 font-mono text-sm">
                             <div className="flex justify-between border-b border-slate-300 dark:border-white/10 pb-2"><span className="text-slate-500">Image Dist (v)</span><span className={`font-bold ${vDist < 0 ? 'text-blue-400' : 'text-purple-400'}`}>{Math.abs(vDist).toFixed(1)} cm</span></div>
                             <div className="flex justify-between border-b border-slate-300 dark:border-white/10 pb-2"><span className="text-slate-500">Magnification</span><span className="text-slate-900 dark:text-white">{m.toFixed(2)}x</span></div>
                             <div className="pt-1"><span className="text-xs text-slate-400 block mb-1">Nature of Image:</span><div className="flex gap-2"><span className={`px-2 py-1 rounded text-xs font-bold ${!isVirtual ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>{isVirtual ? "Virtual" : "Real"}</span><span className={`px-2 py-1 rounded text-xs font-bold ${!isVirtual ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>{isVirtual ? "Erect" : "Inverted"}</span></div></div>
                         </div>
                    </div>
                </div>
            </div>
        );
    }

    // C1: ACID-BASE TITRATION
    if (labId === 'c1') {
        return (
            <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900 transition-colors">
                <div className="flex-1 flex items-center justify-center relative bg-gradient-to-b from-slate-200 to-white dark:from-slate-800 dark:to-black">
                    <div className="relative h-[400px] flex flex-col items-center">
                        {/* Burette */}
                        <div className="w-8 h-64 border-x-2 border-b-2 border-slate-400/50 rounded-b-lg bg-white/10 relative overflow-hidden">
                            <div className="absolute bottom-0 w-full bg-emerald-500/30 transition-all duration-100" style={{ height: `${100 - (titration.vol/50)*100}%` }}></div>
                            <div className="absolute right-0 w-2 h-full flex flex-col justify-between py-2 text-[8px] text-slate-500">
                                <span>0</span><span>50</span>
                            </div>
                        </div>
                        {/* Tap */}
                        <div onClick={() => setRunning(!running)} className="w-4 h-4 bg-slate-600 rounded-full cursor-pointer hover:scale-110 transition-transform mt-1 relative z-10">
                            <div className={`absolute top-1/2 left-1/2 w-6 h-1 bg-slate-800 -translate-x-1/2 -translate-y-1/2 transition-transform ${running ? 'rotate-90' : ''}`}></div>
                        </div>
                        {/* Droplets */}
                        {running && (
                            <motion.div 
                                initial={{ y: 0, opacity: 1 }} 
                                animate={{ y: 60, opacity: 0 }} 
                                transition={{ repeat: Infinity, duration: 0.5 }} 
                                className="w-2 h-2 bg-emerald-400 rounded-full absolute top-[280px]"
                            ></motion.div>
                        )}
                        {/* Flask */}
                        <div className="mt-8 relative">
                            <div className="w-24 h-32 border-b-4 border-x-4 border-slate-400/30 rounded-b-[40px] bg-white/5 relative overflow-hidden flex items-end justify-center">
                                <div className="w-full h-16 transition-colors duration-500" style={{ backgroundColor: titration.flaskColor, opacity: 0.6 }}></div>
                            </div>
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500">Conical Flask</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 p-6 flex gap-8 z-40 justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-emerald-600">Titration: HCl vs NaOH</h3>
                        <p className="text-sm text-slate-500">Endpoint is reached when solution turns pink.</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="text-right">
                            <div className="text-xs text-slate-500 uppercase">Volume Used</div>
                            <div className="text-2xl font-mono font-bold text-slate-800 dark:text-white">{titration.vol.toFixed(1)} mL</div>
                        </div>
                        <button onClick={() => setRunning(!running)} className={`px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 shadow-lg ${running ? 'bg-red-500' : 'bg-emerald-500'}`}>
                            {running ? 'Stop Tap' : 'Open Tap'}
                        </button>
                        <button onClick={resetAll} className="p-3 bg-slate-200 dark:bg-white/10 rounded-xl hover:bg-slate-300"><RotateCcw size={20}/></button>
                    </div>
                </div>
            </div>
        );
    }

    // C2: SALT ANALYSIS
    if (labId === 'c2') {
        return (
            <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900 transition-colors">
                <div className="flex-1 flex items-center justify-center relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200 to-slate-400 dark:from-slate-800 dark:to-slate-950">
                    <div className="flex gap-12 items-end">
                        {/* Reagents */}
                        <div className="flex flex-col gap-4">
                            <div onClick={() => setSaltAnalysis({ step: 1, reagent: 'NaOH', result: 'Ammonia Smell (Group 0)' })} className="w-16 h-24 bg-white/10 border border-white/20 rounded cursor-pointer hover:scale-105 transition-transform flex items-center justify-center text-xs font-bold text-white relative group">
                                <div className="absolute inset-0 bg-blue-500/20"></div>
                                NaOH
                            </div>
                            <div onClick={() => setSaltAnalysis({ step: 2, reagent: 'HCl', result: 'No Precipitate' })} className="w-16 h-24 bg-white/10 border border-white/20 rounded cursor-pointer hover:scale-105 transition-transform flex items-center justify-center text-xs font-bold text-white relative group">
                                <div className="absolute inset-0 bg-red-500/20"></div>
                                Dil HCl
                            </div>
                        </div>

                        {/* Test Tube */}
                        <div className="relative">
                            <div className="w-12 h-48 border-x-2 border-b-2 border-slate-400/50 rounded-b-2xl bg-white/5 overflow-hidden relative">
                                <div className={`absolute bottom-0 w-full h-12 transition-all duration-500 ${saltAnalysis.step === 1 ? 'bg-yellow-200/50' : 'bg-white/20'}`}></div>
                                {saltAnalysis.step === 1 && (
                                    <motion.div 
                                        initial={{ y: 20, opacity: 0 }} animate={{ y: -50, opacity: 1 }} 
                                        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs font-bold text-white"
                                    >
                                        NH3 Gas ↑
                                    </motion.div>
                                )}
                            </div>
                            <div className="text-center mt-2 text-xs text-slate-500">Test Tube</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 p-6 z-40">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-white">Salt Analysis: Cation Detection</h3>
                            <p className="text-sm text-gray-400">Click a reagent to add it to the salt solution.</p>
                        </div>
                        <div className="text-right bg-black/20 p-4 rounded-xl">
                            <div className="text-xs text-gray-500 uppercase">Observation</div>
                            <div className="text-xl font-bold text-yellow-400">{saltAnalysis.result}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // C3: pH DETERMINATION
    if (labId === 'c3') {
        const checkPh = (type: string) => {
            if (type === 'acid') setPhTest({ selected: 'acid', result: '#ef4444', text: 'Red: Acidic (pH 2)' });
            if (type === 'neutral') setPhTest({ selected: 'neutral', result: '#22c55e', text: 'Green: Neutral (pH 7)' });
            if (type === 'base') setPhTest({ selected: 'base', result: '#a855f7', text: 'Purple: Basic (pH 13)' });
        };

        return (
            <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900 transition-colors">
                <div className="flex-1 flex items-center justify-center gap-8 relative bg-gradient-to-b from-slate-100 to-slate-300 dark:from-slate-900 dark:to-slate-800">
                    <div onClick={() => checkPh('acid')} className="cursor-pointer group flex flex-col items-center">
                        <div className="w-20 h-24 border-x-2 border-b-4 border-slate-400/50 bg-white/10 relative rounded-b-xl overflow-hidden">
                            <div className="absolute bottom-0 w-full h-16 bg-yellow-100/50 group-hover:bg-yellow-200/50 transition-colors"></div>
                        </div>
                        <span className="mt-2 text-xs font-bold text-slate-500">Lemon Juice</span>
                    </div>
                    <div onClick={() => checkPh('neutral')} className="cursor-pointer group flex flex-col items-center">
                        <div className="w-20 h-24 border-x-2 border-b-4 border-slate-400/50 bg-white/10 relative rounded-b-xl overflow-hidden">
                            <div className="absolute bottom-0 w-full h-16 bg-blue-50/50 group-hover:bg-blue-100/50 transition-colors"></div>
                        </div>
                        <span className="mt-2 text-xs font-bold text-slate-500">Water</span>
                    </div>
                    <div onClick={() => checkPh('base')} className="cursor-pointer group flex flex-col items-center">
                        <div className="w-20 h-24 border-x-2 border-b-4 border-slate-400/50 bg-white/10 relative rounded-b-xl overflow-hidden">
                            <div className="absolute bottom-0 w-full h-16 bg-white/20 group-hover:bg-white/30 transition-colors"></div>
                        </div>
                        <span className="mt-2 text-xs font-bold text-slate-500">NaOH</span>
                    </div>

                    {/* pH Strip Animation */}
                    <motion.div 
                        className="absolute top-10 w-4 h-20 bg-yellow-200 border border-slate-300 shadow-lg z-20 origin-top"
                        animate={phTest.selected === 'none' ? {} : {
                            x: phTest.selected === 'acid' ? -112 : phTest.selected === 'neutral' ? 0 : 112,
                            y: [0, 100, 0],
                        }}
                        transition={{ duration: 1 }}
                    >
                        <motion.div 
                            className="absolute bottom-0 w-full h-4 transition-colors duration-500"
                            style={{ backgroundColor: phTest.result }}
                        ></motion.div>
                    </motion.div>
                </div>
                <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 p-6 z-40 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">pH Determination</h3>
                        <p className="text-sm text-slate-500">Click a beaker to dip the pH paper.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-48 rounded bg-gradient-to-r from-red-500 via-green-500 to-purple-500 border border-white/20 relative">
                            <div className="absolute -bottom-4 left-0 text-[10px]">0</div>
                            <div className="absolute -bottom-4 left-1/2 text-[10px]">7</div>
                            <div className="absolute -bottom-4 right-0 text-[10px]">14</div>
                        </div>
                        <div className="font-bold text-xl" style={{color: phTest.result}}>{phTest.text}</div>
                    </div>
                </div>
            </div>
        );
    }

    // C4: FUNCTIONAL GROUPS
    if (labId === 'c4') {
        return (
            <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900 transition-colors">
                <div className="flex-1 flex items-center justify-center relative">
                    <div className="flex flex-col items-center">
                        {/* Test Tube */}
                        <div className="w-16 h-48 border-x-2 border-b-2 border-slate-400/50 rounded-b-3xl bg-white/5 backdrop-blur overflow-hidden relative mb-4">
                            <div 
                                className="absolute bottom-0 w-full h-24 transition-colors duration-1000" 
                                style={{ backgroundColor: funcGroup.color }}
                            ></div>
                            {funcGroup.added && !funcGroup.heated && <motion.div initial={{y:-20, opacity:0}} animate={{y:0, opacity:1}} className="absolute top-10 w-full text-center text-xs text-slate-500">Reagent Added</motion.div>}
                        </div>
                        <div className="h-2 w-32 bg-slate-700 rounded-full opacity-20 blur-sm"></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 p-6 z-40 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-pink-600">Aldehyde Detection</h3>
                        <p className="text-sm text-slate-500">Schiff's Reagent Test</p>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setFuncGroup({ ...funcGroup, added: true, color: '#fce7f3' })}
                            disabled={funcGroup.added}
                            className="px-4 py-2 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 rounded-lg text-sm font-bold disabled:opacity-50"
                        >
                            Add Schiff's Reagent
                        </button>
                        <button 
                            onClick={() => setFuncGroup({ ...funcGroup, heated: true, color: '#db2777' })} // Pink/Magenta
                            disabled={!funcGroup.added || funcGroup.heated}
                            className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-sm font-bold disabled:opacity-50 flex items-center gap-2"
                        >
                            <Flame size={16}/> Heat
                        </button>
                        <button onClick={resetAll} className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg"><RotateCcw size={18}/></button>
                    </div>
                </div>
            </div>
        );
    }

    // C5: ENTHALPY
    if (labId === 'c5') {
        return (
            <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900 transition-colors">
                <div className="flex-1 flex items-center justify-center relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900">
                    {/* Calorimeter */}
                    <div className="relative w-48 h-56 bg-white dark:bg-slate-800 rounded-lg border-4 border-slate-300 dark:border-slate-600 shadow-xl flex items-end justify-center overflow-hidden">
                        <div className="absolute top-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Styrofoam Cup</div>
                        <div 
                            className="w-full bg-blue-200/50 transition-all duration-500"
                            style={{ height: enthalpy.addedAcid && enthalpy.addedBase ? '80%' : enthalpy.addedAcid || enthalpy.addedBase ? '40%' : '0%' }}
                        ></div>
                        {/* Thermometer */}
                        <div className="absolute top-[-60px] right-4 w-4 h-64 bg-gray-200 rounded-full border border-gray-400 flex items-end justify-center overflow-hidden">
                            <div className="w-2 bg-red-500 transition-all duration-300" style={{ height: `${(enthalpy.temp / 50) * 100}%` }}></div>
                        </div>
                    </div>
                    
                    {/* Pouring Beakers */}
                    <div className="absolute top-10 left-10 cursor-pointer hover:scale-110 transition-transform" onClick={() => setEnthalpy({...enthalpy, addedAcid: true})}>
                        <div className={`w-16 h-20 border-2 border-slate-400 rounded-b-lg bg-blue-100/50 ${enthalpy.addedAcid ? 'opacity-50' : 'opacity-100'}`}></div>
                        <span className="text-xs font-bold text-blue-500">HCl</span>
                    </div>
                    <div className="absolute top-10 right-10 cursor-pointer hover:scale-110 transition-transform" onClick={() => { setEnthalpy({...enthalpy, addedBase: true}); setRunning(true); }}>
                        <div className={`w-16 h-20 border-2 border-slate-400 rounded-b-lg bg-white/50 ${enthalpy.addedBase ? 'opacity-50' : 'opacity-100'}`}></div>
                        <span className="text-xs font-bold text-slate-500">NaOH</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 p-6 z-40 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-orange-500">Enthalpy of Neutralization</h3>
                        <p className="text-sm text-slate-500">Mix Acid and Base to observe temperature rise.</p>
                    </div>
                    <div className="bg-slate-100 dark:bg-white/10 px-6 py-3 rounded-xl text-right">
                        <div className="text-xs text-slate-500 uppercase">Temperature</div>
                        <div className="text-2xl font-mono font-bold text-red-500">{enthalpy.temp.toFixed(1)}°C</div>
                    </div>
                </div>
            </div>
        );
    }

    // B3: OSMOSIS
    if (labId === 'b3') {
        return (
            <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 transition-colors">
                <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-950">
                     <div className="relative w-64 h-80 border-x-4 border-b-4 border-slate-400/50 rounded-b-3xl bg-blue-500/10 backdrop-blur-sm overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-full bg-blue-400/30 transition-all duration-100" style={{ height: `${osmosis.waterLevel}%` }}></div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-48 bg-amber-200 rounded-b-2xl border-4 border-amber-700/50 flex items-end justify-center overflow-hidden shadow-lg">
                            <div className="absolute top-0 left-0 w-full h-full bg-amber-100 opacity-20"></div>
                            <div className="w-32 bg-red-500/40 transition-all duration-100 rounded-b-xl relative" style={{ height: `${osmosis.sugarLevel}%` }}>
                                <div className="absolute top-0 right-0 w-4 h-1 bg-black translate-x-1"></div>
                                <div className="absolute top-0 right-6 text-[10px] font-bold text-red-800 dark:text-red-200 -translate-y-4">Sugar Soln</div>
                            </div>
                        </div>
                     </div>
                     <div className="absolute top-1/2 left-[20%] text-sm font-bold text-blue-600 dark:text-blue-400">Water (Hypotonic)</div>
                     <div className="absolute top-1/2 right-[20%] text-sm font-bold text-amber-600 dark:text-amber-400">Potato (Membrane)</div>
                </div>
                <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 p-6 flex flex-col md:flex-row gap-8 z-40 transition-colors">
                    <div className="flex-1">
                         <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Potato Osmometer</h3>
                         <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">Observe the rise in sugar solution level due to endosmosis.</p>
                         <div className="flex gap-4">
                             {!running && osmosis.time === 0 && <button onClick={() => setRunning(true)} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-2"><Play size={18}/> Start Experiment</button>}
                             {running && <button onClick={() => setRunning(false)} className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl font-bold flex items-center gap-2"><Pause size={18}/> Pause</button>}
                             {!running && osmosis.time > 0 && <button onClick={() => setRunning(true)} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-2"><Play size={18}/> Resume</button>}
                             <button onClick={resetAll} className="px-4 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-white rounded-xl font-bold border border-slate-200 dark:border-white/5"><RotateCcw size={18}/></button>
                         </div>
                    </div>
                    <div className="w-64 bg-slate-100 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/5">
                        <div className="flex justify-between mb-2 text-sm"><span className="text-slate-500 dark:text-gray-400">Time Elapsed</span><span className="font-mono">{Math.floor(osmosis.time)} min</span></div>
                        <div className="flex justify-between mb-2 text-sm"><span className="text-slate-500 dark:text-gray-400">Level Rise</span><span className="font-mono text-green-500">+{((osmosis.sugarLevel - 20)/5).toFixed(1)} cm</span></div>
                        <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full mt-2 overflow-hidden"><div className="bg-blue-500 h-full transition-all" style={{width: `${osmosis.time}%`}}></div></div>
                    </div>
                </div>
            </div>
        );
    }

    // B5: CHROMATOGRAPHY
    if (labId === 'b5') {
        const p = chroma.progress;
        return (
            <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 transition-colors">
                <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-950">
                     <div className="relative w-40 h-[400px] border-x-2 border-b-4 border-slate-400/50 rounded-b-xl bg-white/10 backdrop-blur-sm overflow-hidden">
                        <div className="absolute bottom-0 w-full h-10 bg-teal-500/30"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[380px] bg-white shadow-sm flex justify-center">
                            <div className="absolute bottom-8 w-full h-[1px] bg-slate-300"></div>
                            <div className="absolute bottom-0 w-full bg-teal-100/50 transition-all duration-100 border-t border-teal-300" style={{ height: `${10 + p * 3.5}px` }}></div>
                            <div className="absolute w-3 h-3 rounded-full bg-lime-500 blur-[2px] transition-all duration-100" style={{ bottom: `${32 + p * 0.5}px`, opacity: p > 5 ? 1 : 0 }}></div>
                            <div className="absolute w-3 h-3 rounded-full bg-teal-600 blur-[2px] transition-all duration-100" style={{ bottom: `${32 + p * 1.2}px`, opacity: p > 5 ? 1 : 0 }}></div>
                            <div className="absolute w-3 h-3 rounded-full bg-yellow-400 blur-[2px] transition-all duration-100" style={{ bottom: `${32 + p * 2.0}px`, opacity: p > 5 ? 1 : 0 }}></div>
                            <div className="absolute w-3 h-3 rounded-full bg-orange-500 blur-[2px] transition-all duration-100" style={{ bottom: `${32 + p * 2.8}px`, opacity: p > 5 ? 1 : 0 }}></div>
                            <div className="absolute bottom-[30px] w-4 h-4 rounded-full bg-green-800 blur-[1px]" style={{ opacity: Math.max(0, 1 - p/10) }}></div>
                        </div>
                        <div className="absolute top-0 w-full h-4 bg-slate-400 rounded-t-sm"></div>
                     </div>
                </div>
                <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 p-6 flex flex-col md:flex-row gap-8 z-40 transition-colors">
                    <div className="flex-1">
                         <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Paper Chromatography</h3>
                         <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">Separation of photosynthetic pigments based on solubility.</p>
                         <div className="flex gap-4">
                             {!running && chroma.progress === 0 && <button onClick={() => setRunning(true)} className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold flex items-center gap-2"><Play size={18}/> Start Separation</button>}
                             {running && <button onClick={() => setRunning(false)} className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl font-bold flex items-center gap-2"><Pause size={18}/> Pause</button>}
                              {!running && chroma.progress > 0 && <button onClick={() => setRunning(true)} className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold flex items-center gap-2"><Play size={18}/> Resume</button>}
                             <button onClick={resetAll} className="px-4 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-white rounded-xl font-bold border border-slate-200 dark:border-white/5"><RotateCcw size={18}/></button>
                         </div>
                    </div>
                    <div className="w-64 bg-slate-100 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/5">
                         <div className="space-y-2 text-xs">
                             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div> <span>Carotene (Most Soluble)</span></div>
                             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> <span>Xanthophyll</span></div>
                             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-teal-600"></div> <span>Chlorophyll a</span></div>
                             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-lime-500"></div> <span>Chlorophyll b (Least Soluble)</span></div>
                         </div>
                    </div>
                </div>
            </div>
        );
    }

    // B1: MITOSIS
    if (labId === 'b1') {
        return (
            <div className="flex flex-col h-full bg-slate-900">
                <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden">
                    {/* Viewport */}
                    <div className="w-[400px] h-[400px] rounded-full border-[20px] border-black bg-slate-800 overflow-hidden relative shadow-2xl shadow-black/50">
                        {/* Blurred Cells Image (simulated with divs) */}
                        <div className="absolute inset-0 transition-all duration-300 transform scale-150" style={{ filter: `blur(${Math.abs(mitosis.focus - 50)/5}px)`, transform: `translate(${mitosis.focus-50}px, 0)` }}>
                            {/* Cell 1 - Metaphase */}
                            <div className="absolute top-20 left-20 w-24 h-24 rounded-full bg-pink-200/20 border border-pink-500/30 flex items-center justify-center">
                                <div className="w-16 h-2 bg-purple-600 rotate-45 rounded-full"></div>
                                <div className="w-16 h-2 bg-purple-600 -rotate-45 rounded-full absolute"></div>
                            </div>
                            {/* Cell 2 - Anaphase */}
                            <div className="absolute bottom-32 right-24 w-24 h-24 rounded-full bg-pink-200/20 border border-pink-500/30">
                                <div className="absolute top-4 left-4 w-8 h-2 bg-purple-600 rotate-12 rounded-full"></div>
                                <div className="absolute bottom-4 right-4 w-8 h-2 bg-purple-600 -rotate-12 rounded-full"></div>
                            </div>
                        </div>
                        
                        {/* Crosshair */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500/20"></div>
                            <div className="absolute top-0 left-1/2 h-full w-[1px] bg-red-500/20"></div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800 p-6 z-40 border-t border-white/10 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-white">Microscope View</h3>
                        <p className="text-sm text-gray-400">Adjust focus to see chromosomes clearly.</p>
                    </div>
                    <div className="flex gap-8 items-center">
                        <div className="w-48">
                            <label className="text-xs text-gray-400 uppercase mb-1 block">Coarse Focus</label>
                            <input type="range" min="0" max="100" value={mitosis.focus} onChange={(e) => setMitosis({...mitosis, focus: parseInt(e.target.value)})} className="w-full accent-blue-500"/>
                        </div>
                        <button onClick={() => setMitosis({...mitosis, showLabels: !mitosis.showLabels})} className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 text-white text-sm">
                            {mitosis.showLabels ? "Hide Labels" : "Show Labels"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // B2: STOMATA
    if (labId === 'b2') {
        // Create random dots for stomata
        const numStomata = stomata.surface === 'lower' ? 20 : 5;
        const dots = Array.from({ length: numStomata }).map((_, i) => ({
            x: Math.random() * 300 + 50,
            y: Math.random() * 300 + 50,
            r: Math.random() * 30
        }));

        return (
            <div className="flex flex-col h-full bg-slate-900">
                <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden">
                    <div className="w-[400px] h-[400px] rounded-full border-[20px] border-black bg-green-100/10 overflow-hidden relative shadow-2xl">
                        <div className="absolute inset-0 transition-all duration-300" style={{ filter: `blur(${Math.abs(stomata.focus - 60)/5}px)` }}>
                            {/* Cellular Structure Background */}
                            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/honeycomb.png')]"></div>
                            {/* Stomata */}
                            {dots.map((d, i) => (
                                <div key={i} className="absolute w-8 h-4 bg-green-600/80 rounded-full border border-green-800" style={{ top: d.y, left: d.x, transform: `rotate(${d.r}deg)` }}>
                                    <div className="absolute inset-0 m-auto w-6 h-1 bg-black/20 rounded-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800 p-6 z-40 border-t border-white/10 flex justify-between items-center">
                    <div className="flex gap-4">
                        <button onClick={() => setStomata({...stomata, surface: 'upper'})} className={`px-4 py-2 rounded font-bold ${stomata.surface==='upper'?'bg-green-500 text-white':'bg-white/10 text-gray-400'}`}>Upper Epidermis</button>
                        <button onClick={() => setStomata({...stomata, surface: 'lower'})} className={`px-4 py-2 rounded font-bold ${stomata.surface==='lower'?'bg-green-500 text-white':'bg-white/10 text-gray-400'}`}>Lower Epidermis</button>
                    </div>
                    <div className="w-48">
                        <label className="text-xs text-gray-400 uppercase mb-1 block">Fine Focus</label>
                        <input type="range" min="0" max="100" value={stomata.focus} onChange={(e) => setStomata({...stomata, focus: parseInt(e.target.value)})} className="w-full accent-green-500"/>
                    </div>
                </div>
            </div>
        );
    }

    // B4: URINE SUGAR
    if (labId === 'b4') {
        return (
            <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900 transition-colors">
                <div className="flex-1 flex items-center justify-center relative bg-gradient-to-b from-slate-300 to-slate-200 dark:from-slate-800 dark:to-black">
                    
                    {/* Bunsen Burner Area */}
                    <div className="relative flex flex-col items-center mt-20">
                        {/* Test Tube Holder Hand */}
                        <div className="absolute -top-32 -right-20 w-40 h-2 bg-slate-400 rotate-[-20deg] z-20"></div>
                        
                        {/* Test Tube */}
                        <div className="w-12 h-48 border-x-2 border-b-2 border-slate-400/50 rounded-b-2xl bg-white/10 backdrop-blur-sm overflow-hidden relative z-10 origin-top rotate-[-20deg] -translate-y-24 translate-x-8">
                            <div className="absolute bottom-0 w-full h-32 transition-colors duration-1000" style={{ backgroundColor: urineTest.color, opacity: 0.8 }}></div>
                            {urineTest.temp > 80 && (
                                <div className="absolute bottom-0 w-full h-8 bg-red-800/50 blur-sm"></div>
                            )}
                        </div>

                        {/* Flame */}
                        <div className="relative mt-4">
                            <div className="w-16 h-4 bg-slate-600 rounded-t-lg"></div>
                            <div className="w-24 h-2 bg-slate-700 rounded-full"></div>
                            {running && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-24 bg-orange-500 rounded-full blur-md animate-pulse opacity-80 origin-bottom scale-y-110">
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-16 bg-blue-400 rounded-full blur-sm"></div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 p-6 z-40 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-white">Benedict's Test</h3>
                        <p className="text-sm text-gray-400">Heat the mixture to test for reducing sugars.</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <div className="text-xs text-gray-500 uppercase">Temperature</div>
                            <div className="text-2xl font-mono font-bold text-orange-500">{urineTest.temp}°C</div>
                        </div>
                        <button 
                            onMouseDown={() => setRunning(true)} 
                            onMouseUp={() => setRunning(false)} 
                            className={`px-8 py-4 rounded-full font-bold text-white shadow-lg active:scale-95 transition-all ${running ? 'bg-red-600 scale-95' : 'bg-orange-500 hover:bg-orange-400'}`}
                        >
                            <Flame className={running ? 'animate-bounce' : ''} fill="currentColor" />
                            {running ? "Heating..." : "Hold to Heat"}
                        </button>
                        <button onClick={resetAll} className="p-3 bg-white/10 rounded-xl hover:bg-white/20"><RotateCcw size={20}/></button>
                    </div>
                </div>
            </div>
        );
    }

    // CS1: LOGIC GATES
    if (labId === 'cs1') {
        const output = logic.gate === 'AND' ? logic.a && logic.b :
                       logic.gate === 'OR' ? logic.a || logic.b :
                       logic.gate === 'NOT' ? !logic.a :
                       logic.gate === 'XOR' ? logic.a !== logic.b : false;
        
        return (
            <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 transition-colors p-8 items-center justify-center">
                <div className="flex items-center gap-12 scale-110">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="text-slate-500 font-bold">A</span>
                            <button onClick={() => setLogic({...logic, a: !logic.a})} className={`w-16 h-8 rounded-full p-1 transition-colors ${logic.a ? 'bg-green-500' : 'bg-slate-300'}`}>
                                <div className={`w-6 h-6 bg-white rounded-full shadow transition-transform ${logic.a ? 'translate-x-8' : ''}`}></div>
                            </button>
                            <span className="font-mono text-lg">{logic.a ? '1' : '0'}</span>
                        </div>
                        {logic.gate !== 'NOT' && (
                            <div className="flex items-center gap-4">
                                <span className="text-slate-500 font-bold">B</span>
                                <button onClick={() => setLogic({...logic, b: !logic.b})} className={`w-16 h-8 rounded-full p-1 transition-colors ${logic.b ? 'bg-green-500' : 'bg-slate-300'}`}>
                                    <div className={`w-6 h-6 bg-white rounded-full shadow transition-transform ${logic.b ? 'translate-x-8' : ''}`}></div>
                                </button>
                                <span className="font-mono text-lg">{logic.b ? '1' : '0'}</span>
                            </div>
                        )}
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-200 dark:border-white/10 flex flex-col items-center">
                        <Cpu size={40} className="text-purple-500 mb-4"/>
                        <select value={logic.gate} onChange={(e) => setLogic({...logic, gate: e.target.value})} className="bg-slate-100 dark:bg-slate-700 p-2 rounded mb-2 font-bold">
                            <option>AND</option><option>OR</option><option>NOT</option><option>XOR</option>
                        </select>
                        <div className="text-xs text-slate-500">Logic Gate</div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${output ? 'bg-yellow-400 shadow-yellow-400/50' : 'bg-slate-300 dark:bg-slate-700'}`}>
                            <Lightbulb size={40} className={output ? 'text-white' : 'text-slate-500'} />
                        </div>
                        <span className="font-mono text-xl font-bold text-slate-700 dark:text-white">Y = {output ? '1' : '0'}</span>
                    </div>
                </div>
            </div>
        );
    }

    // CS2/3: SORTING
    if (labId === 'cs2' || labId === 'cs3') {
        const stepSort = () => {
            const arr = [...sortArray];
            // Simplified random step for visualization
            const i = Math.floor(Math.random() * (arr.length - 1));
            if (arr[i] > arr[i+1]) {
                [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
                setSortArray(arr);
            }
            setSortStep(s => s + 1);
        };

        return (
            <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 items-center justify-center p-8">
                <div className="flex items-end gap-2 h-64 mb-12">
                    {sortArray.map((h, i) => (
                        <motion.div 
                            layout
                            key={i} 
                            className="w-12 bg-blue-500 rounded-t-lg flex items-end justify-center pb-2 text-white font-bold"
                            style={{ height: `${h * 3}px`, backgroundColor: `hsl(${h * 3}, 70%, 60%)` }}
                        >
                            {h}
                        </motion.div>
                    ))}
                </div>
                <div className="flex gap-4">
                    <button onClick={stepSort} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2">
                        <Play size={18}/> Step
                    </button>
                    <button onClick={resetAll} className="px-6 py-3 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 text-slate-700 dark:text-white rounded-xl font-bold flex items-center gap-2">
                        <RefreshCw size={18}/> Shuffle
                    </button>
                </div>
            </div>
        );
    }

    // CS4: STACK
    if (labId === 'cs4') {
        return (
            <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 items-center justify-center p-8">
                <div className="w-48 h-80 border-x-4 border-b-4 border-slate-400 dark:border-slate-600 rounded-b-xl flex flex-col-reverse justify-start p-2 gap-2 bg-slate-200/50 dark:bg-white/5 relative">
                    <AnimatePresence>
                        {stack.map((val, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="w-full h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md"
                            >
                                {val}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {stack.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold">EMPTY</div>}
                </div>
                <div className="flex gap-4 mt-8">
                    <button onClick={() => setStack([...stack, Math.floor(Math.random()*100)])} disabled={stack.length >= 6} className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold shadow-lg disabled:opacity-50">
                        PUSH
                    </button>
                    <button onClick={() => setStack(stack.slice(0, -1))} disabled={stack.length === 0} className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold shadow-lg disabled:opacity-50">
                        POP
                    </button>
                </div>
            </div>
        );
    }

    // FALLBACK
    const scenario = LAB_SCENARIOS[labId];
    if (scenario) return <RichProceduralLab scenario={scenario} />;

    return <div className="flex items-center justify-center h-full text-gray-500 bg-slate-100 dark:bg-slate-900"><div className="text-center"><FlaskConical size={48} className="mx-auto mb-4 opacity-20" /><p>Simulation loading...</p></div></div>;
};

export default SimulationStage;
