export type Experience = {
  title: string; // role or organization, e.g. "Undergraduate Researcher"
  subtitle?: string; // e.g. the lab, team, or project
  location: string;
  dates: string; // e.g. "January 2026 – Present"
  // Logo shown next to the title: the file name (no extension) of an image in
  // public/logos/, e.g. "uw-logo" for public/logos/uw-logo.png. Hidden until the file exists.
  logo?: string;
  logoOnWhite?: boolean; // true = show the logo on a white tile (for dark logos)
  // What you do there. Write each bullet between backticks; you can break lines
  // anywhere inside a bullet (line breaks are ignored on the page).
  bullets?: string[];
  // Optional: link target on the Experience page, e.g. id "ipl-research" makes
  // /experience#ipl-research scroll to this entry.
  id?: string;
  // Optional: short blurb + tool tags for this role's card in the homepage Featured row.
  summary?: string;
  tags?: string[];
};

// The role featured on the homepage (its card links to /experience#<id>).
export const FEATURED_EXPERIENCE_ID = "ipl-research";

// ==========================================================================
// LEFT WINDOW: Clubs & Research Labs. Add or edit entries here.
// ==========================================================================
export const clubsAndResearch: Experience[] = [
  {
    title: "Undergraduate Researcher",
    subtitle: "UW Information Processing Lab",
    id: "ipl-research",
    summary: `Helping graduate students in UW's Information Processing Lab with AI-based
      multi-object tracking, from following marine animals in underwater video to the
      ODNI Video LINCS human re-identification challenge.`,
    tags: ["Python", "SAM2", "Grounding DINO"],
    logo: "ipl-logo",
    logoOnWhite: true,
    location: "Seattle, WA",
    dates: "January 2026 – Present",
    bullets: [
      `January – Present: Primarily assisting in the AI and Machine Learning-based Multi Object
        Tracking for Underwater Vision Project, using GitHub repos Grounding DINO and SAM2 to
        track marine animals across a collection of videos.`,
      `April – Present: Assisting graduate students with the Video LINCS program hosted by the
        Office of the Director of National Intelligence, a human detection, tracking &
        re-identification challenge across diverse video sensor collections.`,
      `Work consisting of running videos through the repos (in Python), visually analyzing
        them, and providing insight to graduate students on how to make our tracking models
        more efficient.`,
    ],
  },
  {
    title: "Engineers Without Borders: Local Projects",
    subtitle: "Electric Mobility Device Charging Station",
    logo: "ewb-logo",
    logoOnWhite: true,
    location: "Seattle, WA",
    dates: "September 2024 – Present",
    bullets: [
      `Committing 4 hours / week to improving knowledge of circuitry, interpreting KiCad
        schematics, and building a prototype charger for electric mobility devices.`,
      `Reinforced strong communication and team-building skills, working together with a team
        for long periods of time.`,
      `Constructed new PCBs via soldering through-hole and surface-mount devices.`,
    ],
  },
];

// ==========================================================================
// RIGHT WINDOW: Work Experience. Add what you do in each job's `bullets`.
// ==========================================================================
export const work: Experience[] = [
  {
    title: "Student Manager",
    subtitle: "UW Softball",
    logo: "uw-logo",
    location: "Seattle, WA",
    dates: "September 2026 – Present",
    bullets: [
      // `Describe what you do in this role.`,
      `Manage day-to-day operations for the UW softball team as a student manager.`,
      `Set up and tear down equipment for every practice and game, keeping things on schedule.`,
      `Track game stats for the coaching staff to use during and after games via the softwares
        Trackman, HitTrax, Dartfish, and game-film camera setup.`,
      `Coordinate with coaches and players on travel plans, practice times, and equipment needs.`,
      `Represent the program professionally at practices, games, and team events.`,
    ],
  },
  {
    title: "Restaurant Host",
    subtitle: "The Cheesecake Factory @ Bellevue Square",
    logo: "tcf-logo",
    location: "Bellevue, WA",
    dates: "June 2026 – September 2026",
    bullets: [
      // `Describe what you did in this role.`,
      `Greeted and seated guests during busy shifts, keeping wait times and table turnover on track.`,
      `Ran the waitlist and reservations, giving guests accurate wait times and keeping the flow steady.`,
      `Worked closely with servers and managers to keep seating and service running smoothly.`,
      `Handled guest questions and occasional complaints calmly, often as their first impression of the 
        restaurant.`,
      `Stayed level-headed and focused during rushes, juggling multiple moving parts at once.`,
    ],
  },
  {
    title: "Youth Baseball Coach",
    subtitle: "Coaching 6–12 year olds at a University of Washington Baseball Summer Camp",
    logo: "uw-logo",
    location: "Seattle, WA",
    dates: "July 2026 – August 2026",
    bullets: [
      // `Describe what you did in this role.`,
      `Coached youth baseball as part of a part-time summer camp role, running daily practices and 
        games for campers`,
      `Adapted drills on the fly for kids with a wide range of skill levels and ages within the same session.`,
      `Helped campers build teamwork and sportsmanship, striving to be a positive role model outside of school.`,
    ],
  },
  {
    title: "Intramurals Referee",
    subtitle: "Referee for Intramurals Flag Football at UW",
    logo: "uw-logo",
    location: "Seattle, WA",
    dates: "September 2025 – December 2025",
    bullets: [
      // `Describe what you did in this role.`,
      `Committed ~6 hours a week to reffing flag football intramural games at 
        the University of Washington.`,
      `Enhanced communication and conflict resolution skills, often discussing
         “calls” and plays with upset players.`,
      `Valuable in teaching me the necessary skills to effectively work 
        and synchronize with a team (the other refs).`,
    ],
  },
];

// The two windows on the Experience page, left to right.
export const experienceSections = [
  { title: "Clubs & Research Labs", entries: clubsAndResearch },
  { title: "Work Experience", entries: work },
];
