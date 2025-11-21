
import { Zap, FlaskConical, Dna, Calculator, Monitor } from 'lucide-react';
import { SubjectData, SubjectType, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/home' },
  { label: 'Subjects', path: '/subjects' },
  { label: 'AI Tutor', path: '/tutor' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const SUBJECTS: SubjectData[] = [
  {
    id: 'physics',
    name: SubjectType.PHYSICS,
    icon: Zap,
    color: 'blue',
    hex: '#3b82f6',
    description: 'Explore the laws of motion, optics, and electromagnetism through immersive simulations.',
    labs: [
      { 
        id: 'p1', 
        title: 'Vernier Calipers', 
        description: 'Measure precise dimensions of small objects.', 
        difficulty: 'Easy', 
        duration: '20 min', 
        category: 'Measurement',
        content: {
          aim: "To measure the diameter of a small spherical body using Vernier Calipers.",
          requirements: ["Vernier Calipers", "Spherical Body (Bob)", "Magnifying Glass"],
          theory: "The Vernier Caliper is a high-precision measuring instrument invented by Pierre Vernier in 1631. It uses a differential scale arrangement to measure dimensions with greater accuracy than a standard meter scale.\n\n**Working Principle (Vernier Acuity):**\nThe device relies on the ability of the human eye to detect the alignment of lines (Vernier Acuity) much more precisely than it can estimate position between lines. It consists of two scales:\n1. **Main Scale:** Fixed, graduated in millimeters.\n2. **Vernier Scale:** Sliding, usually having 10 divisions that span 9mm of the main scale.\n\n**Least Count (L.C.):**\nThe Least Count is the smallest difference between a Main Scale Division (MSD) and a Vernier Scale Division (VSD).\nL.C. = 1 MSD - 1 VSD\nIf N vernier divisions coincide with (N-1) main scale divisions:\n1 VSD = ((N-1)/N) MSD\nTherefore, L.C. = 1 MSD - ((N-1)/N) MSD = (1/N) MSD.\nFor a standard caliper: 1 MSD = 1mm, N = 10. Thus, L.C. = 0.1mm or 0.01cm.\n\n**Measurement Formula:**\nTotal Reading = Main Scale Reading (MSR) + (Vernier Coincidence (VC) × L.C.)\n- **MSR:** The main scale mark immediately to the left of the vernier zero.\n- **VC:** The division on the vernier scale that aligns perfectly with any main scale mark.\n\n**Zero Error Correction:**\nIdeally, when jaws are closed, the zeros of both scales coincide. If not, there is a Zero Error:\n- **Positive Error:** Vernier zero is to the right. Correction is negative.\n- **Negative Error:** Vernier zero is to the left. Correction is positive.",
          procedure: [
            "Determine the Vernier Constant (V.C.) or Least Count.",
            "Check for zero error by closing the jaws completely.",
            "Place the object between the jaws and tighten the screw gently.",
            "Note the Main Scale Reading (M.S.R).",
            "Note the Vernier Scale Division (V.S.D) coinciding with the main scale.",
            "Calculate Total Reading = M.S.R + (V.S.D × V.C.)."
          ],
          objectives: [
            "To learn the principle of Vernier scale.",
            "To measure the diameter of a spherical body.",
            "To calculate volume with significant figures."
          ],
          realWorldApplications: [
            "Manufacturing: Ensuring machine parts fit together precisely.",
            "Aerospace: Measuring components where microscopic tolerance is critical.",
            "Jewelry: Measuring the diameter of gemstones and ring sizes.",
            "Medical: Measuring bone dimensions or surgical implants."
          ],
          observationTable: {
            columns: ["MSR (a) cm", "VSD (n)", "VSR (b=n*LC) cm", "Total (a+b) cm"]
          },
          vivaQuestions: [
            { question: "What is the Least Count of a standard Vernier Caliper?", answer: "Usually 0.01 cm or 0.1 mm." },
            { question: "What is Zero Error?", answer: "The error when the zero marks of the main scale and vernier scale do not coincide when jaws are closed." },
            { question: "How do you calculate the volume of a sphere?", answer: "V = (4/3)πr³." },
            { question: "What is the principle of a Vernier Caliper?", answer: "N Vernier Scale Divisions = (N-1) Main Scale Divisions." },
            { question: "What are the upper jaws used for?", answer: "To measure internal diameters of cylinders or hollow pipes." },
            { question: "What is the metallic strip at the back used for?", answer: "To measure depth of beakers or holes." },
            { question: "What is 'Vernier Constant'?", answer: "It is another name for Least Count." },
            { question: "Which material is Vernier Caliper made of?", answer: "Stainless steel or hardened steel to prevent rust and wear." },
            { question: "How is positive zero error corrected?", answer: "By subtracting the error value from the final reading." },
            { question: "Why is it called 'Vernier'?", answer: "Named after Pierre Vernier, who invented the scale in 1631." }
          ],
          quizQuestions: [
            { id: 1, question: "What is the main scale reading if the zero of the vernier scale lies between 2.3 cm and 2.4 cm?", options: ["2.3 cm", "2.4 cm", "2.35 cm", "2.0 cm"], correctIndex: 0 },
            { id: 2, question: "If the 5th vernier division coincides with a main scale division, and L.C. is 0.01 cm, what is the vernier reading?", options: ["0.5 cm", "0.05 cm", "5 cm", "0.005 cm"], correctIndex: 1 },
            { id: 3, question: "Which part of the Vernier Caliper is used to measure internal diameter?", options: ["Lower Jaws", "Upper Jaws", "Depth Gauge", "Main Scale"], correctIndex: 1 },
            { id: 4, question: "If N V.S.D = (N-1) M.S.D, what is the formula for Least Count?", options: ["1 MSD / N", "1 MSD * N", "1 VSD / N", "1 MSD - 1 VSD"], correctIndex: 0 },
            { id: 5, question: "A Vernier Caliper has 20 divisions on the vernier scale matching 19 on the main scale (1mm). What is the LC?", options: ["0.1 mm", "0.05 mm", "0.02 mm", "0.01 mm"], correctIndex: 1 },
            { id: 6, question: "Zero error is checked when:", options: ["Jaws are open", "Jaws are closed", "Object is held", "Screw is loose"], correctIndex: 1 },
            { id: 7, question: "The main scale usually measures in:", options: ["Meters", "Millimeters/Centimeters", "Micrometers", "Nanometers"], correctIndex: 1 },
            { id: 8, question: "Which error arises due to wear and tear of the jaws?", options: ["Parallax Error", "Zero Error", "Random Error", "Backlash Error"], correctIndex: 1 },
            { id: 9, question: "Least Count is also known as:", options: ["Vernier Constant", "Pitch", "Screw Constant", "Error limit"], correctIndex: 0 },
            { id: 10, question: "To measure the thickness of a pencil, we use:", options: ["Depth Gauge", "Upper Jaws", "Lower Jaws", "Main Scale only"], correctIndex: 2 }
          ]
        }
      },
      { 
        id: 'p2', 
        title: 'Simple Pendulum', 
        description: 'Determine acceleration due to gravity (g).', 
        difficulty: 'Easy', 
        duration: '30 min', 
        category: 'Mechanics',
        content: {
          aim: "To determine the acceleration due to gravity (g) using a simple pendulum.",
          requirements: ["Metallic Bob", "Thread", "Clamp Stand", "Stopwatch", "Meter Scale"],
          theory: "A simple pendulum is an idealized system consisting of a heavy point mass (bob) suspended by a weightless, inextensible, and perfectly flexible string from a rigid support.\n\n**Physics of Oscillation (SHM):**\nWhen the bob is displaced by a small angle (θ < 10°) and released, it executes Simple Harmonic Motion (SHM). The restoring force is the tangential component of gravity:\nF_restoring = -mg sinθ\nFor small angles, sinθ ≈ θ (radians). Since θ = x/L (arc/radius):\nF = -mg(x/L) = -(mg/L)x\nThis form F = -kx confirms SHM with force constant k = mg/L.\n\n**Time Period Derivation:**\nThe time period T for SHM is given by T = 2π√(m/k).\nSubstituting k = mg/L:\nT = 2π√(m / (mg/L)) = 2π√(L/g)\n\n**Key Factors:**\n- **Length (L):** Distance from the point of suspension to the center of gravity of the bob.\n- **Acceleration due to Gravity (g):** Varies with altitude and latitude. Standard value is 9.8 m/s².\n- **Isochronism:** The period is independent of amplitude for small swings.\n\n**Graph Analysis:**\nA plot of L vs T² yields a straight line passing through the origin. The slope of this line is g/4π², allowing for the experimental calculation of g.",
          procedure: [
            "Measure the radius of the bob.",
            "Suspend the bob and set effective length L.",
            "Displace slightly and release.",
            "Measure time for 20 oscillations.",
            "Calculate T and T²."
          ],
          objectives: ["Calculate 'g' at your location.", "Plot L-T² graph."],
          realWorldApplications: [
            "Clocks: Grandfather clocks use pendulums to keep precise time.",
            "Seismometers: Early earthquake detectors used pendulum principles.",
            "Metronomes: Mechanical metronomes use an inverted pendulum to help musicians keep time.",
            "Demolition: Wrecking balls act as large pendulums.",
            "Geological Surveys: Gravimeters (sophisticated pendulums) measure local gravity to find mineral deposits."
          ],
          observationTable: {
            columns: ["Length L (cm)", "Time 20 Osc (t) s", "Period T = t/20 s", "T² (s²)", "L/T² (cm/s²)"]
          },
          vivaQuestions: [
            { question: "Does the time period depend on the mass of the bob?", answer: "No, it is independent of mass." },
            { question: "What is the effective length?", answer: "Distance from the point of suspension to the center of gravity of the bob." },
            { question: "What is a seconds pendulum?", answer: "A pendulum with a time period of exactly 2 seconds." },
            { question: "What is the relationship between T and L?", answer: "T is directly proportional to the square root of L." },
            { question: "Why do we take 20 oscillations?", answer: "To reduce random error in timing." },
            { question: "Does amplitude affect time period?", answer: "Not for small amplitudes (isochronism)." },
            { question: "What happens to 'g' if you go to the moon?", answer: "It becomes approximately 1/6th of Earth's gravity." },
            { question: "Shape of L vs T graph?", answer: "Parabola." },
            { question: "Shape of L vs T² graph?", answer: "Straight line passing through origin." },
            { question: "What provides the restoring force?", answer: "The component of gravity (mg sinθ)." }
          ],
          quizQuestions: [
            { id: 1, question: "The graph of L vs T² is a:", options: ["Parabola", "Straight Line", "Circle", "Hyperbola"], correctIndex: 1 },
            { id: 2, question: "If length is quadrupled, the time period becomes:", options: ["Double", "Half", "Four times", "Same"], correctIndex: 0 },
            { id: 3, question: "Acceleration due to gravity (g) is maximum at:", options: ["Equator", "Poles", "Center of Earth", "Space"], correctIndex: 1 },
            { id: 4, question: "The time period of a seconds pendulum is:", options: ["1 sec", "2 sec", "4 sec", "0.5 sec"], correctIndex: 1 },
            { id: 5, question: "Restoring force at mean position is:", options: ["Maximum", "Minimum (Zero)", "Infinite", "Constant"], correctIndex: 1 },
            { id: 6, question: "Kinetic energy is maximum at:", options: ["Extreme position", "Mean position", "Midway", "Nowhere"], correctIndex: 1 },
            { id: 7, question: "Potential energy is maximum at:", options: ["Extreme position", "Mean position", "Midway", "Nowhere"], correctIndex: 0 },
            { id: 8, question: "Effective length includes:", options: ["Thread length only", "Thread + Radius of bob", "Thread + Diameter", "Radius only"], correctIndex: 1 },
            { id: 9, question: "For small oscillations, sin θ is approx:", options: ["θ (in radians)", "1", "0", "cos θ"], correctIndex: 0 },
            { id: 10, question: "Value of g is approximately:", options: ["9.8 m/s", "9.8 m/s²", "10 cm/s²", "980 m/s²"], correctIndex: 1 }
          ]
        }
      },
      { 
        id: 'p3', 
        title: 'Screw Gauge', 
        description: 'Measure the diameter of a thin wire.', 
        difficulty: 'Medium', 
        duration: '25 min', 
        category: 'Measurement',
        content: {
            aim: "To measure the diameter of a given wire using a screw gauge.",
            requirements: ["Screw Gauge", "Wire", "Half-meter scale"],
            theory: "The Screw Gauge (or Micrometer) works on the principle of converting small linear displacements into large rotational displacements of a screw. It is generally used for measuring dimensions smaller than those measurable by a Vernier Caliper (precision up to 0.001 cm).\n\n**Pitch:**\nThe pitch of the screw is the linear distance traveled by the screw tip in one complete rotation of the head. It is usually 1mm or 0.5mm.\nPitch = Distance moved on linear scale / Number of rotations\n\n**Least Count (LC):**\nThis is the value of one division on the circular scale.\nLC = Pitch / Total number of divisions on Circular Scale\nExample: If Pitch = 1mm and Circular Divisions = 100, then LC = 0.01mm.\n\n**Ratchet Mechanism:**\nThe ratchet is a safety device that slips when a certain pressure is reached. It ensures uniform pressure is applied on the object, preventing deformation and inconsistent readings.\n\n**Backlash Error:**\nDue to wear and tear, there may be play in the screw threads, causing the screw to not move immediately on reversal. To avoid this, the screw should always be rotated in the same direction during measurement.",
            procedure: ["Find the least count.", "Determine zero error.", "Place wire between studs.", "Note Main Scale Reading (MSR) and Circular Scale Reading (CSR)."],
            objectives: ["Measure thickness of thin objects.", "Understand zero correction."],
            realWorldApplications: [
                "Electrical Engineering: Measuring the gauge (diameter) of conductive wires to determine current capacity.",
                "Paper Industry: Measuring the thickness of paper sheets.",
                "Automotive: Measuring the thickness of engine shims and brake discs.",
                "Micro-machining: Producing components for watches and medical devices."
            ],
            observationTable: {
                columns: ["MSR (a) mm", "CSR (n)", "CSR val (b=n*LC)", "Total (a+b) mm"]
            },
            vivaQuestions: [
                { question: "What is Pitch?", answer: "Linear distance moved by the screw in one complete rotation." },
                { question: "What is Backlash Error?", answer: "Error caused by wear and tear of threads, avoided by rotating in one direction." },
                { question: "Why is a micrometer used?", answer: "Because it can often measure up to 10^-6 meters (microns)." },
                { question: "Formula for Least Count?", answer: "Pitch / Total no. of circular divisions." },
                { question: "What is the ratchet used for?", answer: "To apply uniform pressure on the object." },
                { question: "How to find the thickness of a paper sheet?", answer: "Measure thickness of a stack of papers and divide by count." },
                { question: "What is a negative zero error?", answer: "When the zero of the circular scale is above the reference line." },
                { question: "What is the typical LC of a screw gauge?", answer: "0.01 mm or 0.001 cm." },
                { question: "Is screw gauge more precise than vernier?", answer: "Yes, generally by a factor of 10." },
                { question: "What is the reference line?", answer: "The horizontal line on the sleeve/main scale." }
            ],
            quizQuestions: [
                { id: 1, question: "If Pitch = 1mm and Circular Divisions = 100, what is Least Count?", options: ["0.1 mm", "0.01 mm", "0.001 mm", "1 mm"], correctIndex: 1 },
                { id: 2, question: "The ratchet in a screw gauge helps to:", options: ["Lock the screw", "Apply uniform pressure", "Measure depth", "Hold the object"], correctIndex: 1 },
                { id: 3, question: "Positive zero error is:", options: ["Added", "Subtracted", "Multiplied", "Ignored"], correctIndex: 1 },
                { id: 4, question: "A micrometer screw gauge typically has a least count of:", options: ["10^-3 m", "10^-4 m", "10^-5 m", "10^-6 m"], correctIndex: 2 },
                { id: 5, question: "Linear scale readings are in:", options: ["Millimeters", "Centimeters", "Micrometers", "Inches"], correctIndex: 0 },
                { id: 6, question: "Circular scale usually has how many divisions?", options: ["10", "50 or 100", "20", "5"], correctIndex: 1 },
                { id: 7, question: "Backlash error is minimized by:", options: ["Turning screw in one direction", "Oiling the screw", "Heating the screw", "Cleaning studs"], correctIndex: 0 },
                { id: 8, question: "Total Reading equals:", options: ["MSR + CSR", "MSR + (CSR x LC)", "MSR - CSR", "MSR / CSR"], correctIndex: 1 },
                { id: 9, question: "Zero error is -0.02mm. Observed reading is 1.45mm. True reading is:", options: ["1.43 mm", "1.47 mm", "1.45 mm", "1.40 mm"], correctIndex: 1 },
                { id: 10, question: "The fixed part of the screw gauge is:", options: ["Thimble", "Spindle", "Anvil", "Ratchet"], correctIndex: 2 }
            ]
        }
      },
      {
          id: 'p4',
          title: 'Ohm\'s Law',
          description: 'Verify the relationship between Voltage and Current.',
          difficulty: 'Easy',
          duration: '30 min',
          category: 'Electricity',
          content: {
              aim: "To verify Ohm's Law and determine the resistance of a given wire.",
              requirements: ["Battery", "Voltmeter", "Ammeter", "Rheostat", "Resistor"],
              theory: "Ohm's Law (formulated by Georg Ohm in 1827) states that the current (I) flowing through a metallic conductor is directly proportional to the potential difference (V) applied across its ends, provided that physical conditions like temperature, strain, and dimensions remain constant.\n\n**Mathematical Form:**\nV ∝ I\nV = IR\nWhere R is the Resistance of the conductor. The unit of resistance is the Ohm (Ω).\n\n**Microscopic View:**\nResistance arises due to collisions between free electrons and the fixed ions in the lattice of the conductor. When temperature increases, these ions vibrate more vigorously, increasing collisions and thus increasing resistance for metals (Positive Temperature Coefficient).\n\n**I-V Characteristics:**\nFor an Ohmic conductor (like Copper or Nichrome wire), the graph of V versus I is a straight line passing through the origin. The slope of this line (ΔV/ΔI) yields the Resistance R.\n\n**Resistivity:**\nResistance depends on dimensions: R = ρ(L/A), where ρ is resistivity, a material property independent of dimensions but dependent on temperature.",
              procedure: ["Connect circuit as per diagram.", "Adjust rheostat to vary current.", "Note Voltmeter and Ammeter readings.", "Plot V vs I graph."],
              objectives: ["Verify linearity of V-I graph.", "Calculate Resistance per unit length."],
              realWorldApplications: [
                  "Electronics: Designing circuits with resistors to control current flow.",
                  "Household Wiring: Selecting the correct wire gauge to prevent overheating (fires) based on current load.",
                  "Fuses and Circuit Breakers: Devices designed to break the circuit if current exceeds safe limits (I = V/R).",
                  "Heaters: Electric heaters use high-resistance coils to convert electrical energy into heat."
              ],
              observationTable: {
                  columns: ["Voltage (V) Volts", "Current (I) Amps", "V/I (Resistance Ω)", "Mean R"]
              },
              vivaQuestions: [
                  { question: "What is the shape of the V-I graph for a metallic conductor?", answer: "A straight line passing through the origin." },
                  { question: "What is an Ohmic conductor?", answer: "A conductor that obeys Ohm's Law (e.g., metals at constant temp)." },
                  { question: "How are Voltmeter and Ammeter connected?", answer: "Voltmeter in parallel, Ammeter in series." },
                  { question: "What is the slope of V-I graph?", answer: "Resistance (R)." },
                  { question: "Does Ohm's law hold for semiconductors?", answer: "No, they are non-ohmic." },
                  { question: "Why is a rheostat used?", answer: "To vary the current in the circuit without changing the voltage source." },
                  { question: "What is the unit of resistivity?", answer: "Ohm-meter (Ωm)." },
                  { question: "Factors affecting resistance?", answer: "Length, Area, Material, Temperature." },
                  { question: "Why should current be passed for a short time?", answer: "To prevent heating, which changes resistance." },
                  { question: "What is the function of the battery?", answer: "To maintain potential difference." }
              ],
              quizQuestions: [
                  { id: 1, question: "The slope of the V-I graph represents:", options: ["Current", "Voltage", "Resistance", "Power"], correctIndex: 2 },
                  { id: 2, question: "Unit of Resistance is:", options: ["Ampere", "Volt", "Ohm", "Watt"], correctIndex: 2 },
                  { id: 3, question: "If V is doubled and R is constant, I will:", options: ["Double", "Halve", "Stay same", "Become zero"], correctIndex: 0 },
                  { id: 4, question: "Ammeter should have:", options: ["High resistance", "Low resistance", "Infinite resistance", "Zero conductance"], correctIndex: 1 },
                  { id: 5, question: "Voltmeter is connected in:", options: ["Series", "Parallel", "Mixed", "Any"], correctIndex: 1 },
                  { id: 6, question: "Resistance is inversely proportional to:", options: ["Length", "Temperature", "Area of Cross-section", "Density"], correctIndex: 2 },
                  { id: 7, question: "Ohm's Law fails for:", options: ["Copper", "Aluminum", "Diode", "Iron"], correctIndex: 2 },
                  { id: 8, question: "1 Volt / 1 Ampere equals:", options: ["1 Watt", "1 Joule", "1 Ohm", "1 Coulomb"], correctIndex: 2 },
                  { id: 9, question: "Heating effect depends on:", options: ["I²Rt", "IR", "V/R", "None"], correctIndex: 0 },
                  { id: 10, question: "Ideal voltmeter resistance is:", options: ["Zero", "Infinite", "100 Ohm", "Low"], correctIndex: 1 }
              ]
          }
      },
      {
          id: 'p5',
          title: 'Concave Mirror',
          description: 'Find focal length using u-v method.',
          difficulty: 'Medium',
          duration: '40 min',
          category: 'Optics',
          content: {
              aim: "To find the focal length of a concave mirror by determining image distance (v) for various object distances (u).",
              requirements: ["Concave Mirror", "Optical Bench", "Needles/Candle"],
              theory: "A concave mirror is a spherical mirror with the inner surface reflecting. It converges light rays incident parallel to the principal axis to a point called the Focus (F).\n\n**Mirror Formula:**\nThe relationship between object distance (u), image distance (v), and focal length (f) is:\n1/f = 1/v + 1/u\n\n**Sign Convention (Cartesian):**\n1. The Pole (P) of the mirror is the origin (0,0).\n2. The Principal Axis is the X-axis.\n3. Light travels from Left to Right.\n4. Distances measured in the direction of light are positive; opposite are negative.\n5. Distances above the axis are positive; below are negative.\n\n**Implications:**\nFor a concave mirror forming a real image:\n- Object distance u is always negative.\n- Real image distance v is negative.\n- Focal length f is negative.\n\n**Ray Tracing Rules:**\n1. Ray parallel to axis → passes through Focus.\n2. Ray through Center of Curvature (C) → retraces path.\n3. Ray through Focus → becomes parallel to axis.",
              procedure: ["Mount mirror on holder.", "Place object needle at distance u.", "Adjust image needle to remove parallax.", "Measure v.", "Calculate f."],
              objectives: ["Understand real vs virtual images.", "Verify mirror formula."],
              realWorldApplications: [
                  "Dentistry: Dentists use concave mirrors to get a magnified view of teeth.",
                  "Solar Power: Solar furnaces use huge concave mirrors to focus sunlight onto a single point to generate heat.",
                  "Automotive: Car headlights use concave reflectors to project a powerful parallel beam of light.",
                  "Telescopes: Reflecting telescopes use concave mirrors to gather light from distant stars.",
                  "Shaving/Makeup Mirrors: Concave mirrors provide a magnified image of the face."
              ],
              observationTable: {
                  columns: ["Object u (cm)", "Image v (cm)", "1/u (cm^-1)", "1/v (cm^-1)", "f = uv/(u+v)"]
              },
              vivaQuestions: [
                  { question: "Where is the image formed when the object is at C?", answer: "At C, real, inverted, and same size." },
                  { question: "What is parallax?", answer: "Apparent shift in position of an object when viewed from different angles." },
                  { question: "Can a concave mirror form a virtual image?", answer: "Yes, when the object is placed between F and P." },
                  { question: "What is the relationship between f and R?", answer: "f = R / 2." },
                  { question: "What type of mirror is used by dentists?", answer: "Concave mirror." },
                  { question: "Why do we remove parallax?", answer: "To ensure the image and image needle are at the same location." },
                  { question: "Sign of focal length for concave mirror?", answer: "Negative." },
                  { question: "Image at infinity is formed when object is at?", answer: "Focus (F)." },
                  { question: "Nature of image on a screen?", answer: "Real and Inverted." },
                  { question: "What is the pole of the mirror?", answer: "The geometric center of the mirror surface." }
              ],
              quizQuestions: [
                  { id: 1, question: "The relation between f and R is:", options: ["f = R", "f = R/2", "f = 2R", "f = R/4"], correctIndex: 1 },
                  { id: 2, question: "For a real image, magnification (m) is:", options: ["Positive", "Negative", "Zero", "Undefined"], correctIndex: 1 },
                  { id: 3, question: "In the u-v method graph, the intercept on axes is:", options: ["f", "2f", "1/f", "R"], correctIndex: 2 },
                  { id: 4, question: "Image formed by convex mirror is always:", options: ["Real & Inverted", "Virtual & Erect", "Real & Erect", "Virtual & Inverted"], correctIndex: 1 },
                  { id: 5, question: "Mirror formula is:", options: ["1/v - 1/u = 1/f", "1/v + 1/u = 1/f", "v + u = f", "1/f = v/u"], correctIndex: 1 },
                  { id: 6, question: "Unit of Power of lens/mirror is:", options: ["Watt", "Diopter", "Meter", "Second"], correctIndex: 1 },
                  { id: 7, question: "Concave mirror is used in:", options: ["Rear view mirror", "Shaving mirror", "Street light reflector", "ATM security"], correctIndex: 1 },
                  { id: 8, question: "When u = 2f, v = ?", options: ["f", "2f", "infinity", "0"], correctIndex: 1 },
                  { id: 9, question: "Real images can be:", options: ["Seen only", "Caught on screen", "Always erect", "Always magnified"], correctIndex: 1 },
                  { id: 10, question: "The graph of 1/v vs 1/u is:", options: ["Parabola", "Straight Line", "Hyperbola", "Circle"], correctIndex: 1 }
              ]
          }
      }
    ]
  },
  {
    id: 'chemistry',
    name: SubjectType.CHEMISTRY,
    icon: FlaskConical,
    color: 'emerald',
    hex: '#10b981',
    description: 'Mix chemicals safely, visualize molecular structures, and perform titrations.',
    labs: [
      { 
        id: 'c1', 
        title: 'Acid-Base Titration', 
        description: 'Determine concentration of HCl using NaOH.', 
        difficulty: 'Medium', 
        duration: '45 min', 
        category: 'Physical Chem',
        content: {
          aim: "To determine molarity of HCl using standard NaOH solution.",
          requirements: ["Burette", "Pipette", "Conical Flask", "Phenolphthalein"],
          theory: "Titration (volumetric analysis) is a quantitative chemical analysis method. In an acid-base titration, a solution of known concentration (titrant, typically in burette) is added to a solution of unknown concentration (analyte, in flask) until the reaction is complete.\n\n**Reaction Principle:**\nThe reaction between a strong acid (HCl) and a strong base (NaOH) is a neutralization reaction:\nHCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)\nIonic Eq: H⁺(aq) + OH⁻(aq) → H₂O(l)\n\n**Equivalence Point vs Endpoint:**\n- **Equivalence Point:** The theoretical point where moles of H⁺ equals moles of OH⁻.\n- **Endpoint:** The experimental point where the indicator changes color, approximating the equivalence point.\n\n**Indicators:**\nPhenolphthalein is used for Strong Acid vs Strong Base titrations. It functions in the pH range 8.2–10.0.\n- In Acid (HCl): Colorless\n- In Base (Excess NaOH): Pink\n\n**Molarity Equation:**\nUsing the law of equivalence: M₁V₁/n₁ = M₂V₂/n₂\nFor HCl and NaOH, stoichiometry is 1:1, so:\nM(acid) × V(acid) = M(base) × V(base)",
          procedure: ["Rinse burette with NaOH.", "Pipette HCl into flask.", "Add indicator.", "Titrate till pale pink."],
          objectives: ["Understanding neutralization."],
          realWorldApplications: [
              "Pharmaceuticals: Determining the purity of aspirin and other drugs.",
              "Food Industry: Measuring the acidity of cheese, wine, or fruit juices to ensure quality.",
              "Water Treatment: Testing water pH and hardness.",
              "Medical: Blood analysis labs use titration principles for various metabolic tests."
          ],
          observationTable: {
              columns: ["Initial Reading (mL)", "Final Reading (mL)", "Vol Used (mL)", "Concordant"]
          },
          vivaQuestions: [
              { question: "What is the endpoint?", answer: "The point where the indicator changes color." },
              { question: "Why is phenolphthalein used?", answer: "It is suitable for strong acid-strong base titrations (pH range 8-10)." },
              { question: "How do you read the meniscus?", answer: "Read the lower meniscus for colorless liquids." },
              { question: "What is a standard solution?", answer: "A solution whose concentration is accurately known." },
              { question: "What is the indicator color in acid?", answer: "Colorless." },
              { question: "What is the indicator color in base?", answer: "Pink." },
              { question: "Why rinse the burette with NaOH?", answer: "To prevent dilution of the solution by residual water." },
              { question: "What is Molarity?", answer: "Moles of solute per liter of solution." },
              { question: "Formula for dilution?", answer: "M1V1 = M2V2." },
              { question: "What is a discordance reading?", answer: "Readings that do not agree closely; we take concordant readings." }
          ],
          quizQuestions: [
              { id: 1, question: "Color of Phenolphthalein in acid is:", options: ["Pink", "Colorless", "Red", "Yellow"], correctIndex: 1 },
              { id: 2, question: "Burette is washed with:", options: ["Water only", "Acid", "Solution to be filled", "Alcohol"], correctIndex: 2 },
              { id: 3, question: "Reaction between Acid and Base is called:", options: ["Oxidation", "Reduction", "Neutralization", "Precipitation"], correctIndex: 2 },
              { id: 4, question: "pH at endpoint of strong acid-strong base titration is approx:", options: ["3", "7", "11", "14"], correctIndex: 1 },
              { id: 5, question: "Methyl Orange is red in:", options: ["Acid", "Base", "Neutral", "None"], correctIndex: 0 },
              { id: 6, question: "The apparatus used to deliver a fixed volume of liquid is:", options: ["Beaker", "Pipette", "Flask", "Cylinder"], correctIndex: 1 },
              { id: 7, question: "Molarity is temperature:", options: ["Dependent", "Independent", "Constant", "Unrelated"], correctIndex: 0 },
              { id: 8, question: "Concordant readings differ by not more than:", options: ["1 ml", "0.1 ml", "0.5 ml", "2 ml"], correctIndex: 1 },
              { id: 9, question: "Oxalic acid is a:", options: ["Primary standard", "Secondary standard", "Strong acid", "Indicator"], correctIndex: 0 },
              { id: 10, question: "NaOH is:", options: ["Hygroscopic", "Deliquescent", "Efflorescent", "Inert"], correctIndex: 1 }
          ]
        }
      },
      { 
          id: 'c2', 
          title: 'Salt Analysis', 
          description: 'Identify the cation in a given salt.', 
          difficulty: 'Hard', 
          duration: '60 min', 
          category: 'Inorganic Chem',
          content: {
              aim: "To identify the basic radical (cation) in the given salt.",
              requirements: ["Test tubes", "Reagents (NaOH, NH4OH, etc)", "Salt sample"],
              theory: "Systematic Qualitative Analysis relies on the principle of Solubility Product (Ksp). Cations are separated into groups by selective precipitation using group reagents. If the ionic product exceeds the solubility product, precipitation occurs.\n\n**Group Classification:**\n- **Group 0 (NH₄⁺):** Detected by heating with NaOH. Evolution of NH₃ gas (pungent smell, turns red litmus blue) confirms it.\n- **Group 1 (Pb²⁺, Ag⁺, Hg₂²⁺):** Chlorides are insoluble. Reagent: Dilute HCl. Forms white ppt.\n- **Group 2 (Cu²⁺, Pb²⁺, etc):** Sulphides are insoluble in acidic medium. Reagent: H₂S + Dil HCl. Principle: Common Ion Effect of H⁺ suppresses S²⁻ conc, allowing only low Ksp sulphides to precipitate.\n- **Group 3 (Fe³⁺, Al³⁺):** Hydroxides are insoluble. Reagent: NH₄OH + NH₄Cl.\n- **Group 4 (Zn²⁺, Mn²⁺, Ni²⁺, Co²⁺):** Sulphides insoluble in basic medium. Reagent: H₂S + NH₄OH.\n- **Group 5 (Ba²⁺, Sr²⁺, Ca²⁺):** Carbonates are insoluble. Reagent: (NH₄)₂CO₃.\n- **Group 6 (Mg²⁺):** Tested with Ammonium Phosphate.",
              procedure: ["Prepare original solution.", "Add Group 0 reagent (NaOH). Check for NH3.", "Add Group 1 reagent (Dil HCl). Check ppt.", "Continue sequentially."],
              objectives: ["Systematic qualitative analysis."],
              realWorldApplications: [
                  "Forensics: Identifying poisons or substances found at crime scenes.",
                  "Environmental Science: Testing soil and water samples for heavy metal contamination (Lead, Mercury).",
                  "Geology: Identifying the mineral composition of rocks.",
                  "Quality Control: Ensuring no impurities exist in manufactured salts or drugs."
              ],
              observationTable: {
                  columns: ["Experiment", "Observation", "Inference"]
              },
              vivaQuestions: [
                  { question: "What is the Group 1 reagent?", answer: "Dilute HCl." },
                  { question: "What is the smell of Ammonia gas?", answer: "Pungent smell." },
                  { question: "Why is HCl added before H2S in Group 2?", answer: "To suppress ionization of H2S (Common Ion Effect)." },
                  { question: "Color of Copper sulphate?", answer: "Blue." },
                  { question: "Confirmatory test for Lead?", answer: "Golden yellow ppt with Potassium Iodide." },
                  { question: "Group 3 reagent?", answer: "NH4OH in presence of NH4Cl." },
                  { question: "What is the brown ring test used for?", answer: "Nitrate ion (NO3-)." },
                  { question: "What is Aqua Regia?", answer: "3:1 mixture of Conc HCl and Conc HNO3." },
                  { question: "Flame color of Barium?", answer: "Apple Green." },
                  { question: "Group 5 reagent?", answer: "(NH4)2CO3 in presence of NH4OH." }
              ],
              quizQuestions: [
                  { id: 1, question: "Lead (Pb++) belongs to which group?", options: ["Group 1", "Group 2", "Both 1 & 2", "Group 3"], correctIndex: 2 },
                  { id: 2, question: "Brown ring test is for:", options: ["Chloride", "Nitrate", "Sulphate", "Carbonate"], correctIndex: 1 },
                  { id: 3, question: "Flame color of Calcium is:", options: ["Golden Yellow", "Brick Red", "Apple Green", "Crimson"], correctIndex: 1 },
                  { id: 4, question: "Group 0 cation is:", options: ["Pb++", "Cu++", "NH4+", "Mg++"], correctIndex: 2 },
                  { id: 5, question: "Nessler's reagent detects:", options: ["Ammonium", "Sodium", "Potassium", "Iron"], correctIndex: 0 },
                  { id: 6, question: "Blue vitriol is:", options: ["FeSO4", "CuSO4.5H2O", "ZnSO4", "MgSO4"], correctIndex: 1 },
                  { id: 7, question: "H2S gas has smell of:", options: ["Rotten eggs", "Burning sulphur", "Fruity", "Pungent"], correctIndex: 0 },
                  { id: 8, question: "Iron (Fe3+) gives what color ppt with NH4OH?", options: ["White", "Reddish Brown", "Green", "Blue"], correctIndex: 1 },
                  { id: 9, question: "Common ion effect is used in:", options: ["Group 2 & 3", "Group 0", "Group 1", "None"], correctIndex: 0 },
                  { id: 10, question: "Group 6 cation is:", options: ["Mg++", "Ca++", "Ba++", "Sr++"], correctIndex: 0 }
              ]
          } 
      },
      {
          id: 'c3',
          title: 'pH Determination',
          description: 'Find pH of various fruit juices.',
          difficulty: 'Easy',
          duration: '20 min',
          category: 'Physical Chem',
          content: {
              aim: "To determine the pH of vegetable/fruit juices using pH paper.",
              requirements: ["pH Paper", "Standard pH scale", "Juice samples"],
              theory: "The pH scale is a logarithmic scale used to specify the acidity or basicity of an aqueous solution. It is defined as the negative base-10 logarithm of the hydrogen ion activity (concentration).\n\n**Formula:**\npH = -log₁₀[H⁺]\npOH = -log₁₀[OH⁻]\nAt 25°C, pH + pOH = 14 (since Kw = 1.0 × 10⁻¹⁴).\n\n**Interpretation:**\n- **pH < 7:** Acidic. Higher [H⁺] than water. Example: Lemon juice, HCl.\n- **pH = 7:** Neutral. [H⁺] = [OH⁻]. Example: Distilled water.\n- **pH > 7:** Basic/Alkaline. Lower [H⁺]. Example: Soap, NaOH.\n\n**Universal Indicator:**\nA blend of different pH indicators (Thymol blue, Methyl red, Bromothymol blue, Phenolphthalein) that exhibits a smooth color transition across the pH spectrum:\nRed (Strong Acid) → Orange → Yellow → Green (Neutral) → Blue → Violet (Strong Base).",
              procedure: ["Dip pH paper in solution.", "Compare color with standard chart.", "Note pH value."],
              objectives: ["Classify substances as acidic or basic."],
              realWorldApplications: [
                  "Agriculture: Testing soil pH to determine which crops will grow best.",
                  "Healthcare: Measuring blood pH (acidosis/alkalosis) to diagnose metabolic disorders.",
                  "Swimming Pools: Maintaining water pH to prevent bacterial growth and eye irritation.",
                  "Cosmetics: Skin has a natural pH of 5.5; products are balanced to match this."
              ],
              observationTable: {
                  columns: ["Sample Name", "Color on pH Paper", "Approx pH", "Nature (Acid/Base)"]
              },
              vivaQuestions: [
                  { question: "What is the pH of pure water?", answer: "7 (Neutral)." },
                  { question: "What indicates a strong acid?", answer: "pH close to 0 or 1 (Red color)." },
                  { question: "What is the full form of pH?", answer: "Potenz of Hydrogen." },
                  { question: "Color of Universal Indicator in strong alkali?", answer: "Violet." },
                  { question: "Approximate pH of lemon juice?", answer: "2.0 - 3.0." },
                  { question: "Approximate pH of blood?", answer: "7.35 - 7.45." },
                  { question: "What is a buffer solution?", answer: "A solution that resists change in pH." },
                  { question: "Is pH temperature dependent?", answer: "Yes, pH decreases as temperature increases." },
                  { question: "Who devised the pH scale?", answer: "Soren Peder Lauritz Sorensen." },
                  { question: "What is the ionic product of water (Kw)?", answer: "10^-14 at 25°C." }
              ],
              quizQuestions: [
                  { id: 1, question: "Which juice is likely to be most acidic?", options: ["Carrot", "Lemon", "Cucumber", "Water"], correctIndex: 1 },
                  { id: 2, question: "pH > 7 implies:", options: ["Acidic", "Basic", "Neutral", "None"], correctIndex: 1 },
                  { id: 3, question: "Universal Indicator gives which color in strong alkali?", options: ["Red", "Green", "Violet", "Orange"], correctIndex: 2 },
                  { id: 4, question: "pH + pOH equals:", options: ["7", "0", "14", "10"], correctIndex: 2 },
                  { id: 5, question: "Gastric juice contains:", options: ["HCl", "H2SO4", "HNO3", "Acetic Acid"], correctIndex: 0 },
                  { id: 6, question: "Milk of Magnesia is:", options: ["Acidic", "Basic", "Neutral", "Salt"], correctIndex: 1 },
                  { id: 7, question: "Standard pH scale ranges from:", options: ["1-14", "0-14", "0-10", "1-100"], correctIndex: 1 },
                  { id: 8, question: "Concentration of H+ in pure water is:", options: ["10^-7 M", "1 M", "0 M", "10^-14 M"], correctIndex: 0 },
                  { id: 9, question: "Acid rain has pH less than:", options: ["7", "5.6", "2", "10"], correctIndex: 1 },
                  { id: 10, question: "Tooth decay starts when mouth pH is lower than:", options: ["5.5", "7.0", "8.0", "10.0"], correctIndex: 0 }
              ]
          }
      },
      {
          id: 'c4',
          title: 'Functional Groups',
          description: 'Detect presence of Aldehydes/Ketones.',
          difficulty: 'Medium',
          duration: '40 min',
          category: 'Organic Chem',
          content: {
              aim: "To identify the functional group (Aldehyde) in the given organic compound.",
              requirements: ["Schiff's Reagent", "Fehling's Solution", "Test tubes"],
              theory: "Functional groups are specific groupings of atoms within molecules that have their own characteristic properties, regardless of the other atoms present in a molecule.\n\n**Carbonyl Compounds:**\nContain the C=O group. If the carbon is bonded to at least one Hydrogen, it is an **Aldehyde (-CHO)**. If bonded to two carbons, it is a **Ketone (R-CO-R')**.\n\n**Distinguishing Tests:**\nAldehydes are easily oxidized to carboxylic acids, while ketones are not.\n1. **Schiff's Test:** Schiff’s reagent (rosaniline hydrochloride) loses color with SO₂. Aldehydes restore the magenta/pink color upon reaction, while ketones do not.\n2. **Fehling's Test:** Used for aliphatic aldehydes. Fehling's Solution is a mixture of CuSO₄ (Sol A) and Alkaline Sodium Potassium Tartrate (Sol B). Aldehydes reduce the Cu²⁺ (Deep Blue) complex to Cu⁺ (Red precipitate of Cu₂O). Aromatic aldehydes (like Benzaldehyde) do not give this test.\n3. **Tollen's Test (Silver Mirror):** Oxidizes both aliphatic and aromatic aldehydes, reducing Ag⁺ to metallic Ag.",
              procedure: ["Add Schiff's reagent to compound. Observe pink color.", "Add Fehling's A & B. Heat. Observe red ppt."],
              objectives: ["Distinguish aldehydes from ketones."],
              realWorldApplications: [
                  "Perfumes: Aldehydes (like Cinnamaldehyde) are often used for their distinct fragrances.",
                  "Food Preservation: Formalin (formaldehyde) is used to preserve biological specimens.",
                  "Pharmaceuticals: Many drugs are synthesized using aldehyde and ketone precursors.",
                  "Flavoring: Vanilla extract contains Vanillin, which has an aldehyde group."
              ],
              observationTable: {
                  columns: ["Experiment", "Observation", "Inference"]
              },
              vivaQuestions: [
                  { question: "What is Tollen's Reagent?", answer: "Ammoniacal Silver Nitrate." },
                  { question: "Do ketones reduce Fehling's solution?", answer: "No, generally they do not." },
                  { question: "What is the visible result of Tollen's test?", answer: "Silver Mirror." },
                  { question: "What is Formalin?", answer: "40% aqueous solution of Formaldehyde." },
                  { question: "Structure of Carbonyl group?", answer: "C=O." },
                  { question: "Test to distinguish Alcohol?", answer: "Sodium metal test (H2 gas) or Esterification." },
                  { question: "What is the smell of ester?", answer: "Fruity smell." },
                  { question: "Which acid is present in vinegar?", answer: "Acetic acid." },
                  { question: "2,4-DNP test is for?", answer: "Carbonyl compounds (Aldehydes & Ketones)." },
                  { question: "Color of Fehling's solution?", answer: "Deep Blue." }
              ],
              quizQuestions: [
                  { id: 1, question: "Fehling's solution B contains:", options: ["Copper Sulphate", "Rochelle Salt", "Sodium Hydroxide", "Silver Nitrate"], correctIndex: 1 },
                  { id: 2, question: "Functional group of Aldehyde is:", options: ["-CHO", "-COOH", "-OH", "-CO-"], correctIndex: 0 },
                  { id: 3, question: "Schiff's reagent gives what color with Aldehydes?", options: ["Blue", "Pink/Magenta", "Yellow", "Black"], correctIndex: 1 },
                  { id: 4, question: "Carbolic acid is:", options: ["Phenol", "Acetic Acid", "Benzoic Acid", "Picric Acid"], correctIndex: 0 },
                  { id: 5, question: "Ketones have functional group:", options: ["-CO-", "-CHO", "-OH", "-COOH"], correctIndex: 0 },
                  { id: 6, question: "Tollen's test gives precipitate of:", options: ["Cu2O", "Ag", "CuO", "AgBr"], correctIndex: 1 },
                  { id: 7, question: "Which gives Iodoform test?", options: ["Ethanol", "Methanol", "Formaldehyde", "Phenol"], correctIndex: 0 },
                  { id: 8, question: "Fehling solution A is:", options: ["Aq CuSO4", "Alk NaOH", "Rochelle Salt", "AgNO3"], correctIndex: 0 },
                  { id: 9, question: "Reaction of carboxylic acid with NaHCO3 gives:", options: ["H2", "CO2", "O2", "NH3"], correctIndex: 1 },
                  { id: 10, question: "Bayer's reagent is:", options: ["Alk KMnO4", "Acidic KMnO4", "Aq Bromine", "Conc H2SO4"], correctIndex: 0 }
              ]
          }
      },
      {
          id: 'c5',
          title: 'Exothermic Reaction',
          description: 'Study enthalpy change of neutralization.',
          difficulty: 'Medium',
          duration: '30 min',
          category: 'Thermodynamics',
          content: {
              aim: "To determine the enthalpy of neutralization of strong acid and strong base.",
              requirements: ["Calorimeter", "Thermometer", "HCl", "NaOH"],
              theory: "Enthalpy (H) is a thermodynamic potential consisting of the internal energy of the system plus the product of pressure and volume. Chemical reactions that release heat are called Exothermic (ΔH is negative).\n\n**Enthalpy of Neutralization:**\nDefined as the heat change when one gram equivalent of an acid is neutralized by one gram equivalent of a base in a dilute solution.\nH⁺(aq) + OH⁻(aq) → H₂O(l) ; ΔH = -57.1 kJ/mol\nFor strong acids and bases, this value is constant because they ionize completely, so the reaction is always the formation of water from ions. For weak acids/bases, ΔH is less negative because some heat is consumed to dissociate the weak electrolyte.\n\n**Calorimetry:**\nQ = msΔT + WΔT\nWhere:\n- m = mass of solution\n- s = specific heat capacity of water (4.18 J/g/K)\n- W = water equivalent of calorimeter\n- ΔT = Temperature rise.\nMolar Enthalpy ΔH = -Q / n (moles).",
              procedure: ["Measure initial temp of acid and base.", "Mix quickly in calorimeter.", "Record highest temp reached."],
              objectives: ["Calculate heat of reaction."],
              realWorldApplications: [
                  "Hand Warmers: Use exothermic oxidation of iron or crystallization of supersaturated solutions to generate heat.",
                  "Self-Heating Cans: Used for instant coffee or meals by mixing chemicals (like CaO and Water) in a separate compartment.",
                  "Industrial Processes: Managing heat release in large chemical reactors to prevent explosions.",
                  "Explosives: Rapid exothermic reactions that release massive amounts of energy and gas."
              ],
              observationTable: {
                  columns: ["Init Temp Acid (t1)", "Init Temp Base (t2)", "Mix Temp (t3)", "Rise (t3 - avg(t1,t2))"]
              },
              vivaQuestions: [
                  { question: "Is neutralization exo- or endothermic?", answer: "Exothermic (Heat is released)." },
                  { question: "What is the standard enthalpy of neutralization for Strong Acid/Base?", answer: "-57.1 kJ/mol or -13.7 kcal/mol." },
                  { question: "Why use a polystyrene cup?", answer: "It is a good insulator to prevent heat loss." },
                  { question: "What is specific heat capacity?", answer: "Heat required to raise temp of 1g substance by 1°C." },
                  { question: "Why is the value lower for weak acids?", answer: "Some energy is used for dissociation of the weak acid." },
                  { question: "Define Enthalpy.", answer: "Total heat content of a system." },
                  { question: "What is a standard state?", answer: "1 atm pressure, 298K temperature." },
                  { question: "Does stirring affect result?", answer: "Yes, ensures uniform temperature distribution." },
                  { question: "Units of Enthalpy?", answer: "Joule or Calorie." },
                  { question: "Is heat an extensive property?", answer: "Yes, depends on mass." }
              ],
              quizQuestions: [
                  { id: 1, question: "If ΔT is positive, the reaction is:", options: ["Exothermic", "Endothermic", "Isothermal", "Adiabatic"], correctIndex: 0 },
                  { id: 2, question: "Enthalpy is denoted by:", options: ["S", "G", "H", "E"], correctIndex: 2 },
                  { id: 3, question: "1 calorie is equal to:", options: ["4.18 J", "1 J", "10 J", "8.31 J"], correctIndex: 0 },
                  { id: 4, question: "Neutralization involves formation of:", options: ["Salt & Water", "Acid", "Base", "Gas"], correctIndex: 0 },
                  { id: 5, question: "Hess's Law is related to:", options: ["Heat summation", "Gas volumes", "Rates", "Equilibrium"], correctIndex: 0 },
                  { id: 6, question: "Heat capacity depends on:", options: ["Mass", "Nature of substance", "Both", "None"], correctIndex: 2 },
                  { id: 7, question: "Strong acid + Weak base enthalpy is:", options: ["< -57.1 kJ", "> -57.1 kJ (less negative)", "= -57.1 kJ", "Zero"], correctIndex: 1 },
                  { id: 8, question: "Coffee cup calorimeter measures heat at:", options: ["Constant P", "Constant V", "Constant T", "Constant n"], correctIndex: 0 },
                  { id: 9, question: "Bomb calorimeter measures heat at:", options: ["Constant P", "Constant V", "Constant T", "Constant n"], correctIndex: 1 },
                  { id: 10, question: "Thermochemistry is a branch of:", options: ["Thermodynamics", "Kinetics", "Electrochemistry", "Nuclear chem"], correctIndex: 0 }
              ]
          }
      }
    ]
  },
  {
    id: 'biology',
    name: SubjectType.BIOLOGY,
    icon: Dna,
    color: 'lime',
    hex: '#65a30d',
    description: 'Dissect virtually, observe microscopic life, and understand physiological processes.',
    labs: [
      { 
        id: 'b1', 
        title: 'Mitosis in Onion Tip', 
        description: 'Observe stages of cell division.', 
        difficulty: 'Medium', 
        duration: '40 min', 
        category: 'Cell Biology',
        content: {
            aim: "To study mitosis in onion root tip cells.",
            requirements: ["Microscope", "Slide", "Onion root"],
            theory: "Mitosis is a type of cell division in which a eukaryotic cell nucleus splits in two, followed by division of the parent cell into two daughter cells that are genetically identical to the parent. It is the primary method of growth and tissue repair.\n\n**Why Onion Root Tip?**\nThe roots of plants grow rapidly. The apical meristem near the tip contains actively dividing cells, making it ideal for studying mitosis.\n\n**Stages of Mitosis (M-Phase):**\n1. **Prophase:** Chromatin condenses into visible chromosomes (two sister chromatids attached at centromere). The nuclear envelope breaks down. Spindle fibers begin to form.\n2. **Metaphase:** Chromosomes align at the metaphase plate (equatorial plane). Spindle fibers attach to kinetochores.\n3. **Anaphase:** Centromeres split. Sister chromatids are pulled apart toward opposite poles by shortening spindle fibers.\n4. **Telophase:** Chromosomes arrive at poles and decondense. Nuclear membranes reform.\n\n**Cytokinesis:**\nIn plant cells, a cell plate forms from the center outward to divide the cell. In animal cells, a cleavage furrow pinches the cell in two.",
            procedure: ["Prepare slide.", "Stain with Acetocarmine.", "Observe under microscope."],
            objectives: ["Identify stages of division."],
            realWorldApplications: [
                "Cancer Research: Understanding uncontrolled mitosis (tumors) helps develop chemotherapy drugs.",
                "Tissue Culture: Cloning plants for agriculture.",
                "Regenerative Medicine: Using stem cells to repair damaged organs.",
                "Genetics: Understanding hereditary transfer during cell division."
            ],
            observationTable: {
                columns: ["Field No.", "Prophase", "Metaphase", "Anaphase", "Telophase", "Total Cells"]
            },
            vivaQuestions: [
                { question: "Why use onion root tip?", answer: "It has rapidly dividing meristematic tissue." },
                { question: "In which stage do chromosomes align at the equator?", answer: "Metaphase." },
                { question: "What is the purpose of Acetocarmine?", answer: "To stain the chromosomes." },
                { question: "Which is the longest phase?", answer: "Prophase." },
                { question: "Which is the shortest phase?", answer: "Anaphase." },
                { question: "What happens in Anaphase?", answer: "Sister chromatids separate and move to opposite poles." },
                { question: "What is Interphase?", answer: "Resting phase where DNA replicates." },
                { question: "What is cytokinesis?", answer: "Division of cytoplasm." },
                { question: "Difference between plant and animal mitosis?", answer: "Cell plate formation in plants vs cleavage furrow in animals." },
                { question: "What are spindle fibers made of?", answer: "Microtubules (Tubulin protein)." }
            ],
            quizQuestions: [
                { id: 1, question: "DNA replication occurs in:", options: ["Prophase", "Interphase", "Metaphase", "Anaphase"], correctIndex: 1 },
                { id: 2, question: "Chromatids move to opposite poles during:", options: ["Telophase", "Prophase", "Anaphase", "Metaphase"], correctIndex: 2 },
                { id: 3, question: "Longest phase of cell cycle is:", options: ["M Phase", "Interphase", "G1 Phase", "G2 Phase"], correctIndex: 1 },
                { id: 4, question: "Chromosomes are best visible in:", options: ["Prophase", "Metaphase", "Anaphase", "Telophase"], correctIndex: 1 },
                { id: 5, question: "Nuclear membrane disappears in:", options: ["Prophase", "Telophase", "Interphase", "Anaphase"], correctIndex: 0 },
                { id: 6, question: "Cell plate is formed in:", options: ["Animal cells", "Plant cells", "Bacteria", "Virus"], correctIndex: 1 },
                { id: 7, question: "Synthesis of RNA and proteins happens in:", options: ["G1 Phase", "S Phase", "G2 Phase", "M Phase"], correctIndex: 2 },
                { id: 8, question: "Crossing over occurs in:", options: ["Mitosis", "Meiosis", "Amitosis", "Fission"], correctIndex: 1 },
                { id: 9, question: "Number of chromosomes in daughter cells of mitosis:", options: ["Half", "Double", "Same", "Triple"], correctIndex: 2 },
                { id: 10, question: "Centromere splits in:", options: ["Metaphase", "Anaphase", "Prophase", "Telophase"], correctIndex: 1 }
            ]
        }
      },
      {
          id: 'b2',
          title: 'Stomata Distribution',
          description: 'Compare stomata on leaf surfaces.',
          difficulty: 'Easy',
          duration: '30 min',
          category: 'Plant Physiology',
          content: {
              aim: "To study the distribution of stomata on the upper and lower surfaces of a leaf.",
              requirements: ["Leaf", "Forceps", "Safranin", "Glycerin", "Microscope"],
              theory: "Stomata are microscopic pores found on the epidermis of leaves, stems, and other plant organs. They control the exchange of gases (CO2, O2) and water vapor between the plant and the atmosphere.\n\n**Structure:**\nEach stoma is flanked by two specialized parenchyma cells known as Guard Cells. \n- **Dicots:** Kidney or bean-shaped guard cells.\n- **Monocots:** Dumbbell-shaped guard cells.\n\n**Distribution Patterns:**\n1. **Hypostomatic:** Stomata present mainly on the lower epidermis (e.g., Dicot leaves like mango). This adaptation reduces water loss via transpiration.\n2. **Amphistomatic:** Stomata present on both surfaces (e.g., Monocots like maize/grass).\n3. **Epistomatic:** Stomata on upper surface only (e.g., Floating aquatic plants like Lotus).\n\n**Opening/Closing Mechanism (K+ Pump Theory):**\nDuring the day, K+ ions are actively pumped into guard cells. This lowers water potential -> Endosmosis -> Turgidity -> Stoma Opens. At night, K+ flows out -> Exosmosis -> Flaccidity -> Stoma Closes.",
              procedure: ["Peel epidermis from both sides.", "Stain and mount.", "Count stomata in field of view."],
              objectives: ["Calculate stomatal index."],
              realWorldApplications: [
                  "Agriculture: Developing drought-resistant crops by modifying stomatal density.",
                  "Climate Change: Stomata regulate transpiration, affecting the global water cycle and humidity.",
                  "Pollution Monitoring: Stomata get clogged by particulate matter, indicating air quality levels."
              ],
              observationTable: {
                  columns: ["Surface", "No. of Stomata (Field 1)", "No. of Stomata (Field 2)", "Average"]
              },
              vivaQuestions: [
                  { question: "What is the function of stomata?", answer: "Gas exchange and transpiration." },
                  { question: "What are guard cells?", answer: "Kidney-shaped cells surrounding the stoma that control opening/closing." },
                  { question: "Why are stomata fewer on upper surface?", answer: "To prevent excessive water loss from direct sunlight." },
                  { question: "Shape of guard cells in monocots?", answer: "Dumb-bell shaped." },
                  { question: "Shape of guard cells in dicots?", answer: "Kidney/Bean shaped." },
                  { question: "What causes stomata to open?", answer: "Turgidity of guard cells." },
                  { question: "What is transpiration pull?", answer: "Suction force pulling water up the xylem." },
                  { question: "Which hormone closes stomata?", answer: "Abscisic Acid (ABA)." },
                  { question: "What is Stomatal Index?", answer: "(No. of Stomata / (No. of Stomata + No. of Epidermal cells)) x 100." },
                  { question: "Role of K+ ions?", answer: "Influx of K+ ions causes stomatal opening." }
              ],
              quizQuestions: [
                  { id: 1, question: "In dicots, guard cells are:", options: ["Dumbbell shaped", "Kidney shaped", "Rectangular", "Irregular"], correctIndex: 1 },
                  { id: 2, question: "Stomata open when guard cells are:", options: ["Flaccid", "Turgid", "Plasmolysed", "Dead"], correctIndex: 1 },
                  { id: 3, question: "Transpiration is:", options: ["Loss of water as vapor", "Loss of water as liquid", "Absorption of water", "Photosynthesis"], correctIndex: 0 },
                  { id: 4, question: "Maximum transpiration occurs through:", options: ["Cuticle", "Lenticels", "Stomata", "Bark"], correctIndex: 2 },
                  { id: 5, question: "Dorsiventral leaves are found in:", options: ["Monocots", "Dicots", "Gymnosperms", "Algae"], correctIndex: 1 },
                  { id: 6, question: "Isobilateral leaves have stomata:", options: ["More on upper", "More on lower", "Equal on both", "None"], correctIndex: 2 },
                  { id: 7, question: "Guttation occurs through:", options: ["Stomata", "Hydathodes", "Lenticels", "Cuticle"], correctIndex: 1 },
                  { id: 8, question: "Potometer measures:", options: ["Photosynthesis", "Respiration", "Transpiration", "Growth"], correctIndex: 2 },
                  { id: 9, question: "Sunken stomata are found in:", options: ["Hydrophytes", "Xerophytes", "Mesophytes", "Epiphytes"], correctIndex: 1 },
                  { id: 10, question: "Subsidiary cells surround:", options: ["Root hair", "Guard cells", "Xylem", "Phloem"], correctIndex: 1 }
              ]
          }
      },
      {
          id: 'b3',
          title: 'Osmosis (Potato)',
          description: 'Demonstrate osmosis using potato osmometer.',
          difficulty: 'Easy',
          duration: '45 min',
          category: 'Cell Physiology',
          content: {
              aim: "To demonstrate osmosis using a potato osmometer.",
              requirements: ["Large Potato", "Sugar solution", "Pin", "Beaker", "Water"],
              theory: "Osmosis is the spontaneous net movement of solvent molecules (usually water) through a selectively permeable membrane into a region of higher solute concentration, in the direction that tends to equalize the solute concentrations on the two sides.\n\n**Water Potential (Ψ):**\nWater moves from a region of high water potential (less negative) to low water potential (more negative). Ψ = Ψs + Ψp.\n\n**In this Experiment:**\n- The potato tuber tissue acts as a semi-permeable membrane.\n- **Beaker:** Contains pure water (Hypotonic). High Water Potential.\n- **Potato Cavity:** Contains concentrated sugar solution (Hypertonic). Low Water Potential.\n\n**Result:**\nWater moves from the beaker into the potato cavity (Endosmosis). The level of solution inside the potato rises. If the setup is reversed (water in potato, sugar in beaker), the level drops (Exosmosis).",
              procedure: ["Scoop cavity in potato.", "Fill with sugar solution.", "Place in water beaker.", "Mark initial level.", "Observe rise."],
              objectives: ["Understand hypotonic/hypertonic solutions."],
              realWorldApplications: [
                  "Dialysis: Artificial kidneys use osmosis/diffusion principles to clean blood.",
                  "Food Preservation: Pickling in brine or syrup dehydrates bacteria via exosmosis, preventing spoilage.",
                  "Water Purification: Reverse Osmosis (RO) plants provide clean drinking water.",
                  "Root Absorption: Plants absorb water from soil through osmosis."
              ],
              observationTable: {
                  columns: ["Time (min)", "Initial Level", "Final Level", "Change"]
              },
              vivaQuestions: [
                  { question: "What acts as the semi-permeable membrane?", answer: "The potato cell membranes." },
                  { question: "Why does the level rise?", answer: "Water moves from beaker (hypotonic) to cavity (hypertonic)." },
                  { question: "What if we boil the potato?", answer: "Osmosis stops because cells die and membrane loses semi-permeability." },
                  { question: "Define Osmosis.", answer: "Movement of solvent from low solute conc. to high solute conc. via SPM." },
                  { question: "What is a hypertonic solution?", answer: "Solution with higher solute concentration." },
                  { question: "What is a hypotonic solution?", answer: "Solution with lower solute concentration." },
                  { question: "What is Isotonic?", answer: "Solutions with equal concentration." },
                  { question: "What is turgor pressure?", answer: "Pressure exerted by cell contents against cell wall." },
                  { question: "Reverse osmosis is used for?", answer: "Water purification." },
                  { question: "Why peel the potato?", answer: "To expose the cells directly to the water." }
              ],
              quizQuestions: [
                  { id: 1, question: "Movement of water molecules is from:", options: ["High conc to Low conc", "Low conc to High conc", "No movement", "Random"], correctIndex: 0 },
                  { id: 2, question: "Solution with higher solute concentration is:", options: ["Hypotonic", "Isotonic", "Hypertonic", "Dilute"], correctIndex: 2 },
                  { id: 3, question: "Plant cell in hypertonic solution undergoes:", options: ["Turgidity", "Plasmolysis", "Deplasmolysis", "Swelling"], correctIndex: 1 },
                  { id: 4, question: "Semi-permeable membrane allows passage of:", options: ["Solute only", "Solvent only", "Both", "None"], correctIndex: 1 },
                  { id: 5, question: "Osmosis is a special type of:", options: ["Diffusion", "Active Transport", "Imbibition", "Transpiration"], correctIndex: 0 },
                  { id: 6, question: "Endosmosis causes cells to:", options: ["Shrink", "Swell", "Die", "Divide"], correctIndex: 1 },
                  { id: 7, question: "Plasmolysis occurs due to:", options: ["Exosmosis", "Endosmosis", "Imbibition", "Adsorption"], correctIndex: 0 },
                  { id: 8, question: "Water potential of pure water is:", options: ["Zero", "1", "-1", "100"], correctIndex: 0 },
                  { id: 9, question: "Solute potential is always:", options: ["Positive", "Negative", "Zero", "Variable"], correctIndex: 1 },
                  { id: 10, question: "Raisins swell in water due to:", options: ["Endosmosis", "Exosmosis", "Plasmolysis", "Diffusion"], correctIndex: 0 }
              ]
          }
      },
      {
          id: 'b4',
          title: 'Test for Sugar in Urine',
          description: 'Detect glucose using Benedict\'s Reagent.',
          difficulty: 'Medium',
          duration: '30 min',
          category: 'Physiology',
          content: {
              aim: "To detect the presence of sugar (glucose) in a given urine sample.",
              requirements: ["Urine sample", "Benedict's Reagent", "Test tube", "Bunsen Burner"],
              theory: "Diabetes mellitus is characterized by hyperglycemia and glucosuria (sugar in urine). Glucose is a reducing sugar because it has a free aldehyde group. Benedict's reagent contains Copper Sulphate (Blue). When heated with a reducing sugar, Cu²⁺ is reduced to Cu⁺ (Cuprous Oxide), which forms a colored precipitate ranging from Green (traces) to Brick Red (high conc).\n\nReaction: R-CHO + 2Cu²⁺ + 5OH⁻ → R-COO⁻ + Cu₂O (Red ppt) + 3H₂O",
              procedure: ["Take 2ml urine in test tube.", "Add 2ml Benedict's reagent.", "Boil for 2 mins.", "Observe color change."],
              objectives: ["Clinical diagnosis basics."],
              realWorldApplications: [
                  "Medical Diagnostics: Screening for Diabetes Mellitus.",
                  "Sports Medicine: Monitoring athlete health and metabolism.",
                  "Food Science: Testing for reducing sugars in food products.",
                  "Pregnancy: Screening for gestational diabetes."
              ],
              observationTable: {
                  columns: ["Sample", "Test Performed", "Observation", "Inference"]
              },
              vivaQuestions: [
                  { question: "What is Glucosuria?", answer: "Presence of glucose in urine." },
                  { question: "Color of Benedict's reagent?", answer: "Blue." },
                  { question: "What indicates high sugar?", answer: "Brick Red precipitate." },
                  { question: "Is sucrose a reducing sugar?", answer: "No." },
                  { question: "Normal blood glucose level?", answer: "70-100 mg/dL (Fasting)." }
              ],
              quizQuestions: [
                  { id: 1, question: "Benedict's test detects:", options: ["Protein", "Starch", "Reducing Sugar", "Fat"], correctIndex: 2 },
                  { id: 2, question: "Brick red precipitate is:", options: ["CuO", "Cu2O", "CuSO4", "Cu(OH)2"], correctIndex: 1 },
                  { id: 3, question: "Diabetes mellitus is caused by deficiency of:", options: ["Glucagon", "Insulin", "Thyroxin", "Adrenaline"], correctIndex: 1 },
                  { id: 4, question: "Green color indicates:", options: ["No sugar", "Trace sugar", "High sugar", "Protein"], correctIndex: 1 },
                  { id: 5, question: "Fehling's test also detects:", options: ["Starch", "Lipids", "Reducing Sugars", "Proteins"], correctIndex: 2 }
              ]
          }
      },
      {
          id: 'b5',
          title: 'Paper Chromatography',
          description: 'Separate plant pigments.',
          difficulty: 'Hard',
          duration: '60 min',
          category: 'Biochemistry',
          content: {
              aim: "To separate plant pigments using paper chromatography.",
              requirements: ["Spinach leaves", "Acetone", "Chromatography paper", "Jar"],
              theory: "Chromatography is a technique to separate components of a mixture based on their differential migration on a stationary phase under the influence of a mobile phase. Pigments have different solubilities in the solvent and different affinities for the paper (cellulose).\n\n**Pigments Separated:**\n1. **Carotene:** Orange-Yellow (Top)\n2. **Xanthophyll:** Yellow\n3. **Chlorophyll a:** Blue-Green\n4. **Chlorophyll b:** Yellow-Green (Bottom)",
              procedure: ["Extract pigment in acetone.", "Spot on paper line.", "Dip in solvent jar.", "Wait for run.", "Calculate Rf values."],
              objectives: ["Calculate Rf value."],
              realWorldApplications: [
                  "Forensic Science: Analyzing ink or dye samples from crime scenes.",
                  "Drug Testing: Detecting trace amounts of drugs in urine or blood.",
                  "Vaccine Manufacturing: Purifying proteins and antibodies.",
                  "Environmental Safety: Testing for pollutants in water sources."
              ],
              observationTable: {
                  columns: ["Pigment Color", "Dist Solute (a)", "Dist Solvent (b)", "Rf Value (a/b)"]
              },
              vivaQuestions: [
                  { question: "What is Rf value?", answer: "Distance traveled by solute / Distance by solvent." },
                  { question: "Stationary phase here is?", answer: "Water molecules trapped in cellulose." },
                  { question: "Mobile phase is?", answer: "Solvent (Ether/Acetone)." },
                  { question: "Most soluble pigment?", answer: "Carotene (travels furthest)." },
                  { question: "Color of Chlorophyll a?", answer: "Blue-Green." }
              ],
              quizQuestions: [
                  { id: 1, question: "Rf value is always:", options: ["> 1", "< 1", "= 1", "Zero"], correctIndex: 1 },
                  { id: 2, question: "Chlorophyll b is:", options: ["Blue Green", "Yellow Green", "Orange", "Red"], correctIndex: 1 },
                  { id: 3, question: "Technique based on:", options: ["Adsorption/Partition", "Evaporation", "Filtration", "Sedimentation"], correctIndex: 0 },
                  { id: 4, question: "Carotenes appear:", options: ["Green", "Yellow-Orange", "Blue", "Red"], correctIndex: 1 },
                  { id: 5, question: "Solvent front is:", options: ["Starting line", "Max distance by solvent", "Max distance by solute", "Bottom edge"], correctIndex: 1 }
              ]
          }
      }
    ]
  },
  {
    id: 'math',
    name: SubjectType.MATH,
    icon: Calculator,
    color: 'violet',
    hex: '#8b5cf6',
    description: 'Visualize functions, calculus, and geometry interactively.',
    labs: [
        {
            id: 'm1', title: 'Graphing Functions', description: 'Plot and analyze functions.', difficulty: 'Easy', duration: '20 min', category: 'Calculus',
            content: { 
                aim: "To plot functions.", requirements: ["Graph paper"], theory: "f(x)=x^2 is a parabola.", procedure: ["Input function", "Plot points"], objectives: ["Visualize graphs"],
                realWorldApplications: ["Finance: Modeling stock market trends.", "Physics: Plotting motion trajectories.", "Engineering: Stress analysis."],
                observationTable: { columns: ["x", "f(x)"] }
            }
        },
        {
            id: 'm2', title: 'Definite Integral', description: 'Area under curve.', difficulty: 'Medium', duration: '30 min', category: 'Calculus',
            content: { 
                aim: "Find area.", requirements: ["Graph"], theory: "Integration is summation.", procedure: ["Select limits", "Sum strips"], objectives: ["Understand Riemann Sum"],
                realWorldApplications: ["Civil Engineering: Calculating amount of concrete for irregular shapes.", "Medicine: Calculating cardiac output.", "Physics: Work done by variable force."]
            }
        },
        {
            id: 'm3', title: 'Unit Circle', description: 'Trigonometric ratios.', difficulty: 'Easy', duration: '20 min', category: 'Trigonometry',
            content: { 
                aim: "Study sin/cos.", requirements: ["Circle"], theory: "x^2+y^2=1", procedure: ["Rotate point", "Observe values"], objectives: ["Link geometry to trig"],
                realWorldApplications: ["Game Development: Character movement and rotation.", "GPS: Positioning systems use triangulation.", "Audio Processing: Sound waves are modeled using sine/cosine functions."]
            }
        },
        {
            id: 'm4', title: 'Conic Sections', description: 'Parabola, Ellipse, Hyperbola.', difficulty: 'Hard', duration: '40 min', category: 'Geometry',
            content: { 
                aim: "Construct conics.", requirements: ["Focus", "Directrix"], theory: "Locus of points.", procedure: ["Set focus", "Draw"], objectives: ["Eccentricity"],
                realWorldApplications: ["Satellite Dishes: Parabolic shape focuses signals.", "Astronomy: Planetary orbits are elliptical.", "Cooling Towers: Hyperbolic shape for structural stability."]
            }
        },
        {
            id: 'm5', title: 'Vectors', description: 'Cross and Dot products.', difficulty: 'Medium', duration: '30 min', category: 'Algebra',
            content: { 
                aim: "Vector operations.", requirements: ["3D space"], theory: "A.B = |A||B|cos0", procedure: ["Define vectors", "Compute"], objectives: ["Spatial understanding"],
                realWorldApplications: ["3D Graphics: Rendering lighting and reflections.", "Air Traffic Control: Calculating flight paths and wind drift.", "Physics engines: Collision detection in video games."]
            }
        }
    ]
  },
  {
    id: 'cs',
    name: SubjectType.CS,
    icon: Monitor,
    color: 'purple',
    hex: '#a855f7',
    description: 'Understand logic gates, algorithms, and number systems.',
    labs: [
        {
            id: 'cs1', title: 'Logic Gates', description: 'AND, OR, NOT, XOR gates.', difficulty: 'Easy', duration: '20 min', category: 'Digital Logic',
            content: { 
                aim: "Verify truth tables.", requirements: ["Gates"], theory: "Boolean algebra.", procedure: ["Connect inputs", "Check output"], objectives: ["Digital circuits"],
                realWorldApplications: ["Computer Processors: Arithmetic Logic Units (ALU) are made of gates.", "Burglar Alarms: Use sensors and logic gates to trigger sirens.", "Traffic Lights: Control systems."],
                observationTable: { columns: ["Input A", "Input B", "Output Y"] }
            }
        },
        {
            id: 'cs2', title: 'Bubble Sort', description: 'Sorting algorithm visualization.', difficulty: 'Medium', duration: '30 min', category: 'Algorithms',
            content: { 
                aim: "Visualize sorting.", requirements: ["Array"], theory: "O(n^2) complexity.", procedure: ["Step through swaps"], objectives: ["Algorithm analysis"],
                realWorldApplications: ["E-commerce: Sorting products by price.", "Leaderboards: Ranking players in games.", "Contact Lists: Organizing names alphabetically."]
            }
        },
        {
            id: 'cs3', title: 'Insertion Sort', description: 'Sorting algorithm.', difficulty: 'Medium', duration: '30 min', category: 'Algorithms',
            content: { 
                aim: "Visualize insertion sort.", requirements: ["Array"], theory: "O(n^2).", procedure: ["Pick element", "Insert"], objectives: ["Sorting"],
                realWorldApplications: ["Card Games: Arranging cards in your hand.", "Live Data: Efficiently sorting data as it arrives.", "Computer Graphics: Z-buffering."]
            }
        },
        {
            id: 'cs4', title: 'Stack Operations', description: 'Push and Pop visualization.', difficulty: 'Easy', duration: '20 min', category: 'Data Structures',
            content: { 
                aim: "LIFO principle.", requirements: ["Stack"], theory: "Last In First Out.", procedure: ["Push items", "Pop items"], objectives: ["Memory structure"],
                realWorldApplications: ["Undo/Redo: Text editors use stacks to reverse actions.", "Browser History: The 'Back' button works on a stack.", "Function Calls: Managing recursion in programming."]
            }
        },
        {
            id: 'cs5', title: 'Number Systems', description: 'Binary to Decimal conversion.', difficulty: 'Easy', duration: '15 min', category: 'Basics',
            content: { 
                aim: "Convert bases.", requirements: ["Number"], theory: "Base 2 vs Base 10.", procedure: ["Enter binary", "See decimal"], objectives: ["Data representation"],
                realWorldApplications: ["Digital Electronics: Computers store data as 0s and 1s.", "IP Addresses: Subnet masks are calculated in binary.", "Data Encryption: Security keys utilize binary logic."],
                observationTable: { columns: ["Binary", "Decimal"] }
            }
        }
    ]
  }
];
