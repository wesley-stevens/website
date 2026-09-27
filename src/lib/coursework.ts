export type Course = {
  code: string;
  title: string;
  term: string;
  description: string;
  // Slug of a class project in src/lib/projects.ts; adds a "Final project" link.
  finalProject?: string;
};

// Add a class: append an entry below. Cards are numbered in this order.
export const courses: Course[] = [
  // Blank entry
  //{
  // code: "Class name",
  // title: "Class title",
  // term: "Term taken",
  // description: "Description of the class.",
  // finalProject: "slug-of-final-project", // optional
  //},
  {
    code: "PHYS 122",
    title: "Electromagnetism",
    term: "Autumn 2025",
    description:
      "Electric and magnetic fields, Gauss's law, Faraday's law, and Maxwell's equations"
       + " — the physical foundation underlying all of electrical engineering.",
  },
  {
    code: "MATH 207",
    title: "Differential Equations",
    term: "Autumn 2025",
    description:
      "Ordinary differential equations and Laplace transforms, with direct applications to"
       + " modeling dynamic circuits and physical systems.",
  },
  {
    code: "CSE 123",
    title: "Computer Programming III",
    term: "Autumn 2025",
    description:
      "Advanced data structures including trees, graphs, linked lists and hash structures,"
        + " with algorithm analysis and recursive problem-solving.",
  },
  {
    code: "E E 215",
    title: "Fundamentals of Electrical Engineering",
    term: "Winter 2026",
    description:
      "Basic circuit and systems concepts. Kirchhoff's laws. Resistors, sources, capacitors"
       + ", inductors, and op-amps. First and second order linear differential equations.",
  },
  {
    code: "MATH 208",
    title: "Matrix Algebra",
    term: "Winter 2026",
    description: 
      "Systems of linear equations, vector spaces, matrices, subspaces, orthogonality, eignvalues"
       + " & eigenvectors, all with engineering applications.",
  },
 {
    code: "E E 241",
    title: "Programming for Signal Processing",
    term: "Winter 2026",
    description: "Python programming for signal and information processing applications. "
     + "Basic data types, packages for data manipulation and visualizing handled in a variety of formats.",
  },
  {
    code: "E E 242",
    title: "Signals, Systems & Data",
    term: "Spring 2026",
    description: "Signal Processing: Continuous- and Discrete-time signals, systems, and transforms. "
     + "Fourier series and transforms. Linear, time-invariant filters.",
  },
  {
    code: "PHYS 123",
    title: "Waves, Light & Heat",
    term: "Spring 2026",
    description: "Oscillatory motion, electromagnetic waves, optics, waves in matter, fluids, "
      + "thermodynamics, and related experiments for engineering.",
  },
  {
    code: "E E 271",
    title: "Digital Circuits & Systems",
    term: "Spring 2026",
    description: "Overview of digital computer systems. Logic design, boolean algebra, "
      + "combinational & sequential circuits, finite state machines, and the design and operation of "
      + "digital computers, including ALU, memory, and I/O. Programming in Verilog.",
    finalProject: "frogger-game",
  },
  {
    code: "E E 233",
    title: "Circuit Theory",
    term: "Autumn 2026",
    description:
      "Analysis of circuits with sinusoidal signals. Phasors, system functions, complex "
       + "frequency, and frequency response. Power, energy, and two-port network theory.",
    finalProject: "ee-233-final-project",
  },
  {
    code: "E E 280",
    title: "Exploring Devices",
    term: "Autumn 2026",
    description: "Overview of modern electronic and photonic devices underlying products including smartphones,"
     + " traffic lights, and lasers. Introduction to modeling and principles of physics relevant to device analysis.",
  },
  {
    code: "E E 469",
    title: "Computer Architecture I",
    term: "Autumn 2026",
    description: "Assembly and machine language, microprocessor organization including control and datapath. "
     + "Computer arithmetic. Memory systems and caching. Performance modeling of microprocessors.",
    finalProject: "ee-469-final-project",
  },
];
