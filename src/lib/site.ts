// Central site config: edit names, links, and nav items here.
export const site = {
  name: "Wesley Stevens",
  title: "Wesley Stevens — Portfolio",
  description: "Personal portfolio: projects, coursework, and resume.",
  tagline: "Electrical & Computer Engineer • University of Washington",
  email: "wesley@wesleystevens.com", // preferred / personal
  schoolEmail: "kdl446@uw.edu",
  phone: "(650) 922-4883",
  location: "Seattle, WA · San Bruno, CA", // shown in the footer
  github: "https://github.com/wesley-stevens",
  linkedin: "https://linkedin.com/in/wesley-stevens-bb7768317",
  resume: "/resume.pdf", // served from public/resume.pdf
  resumeFileName: "Wesley-Stevens-resume.pdf", // name used when visitors download it
  resumeUpdated: "September 2026", // bump when you replace resume.pdf
};

// Homepage "About me" section. Edit freely: in `body`, a blank line starts a new
// paragraph and line breaks inside a paragraph are ignored.
export const about = {
  status: "Open to Summer 2027 internships", // small tag at the top of the About card
  heading: "Engineering with purpose.",
  photo: "/about/me.jpg", // public/about/me.jpg (swap in any photo of you)
  body: `Welcome to my personal portfolio! This website serves as a platform to showcase
    all my personal and class projects, my experience, and more. 

    I’m an academic 3rd year Electrical & Computer Engineering student at the University of 
    Washington - Seattle. I’m particularly drawn to Embedded Systems, Control Systems, Power Systems, 
    and Sensing & Communication, and I plan to take classes in all of those fields during my remaining 
    time here at UW to expand my breadth of knowledge as much as possible. 

    I'm currently an undergraduate research assistant in UW's Information Processing Lab, where I help
    graduate students with AI-based multi-object tracking, as well as a student manager for the UW Softball
    team. Check out my FPGA Frogger game on the Projects page, or see what professional and technical 
    experience I've been building in the Experience tab. If you have any questions, I'd love to connect.`,
};

export type NavItem = { label: string; href: string };

// Add a page: create src/app/<slug>/page.tsx, then add it here.
export const navItems: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Coursework", href: "/coursework" },
  { label: "Resume", href: "/resume" },
];
