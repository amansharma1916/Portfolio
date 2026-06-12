import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Projects.css";

const PROJECTS = [
    {
        id: 1,
        title: "goTogether",
        subtitle: "Student Ride Sharing Platform",
        description:
            "A full-stack ride-sharing platform connecting students traveling on the same route to college through intelligent route matching and real-time ride booking.",
        technologies: ["React", "TypeScript", "Node.js", "MongoDB", "GeoJSON", "OAuth"],
        highlights: ["Route Matching", "Ride Booking", "Interactive Maps"],
        github: "#",
        liveDemo: "#",
        position: "left",
    },
    {
        id: 2,
        title: "DocuSentinel",
        subtitle: "Multimodal Compliance Intelligence",
        description:
            "AI-powered document analysis platform capable of OCR, contract intelligence, semantic search, entity extraction, and compliance monitoring.",
        technologies: ["React", "FastAPI", "Node.js", "OCR", "NLP", "Vector Search"],
        highlights: ["Contract Analysis", "Semantic Search", "Compliance Monitoring"],
        github: "#",
        liveDemo: "#",
        position: "top",
    },
    {
        id: 3,
        title: "TaskIQ",
        subtitle: "Enterprise Productivity Platform",
        description:
            "A role-based productivity platform designed for organizations to manage projects, teams, tasks, updates, and employee workflows.",
        technologies: ["React", "Node.js", "MongoDB", "JWT", "RBAC"],
        highlights: ["Role Based Access", "Project Tracking", "Team Management"],
        github: "#",
        liveDemo: "#",
        position: "right",
    },
    {
        id: 4,
        title: "FRA Atlas DSS",
        subtitle: "Government Decision Support System",
        description:
            "A GIS-powered decision support platform for FRA claim management, dashboards, OCR integration, analytics, and geospatial visualization.",
        technologies: ["React", "Leaflet", "Node.js", "OCR", "GIS"],
        highlights: ["WebGIS", "Claim Management", "Analytics Dashboard"],
        github: "#",
        liveDemo: "#",
        position: "bottom",
    },
];

// Float keyframes per node — different offset + phase so they don't sync
const FLOAT_VARIANTS = {
    idle: (index) => ({
        y: [0, -7, 0],
        x: [0, index % 2 === 0 ? 4 : -4, 0],
        transition: {
            duration: 4 + index * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.6,
        },
    }),
    active: {
        y: 0,
        x: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const cardVariants = {
    initial: { opacity: 0, scale: 0.94, y: 16, filter: "blur(2px)" },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
        opacity: 0,
        scale: 0.96,
        y: 8,
        filter: "blur(2px)",
        transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
    },
};

const hubVariants = {
    initial: { opacity: 0, scale: 0.85, filter: "blur(2px)" },
    animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
        opacity: 0,
        scale: 0.85,
        filter: "blur(2px)",
        transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
    },
};

export default function Projects() {
    const [activeProject, setActiveProject] = useState(null);
    // Mobile: tapped project for accordion-style expand
    const [expandedMobile, setExpandedMobile] = useState(null);

    const handleWrapperLeave = useCallback(() => {
        setActiveProject(null);
    }, []);

    const handleNodeEnter = useCallback((project) => {
        setActiveProject(project);
    }, []);

    const getNodeClassName = (project) => {
        const base = `pn pn--${project.position}`;
        if (!activeProject) return base;
        if (activeProject.id === project.id) return `${base} pn--active`;
        return `${base} pn--side`;
    };

    const CURVES = {
        top: "M500,500 C500,420 500,340 500,200",
        left: "M500,500 C420,500 340,500 200,500",
        right: "M500,500 C580,500 660,500 800,500",
        bottom: "M500,500 C500,580 500,660 500,800",
    };

    return (
        <section className="ps" id="projects">
            {/* ── Header ── */}
            <div className="ps__header">
                <h2 className="ps__title">PROJECTS</h2>
                <p className="ps__subtitle">
                    Systems I've designed and developed — from real-time platforms to
                    AI-powered products and enterprise solutions.
                </p>
            </div>

            {/* ── Desktop network ── */}
            <div
                className="ps__network"
                onMouseLeave={handleWrapperLeave}
                aria-label="Project network — hover a node to explore"
            >
                {/* SVG connection lines */}
                <svg
                    className={`ps__lines${activeProject ? " ps__lines--focus" : ""}`}
                    viewBox="0 0 1000 1000"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    {PROJECTS.map((p) => {
                        const coords = {
                            top: { x2: 500, y2: 200 },
                            bottom: { x2: 500, y2: 800 },
                            left: { x2: 200, y2: 500 },
                            right: { x2: 800, y2: 500 },
                        }[p.position];
                        return (
                            <path
                                key={p.id}
                                className={`ps__line${activeProject?.id === p.id ? " ps__line--active" : ""}`}
                                d={CURVES[p.position]}
                            />
                        );
                    })}
                </svg>

                {/* Hub — fades out when a project is active */}
                <AnimatePresence mode="wait">
                    {!activeProject && (
                        <motion.div
                            key="hub"
                            className="ps__hub"
                            variants={hubVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <span className="ps__hub-label">Projects</span>
                            {/* <span className="ps__hub-count">{PROJECTS.length} systems built</span> */}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Project nodes */}
                {PROJECTS.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className={getNodeClassName(project)}
                        onMouseEnter={() => handleNodeEnter(project)}
                        // Float: stops cleanly when any project is active
                        variants={FLOAT_VARIANTS}
                        custom={index}
                        animate={activeProject ? "active" : "idle"}
                        // Don't re-run initial animation on every re-render
                        initial={false}
                    >
                        <div className="pn__dot" aria-hidden="true" />
                        <span className="pn__label">{project.title}</span>
                    </motion.div>
                ))}

                {/* Focus card — occupies same center slot as hub */}
                <AnimatePresence mode="wait">
                    {activeProject && (
                        <motion.div
                            key={activeProject.id}
                            className={`ps__card ps__card--${activeProject.position}`}
                            onMouseEnter={() => setActiveProject(activeProject)}
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            role="article"
                        >
                            <div className="ps__card-kicker">Project focus</div>
                            <div className="ps__card-head">
                                <h3 className="ps__card-title">{activeProject.title}</h3>
                                <p className="ps__card-sub">{activeProject.subtitle}</p>
                            </div>

                            <p className="ps__card-desc">{activeProject.description}</p>

                            <ul className="ps__card-tech" aria-label="Technologies">
                                {activeProject.technologies.map((t) => (
                                    <li key={t} className="ps__card-tech-item">
                                        {t}
                                    </li>
                                ))}
                            </ul>

                            <ul className="ps__card-highlights" aria-label="Key highlights">
                                {activeProject.highlights.map((h) => (
                                    <li key={h} className="ps__card-highlight">
                                        {h}
                                    </li>
                                ))}
                            </ul>

                            <div className="ps__card-actions">
                                <a
                                    href={activeProject.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="ps__card-btn"
                                >
                                    GitHub
                                </a>
                                <a
                                    href={activeProject.liveDemo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="ps__card-btn"
                                >
                                    Live Demo
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Mobile list (touch-friendly accordion) ── */}
            <div className="ps__mobile" aria-label="Projects list">
                {PROJECTS.map((project) => {
                    const isOpen = expandedMobile === project.id;
                    return (
                        <div key={project.id} className={`ps__mob-item${isOpen ? " ps__mob-item--open" : ""}`}>
                            <button
                                className="ps__mob-trigger"
                                onClick={() => setExpandedMobile(isOpen ? null : project.id)}
                                aria-expanded={isOpen}
                            >
                                <span className="ps__mob-dot" aria-hidden="true" />
                                <span className="ps__mob-name">{project.title}</span>
                                <span className="ps__mob-arrow" aria-hidden="true">
                                    {isOpen ? "−" : "+"}
                                </span>
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } }}
                                        exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
                                        className="ps__mob-body"
                                        style={{ overflow: "hidden" }}
                                    >
                                        <div className="ps__mob-inner">
                                            <p className="ps__mob-sub">{project.subtitle}</p>
                                            <p className="ps__mob-desc">{project.description}</p>

                                            <ul className="ps__card-tech" aria-label="Technologies">
                                                {project.technologies.map((t) => (
                                                    <li key={t} className="ps__card-tech-item">{t}</li>
                                                ))}
                                            </ul>

                                            <ul className="ps__card-highlights" aria-label="Key highlights">
                                                {project.highlights.map((h) => (
                                                    <li key={h} className="ps__card-highlight">{h}</li>
                                                ))}
                                            </ul>

                                            <div className="ps__card-actions">
                                                <a href={project.github} target="_blank" rel="noreferrer" className="ps__card-btn">
                                                    GitHub
                                                </a>
                                                <a href={project.liveDemo} target="_blank" rel="noreferrer" className="ps__card-btn">
                                                    Live Demo
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
