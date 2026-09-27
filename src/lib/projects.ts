// Project tabs. Add a tab: append an entry here (its page is generated at
// /projects/<slug>), and optionally drop a photo at public/heroes/<slug>.jpg.
export const projectCategories = [
  {
    slug: "personal",
    title: "Personal Projects",
    description:
      "Things I've built on my own time out of curiosity and desire to explore ECE " +
      "specializations.",
  },
  {
    slug: "class",
    title: "Class Projects",
    description:
      "Final projects and labs from my ECE coursework that demonstrate profound knowledge of " +
      "concepts.",
  },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["slug"];

// A photo or video on a project page. Put files in public/project-media/<slug>/
// and reference them as "/project-media/<slug>/<file>". Videos can also be a
// YouTube link. Use .mp4 (H.264) for videos so they play in every browser.
export type MediaItem = {
  type: "image" | "video";
  src: string;
  label?: string; // short title shown above, e.g. "Win condition"
  caption?: string; // sentence shown below
};

// Content blocks for a project's detail page, shown top to bottom.
// - heading: a section title (e.g. "Overview").
// - text: write freely across lines; a blank line starts a new paragraph.
// - list: bullet points.
// - image / video: one item at text width.
// - gallery: items side by side (stacked on phones).
export type ProjectBlock =
  | { type: "heading"; text: string }
  | { type: "text"; text: string }
  | { type: "list"; items: string[] }
  | (MediaItem & { type: "image" | "video" })
  | { type: "gallery"; items: MediaItem[] };

export type Project = {
  slug: string;
  category: ProjectCategory;
  title: string;
  summary: string;
  tags: string[]; // key software/hardware, shown in the card's top-right corner
  year: string;
  course?: string; // e.g. "E E 233" for class projects
  details?: ProjectBlock[];
};

// Add a project: append an entry with the tab's slug as its category.
export const projects: Project[] = [
  // Blank Template for Personal Projects
  // {
  //   slug: "personal-project",
  //   category: "personal",
  //   title: "Project Title",
  //   summary:
  //     "A short description of the project, what problem it solves, and the approach you took.",
  //   tags: [],
  //   year: "2026",
  // },
  {
    slug: "personal-project",
    category: "personal",
    title: "Project Title",
    summary:
      "A short description of the project, what problem it solves, and the approach you took.",
    tags: [],
    year: "2026",
  },
  {
    slug: "frogger-game",
    category: "class",
    title: "Frogger on FPGA: A Verilog Game Engine (DE1-SoC)",
    summary:
      "A Verilog implementation of Frogger, rendered and played live on an LED matrix dev board.",
    tags: ["Verilog", "ModelSim"],
    year: "2026",
    course: "E E 271",
    details: [
      { type: "heading", text: "Overview" },
      {
        type: "text",
        text: `A recreation of the classic arcade game Frogger (similar to Crossy Road), written 
          in SystemVerilog and run
          on a DE1-SoC FPGA board with a 16×16 bi-color LED matrix: the player guides a green
          frog across lanes of moving red cars using the board's four push buttons. The design
          was built and compiled in Intel Quartus Prime and verified with ModelSim testbenches
          before running on hardware. Instead of running as software on a processor, all of the
          game logic (movement, car traffic, collision detection, and win/loss states) is
          implemented directly as digital hardware that updates in real time.`,
      },

      { type: "heading", text: "How It Works" },
      {
        type: "image",
        src: "/project-media/frogger-game/block-diagram.jpg",
        caption: `The four KEY buttons feed User Input modules that turn each press into a
          single move, while a Cars module shifts the red cars along on a ~3 Hz tick. The
          top-level Frogger state machine (play, win, lose) combines both into red and green
          pixel data for the LED matrix and a WIN/LOSE message on the HEX displays.`,
      },

      { type: "heading", text: "Implementation" },
      {
        type: "gallery",
        items: [
          {
            type: "image",
            src: "/project-media/frogger-game/quartus.png",
            label: "Quartus Prime",
            caption: `The SystemVerilog project in Intel Quartus Prime, fully compiled for the
              DE1-SoC with 0 errors and 0 warnings.`,
          },
          {
            type: "image",
            src: "/project-media/frogger-game/modelsim.png",
            label: "ModelSim",
            caption: `A ModelSim testbench waveform showing button presses (KEY) driving the
              frog's movement and the red/green pixel and HEX display outputs.`,
          },
        ],
      },

      { type: "heading", text: "Demo" },
      {
        type: "gallery",
        items: [
          {
            type: "video",
            src: "/project-media/frogger-game/board-win.mp4",
            label: "Win condition",
            caption: `The frog reaches the far side: the board fills green and the HEX
              displays show WIN.`,
          },
          {
            type: "video",
            src: "/project-media/frogger-game/board-lose.mp4",
            label: "Loss condition",
            caption: `A car hits the frog: the board fills red and the HEX displays show LOSE.`,
          },
        ],
      },

      { type: "heading", text: "Future Improvements" },
      {
        type: "list",
        items: [
          `One improvement that could be made would be to add levels of difficulty, where the speed
            of the cars increases depending on the position of the switches on the DE1-SoC board. A
            further improvement of this implementation would be to make the cars in different lanes move 
            at different speeds, which would make the game more challenging and less predictable. I
            unfortunately no longer have access to this board so I can't improve upon it, but if I had the
            time to improve upon this project, that is where I would start.`,
        ],
      },
    ],
  },
  {
    slug: "ee-233-final-project",
    category: "class",
    title: "Coming Soon",
    summary: "Final project coming soon.",
    tags: [],
    year: "2026",
    course: "E E 233",
    details: [{ type: "text", text: "Final project coming soon." }],
  },
  {
    slug: "ee-469-final-project",
    category: "class",
    title: "Coming Soon",
    summary: "Final project coming soon.",
    tags: [],
    year: "2026",
    course: "E E 469",
    details: [{ type: "text", text: "Final project coming soon." }],
  },
];

export const projectHref = (p: Project) => `/projects/${p.category}/${p.slug}`;
