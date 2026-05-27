
// import project1 from "../assets/projects/1.jpg";
// import project2 from "../assets/projects/2.jpg";
import projectPlaceholder from "../assets/project-placeholder.png";
import { Store, CalendarCheck, Accessibility, School, Terminal, CircuitBoard, Laptop } from 'lucide-react'
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiKnexdotjs, SiPandas, SiPlatformio } from 'react-icons/si';
import { IoLogoJavascript } from "react-icons/io5";
import { GrMysql } from "react-icons/gr";
import { TbMathMaxMin } from "react-icons/tb";
import { PiFileCSharp, PiFileC, PiCircuitry } from "react-icons/pi";
import { FaMicrochip } from "react-icons/fa6";

export const PERSONAL_INFO = {
    name: "Kiran Thomlinson",
    title: "Software Engineer Student",
    email: "kiranthomlinson@icloud.com",
    phone: "(+61) 402 688 562",
    address: "Brisbane, Qld, Australia",
    resumeLink: "#",
    social: {
        github: "https://github.com/KezaBoi",
        // linkedin: "https://linkedin.com",
        // twitter: "https://twitter.com",
    },
};

export const HERO_CONTENT = {
    greeting: "Hi, I'm",
    name: PERSONAL_INFO.name,
    taglines: [
        "Software Engineer",
        "Full Stack Developer",
        "UI/UX Enthusiast",
    ],
    description: `A passionate software engineer with experience in building scalable web applications and designing intuitive user interfaces. Dedicated to writing clean, efficient code and solving complex problems through technology.`,
    stats: [
        { value: "2+", label: "Years Exp" },
        { value: "5+", label: "Projects" },
        { value: "100%", label: "Commitment" },
    ],
};

export const ABOUT_CONTENT = {
    title: "About Me",
    description: `I am a dedicated professional with a strong background in computer science and engineering. My journey in technology has been driven by curiosity and a desire to create impact. I specialize in modern web technologies and have a proven track record of delivering high-quality software solutions.`,
};

export const EXPERIENCE = [
    {
        year: "2023 - Present",
        role: "Senior Educator",
        company: "Payne Road State School OSHC",
        // description: "Leading development of scalable cloud-native applications and mentoring junior developers.",
        technologies: [],
        location: "The Gap, QLD",
        icon: School,
        type: "Casual",
    },
    {
        year: "2023 - 2025",
        role: "Disability Support",
        company: "Connect Coordination QLD",
        // description: "Leading development of scalable cloud-native applications and mentoring junior developers.",
        technologies: [],
        location: "Brisbane, QLD",
        icon: Accessibility,
        type: "Casual",
    },
    {
        year: "2023 - 2023",
        role: "Event Coordinator",
        company: "Connect Coordination QLD",
        // description: "Leading development of scalable cloud-native applications and mentoring junior developers.",
        technologies: [],
        location: "Brisbane, QLD",
        icon: CalendarCheck,
        type: "Casual",
    },
    {
        year: "2022 - 2024",
        role: "Department Supervisor",
        company: "Harris Farm Markets",
        // description: "Leading development of scalable cloud-native applications and mentoring junior developers.",
        technologies: [],
        location: "West End, QLD",
        icon: Store,
        type: "Casual",
    },
    {
        year: "2021 - 2022",
        role: "Store Attendant",
        company: "Harris Farm Markets",
        // description: "Built and deployed core product features from scratch using modern web technologies.",
        technologies: [],
        location: "West End, QLD",
        icon: Store,
        type: "Casual",
    },
];

export const PROJECTS = [
    {
        title: "Rental Search App",
        image: projectPlaceholder,
        description: "A fullstack web application that allows users to search and filter rental properties across Australia. Users can also create accounts and rate properties, with persistent data utilising MySQL. Awarded 90% for front end development, backend development being marked.",
        technologies: ["React", "Vite", "Knex"],
        link: "https://rentalapp-portfolio.onrender.com",
        type: "Fullstack",
        icon: Laptop,
        color: "#3b82f6"
    },
    {
        title: "ATtiny1626 Simon Says",
        image: projectPlaceholder,
        description: "An embedded systems project featuring a hardware-based memory game built using the ATtiny1626 microcontroller. Demonstrates microchip programming, low-level electronics integration, and real-time state management. Awarded 94%.",
        technologies: ["C", "ATtiny1626", "PlatformIO"],
        link: "https://attiny1626-simon-says.vercel.app/",
        type: "Embedded System",
        icon: CircuitBoard,
        color: "#6366f1"
    },
    {
        title: "CLI Airport Manager",
        image: projectPlaceholder,
        description: "A simple console application, allowing for the managment of flight creations and bookings by various user types. Implemented using object oriented programming. Awarded 99%.",
        technologies: ["C#", "OOP"],
        link: "https://airport-app-one.vercel.app/",
        type: "Console Application",
        icon: Terminal,
        color: "#f59e0b"
    },
];

export const EDUCATION = [
    {
        year: "2025 - Present",
        degree: "Bachelor of Engineering - Computer and Software Systems",
        institution: "Queensland University of Technology",
        description: "Executive Deans' Commendation for Academic Excellence (Semester 2 2025)",
        location: "Brisbane",
        modules: ["Microprocessors and Digital Systems", "Web Computing", "Cyber Security", "Signal Analysis"],
        grade: "GPA: 6.7/7.0",
    },
    {
        year: "2024 - 2025",
        degree: "Diploma in Engineering",
        institution: "Queensland University of Technology",
        description: "Completed after semester 1 2025",
        location: "Brisbane",
        modules: ["Foundations of Electrical Engineering", "Computing and Data for Engineers", "Engineering Mechanics"],
        grade: "GPA: 6.6/7.0",
    },
];

export const TECHNOLOGIES = [
    // Languages
    { icon: PiFileCSharp, label: "C#", color: "#512BD4", category: "Languages", level: 75 },
    { icon: IoLogoJavascript, label: "JavaScript", color: "#F7DF1D", category: "Languages", level: 70 },
    { icon: PiFileC, label: "C", color: "#004482", category: "Languages", level: 65 },
    { icon: TbMathMaxMin, label: "MATLAB", color: "#A9290C", category: "Languages", level: 50 },
    { icon: FaPython, label: "Python", color: "#3776AB", category: "Languages", level: 40 },
    { icon: GrMysql, label: "SQL", color: "#00758F", category: "Languages", level: 65 },
    
    
    // Web Development
    { icon: FaReact, label: "React", color: "#58C4DC", category: "Web Development", level: 80 },
    { icon: FaNodeJs, label: "Node.js", color: "#417E38", category: "Web Development", level: 75 },
    { icon: SiKnexdotjs, label: "Knex.js", color: "#E16426", category: "Web Development", level: 70 },
    
    
    // Embedded Systems
    { icon: FaMicrochip, label: "AVR Architecture", color: "#ED1B2D", category: "Embedded Systems", level: 55},
    { icon: PiCircuitry, label: "Hardware Peripherals", color: "#658c48", category: "Embedded Systems", level: 50},
    { icon: SiPlatformio, label: "PlatformIO", color: "#FF7F00", category: "Embedded Systems", level: 45},
];

export const SERVICES = [
    {
        title: "Web Application Development",
        description: "Building scalable, responsive web applications using modern frameworks.\n- Full Stack Solutions\n- Progressive Web Apps\n- API Development",
        category: "Development",
        icon: "Globe",
        color: "#3b82f6"
    },
    {
        title: "Data Analytics & Validation",
        description: "Transforming raw data into actionable insights.\n- Business Intelligence Dashboards\n- Data Visualization\n- Automated Reporting",
        category: "Analytics",
        icon: "LineChart",
        color: "#8b5cf6"
    },
    {
        title: "AI & Machine Learning",
        description: "Integrating intelligent solutions into business processes.\n- Predictive Modeling\n- Natural Language Processing\n- Recommendation Systems",
        category: "AI/ML",
        icon: "BrainCircuit",
        color: "#10b981"
    },
    {
        title: "Cloud Infrastructure",
        description: "Designing secure and scalable cloud environments.\n- Architecture Design\n- CI/CD Pipelines\n- Serverless Computing",
        category: "Engineering",
        icon: "Database",
        color: "#f59e0b"
    },
    {
        title: "UI/UX Design",
        description: "Creating intuitive and engaging user experiences.\n- User Interface Design\n- Prototyping & Wireframing\n- User Research",
        category: "Design",
        icon: "Presentation",
        color: "#ec4899"
    },
    {
        title: "Technical Consulting",
        description: "Expert advice on technology strategy and implementation.\n- System Architecture Reviews\n- Technology Stack Selection\n- Agile Methodologies",
        category: "Consulting",
        icon: "TrendingUp",
        color: "#06b6d4"
    }
];

export const ARTICLES = [
    {
        title: "The Future of Web Development",
        publication: "Tech Insight",
        date: "2024",
        description: "Exploring emerging trends in frontend architecture.",
        link: "https://medium.com",
        tags: ["Web", "Technology"],
    },
];

export const CONTACT_MESSAGE = {
    title: "Get in Touch",
    message: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
    email: PERSONAL_INFO.email,
};
