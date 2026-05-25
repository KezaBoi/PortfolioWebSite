
// import project1 from "../assets/projects/1.jpg";
// import project2 from "../assets/projects/2.jpg";
import projectPlaceholder from "../assets/project-placeholder.png";
import { Store, CalendarCheck, Accessibility, School } from 'lucide-react'

export const PERSONAL_INFO = {
    name: "Kiran Thomlinson",
    title: "Software Engineer Student",
    email: "kiranthomlinson@icloud.com",
    phone: "(+61) 433 607 555",
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
        description: "Leading development of scalable cloud-native applications and mentoring junior developers.",
        technologies: [],
        location: "The Gap, QLD",
        icon: School,
        type: "Casual",
    },
    {
        year: "2023 - 2025",
        role: "Disability Support",
        company: "Connect Coordination QLD",
        description: "Leading development of scalable cloud-native applications and mentoring junior developers.",
        technologies: [],
        location: "Brisbane, QLD",
        icon: Accessibility,
        type: "Casual",
    },
    {
        year: "2023 - 2023",
        role: "Event Coordinator",
        company: "Connect Coordination QLD",
        description: "Leading development of scalable cloud-native applications and mentoring junior developers.",
        technologies: [],
        location: "Brisbane, QLD",
        icon: CalendarCheck,
        type: "Casual",
    },
    {
        year: "2022 - 2024",
        role: "Department Supervisor",
        company: "Harris Farm Markets",
        description: "Leading development of scalable cloud-native applications and mentoring junior developers.",
        technologies: [],
        location: "West End, QLD",
        icon: Store,
        type: "Casual",
    },
    {
        year: "2021 - 2022",
        role: "Store Attendant",
        company: "Harris Farm Markets",
        description: "Built and deployed core product features from scratch using modern web technologies.",
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
        description: "A comprehensive solution for managing workflows and increasing productivity.",
        technologies: ["React", "Vite", "Knex"],
        link: "https://rentalapp-portfolio.onrender.com",
        type: "Web Application",
    },
    {
        title: "Project Beta",
        image: projectPlaceholder,
        description: "An innovative mobile application designed to improve personal health tracking.",
        technologies: ["Flutter", "Dart", "Firebase"],
        link: "https://github.com",
        type: "Mobile App",
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

export const TECHNOLOGIES = [
    // Frontend
    { icon: "react", label: "React", color: "#61DAFB", category: "Frontend", level: 40 },
    // { icon: "angular", label: "Angular", color: "#DD0031", category: "Frontend", level: 85 },
    // { icon: "streamlit", label: "Streamlit", color: "#FF4B4B", category: "Frontend", level: 95 },

    // Backend
    { icon: "nodejs", label: "Node.js", color: "#339933", category: "Backend", level: 40 },
    { icon: "python", label: "Python", color: "#3776AB", category: "Backend", level: 25 },
    // { icon: "fastapi", label: "FastAPI", color: "#009688", category: "Backend", level: 90 },

    // Data & AI
    // { icon: "tensorflow", label: "TensorFlow", color: "#FF6F00", category: "AI/ML", level: 85 },
    // { icon: "pytorch", label: "PyTorch", color: "#EE4C2C", category: "AI/ML", level: 88 },
    { icon: "pandas", label: "Pandas", color: "#150458", category: "Data", level: 25 },
    // { icon: "openai", label: "OpenAI", color: "#10A37F", category: "GenAI", level: 90 },

    // Cloud & DevOps
    // { icon: "aws", label: "AWS", color: "#FF9900", category: "Cloud", level: 85 },
    // { icon: "docker", label: "Docker", color: "#2496ED", category: "DevOps", level: 90 },
    // { icon: "kubernetes", label: "Kubernetes", color: "#326CE5", category: "DevOps", level: 80 },
    // { icon: "linux", label: "Linux", color: "#FCC624", category: "OS", level: 95 },
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
