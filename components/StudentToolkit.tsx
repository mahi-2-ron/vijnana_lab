
import React, { useState } from 'react';
import { 
  X, Calculator, Shield, Cpu, Atom, Activity, Hash, 
  Dna, Sigma, FlaskConical, Flame, Skull, Zap, AlertTriangle, 
  Eye, Thermometer, Box, Maximize2, Rotate3D, Grid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fix for Framer Motion type definitions
const MotionDiv = motion.div as any;

const TOOLS = [
  { id: 'formulas', label: 'Formula Sheet', icon: Sigma, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-500/20' },
  { id: 'logic', label: 'Logic Gates', icon: Cpu, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-500/20' },
  { id: 'periodic', label: 'Periodic Table', icon: Atom, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-500/20' },
  { id: 'constants', label: 'Constants', icon: Hash, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-500/20' },
  { id: 'calculator', label: 'Calculator', icon: Calculator, color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-100 dark:bg-pink-500/20' },
  { id: 'safety', label: 'Safety Guide', icon: Shield, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-500/20' },
  { id: 'biology', label: 'Bio Diagrams', icon: Dna, color: 'text-lime-600 dark:text-lime-400', bg: 'bg-lime-100 dark:bg-lime-500/20' },
];

const FORMULAS: any = {
  Physics: [
    {
      chapter: "1. Units & Measurement",
      items: [
        { name: "Relative Error", eq: "Δa_mean / a_mean", desc: "Fractional error" },
        { name: "Percentage Error", eq: "(Δa / a) × 100", desc: "Error in percent" },
        { name: "Sum Error", eq: "ΔZ = ΔA + ΔB", desc: "Add absolute errors" },
        { name: "Product Error", eq: "ΔZ/Z = ΔA/A + ΔB/B", desc: "Add relative errors" },
        { name: "Power Rule", eq: "ΔZ/Z = n(ΔA/A)", desc: "For Z = A^n" },
        { name: "Vernier LC", eq: "1 MSD - 1 VSD", desc: "Least Count" },
        { name: "Screw Gauge LC", eq: "Pitch / Divisions", desc: "Least Count" },
        { name: "Solid Angle", eq: "Ω = A / r²", desc: "Steradian" },
        { name: "Parallax", eq: "D = b / θ", desc: "Large distances" },
        { name: "Density", eq: "ρ = M / V", desc: "Mass per unit vol" }
      ]
    },
    {
      chapter: "2. Kinematics",
      items: [
        { name: "Velocity", eq: "v = u + at", desc: "1st Eq of Motion" },
        { name: "Displacement", eq: "s = ut + ½at²", desc: "2nd Eq of Motion" },
        { name: "Vel-Disp", eq: "v² = u² + 2as", desc: "3rd Eq of Motion" },
        { name: "Nth Second", eq: "Sn = u + a/2(2n-1)", desc: "Dist in nth sec" },
        { name: "Avg Velocity", eq: "Δx / Δt", desc: "Total disp / time" },
        { name: "Relative Vel", eq: "Vab = Va - Vb", desc: "Vel of A wrt B" },
        { name: "Max Height", eq: "H = u²sin²θ / 2g", desc: "Projectile" },
        { name: "Range", eq: "R = u²sin2θ / g", desc: "Projectile" },
        { name: "Time of Flight", eq: "T = 2usinθ / g", desc: "Projectile" },
        { name: "Trajectory", eq: "y = xtanθ - gx²/2u²cos²θ", desc: "Path Equation" }
      ]
    },
    {
      chapter: "3. Laws of Motion",
      items: [
        { name: "Force", eq: "F = ma", desc: "Newton's 2nd Law" },
        { name: "Momentum", eq: "p = mv", desc: "Linear Momentum" },
        { name: "Impulse", eq: "I = F · Δt", desc: "Change in momentum" },
        { name: "Friction", eq: "f = μN", desc: "Static/Kinetic" },
        { name: "Banking Angle", eq: "tanθ = v² / rg", desc: "Circular turn" },
        { name: "Centripetal F", eq: "Fc = mv² / r", desc: "Center seeking" },
        { name: "Cons. Momentum", eq: "m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂", desc: "Isolated system" },
        { name: "Apparent Wt", eq: "R = m(g ± a)", desc: "Lift motion" },
        { name: "Recoil Vel", eq: "V = -mv / M", desc: "Gun recoil" },
        { name: "Equilibrium", eq: "ΣF = 0", desc: "Net force zero" }
      ]
    },
    {
      chapter: "4. Work, Energy & Power",
      items: [
        { name: "Work", eq: "W = F · d = Fd cosθ", desc: "Dot product" },
        { name: "Kinetic Energy", eq: "KE = ½mv²", desc: "Motion energy" },
        { name: "Potential Energy", eq: "PE = mgh", desc: "Gravitational PE" },
        { name: "Spring PE", eq: "U = ½kx²", desc: "Elastic PE" },
        { name: "Work-Energy", eq: "W_net = ΔKE", desc: "Theorem" },
        { name: "Power", eq: "P = W/t = F · v", desc: "Rate of work" },
        { name: "Efficiency", eq: "η = P_out / P_in", desc: "Performance" },
        { name: "Elastic Collision", eq: "e = 1", desc: "KE conserved" },
        { name: "Inelastic", eq: "0 < e < 1", desc: "KE lost" },
        { name: "Restitution", eq: "e = |v₂-v₁| / |u₁-u₂|", desc: "Coeff of restitution" }
      ]
    },
    {
      chapter: "5. Rotational Motion",
      items: [
        { name: "Torque", eq: "τ = r × F = Iα", desc: "Turning effect" },
        { name: "Angular Mom", eq: "L = r × p = Iω", desc: "Rotational momentum" },
        { name: "Moment of Inertia", eq: "I = Σmr²", desc: "Rotational mass" },
        { name: "Rotational KE", eq: "K = ½Iω²", desc: "Energy" },
        { name: "Parallel Axis", eq: "I = Icm + Md²", desc: "Theorem" },
        { name: "Perp Axis", eq: "Iz = Ix + Iy", desc: "Theorem (Laminar)" },
        { name: "Radius Gyration", eq: "k = √(I/M)", desc: "Effective radius" },
        { name: "Rolling KE", eq: "K = ½mv²(1 + k²/r²)", desc: "Trans + Rot" },
        { name: "Power", eq: "P = τω", desc: "Rotational power" },
        { name: "Work", eq: "W = τθ", desc: "Rotational work" }
      ]
    },
    {
      chapter: "6. Gravitation",
      items: [
        { name: "Force", eq: "F = Gm₁m₂ / r²", desc: "Universal Law" },
        { name: "Gravity (g)", eq: "g = GM / R²", desc: "Surface gravity" },
        { name: "g at height", eq: "gh = g(1 - 2h/R)", desc: "For h << R" },
        { name: "g at depth", eq: "gd = g(1 - d/R)", desc: "Inside Earth" },
        { name: "Escape Vel", eq: "ve = √(2GM/R)", desc: "From surface" },
        { name: "Orbital Vel", eq: "vo = √(GM/r)", desc: "Satellite" },
        { name: "Time Period", eq: "T² ∝ r³", desc: "Kepler's 3rd Law" },
        { name: "Grav Potential", eq: "V = -GM / r", desc: "Potential" },
        { name: "Grav PE", eq: "U = -GMm / r", desc: "Potential Energy" },
        { name: "Areal Vel", eq: "dA/dt = L/2m", desc: "Kepler's 2nd Law" }
      ]
    },
    {
      chapter: "7. Solids & Fluids",
      items: [
        { name: "Stress", eq: "σ = F / A", desc: "Force per area" },
        { name: "Strain", eq: "ε = ΔL / L", desc: "Deformation" },
        { name: "Young's Mod", eq: "Y = σ / ε", desc: "Elasticity" },
        { name: "Pressure", eq: "P = P₀ + hρg", desc: "Depth pressure" },
        { name: "Archimedes", eq: "F_b = Vρg", desc: "Buoyant Force" },
        { name: "Continuity", eq: "A₁v₁ = A₂v₂", desc: "Cons of Mass" },
        { name: "Bernoulli", eq: "P + ½ρv² + ρgh = k", desc: "Cons of Energy" },
        { name: "Viscous Force", eq: "F = -ηA(dv/dx)", desc: "Newton's Law" },
        { name: "Terminal Vel", eq: "vt = 2r²(ρ-σ)g / 9η", desc: "Stokes Law" },
        { name: "Surface Tension", eq: "S = F / l", desc: "Force per length" }
      ]
    },
    {
      chapter: "8. Thermodynamics",
      items: [
        { name: "Specific Heat", eq: "Q = mcΔT", desc: "Heat capacity" },
        { name: "Latent Heat", eq: "Q = mL", desc: "Phase change" },
        { name: "First Law", eq: "ΔQ = ΔU + ΔW", desc: "Cons of Energy" },
        { name: "Work Done", eq: "W = PΔV", desc: "Isobaric" },
        { name: "Mayer's Eq", eq: "Cp - Cv = R", desc: "Ideal gas" },
        { name: "Adiabatic", eq: "PV^γ = Constant", desc: "Process" },
        { name: "Efficiency", eq: "η = 1 - T₂/T₁", desc: "Carnot Engine" },
        { name: "Entropy", eq: "ΔS = ΔQ_rev / T", desc: "Disorder" },
        { name: "Mean Free Path", eq: "λ = 1 / (√2πd²n)", desc: "Kinetic Theory" },
        { name: "Equipartition", eq: "U = f/2 kT", desc: "Energy per DOF" }
      ]
    },
    {
      chapter: "9. Oscillations & Waves",
      items: [
        { name: "SHM Eq", eq: "F = -kx", desc: "Restoring force" },
        { name: "Time Period", eq: "T = 2π√(m/k)", desc: "Spring Mass" },
        { name: "Simple Pendulum", eq: "T = 2π√(L/g)", desc: "Period" },
        { name: "Displacement", eq: "x = Asin(ωt + φ)", desc: "SHM" },
        { name: "Velocity", eq: "v = ω√(A² - x²)", desc: "SHM" },
        { name: "Wave Velocity", eq: "v = fλ", desc: "General Wave" },
        { name: "String Wave", eq: "v = √(T/μ)", desc: "Tension/Linear density" },
        { name: "Doppler Effect", eq: "f' = f(v±vo)/(v∓vs)", desc: "Freq shift" },
        { name: "Beat Freq", eq: "fb = |f₁ - f₂|", desc: "Difference" },
        { name: "Open Pipe", eq: "f = nv / 2L", desc: "Harmonics" }
      ]
    },
    {
      chapter: "10. Electrostatics",
      items: [
        { name: "Coulomb Force", eq: "F = kq₁q₂ / r²", desc: "Point charges" },
        { name: "Electric Field", eq: "E = F / q", desc: "Field intensity" },
        { name: "Potential", eq: "V = kq / r", desc: "Point charge" },
        { name: "PE", eq: "U = kq₁q₂ / r", desc: "System energy" },
        { name: "Dipole Field", eq: "E = 2kp / r³", desc: "Axial point" },
        { name: "Torque", eq: "τ = p × E", desc: "Dipole in field" },
        { name: "Flux", eq: "Φ = E · A", desc: "Electric flux" },
        { name: "Gauss Law", eq: "∮E·dA = q/ε₀", desc: "Flux theorem" },
        { name: "Capacitance", eq: "C = Q / V", desc: "Definition" },
        { name: "Parallel Plate", eq: "C = ε₀A / d", desc: "Capacitor" }
      ]
    }
  ],
  Chemistry: [
    {
      chapter: "1. Basic Concepts",
      items: [
        { name: "Mole", eq: "n = m / M", desc: "Mass/Molar Mass" },
        { name: "Molarity", eq: "M = n / V(L)", desc: "Moles/Volume" },
        { name: "Molality", eq: "m = n / kg(solvent)", desc: "Moles/Mass" },
        { name: "Normality", eq: "N = n_eq / V(L)", desc: "Eq/Volume" },
        { name: "Mole Fraction", eq: "x = n₁ / (n₁+n₂)", desc: "Ratio" },
        { name: "Mass %", eq: "(mass_solute/total)×100", desc: "Concentration" },
        { name: "Avg Atomic Mass", eq: "Σ(% × Mass) / 100", desc: "Isotopes" },
        { name: "Ideal Gas", eq: "PV = nRT", desc: "State equation" },
        { name: "Density", eq: "d = PM / RT", desc: "Gas density" },
        { name: "Dilution", eq: "M₁V₁ = M₂V₂", desc: "Concentration change" }
      ]
    },
    {
      chapter: "2. Structure of Atom",
      items: [
        { name: "Energy", eq: "E = hν = hc/λ", desc: "Photon energy" },
        { name: "Bohr Radius", eq: "rn = 0.529 n²/Z Å", desc: "Orbit radius" },
        { name: "Bohr Energy", eq: "En = -13.6 Z²/n² eV", desc: "Orbit energy" },
        { name: "Rydberg Eq", eq: "1/λ = R Z²(1/n₁²-1/n₂²)", desc: "Spectrum" },
        { name: "de Broglie", eq: "λ = h / mv", desc: "Wave-particle" },
        { name: "Heisenberg", eq: "Δx · Δp ≥ h/4π", desc: "Uncertainty" },
        { name: "Ang Momentum", eq: "mvr = nh / 2π", desc: "Quantization" },
        { name: "Photoelectric", eq: "hν = Φ + KE_max", desc: "Einstein Eq" },
        { name: "Spin Mom", eq: "μ = √n(n+2) BM", desc: "Magnetic moment" },
        { name: "Nodes", eq: "Total = n-1", desc: "Radial + Angular" }
      ]
    },
    {
      chapter: "3. Bonding",
      items: [
        { name: "Formal Charge", eq: "V - L - ½S", desc: "Lewis structure" },
        { name: "Dipole Moment", eq: "μ = q × d", desc: "Polarity" },
        { name: "Bond Order", eq: "½(Nb - Na)", desc: "MO Theory" },
        { name: "Hybridization", eq: "½(V+M-C+A)", desc: "Steric number" },
        { name: "Ionic %", eq: "16Δχ + 3.5(Δχ)²", desc: "Hannay-Smith" },
        { name: "Lattice Energy", eq: "U ∝ q₁q₂ / r", desc: "Ionic stability" },
        { name: "Bond Angle", eq: "lp-lp > lp-bp > bp-bp", desc: "VSEPR Repulsion" },
        { name: "H-Bonding", eq: "F, O, N", desc: "High electronegativity" },
        { name: "Sigma Bond", eq: "Head-on overlap", desc: "Stronger" },
        { name: "Pi Bond", eq: "Lateral overlap", desc: "Weaker" }
      ]
    },
    {
      chapter: "4. Thermodynamics",
      items: [
        { name: "First Law", eq: "ΔU = q + w", desc: "Energy cons." },
        { name: "Enthalpy", eq: "H = U + PV", desc: "Heat content" },
        { name: "Relation", eq: "ΔH = ΔU + ΔngRT", desc: "Gas reactions" },
        { name: "Entropy", eq: "ΔS = q_rev / T", desc: "Randomness" },
        { name: "Gibbs Energy", eq: "ΔG = ΔH - TΔS", desc: "Spontaneity" },
        { name: "Equilibrium", eq: "ΔG° = -RT ln K", desc: "Free energy" },
        { name: "Work (Rev)", eq: "-2.303nRT log(V₂/V₁)", desc: "Isothermal" },
        { name: "Work (Irr)", eq: "-P_ext(V₂-V₁)", desc: "Expansion" },
        { name: "Heat Capacity", eq: "Cp - Cv = R", desc: "Mayer's relation" },
        { name: "Hess's Law", eq: "ΣΔH_prod - ΣΔH_react", desc: "Additivity" }
      ]
    },
    {
      chapter: "5. Equilibrium",
      items: [
        { name: "Kp & Kc", eq: "Kp = Kc(RT)^Δng", desc: "Equilibrium const" },
        { name: "pH", eq: "-log[H⁺]", desc: "Acidity" },
        { name: "pOH", eq: "-log[OH⁻]", desc: "Basicity" },
        { name: "Ionic Product", eq: "pH + pOH = 14", desc: "At 25°C" },
        { name: "Henderson A", eq: "pH = pKa + log(S/A)", desc: "Acidic Buffer" },
        { name: "Henderson B", eq: "pOH = pKb + log(S/B)", desc: "Basic Buffer" },
        { name: "Solubility", eq: "Ksp = x^x y^y S^(x+y)", desc: "AxBy salt" },
        { name: "Ostwald Law", eq: "Ka = Cα² / (1-α)", desc: "Weak electrolyte" },
        { name: "Kw", eq: "1.0 × 10⁻¹⁴", desc: "Water constant" },
        { name: "Gibbs Eq", eq: "ΔG = ΔG° + RT ln Q", desc: "Non-standard" }
      ]
    },
    {
      chapter: "6. Solid State",
      items: [
        { name: "Density", eq: "d = ZM / a³Na", desc: "Unit cell" },
        { name: "Packing Eff", eq: "74% (FCC), 68% (BCC)", desc: "Space filled" },
        { name: "Radius SC", eq: "a = 2r", desc: "Simple Cubic" },
        { name: "Radius BCC", eq: "4r = a√3", desc: "Body Centered" },
        { name: "Radius FCC", eq: "4r = a√2", desc: "Face Centered" },
        { name: "Bragg's Eq", eq: "nλ = 2d sinθ", desc: "X-ray diffraction" },
        { name: "Void Radius", eq: "0.225R (Tet), 0.414R (Oct)", desc: "Interstitial" },
        { name: "Coord No.", eq: "6 (SC), 8 (BCC), 12 (FCC)", desc: "Neighbors" },
        { name: "Tetra Voids", eq: "2N", desc: "N = spheres" },
        { name: "Octa Voids", eq: "N", desc: "N = spheres" }
      ]
    },
    {
      chapter: "7. Solutions",
      items: [
        { name: "Henry's Law", eq: "p = Kh · x", desc: "Gas solubility" },
        { name: "Raoult's Law", eq: "P = P₁°x₁ + P₂°x₂", desc: "Vapor pressure" },
        { name: "Rel Lowering", eq: "(P°-P)/P° = x₂", desc: "Colligative" },
        { name: "Boiling Pt", eq: "ΔTb = Kb · m", desc: "Elevation" },
        { name: "Freezing Pt", eq: "ΔTf = Kf · m", desc: "Depression" },
        { name: "Osmotic Press", eq: "π = CRT", desc: "Osmosis" },
        { name: "Van't Hoff", eq: "i = Obs/Calc", desc: "Factor" },
        { name: "Assoc degree", eq: "α = (1-i) / (1-1/n)", desc: "Association" },
        { name: "Dissoc degree", eq: "α = (i-1) / (n-1)", desc: "Dissociation" },
        { name: "Total P", eq: "P_total = PA + PB", desc: "Dalton's Law" }
      ]
    },
    {
      chapter: "8. Electrochemistry",
      items: [
        { name: "Cell Potential", eq: "E°cell = E°cat - E°an", desc: "Standard EMF" },
        { name: "Nernst Eq", eq: "E = E° - 0.059/n logQ", desc: "At 298K" },
        { name: "Gibbs Energy", eq: "ΔG° = -nFE°cell", desc: "Work max" },
        { name: "Equil Const", eq: "log Kc = nE°/0.059", desc: "From Nernst" },
        { name: "Conductance", eq: "G = 1/R = κA/l", desc: "Conductivity" },
        { name: "Molar Cond", eq: "Λm = (κ × 1000) / C", desc: "Solution" },
        { name: "Kohlrausch", eq: "Λ° = λ°+ + λ°-", desc: "Infinite dilution" },
        { name: "Faraday 1st", eq: "w = ZIt", desc: "Electrolysis" },
        { name: "Faraday 2nd", eq: "w₁/E₁ = w₂/E₂", desc: "Series cells" },
        { name: "Cell Const", eq: "G* = l/A = Rκ", desc: "Geometry" }
      ]
    },
    {
      chapter: "9. Chemical Kinetics",
      items: [
        { name: "Rate Law", eq: "Rate = k[A]ˣ[B]ʸ", desc: "Differential" },
        { name: "Zero Order", eq: "k = ([A]₀ - [A]) / t", desc: "Rate constant" },
        { name: "First Order", eq: "k = 2.303/t log(A₀/A)", desc: "Rate constant" },
        { name: "Half Life 0", eq: "t½ = [A]₀ / 2k", desc: "Zero order" },
        { name: "Half Life 1", eq: "t½ = 0.693 / k", desc: "First order" },
        { name: "Arrhenius", eq: "k = Ae^(-Ea/RT)", desc: "Temp effect" },
        { name: "Log form", eq: "log k = log A - Ea/2.3RT", desc: "Linear plot" },
        { name: "Collision Freq", eq: "Z_AB", desc: "Theory" },
        { name: "Activation E", eq: "Ea", desc: "Energy barrier" },
        { name: "Temp Coeff", eq: "μ ≈ 2 to 3", desc: "Rate ratio 10°C" }
      ]
    },
    {
      chapter: "10. Surface Chemistry",
      items: [
        { name: "Freundlich", eq: "x/m = kP^(1/n)", desc: "Adsorption isotherm" },
        { name: "Linear Form", eq: "log(x/m) = log k + 1/n log P", desc: "Plot" },
        { name: "Langmuir", eq: "x/m = aP / (1+bP)", desc: "Monolayer" },
        { name: "Hardy-Schulze", eq: "Coagulation ∝ Valency", desc: "Rule" },
        { name: "Gold Number", eq: "mg protective colloid", desc: "Definition" },
        { name: "Zeta Potential", eq: "Pd", desc: "Stability" },
        { name: "Emulsion", eq: "O/W or W/O", desc: "Types" },
        { name: "Catalysis", eq: "Lower Ea", desc: "Mechanism" },
        { name: "Tyndall", eq: "Scattering", desc: "Colloids" },
        { name: "Brownian", eq: "Zig-zag motion", desc: "Kinetic prop" }
      ]
    }
  ],
  Math: [
    {
      chapter: "1. Sets & Relations",
      items: [
        { name: "Power Set", eq: "2^n", desc: "Total subsets" },
        { name: "Union", eq: "n(A∪B) = n(A)+n(B)-n(A∩B)", desc: "Cardinality" },
        { name: "De Morgan", eq: "(A∪B)' = A'∩B'", desc: "Law" },
        { name: "Cartesian", eq: "n(A×B) = n(A)·n(B)", desc: "Product" },
        { name: "Relations", eq: "2^(mn)", desc: "Total relations" },
        { name: "Reflexive", eq: "(a,a) ∈ R", desc: "Property" },
        { name: "Symmetric", eq: "(a,b)⇒(b,a)", desc: "Property" },
        { name: "Transitive", eq: "(a,b),(b,c)⇒(a,c)", desc: "Property" },
        { name: "Equivalence", eq: "Ref + Sym + Trans", desc: "Relation" },
        { name: "Function", eq: "One-one / Onto", desc: "Mapping" }
      ]
    },
    {
      chapter: "2. Trigonometry",
      items: [
        { name: "Identity 1", eq: "sin²θ + cos²θ = 1", desc: "Pythagorean" },
        { name: "Identity 2", eq: "1 + tan²θ = sec²θ", desc: "Pythagorean" },
        { name: "Sin(A+B)", eq: "sinAcosB + cosAsinB", desc: "Compound" },
        { name: "Cos(A+B)", eq: "cosAcosB - sinAsinB", desc: "Compound" },
        { name: "Tan(A+B)", eq: "(tanA+tanB)/(1-tanAtanB)", desc: "Compound" },
        { name: "Sin 2A", eq: "2sinAcosA", desc: "Double angle" },
        { name: "Cos 2A", eq: "cos²A - sin²A", desc: "Double angle" },
        { name: "Sine Rule", eq: "a/sinA = b/sinB = c/sinC", desc: "Triangle" },
        { name: "Cosine Rule", eq: "c² = a²+b²-2abcosC", desc: "Triangle" },
        { name: "Tan 3A", eq: "(3tanA-tan³A)/(1-3tan²A)", desc: "Triple angle" }
      ]
    },
    {
      chapter: "3. Complex Numbers",
      items: [
        { name: "Standard", eq: "z = x + iy", desc: "Rectangular" },
        { name: "Modulus", eq: "|z| = √(x² + y²)", desc: "Magnitude" },
        { name: "Argument", eq: "θ = tan⁻¹(y/x)", desc: "Angle" },
        { name: "Polar", eq: "z = r(cosθ + isinθ)", desc: "Form" },
        { name: "Euler", eq: "z = re^(iθ)", desc: "Exponential" },
        { name: "De Moivre", eq: "(cosθ+isinθ)ⁿ = cos(nθ)+isin(nθ)", desc: "Theorem" },
        { name: "Cube Roots", eq: "1, ω, ω²", desc: "Unity" },
        { name: "Property", eq: "1 + ω + ω² = 0", desc: "Sum of roots" },
        { name: "Product", eq: "ω³ = 1", desc: "Product of roots" },
        { name: "Triangle Ineq", eq: "|z₁+z₂| ≤ |z₁|+|z₂|", desc: "Property" }
      ]
    },
    {
      chapter: "4. Quadratics",
      items: [
        { name: "Roots", eq: "(-b ± √D) / 2a", desc: "Formula" },
        { name: "Discriminant", eq: "D = b² - 4ac", desc: "Nature" },
        { name: "Sum Roots", eq: "α + β = -b/a", desc: "Relation" },
        { name: "Prod Roots", eq: "αβ = c/a", desc: "Relation" },
        { name: "Formation", eq: "x² - Sx + P = 0", desc: "Equation" },
        { name: "Real Roots", eq: "D ≥ 0", desc: "Condition" },
        { name: "Equal Roots", eq: "D = 0", desc: "Condition" },
        { name: "Imaginary", eq: "D < 0", desc: "Condition" },
        { name: "Vertex", eq: "(-b/2a, -D/4a)", desc: "Parabola" },
        { name: "Cubic Sum", eq: "α+β+γ = -b/a", desc: "Cubic Eq" }
      ]
    },
    {
      chapter: "5. Permutations",
      items: [
        { name: "Factorial", eq: "n! = n(n-1)...1", desc: "Definition" },
        { name: "Permutation", eq: "nPr = n! / (n-r)!", desc: "Arrangement" },
        { name: "Combination", eq: "nCr = n! / r!(n-r)!", desc: "Selection" },
        { name: "Relation", eq: "nPr = r! × nCr", desc: "P vs C" },
        { name: "Symmetry", eq: "nCr = nC(n-r)", desc: "Property" },
        { name: "Pascal", eq: "nCr + nC(r-1) = (n+1)Cr", desc: "Identity" },
        { name: "Circular", eq: "(n-1)!", desc: "Arrangement" },
        { name: "Necklace", eq: "(n-1)! / 2", desc: "Reversible" },
        { name: "Identical", eq: "n! / p!q!r!", desc: "Repetition" },
        { name: "Total", eq: "2ⁿ - 1", desc: "Selections" }
      ]
    },
    {
      chapter: "6. Sequences",
      items: [
        { name: "AP Nth", eq: "an = a + (n-1)d", desc: "Arithmetic" },
        { name: "AP Sum", eq: "Sn = n/2(2a + (n-1)d)", desc: "Arithmetic" },
        { name: "GP Nth", eq: "an = ar^(n-1)", desc: "Geometric" },
        { name: "GP Sum", eq: "Sn = a(rⁿ-1)/(r-1)", desc: "Geometric" },
        { name: "Infinite GP", eq: "S∞ = a / (1-r)", desc: "|r| < 1" },
        { name: "AM", eq: "(a+b)/2", desc: "Arithmetic Mean" },
        { name: "GM", eq: "√ab", desc: "Geometric Mean" },
        { name: "HM", eq: "2ab / (a+b)", desc: "Harmonic Mean" },
        { name: "Relation", eq: "AM ≥ GM ≥ HM", desc: "Inequality" },
        { name: "Sigma n", eq: "n(n+1)/2", desc: "Sum of naturals" }
      ]
    },
    {
      chapter: "7. Straight Lines",
      items: [
        { name: "Slope", eq: "m = tanθ = (y₂-y₁)/(x₂-x₁)", desc: "Gradient" },
        { name: "Point-Slope", eq: "y - y₁ = m(x - x₁)", desc: "Equation" },
        { name: "Two Point", eq: "Det form = 0", desc: "Equation" },
        { name: "Slope-Int", eq: "y = mx + c", desc: "Standard" },
        { name: "Intercept", eq: "x/a + y/b = 1", desc: "Form" },
        { name: "Normal", eq: "x cosω + y sinω = p", desc: "Form" },
        { name: "Distance", eq: "d = |Ax₁+By₁+C| / √(A²+B²)", desc: "Point to Line" },
        { name: "Parallel Dist", eq: "d = |C₁-C₂| / √(A²+B²)", desc: "Between lines" },
        { name: "Angle", eq: "tanθ = |(m₁-m₂)/(1+m₁m₂)|", desc: "Intersection" },
        { name: "Concurrency", eq: "Det(coeffs) = 0", desc: "3 lines" }
      ]
    },
    {
      chapter: "8. Conic Sections",
      items: [
        { name: "Circle", eq: "(x-h)² + (y-k)² = r²", desc: "Standard" },
        { name: "Parabola", eq: "y² = 4ax", desc: "Right handed" },
        { name: "Focus (P)", eq: "(a, 0)", desc: "Parabola" },
        { name: "Ellipse", eq: "x²/a² + y²/b² = 1", desc: "Standard" },
        { name: "Eccentricity E", eq: "e = √(1 - b²/a²)", desc: "Ellipse" },
        { name: "Hyperbola", eq: "x²/a² - y²/b² = 1", desc: "Standard" },
        { name: "Eccentricity H", eq: "e = √(1 + b²/a²)", desc: "Hyperbola" },
        { name: "Latus Rectum", eq: "2b² / a", desc: "Ellipse/Hyper" },
        { name: "Directrix", eq: "x = ± a/e", desc: "Ell/Hyp" },
        { name: "Tangent", eq: "y = mx ± √(a²m²+b²)", desc: "Ellipse Condition" }
      ]
    },
    {
      chapter: "9. Limits & Deriv",
      items: [
        { name: "Lim sinx/x", eq: "1", desc: "x → 0" },
        { name: "Lim (eˣ-1)/x", eq: "1", desc: "x → 0" },
        { name: "Power Rule", eq: "nxⁿ⁻¹", desc: "d/dx(xⁿ)" },
        { name: "Product Rule", eq: "uv' + vu'", desc: "d/dx(uv)" },
        { name: "Quotient Rule", eq: "(vu' - uv') / v²", desc: "d/dx(u/v)" },
        { name: "Chain Rule", eq: "dy/du · du/dx", desc: "Composite" },
        { name: "Sin x", eq: "cos x", desc: "Derivative" },
        { name: "Cos x", eq: "-sin x", desc: "Derivative" },
        { name: "Log x", eq: "1/x", desc: "Derivative" },
        { name: "eˣ", eq: "eˣ", desc: "Derivative" }
      ]
    },
    {
      chapter: "10. Integrals",
      items: [
        { name: "Power", eq: "xⁿ⁺¹ / (n+1)", desc: "Integral xⁿ" },
        { name: "Log", eq: "ln|x| + C", desc: "Integral 1/x" },
        { name: "Exp", eq: "eˣ + C", desc: "Integral eˣ" },
        { name: "Sin", eq: "-cos x + C", desc: "Integral sin" },
        { name: "Cos", eq: "sin x + C", desc: "Integral cos" },
        { name: "Sec²", eq: "tan x + C", desc: "Integral" },
        { name: "By Parts", eq: "uv - ∫vdu", desc: "Method" },
        { name: "Substitution", eq: "Put x = g(t)", desc: "Method" },
        { name: "Definite", eq: "F(b) - F(a)", desc: "Fundamental Thm" },
        { name: "Area", eq: "∫y dx", desc: "Application" }
      ]
    }
  ]
};

const CONSTANTS = [
  { symbol: "c", val: "3 × 10⁸ m/s", name: "Speed of Light" },
  { symbol: "h", val: "6.626 × 10⁻³⁴ J·s", name: "Planck Constant" },
  { symbol: "G", val: "6.67 × 10⁻¹¹ Nm²/kg²", name: "Gravitational Const" },
  { symbol: "Nₐ", val: "6.022 × 10²³ mol⁻¹", name: "Avogadro Number" },
  { symbol: "e", val: "1.602 × 10⁻¹⁹ C", name: "Elem Charge" },
  { symbol: "ε₀", val: "8.854 × 10⁻¹² F/m", name: "Permittivity" },
  { symbol: "μ₀", val: "4π × 10⁻⁷ T·m/A", name: "Permeability" },
  { symbol: "R", val: "8.314 J/(mol·K)", name: "Gas Constant" },
  { symbol: "k", val: "1.38 × 10⁻²³ J/K", name: "Boltzmann Constant" },
  { symbol: "mₑ", val: "9.11 × 10⁻³¹ kg", name: "Mass of Electron" },
  { symbol: "mₚ", val: "1.672 × 10⁻²⁷ kg", name: "Mass of Proton" },
  { symbol: "mₙ", val: "1.674 × 10⁻²⁷ kg", name: "Mass of Neutron" },
  { symbol: "F", val: "96485 C/mol", name: "Faraday Constant" },
  { symbol: "R∞", val: "1.097 × 10⁷ m⁻¹", name: "Rydberg Constant" },
  { symbol: "σ", val: "5.67 × 10⁻⁸ W/m²K⁴", name: "Stefan-Boltzmann" }
];

const LOGIC_GATES = [
  {
    name: "BUFFER",
    symbol: (
      <svg width="60" height="40" viewBox="0 0 60 40" className="stroke-current">
        <path d="M15,10 L40,25 L15,40 Z" transform="scale(0.8) translate(5,0)" fill="none" strokeWidth="3" />
        <line x1="0" y1="20" x2="15" y2="20" strokeWidth="2" />
        <line x1="43" y1="20" x2="60" y2="20" strokeWidth="2" />
      </svg>
    ),
    table: [["A", "Y"], ["0", "0"], ["1", "1"]]
  },
  {
    name: "NOT",
    symbol: (
      <svg width="60" height="40" viewBox="0 0 60 40" className="stroke-current">
        <path d="M15,10 L40,25 L15,40 Z" transform="scale(0.8) translate(5,0)" fill="none" strokeWidth="3" />
        <circle cx="45" cy="20" r="3" fill="none" strokeWidth="2"/>
        <line x1="0" y1="20" x2="15" y2="20" strokeWidth="2" />
        <line x1="48" y1="20" x2="60" y2="20" strokeWidth="2" />
      </svg>
    ),
    table: [["A", "Y"], ["0", "1"], ["1", "0"]]
  },
  {
    name: "AND",
    symbol: (
      <svg width="60" height="40" viewBox="0 0 60 40" className="stroke-current">
        <path d="M10,10 H30 A20,20 0 0 1 30,50 H10 Z" transform="scale(0.8) translate(5,5)" fill="none" strokeWidth="3" />
        <line x1="0" y1="15" x2="15" y2="15" strokeWidth="2" />
        <line x1="0" y1="35" x2="15" y2="35" strokeWidth="2" />
        <line x1="45" y1="25" x2="60" y2="25" strokeWidth="2" />
      </svg>
    ),
    table: [["A", "B", "Y"], ["0", "0", "0"], ["0", "1", "0"], ["1", "0", "0"], ["1", "1", "1"]]
  },
  {
    name: "NAND",
    symbol: (
      <svg width="60" height="40" viewBox="0 0 60 40" className="stroke-current">
        <path d="M10,10 H30 A20,20 0 0 1 30,50 H10 Z" transform="scale(0.8) translate(5,5)" fill="none" strokeWidth="3" />
        <circle cx="47" cy="25" r="3" fill="none" strokeWidth="2"/>
        <line x1="0" y1="15" x2="15" y2="15" strokeWidth="2" />
        <line x1="0" y1="35" x2="15" y2="35" strokeWidth="2" />
        <line x1="50" y1="25" x2="60" y2="25" strokeWidth="2" />
      </svg>
    ),
    table: [["A", "B", "Y"], ["0", "0", "1"], ["0", "1", "1"], ["1", "0", "1"], ["1", "1", "0"]]
  },
  {
    name: "OR",
    symbol: (
      <svg width="60" height="40" viewBox="0 0 60 40" className="stroke-current">
        <path d="M10,10 Q25,30 10,50 Q40,50 50,30 Q40,10 10,10" transform="scale(0.8) translate(5,5)" fill="none" strokeWidth="3" />
        <line x1="0" y1="15" x2="15" y2="15" strokeWidth="2" />
        <line x1="0" y1="35" x2="15" y2="35" strokeWidth="2" />
        <line x1="45" y1="25" x2="60" y2="25" strokeWidth="2" />
      </svg>
    ),
    table: [["A", "B", "Y"], ["0", "0", "0"], ["0", "1", "1"], ["1", "0", "1"], ["1", "1", "1"]]
  },
  {
    name: "NOR",
    symbol: (
      <svg width="60" height="40" viewBox="0 0 60 40" className="stroke-current">
        <path d="M10,10 Q25,30 10,50 Q40,50 50,30 Q40,10 10,10" transform="scale(0.8) translate(5,5)" fill="none" strokeWidth="3" />
        <circle cx="47" cy="25" r="3" fill="none" strokeWidth="2"/>
        <line x1="0" y1="15" x2="15" y2="15" strokeWidth="2" />
        <line x1="0" y1="35" x2="15" y2="35" strokeWidth="2" />
        <line x1="50" y1="25" x2="60" y2="25" strokeWidth="2" />
      </svg>
    ),
    table: [["A", "B", "Y"], ["0", "0", "1"], ["0", "1", "0"], ["1", "0", "0"], ["1", "1", "0"]]
  },
  {
    name: "XOR",
    symbol: (
      <svg width="60" height="40" viewBox="0 0 60 40" className="stroke-current">
         <path d="M15,10 Q30,30 15,50 Q45,50 55,30 Q45,10 15,10" transform="scale(0.8) translate(5,5)" fill="none" strokeWidth="3" />
         <path d="M5,10 Q20,30 5,50" transform="scale(0.8) translate(5,5)" fill="none" strokeWidth="3" />
         <line x1="0" y1="15" x2="12" y2="15" strokeWidth="2" />
         <line x1="0" y1="35" x2="12" y2="35" strokeWidth="2" />
         <line x1="50" y1="25" x2="60" y2="25" strokeWidth="2" />
      </svg>
    ),
    table: [["A", "B", "Y"], ["0", "0", "0"], ["0", "1", "1"], ["1", "0", "1"], ["1", "1", "0"]]
  },
  {
    name: "XNOR",
    symbol: (
      <svg width="60" height="40" viewBox="0 0 60 40" className="stroke-current">
         <path d="M15,10 Q30,30 15,50 Q45,50 55,30 Q45,10 15,10" transform="scale(0.8) translate(5,5)" fill="none" strokeWidth="3" />
         <path d="M5,10 Q20,30 5,50" transform="scale(0.8) translate(5,5)" fill="none" strokeWidth="3" />
         <circle cx="52" cy="25" r="3" fill="none" strokeWidth="2"/>
         <line x1="0" y1="15" x2="12" y2="15" strokeWidth="2" />
         <line x1="0" y1="35" x2="12" y2="35" strokeWidth="2" />
         <line x1="55" y1="25" x2="60" y2="25" strokeWidth="2" />
      </svg>
    ),
    table: [["A", "B", "Y"], ["0", "0", "1"], ["0", "1", "0"], ["1", "0", "0"], ["1", "1", "1"]]
  },
  {
    name: "3-IN AND",
    symbol: (
      <svg width="60" height="40" viewBox="0 0 60 40" className="stroke-current">
        <path d="M10,10 H30 A20,20 0 0 1 30,50 H10 Z" transform="scale(0.8) translate(5,5)" fill="none" strokeWidth="3" />
        <line x1="0" y1="15" x2="15" y2="15" strokeWidth="2" />
        <line x1="0" y1="25" x2="15" y2="25" strokeWidth="2" />
        <line x1="0" y1="35" x2="15" y2="35" strokeWidth="2" />
        <line x1="45" y1="25" x2="60" y2="25" strokeWidth="2" />
      </svg>
    ),
    table: [["A", "B", "C", "Y"], ["0", "0", "0", "0"], ["1", "1", "1", "1"], ["Else", "...", "...", "0"]]
  },
  {
    name: "3-IN OR",
    symbol: (
      <svg width="60" height="40" viewBox="0 0 60 40" className="stroke-current">
        <path d="M10,10 Q25,30 10,50 Q40,50 50,30 Q40,10 10,10" transform="scale(0.8) translate(5,5)" fill="none" strokeWidth="3" />
        <line x1="0" y1="15" x2="15" y2="15" strokeWidth="2" />
        <line x1="0" y1="25" x2="17" y2="25" strokeWidth="2" />
        <line x1="0" y1="35" x2="15" y2="35" strokeWidth="2" />
        <line x1="45" y1="25" x2="60" y2="25" strokeWidth="2" />
      </svg>
    ),
    table: [["A", "B", "C", "Y"], ["0", "0", "0", "0"], ["Else", "...", "...", "1"]]
  }
];

const ELEMENTS = [
  { n: 1, s: "H", m: "1.008", name: "Hydrogen", g: "Nonmetal" },
  { n: 2, s: "He", m: "4.002", name: "Helium", g: "Noble" },
  { n: 3, s: "Li", m: "6.94", name: "Lithium", g: "Alkali" },
  { n: 4, s: "Be", m: "9.012", name: "Beryllium", g: "Alkaline" },
  { n: 5, s: "B", m: "10.81", name: "Boron", g: "Metalloid" },
  { n: 6, s: "C", m: "12.01", name: "Carbon", g: "Nonmetal" },
  { n: 7, s: "N", m: "14.00", name: "Nitrogen", g: "Nonmetal" },
  { n: 8, s: "O", m: "16.00", name: "Oxygen", g: "Nonmetal" },
  { n: 9, s: "F", m: "18.99", name: "Fluorine", g: "Halogen" },
  { n: 10, s: "Ne", m: "20.18", name: "Neon", g: "Noble" },
  { n: 11, s: "Na", m: "22.99", name: "Sodium", g: "Alkali" },
  { n: 12, s: "Mg", m: "24.30", name: "Magnesium", g: "Alkaline" },
  { n: 13, s: "Al", m: "26.98", name: "Aluminum", g: "Metal" },
  { n: 14, s: "Si", m: "28.08", name: "Silicon", g: "Metalloid" },
  { n: 15, s: "P", m: "30.97", name: "Phosphorus", g: "Nonmetal" },
  { n: 16, s: "S", m: "32.06", name: "Sulfur", g: "Nonmetal" },
  { n: 17, s: "Cl", m: "35.45", name: "Chlorine", g: "Halogen" },
  { n: 18, s: "Ar", m: "39.95", name: "Argon", g: "Noble" },
  { n: 19, s: "K", m: "39.10", name: "Potassium", g: "Alkali" },
  { n: 20, s: "Ca", m: "40.08", name: "Calcium", g: "Alkaline" },
  { n: 21, s: "Sc", m: "44.96", name: "Scandium", g: "Transition" },
  { n: 22, s: "Ti", m: "47.87", name: "Titanium", g: "Transition" },
  { n: 23, s: "V", m: "50.94", name: "Vanadium", g: "Transition" },
  { n: 24, s: "Cr", m: "52.00", name: "Chromium", g: "Transition" },
  { n: 25, s: "Mn", m: "54.94", name: "Manganese", g: "Transition" },
  { n: 26, s: "Fe", m: "55.85", name: "Iron", g: "Transition" },
  { n: 27, s: "Co", m: "58.93", name: "Cobalt", g: "Transition" },
  { n: 28, s: "Ni", m: "58.69", name: "Nickel", g: "Transition" },
  { n: 29, s: "Cu", m: "63.55", name: "Copper", g: "Transition" },
  { n: 30, s: "Zn", m: "65.38", name: "Zinc", g: "Transition" },
  { n: 31, s: "Ga", m: "69.72", name: "Gallium", g: "Metal" },
  { n: 32, s: "Ge", m: "72.63", name: "Germanium", g: "Metalloid" },
  { n: 33, s: "As", m: "74.92", name: "Arsenic", g: "Metalloid" },
  { n: 34, s: "Se", m: "78.96", name: "Selenium", g: "Nonmetal" },
  { n: 35, s: "Br", m: "79.90", name: "Bromine", g: "Halogen" },
  { n: 36, s: "Kr", m: "83.80", name: "Krypton", g: "Noble" },
  { n: 37, s: "Rb", m: "85.47", name: "Rubidium", g: "Alkali" },
  { n: 38, s: "Sr", m: "87.62", name: "Strontium", g: "Alkaline" },
  { n: 39, s: "Y", m: "88.91", name: "Yttrium", g: "Transition" },
  { n: 40, s: "Zr", m: "91.22", name: "Zirconium", g: "Transition" }
];

const SAFETY_RULES = [
  { icon: Eye, color: "text-blue-500", title: "Eye Protection", desc: "Wear safety goggles at all times to protect eyes from chemical splashes and debris." },
  { icon: FlaskConical, color: "text-yellow-500", title: "Chemical Handling", desc: "Never touch, taste, or smell chemicals unless instructed. Waft odors gently." },
  { icon: Flame, color: "text-red-500", title: "Fire Safety", desc: "Keep flammable materials away from open flames. Know the location of the fire extinguisher." },
  { icon: AlertTriangle, color: "text-orange-500", title: "Spills & Breakage", desc: "Report all spills and broken glass immediately to the instructor. Do not clean up broken glass with hands." },
  { icon: Skull, color: "text-purple-500", title: "Toxic Substances", desc: "Handle toxic materials in a fume hood. Wash hands thoroughly after lab work." },
  { icon: Zap, color: "text-yellow-400", title: "Electrical Safety", desc: "Ensure hands are dry before touching electrical switches. Check cords for damage." },
];

const BIO_DIAGRAMS = [
  {
    id: 'plant_cell',
    title: 'Plant Cell',
    desc: 'Structural unit of plants.',
    svg: (
      <svg viewBox="0 0 300 220" className="w-full h-full drop-shadow-md">
        {/* Cell Wall */}
        <rect x="40" y="20" width="220" height="180" rx="20" fill="#ecfccb" stroke="#65a30d" strokeWidth="4" />
        <rect x="48" y="28" width="204" height="164" rx="15" fill="none" stroke="#84cc16" strokeWidth="1" />
        
        {/* Vacuole */}
        <path d="M70,60 Q180,50 200,110 Q210,160 150,170 Q90,180 60,130 Q50,90 70,60" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" opacity="0.9" />
        
        {/* Nucleus */}
        <circle cx="210" cy="150" r="22" fill="#e879f9" stroke="#c026d3" strokeWidth="2" />
        <circle cx="210" cy="150" r="6" fill="#a21caf" />

        {/* Chloroplasts */}
        <ellipse cx="80" cy="160" rx="14" ry="9" fill="#4ade80" stroke="#15803d" strokeWidth="1.5" />
        <path d="M75,160 H85 M80,155 V165" stroke="#15803d" strokeWidth="1" />
        
        <ellipse cx="220" cy="70" rx="14" ry="9" fill="#4ade80" stroke="#15803d" strokeWidth="1.5" />
        <path d="M215,70 H225 M220,65 V75" stroke="#15803d" strokeWidth="1" />
        
        <ellipse cx="60" cy="50" rx="14" ry="9" fill="#4ade80" stroke="#15803d" strokeWidth="1.5" />

        {/* Labels */}
        <g className="text-[10px] font-sans fill-slate-700 dark:fill-slate-200 font-bold">
            <text x="10" y="30">Cell Wall</text>
            <line x1="40" y1="30" x2="55" y2="35" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            
            <text x="120" y="100" textAnchor="middle" fill="#1e3a8a">Vacuole</text>
            
            <text x="250" y="155">Nucleus</text>
            <line x1="250" y1="155" x2="232" y2="155" stroke="currentColor" strokeWidth="1" opacity="0.5" />

            <text x="20" y="190">Chloroplast</text>
            <line x1="70" y1="180" x2="80" y2="170" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </g>
      </svg>
    )
  },
  {
    id: 'animal_cell',
    title: 'Animal Cell',
    desc: 'Eukaryotic cell structure.',
    svg: (
      <svg viewBox="0 0 300 220" className="w-full h-full drop-shadow-md">
        {/* Membrane */}
        <path d="M60,80 Q80,20 150,30 Q240,20 260,80 Q290,150 220,200 Q120,220 60,180 Q20,120 60,80" fill="#fce7f3" stroke="#db2777" strokeWidth="3" />
        
        {/* Nucleus */}
        <circle cx="150" cy="110" r="35" fill="#fbcfe8" stroke="#be185d" strokeWidth="2" />
        <circle cx="150" cy="110" r="10" fill="#831843" />
        
        {/* Mitochondria */}
        <g transform="translate(80, 160) rotate(30)">
          <ellipse rx="18" ry="10" fill="#fdba74" stroke="#c2410c" />
          <path d="M-12,0 Q-6,6 0,0 T12,0" fill="none" stroke="#9a3412" strokeWidth="1.5" />
        </g>
        <g transform="translate(220, 90) rotate(-20)">
          <ellipse rx="18" ry="10" fill="#fdba74" stroke="#c2410c" />
          <path d="M-12,0 Q-6,6 0,0 T12,0" fill="none" stroke="#9a3412" strokeWidth="1.5" />
        </g>
        
        {/* ER */}
        <path d="M115,110 Q100,130 105,140" fill="none" stroke="#831843" strokeWidth="2" opacity="0.6"/>
        <path d="M185,110 Q200,130 195,140" fill="none" stroke="#831843" strokeWidth="2" opacity="0.6"/>

        {/* Labels */}
        <g className="text-[10px] font-sans fill-slate-700 dark:fill-slate-200 font-bold">
            <text x="260" y="50">Cell Membrane</text>
            <line x1="260" y1="55" x2="240" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.5"/>

            <text x="180" y="40">Nucleus</text>
            <line x1="180" y1="45" x2="160" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5"/>

            <text x="10" y="200">Mitochondria</text>
            <line x1="70" y1="190" x2="80" y2="170" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        </g>
      </svg>
    )
  },
  {
    id: 'mitosis',
    title: 'Mitosis',
    desc: 'Cell division stages.',
    svg: (
      <svg viewBox="0 0 300 220" className="w-full h-full drop-shadow-md">
        {/* Cell Body */}
        <ellipse cx="150" cy="110" rx="120" ry="90" fill="#fefce8" stroke="#ca8a04" strokeWidth="3" />
        
        {/* Spindle Fibers */}
        <path d="M50,110 Q150,50 250,110" fill="none" stroke="#fcd34d" strokeWidth="1.5" />
        <path d="M50,110 Q150,170 250,110" fill="none" stroke="#fcd34d" strokeWidth="1.5" />
        <line x1="50" y1="110" x2="250" y2="110" stroke="#fcd34d" strokeWidth="1.5" />
        
        {/* Centrioles */}
        <rect x="40" y="100" width="10" height="20" fill="#b45309" />
        <rect x="250" y="100" width="10" height="20" fill="#b45309" />
        
        {/* Chromosomes */}
        <g transform="translate(130, 90) rotate(10)">
           <path d="M-5,-10 L5,10 M5,-10 L-5,10" stroke="#dc2626" strokeWidth="4" strokeLinecap="round"/>
        </g>
        <g transform="translate(170, 90) rotate(-10)">
           <path d="M-5,-10 L5,10 M5,-10 L-5,10" stroke="#dc2626" strokeWidth="4" strokeLinecap="round"/>
        </g>
        <g transform="translate(130, 130) rotate(-10)">
           <path d="M-5,-10 L5,10 M5,-10 L-5,10" stroke="#dc2626" strokeWidth="4" strokeLinecap="round"/>
        </g>
        <g transform="translate(170, 130) rotate(10)">
           <path d="M-5,-10 L5,10 M5,-10 L-5,10" stroke="#dc2626" strokeWidth="4" strokeLinecap="round"/>
        </g>

        {/* Labels */}
        <g className="text-[10px] font-sans fill-slate-700 dark:fill-slate-200 font-bold">
            <text x="10" y="50">Centriole</text>
            <line x1="30" y1="60" x2="45" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            
            <text x="130" y="30">Spindle Fiber</text>
            <line x1="150" y1="35" x2="150" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            
            <text x="130" y="200">Chromosome</text>
            <line x1="150" y1="190" x2="140" y2="140" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        </g>
      </svg>
    )
  },
  {
    id: 'heart',
    title: 'Human Heart',
    desc: 'Internal structure.',
    svg: (
      <svg viewBox="0 0 300 240" className="w-full h-full drop-shadow-md">
        <defs>
           <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" style={{stopColor:'#fecaca', stopOpacity:1}} />
             <stop offset="100%" style={{stopColor:'#ef4444', stopOpacity:1}} />
           </linearGradient>
        </defs>
        <path d="M150,220 Q60,180 60,100 Q60,50 110,50 Q140,50 150,80 Q160,50 190,50 Q240,50 240,100 Q240,180 150,220" fill="url(#gradRed)" stroke="#b91c1c" strokeWidth="3" />
        
        {/* Septum */}
        <path d="M150,90 V220" stroke="#b91c1c" strokeWidth="2" fill="none" />
        
        {/* Aorta */}
        <path d="M140,50 Q130,10 180,10 Q210,10 210,50" fill="none" stroke="#991b1b" strokeWidth="12" strokeLinecap="round" />
        <path d="M140,50 Q130,10 180,10 Q210,10 210,50" fill="none" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
        
        {/* Vena Cava */}
        <path d="M70,70 L50,20" fill="none" stroke="#1d4ed8" strokeWidth="8" />
        <path d="M70,70 L50,20" fill="none" stroke="#3b82f6" strokeWidth="4" />

        {/* Labels */}
        <g className="text-[10px] font-sans fill-slate-700 dark:fill-slate-200 font-bold">
            <text x="220" y="25">Aorta</text>
            
            <text x="10" y="25">Vena Cava</text>
            
            <text x="180" y="150">Left Ventricle</text>
            <line x1="200" y1="140" x2="180" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            
            <text x="50" y="150">Right Atrium</text>
            <line x1="80" y1="140" x2="100" y2="110" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        </g>
      </svg>
    )
  },
  {
    id: 'brain',
    title: 'Human Brain',
    desc: 'Lobes and brain stem.',
    svg: (
      <svg viewBox="0 0 300 220" className="w-full h-full drop-shadow-md">
        {/* Cerebrum */}
        <path d="M80,160 Q50,100 100,50 Q150,10 230,50 Q280,90 250,160" fill="#fed7aa" stroke="#c2410c" strokeWidth="3" />
        {/* Gyri lines */}
        <path d="M100,100 Q150,70 200,90" fill="none" stroke="#ea580c" strokeWidth="1.5" opacity="0.6" />
        <path d="M120,130 Q160,100 210,120" fill="none" stroke="#ea580c" strokeWidth="1.5" opacity="0.6" />
        <path d="M90,70 Q120,40 160,50" fill="none" stroke="#ea580c" strokeWidth="1.5" opacity="0.6" />
        
        {/* Cerebellum */}
        <path d="M190,160 Q240,160 240,190 Q220,215 180,200" fill="#fca5a5" stroke="#b91c1c" strokeWidth="2" />
        
        {/* Brain Stem */}
        <path d="M150,160 L150,220" fill="#cbd5e1" stroke="#475569" strokeWidth="20" strokeLinecap="round" />

        {/* Labels */}
        <g className="text-[10px] font-sans fill-slate-700 dark:fill-slate-200 font-bold">
            <text x="130" y="20">Cerebrum</text>
            <line x1="150" y1="25" x2="150" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            
            <text x="240" y="210">Cerebellum</text>
            <line x1="240" y1="200" x2="220" y2="190" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            
            <text x="80" y="210">Brain Stem</text>
            <line x1="120" y1="210" x2="140" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        </g>
      </svg>
    )
  },
  {
    id: 'neuron',
    title: 'Neuron',
    desc: 'Nerve cell structure.',
    svg: (
      <svg viewBox="0 0 300 220" className="w-full h-full drop-shadow-md">
        {/* Axon Line */}
        <line x1="100" y1="110" x2="240" y2="110" stroke="#b45309" strokeWidth="4" />
        
        {/* Myelin Sheath */}
        <rect x="110" y="104" width="20" height="12" fill="#fbbf24" rx="3" stroke="#b45309"/>
        <rect x="140" y="104" width="20" height="12" fill="#fbbf24" rx="3" stroke="#b45309"/>
        <rect x="170" y="104" width="20" height="12" fill="#fbbf24" rx="3" stroke="#b45309"/>
        <rect x="200" y="104" width="20" height="12" fill="#fbbf24" rx="3" stroke="#b45309"/>
        
        {/* Soma (Body) */}
        <circle cx="80" cy="110" r="25" fill="#fcd34d" stroke="#b45309" strokeWidth="2" />
        <circle cx="80" cy="110" r="8" fill="#b45309" />
        
        {/* Dendrites */}
        <path d="M60,95 L40,80 M60,125 L40,140 M80,85 L80,60 M80,135 L80,160" stroke="#b45309" strokeWidth="2" fill="none" />
        
        {/* Axon Terminal */}
        <path d="M240,110 L260,90 M240,110 L260,130" stroke="#b45309" strokeWidth="2" fill="none" />

        {/* Labels */}
        <g className="text-[10px] font-sans fill-slate-700 dark:fill-slate-200 font-bold">
            <text x="10" y="60">Dendrites</text>
            <line x1="40" y1="70" x2="55" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            
            <text x="30" y="170">Cell Body</text>
            <line x1="60" y1="160" x2="70" y2="130" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            
            <text x="150" y="80">Myelin Sheath</text>
            <line x1="150" y1="85" x2="150" y2="104" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            
            <text x="250" y="150">Axon Terminal</text>
            <line x1="260" y1="140" x2="250" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        </g>
      </svg>
    )
  }
];

const CalculatorApp = () => {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<string|null>(null);
  const [op, setOp] = useState<string|null>(null);
  const [newNum, setNewNum] = useState(true);

  const handleNum = (n: string) => {
    if (newNum) {
      setDisplay(n);
      setNewNum(false);
    } else {
      setDisplay(display === "0" ? n : display + n);
    }
  };

  const handleOp = (o: string) => {
    setPrev(display);
    setOp(o);
    setNewNum(true);
  };

  const handleEq = () => {
    if (prev && op) {
      const a = parseFloat(prev);
      const b = parseFloat(display);
      let res = 0;
      if (op === "+") res = a + b;
      if (op === "-") res = a - b;
      if (op === "*") res = a * b;
      if (op === "/") res = a / b;
      setDisplay(String(res));
      setPrev(null);
      setOp(null);
      setNewNum(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setNewNum(true);
  };

  return (
    <div className="max-w-xs mx-auto bg-slate-800 rounded-xl p-4 shadow-2xl border border-slate-700">
      <div className="bg-slate-900 text-right text-3xl text-white p-4 rounded-lg mb-4 font-mono h-16 overflow-hidden">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button onClick={handleClear} className="col-span-3 bg-red-500 text-white p-3 rounded hover:bg-red-600 font-bold">AC</button>
        <button onClick={() => handleOp("/")} className="bg-orange-500 text-white p-3 rounded hover:bg-orange-600 font-bold">÷</button>
        {[7,8,9].map(n => <button key={n} onClick={() => handleNum(String(n))} className="bg-slate-700 text-white p-3 rounded hover:bg-slate-600 font-bold">{n}</button>)}
        <button onClick={() => handleOp("*")} className="bg-orange-500 text-white p-3 rounded hover:bg-orange-600 font-bold">×</button>
        {[4,5,6].map(n => <button key={n} onClick={() => handleNum(String(n))} className="bg-slate-700 text-white p-3 rounded hover:bg-slate-600 font-bold">{n}</button>)}
        <button onClick={() => handleOp("-")} className="bg-orange-500 text-white p-3 rounded hover:bg-orange-600 font-bold">-</button>
        {[1,2,3].map(n => <button key={n} onClick={() => handleNum(String(n))} className="bg-slate-700 text-white p-3 rounded hover:bg-slate-600 font-bold">{n}</button>)}
        <button onClick={() => handleOp("+")} className="bg-orange-500 text-white p-3 rounded hover:bg-orange-600 font-bold">+</button>
        <button onClick={() => handleNum("0")} className="col-span-2 bg-slate-700 text-white p-3 rounded hover:bg-slate-600 font-bold">0</button>
        <button onClick={() => handleNum(".")} className="bg-slate-700 text-white p-3 rounded hover:bg-slate-600 font-bold">.</button>
        <button onClick={handleEq} className="bg-green-500 text-white p-3 rounded hover:bg-green-600 font-bold">=</button>
      </div>
    </div>
  );
};

// --- 3D View Modal Component ---
const View3DModal = ({ diagId, onClose }: { diagId: string, onClose: () => void }) => {
  const diag = BIO_DIAGRAMS.find(d => d.id === diagId);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  if (!diag) return null;

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 20; // dampening
    const y = -(clientY - top - height / 2) / 20;
    setRotate({ x: y, y: x });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
             <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
                 <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Box className="text-blue-400"/> {diag.title} - 3D Viewer
                 </h2>
                 <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white">
                     <X size={24}/>
                 </button>
             </div>
             
             <div 
               className="h-[500px] flex items-center justify-center bg-black/50"
               style={{ perspective: '1000px' }}
               onMouseMove={handleMouseMove}
               onMouseLeave={() => setRotate({ x: 0, y: 0 })}
             >
                 <MotionDiv 
                   className="w-[400px] h-[400px] relative"
                   style={{ 
                     rotateX: rotate.x, 
                     rotateY: rotate.y,
                     transformStyle: 'preserve-3d'
                   }}
                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
                 >
                     {/* Simulated 3D Layers using the SVG */}
                     <div className="absolute inset-0 transform translate-z-0 opacity-50 blur-md scale-95">
                        {diag.svg}
                     </div>
                     <div className="absolute inset-0 transform translate-z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        {diag.svg}
                     </div>
                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full text-xs text-gray-300 border border-white/10 z-20">
                        Move cursor to rotate
                     </div>
                 </MotionDiv>
             </div>
        </div>
    </div>
  );
};

const StudentToolkit: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [view3D, setView3D] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {TOOLS.map((tool) => (
          <MotionDiv
            key={tool.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTool(tool.id)}
            className={`
              cursor-pointer p-4 rounded-2xl border border-slate-200 dark:border-white/5 
              bg-white dark:bg-slate-800/50 backdrop-blur-md flex flex-col items-center justify-center gap-2
              shadow-sm hover:shadow-md transition-all
            `}
          >
            <div className={`w-10 h-10 rounded-full ${tool.bg} flex items-center justify-center`}>
               <tool.icon className={tool.color} size={20} />
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-gray-300 text-center">{tool.label}</span>
          </MotionDiv>
        ))}
      </div>

      {/* Modal / Overlay for Tool */}
      <AnimatePresence>
        {activeTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 max-h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                 <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${TOOLS.find(t=>t.id===activeTool)?.bg} flex items-center justify-center`}>
                        {React.createElement(TOOLS.find(t=>t.id===activeTool)?.icon || Activity, { className: TOOLS.find(t=>t.id===activeTool)?.color, size: 20 })}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{TOOLS.find(t=>t.id===activeTool)?.label}</h2>
                 </div>
                 <button onClick={() => setActiveTool(null)} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full text-slate-500 dark:text-gray-400 transition-colors">
                    <X size={24} />
                 </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-950/50">
                 
                 {activeTool === 'formulas' && (
                    <div className="space-y-6">
                       <div className="flex flex-wrap gap-2 mb-4">
                          {Object.keys(FORMULAS).map(subj => (
                             <button 
                                key={subj} 
                                onClick={() => setActiveSubject(subj)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeSubject === subj ? 'bg-blue-600 text-white' : 'bg-white dark:bg-white/5 text-slate-600 dark:text-gray-400 border border-slate-200 dark:border-white/10'}`}
                             >
                                {subj}
                             </button>
                          ))}
                       </div>
                       {FORMULAS[activeSubject]?.map((chapter: any, idx: number) => (
                          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl p-5 shadow-sm mb-4">
                             <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 border-b border-slate-100 dark:border-white/5 pb-2">{chapter.chapter}</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {chapter.items.map((item: any, i: number) => (
                                   <div key={i} className="bg-slate-50 dark:bg-white/5 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                                      <div className="text-xs text-slate-500 dark:text-gray-400 mb-1">{item.name}</div>
                                      <div className="font-mono text-sm text-blue-600 dark:text-blue-400 font-bold break-words">{item.eq}</div>
                                      <div className="text-[10px] text-slate-400 dark:text-gray-500 mt-1 italic">{item.desc}</div>
                                   </div>
                                ))}
                             </div>
                          </div>
                       ))}
                    </div>
                 )}

                 {activeTool === 'constants' && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {CONSTANTS.map((c, i) => (
                           <div key={i} className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-white/5">
                               <div>
                                   <div className="text-2xl font-serif italic font-bold text-slate-900 dark:text-white">{c.symbol}</div>
                                   <div className="text-xs text-slate-500 dark:text-gray-400">{c.name}</div>
                               </div>
                               <div className="font-mono text-yellow-600 dark:text-yellow-400 font-bold">{c.val}</div>
                           </div>
                        ))}
                     </div>
                 )}

                 {activeTool === 'logic' && (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {LOGIC_GATES.map((gate, i) => (
                       <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col items-center">
                          <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-4">{gate.name} Gate</h3>
                          <div className="mb-6 text-slate-800 dark:text-white scale-110">{gate.symbol}</div>
                          <div className="w-full">
                             <table className="w-full text-center text-sm border-collapse">
                               <thead>
                                 <tr className="bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-gray-300">
                                   {gate.table[0].map((h, k) => <th key={k} className="border border-slate-300 dark:border-white/10 p-1">{h}</th>)}
                                 </tr>
                               </thead>
                               <tbody>
                                 {gate.table.slice(1).map((row, r) => (
                                   <tr key={r} className="text-slate-800 dark:text-gray-400">
                                      {row.map((cell, c) => <td key={c} className="border border-slate-300 dark:border-white/10 p-1">{cell}</td>)}
                                   </tr>
                                 ))}
                               </tbody>
                             </table>
                          </div>
                       </div>
                     ))}
                   </div>
                 )}

                 {activeTool === 'periodic' && (
                   <div className="overflow-x-auto">
                     <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-2 min-w-[600px]">
                        {ELEMENTS.map((el) => (
                          <div key={el.n} className={`p-2 rounded-lg border ${
                            el.g === 'Noble' ? 'bg-purple-100 dark:bg-purple-500/20 border-purple-300 dark:border-purple-500/30' :
                            el.g === 'Alkali' ? 'bg-red-100 dark:bg-red-500/20 border-red-300 dark:border-red-500/30' :
                            el.g === 'Alkaline' ? 'bg-orange-100 dark:bg-orange-500/20 border-orange-300 dark:border-orange-500/30' :
                            el.g === 'Halogen' ? 'bg-yellow-100 dark:bg-yellow-500/20 border-yellow-300 dark:border-yellow-500/30' :
                            el.g === 'Transition' ? 'bg-slate-200 dark:bg-slate-500/20 border-slate-300 dark:border-slate-500/30' :
                            el.g === 'Metalloid' ? 'bg-teal-100 dark:bg-teal-500/20 border-teal-300 dark:border-teal-500/30' :
                            'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20'
                          } hover:scale-105 transition-transform cursor-pointer`}>
                             <div className="text-[10px] text-slate-500 dark:text-gray-400">{el.n}</div>
                             <div className="text-xl font-bold text-slate-900 dark:text-white my-1">{el.s}</div>
                             <div className="text-[10px] text-slate-600 dark:text-gray-300 truncate">{el.name}</div>
                             <div className="text-[9px] text-slate-400 dark:text-gray-500">{el.m}</div>
                          </div>
                        ))}
                     </div>
                     <div className="mt-4 flex flex-wrap gap-4 text-xs justify-center">
                        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500/20 border border-red-500 rounded"></span> Alkali</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-500/20 border border-orange-500 rounded"></span> Alkaline</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-500/20 border border-slate-500 rounded"></span> Transition</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-purple-500/20 border border-purple-500 rounded"></span> Noble Gas</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-500/20 border border-yellow-500 rounded"></span> Halogen</span>
                     </div>
                   </div>
                 )}

                 {activeTool === 'calculator' && <CalculatorApp />}

                 {activeTool === 'safety' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {SAFETY_RULES.map((rule, i) => (
                           <div key={i} className="flex gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-white/5 items-start">
                              <div className={`p-3 rounded-full bg-slate-100 dark:bg-white/5 ${rule.color}`}>
                                 <rule.icon size={24} />
                              </div>
                              <div>
                                 <h3 className={`font-bold text-lg ${rule.color}`}>{rule.title}</h3>
                                 <p className="text-sm text-slate-600 dark:text-gray-400 mt-1 leading-relaxed">{rule.desc}</p>
                              </div>
                           </div>
                        ))}
                    </div>
                 )}

                 {activeTool === 'biology' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {BIO_DIAGRAMS.map((diag) => (
                          <MotionDiv 
                            key={diag.id} 
                            whileHover={{ scale: 1.02, translateY: -5 }}
                            className="bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-white/10 p-5 flex flex-col shadow-lg hover:shadow-lime-500/20 transition-all group relative overflow-hidden"
                          >
                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity"/>
                             
                             <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">{diag.title}</h3>
                                <span className="p-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-gray-500 group-hover:bg-lime-500/10 group-hover:text-lime-500 transition-colors">
                                    <Dna size={16} />
                                </span>
                             </div>
                             
                             <div className="w-full h-48 bg-slate-50 dark:bg-black/30 rounded-xl mb-4 border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-800 dark:text-gray-200 p-4 overflow-hidden relative">
                                <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                                    {diag.svg}
                                </div>
                             </div>
                             
                             <p className="text-xs text-slate-500 dark:text-gray-400 mb-4 flex-1 leading-relaxed">
                                {diag.desc}
                             </p>
                             
                             <button 
                               onClick={(e) => {
                                   e.stopPropagation();
                                   setView3D(diag.id);
                               }}
                               className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 text-xs font-bold border border-slate-200 dark:border-white/10 hover:bg-lime-500 hover:text-white hover:border-lime-500 dark:hover:bg-lime-500 dark:hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer z-10"
                             >
                                <Box size={14} /> View in 3D
                             </button>
                          </MotionDiv>
                       ))}
                    </div>
                 )}
              </div>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>

      {/* View 3D Modal Rendered Last to Ensure Top Z-Index */}
      {view3D && <View3DModal diagId={view3D} onClose={() => setView3D(null)} />}
    </>
  );
};

export default StudentToolkit;
