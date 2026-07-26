// Portfolio Data
export const personalInfo = {
  name: "Hiyan Jong Rai",
  nameNepali: "हियान जोङ राई",
  title: "Backend Developer",
  role: "Backend Developer",
  subtitle: "crafting scalable web applications with Spring Boot, MySQL & PostgreSQL. Currently pursuing BCA at Tribhuvan University.",
  description: "Backend Developer from Udayapur, Nepal — crafting scalable web applications with Spring Boot, MySQL & PostgreSQL. Currently pursuing BCA at Tribhuvan University.",
  location: "Kathmandu, Nepal",
  origin: "Udayapur, Bagaha",
  email: "raihenjong332@gmail.com",
  phone: "+977 976-500-6485",
  availability: "Open to work",
  resume: "/files/HiyanJongRaiCV.pdf",
  image: "/images/me.jpg",
  degree: "BCA (Ongoing)",
  experience: "2+ Years"
};

export const socialLinks = {
  github: "https://github.com/HiyanjongRai",
  linkedin: "https://www.linkedin.com/in/hiyanjongrai",
  pinterest: "https://www.pinterest.com/HiyanjongRai/",
  instagram: "https://www.instagram.com/tilung.hiyanjongrai/",
  facebook: "https://www.facebook.com/profile.php?id=61573473294780",
  dribbble: "https://dribbble.com/your-profile",
  behance: "https://www.behance.net/your-profile",
  blog: "https://hiyanjongblog.vercel.app/"
};

export const metrics = [
  { value: "2+", label: "Years Experience" },
  { value: "4", label: "Projects Completed" },
  { value: "10+", label: "Happy Clients" },
  { value: "5", label: "Awards" }
];

export const skills = [
  { name: "HTML / CSS", level: 80 },
  { name: "SQL (MySQL / Postgres)", level: 70 },
  { name: "Java / Spring Boot", level: 60 },
  { name: "JavaScript", level: 40 }
];

export const techStack = [
  { icon: "leaf", name: "Spring Boot" },
  { icon: "code", name: "HTML" },
  { icon: "code", name: "CSS" },
  { icon: "code", name: "JavaScript" },
  { icon: "code", name: "React" },
  { icon: "database", name: "PostgreSQL" },
  { icon: "database", name: "MySQL" }
];

export const expertise = [
  {
    icon: "server",
    title: "Backend Architecture",
    description: "Designing RESTful APIs, secure authentication systems, and scalable enterprise architecture using Java and Spring Boot.",
    color: "violet"
  },
  {
    icon: "database",
    title: "Database Management",
    description: "Managing relational databases (MySQL, PostgreSQL) — schema design, complex query optimization, and secure data handling.",
    color: "cyan"
  },
  {
    icon: "laptop",
    title: "Web Development",
    description: "Building responsive, high-performance web applications using modern methodologies from clean frontend to robust backend.",
    color: "violet"
  },
  {
    icon: "trending-up",
    title: "SEO Engine Optimization",
    description: "Improving website visibility through keyword strategy, detailed on-page optimization, and technical performance enhancements.",
    color: "cyan"
  },
  {
    icon: "palette",
    title: "UI / UX Implementation",
    description: "Translating designs into pixel-perfect, aesthetically pleasing user interfaces using customized HTML, CSS, and animations.",
    color: "violet"
  },
  {
    icon: "cloud-upload",
    title: "Cloud & Deployment",
    description: "Designing cost-effective deployment patterns and integrating web applications with secure cloud hosting platforms.",
    color: "cyan"
  }
];

export const timeline = [
  {
    year: "2024 • 3 Months",
    title: "Backend Developer Intern",
    organization: "KritimMind Technology",
    location: "Kathmandu, Nepal",
    type: "work",
    status: "Completed",
    badges: ["Completed"],
    description: "Gained robust hands-on experience in backend development. Engineered scalable web applications and developed comprehensive REST APIs integrating databases.",
    tags: ["Spring Boot", "Java", "MySQL", "Spring Security"],
    link: "https://www.kritimmind.com/developers"
  },
  {
    year: "2024",
    title: "SEO Executive (Remote)",
    organization: "Mirai Design & Print",
    location: "United States (Remote)",
    type: "work",
    status: "Completed",
    badges: ["Completed"],
    description: "Optimized digital presence for a U.S.-based same-day sign printing company, significantly improving organic search performance and content positioning.",
    tags: ["Keyword Research", "On-Page SEO", "Google Analytics", "Content Strategy"],
    link: "https://miraisigns.com/"
  },
  {
    year: "2079 – Present",
    title: "Bachelor's Degree (BCA)",
    organization: "Aadim National College",
    location: "Kathmandu, Nepal",
    type: "education",
    status: "Ongoing",
    badges: ["Ongoing"],
    description: "Pursuing Bachelor in Computer Applications. Balancing complex academic theory with hands-on skill improvement. Building real-world applications mapped against coursework.",
    tags: ["Databases", "Software Engineering", "Web Tech"]
  },
  {
    year: "2077 – 2079",
    title: "Higher Secondary Education (+2)",
    organization: "Triyuga Janta Multiple Campus",
    location: "Udayapur, Nepal",
    type: "education",
    status: "Completed",
    badges: ["GPA: 2.49"],
    description: "Balanced specialized academic track focusing heavily on computer science fundamentals paired with collaborative term projects.",
    tags: ["Computer Science", "English", "Accounting"]
  }
];

export const projects = [
  {
    title: "Jhapcham — eCommerce Platform",
    description: "Full-stack enterprise application featuring advanced cart mechanics, dynamic seller approval portal, and IBCF-based algorithmic recommendations.",
    image: "/images/p1.jpg",
    tags: ["Spring Boot", "PostgreSQL", "Java", "Spring Data JPA"],
    github: "https://github.com/HiyanjongRai",
    demo: null,
    icon: "shopping-cart"
  },
  {
    title: "Emergency Services System",
    description: "Real-time emergency request engine mapping in-need users to proximal service providers. Integrates rapid notification streams and geodata mapping.",
    image: null,
    tags: ["Spring Boot", "MySQL", "Spring Security", "JWT"],
    github: "https://github.com/HiyanjongRai",
    demo: null,
    icon: "ambulance"
  },
  {
    title: "Centralized Parcel Manager",
    description: "Detailed event and logistical parcel tracking ecosystem featuring complex multi-tier user role authentication and live workflow statuses.",
    image: null,
    tags: ["Java API", "SQL", "REST API", "Git"],
    github: "https://github.com/HiyanjongRai",
    demo: null,
    icon: "package"
  }
];

export const aboutFacts = [
  { label: "Origin", value: "Udayapur, Bagaha" },
  { label: "Degree", value: "BCA (Ongoing)" },
  { label: "Experience", value: "2+ Years" },
  { label: "Availability", value: "Open to work" }
];

export const aboutBio = [
  "Hi, I'm Hiyan Jong Rai, originally from Udayapur, Bagaha, and currently based in Kathmandu, where I am pursuing my BCA bachelor's degree at Tribhuvan University.",
  "I'm a developer who enjoys turning ideas into clean, working software. I previously worked remotely as an SEO Executive at Mirai Design & Print, DelhitoKathmandu, and HimalayanHub, and have completed my internship at KritimMind Technology as a Backend Developer.",
  "I've built e-commerce platforms, emergency-service apps, event managers, parcel systems, and task boards. I enjoy working across the stack — Spring Boot, PostgreSQL/MySQL, and HTML/CSS."
];

export const stats = [
  { num: "20+", label: "Projects Built" },
  { num: "2+", label: "Years of Experience" },
  { num: "3", label: "Jobs & Internships" }
];
