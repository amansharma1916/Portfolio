import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getProjects } from "../../services/projects.service.js";
import "./Projects.css";

const seededNumber = (seed, offset) => {
    const numericSeed = String(seed)
        .split("")
        .reduce((total, character) => total + character.charCodeAt(0), 0);
    const value = Math.sin(numericSeed * 9283 + offset * 77) * 10000;
    return value - Math.floor(value);
};

const ProjectCard = ({ project, side }) => (
    <motion.article
        className={`project-card project-card--${side}`}
        initial={{ opacity: 0, scale: 0.92, x: side === "right" ? -12 : 12 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.2 }}
    >
        <span className="project-card__eyebrow">
            {project.featured ? "Featured project" : "Selected project"}
        </span>
        <h3>{project.title}</h3>
        <h4>{project.subtitle}</h4>
        <p>{project.description}</p>
        <div className="project-card__tags">
            {(project.technologies ?? []).map((technology) => (
                <span key={technology}>{technology}</span>
            ))}
        </div>
        <div className="project-card__links">
            <a href={project.github}>GitHub <span aria-hidden="true">↗</span></a>
            <a href={project.liveDemo}>Live demo <span aria-hidden="true">↗</span></a>
        </div>
    </motion.article>
);

const Projects = () => {
    const [projects, setProjects] = useState([{
        id: 1,
        title: "goTogether",
        subtitle: "Student Ride Sharing Platform",
        description:
            "A full-stack ride-sharing platform connecting students traveling on the same route to college through intelligent route matching and real-time ride booking.",
        technologies: ["React", "TypeScript", "Node.js", "MongoDB", "GeoJSON", "OAuth"],
        highlights: ["Route Matching", "Ride Booking", "Interactive Maps"],
        github: "#",
        liveDemo: "#",
        featured: true,
    }]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsData = await getProjects();
                console.log("Fetched projects:", projectsData);
                setProjects(Array.isArray(projectsData) ? projectsData : []);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    const [activeId, setActiveId] = useState(null);

    const nodes = useMemo(
        () => {
            const projectCount = projects.length;
            const columnCount = Math.min(4, Math.max(1, Math.ceil(Math.sqrt(projectCount))));
            const rowCount = Math.ceil(projectCount / columnCount);
            const horizontalSpread = projectCount <= 6 ? 54 : 82;
            const verticalSpread = projectCount <= 6 ? 42 : 72;
            const columnGap = columnCount > 1 ? horizontalSpread / (columnCount - 1) : 0;
            const rowGap = rowCount > 1 ? verticalSpread / (rowCount - 1) : 0;
            const startY = 50 - verticalSpread / 2;

            return projects.map((project, index) => {
                const column = index % columnCount;
                const row = Math.floor(index / columnCount);
                const itemsInRow = Math.min(columnCount, projectCount - row * columnCount);
                const rowWidth = (itemsInRow - 1) * columnGap;
                const rowStartX = 50 - rowWidth / 2;
                const jitter = projectCount <= 6 ? 3 : 5;

                return {
                    ...project,
                    x: rowStartX + column * columnGap + (seededNumber(project.id ?? project._id, 1) - 0.5) * jitter,
                    y: startY + row * rowGap + (seededNumber(project.id ?? project._id, 2) - 0.5) * jitter,
                    driftX: (seededNumber(project.id ?? project._id, 3) - 0.5) * (projectCount <= 6 ? 12 : 18),
                    driftY: (seededNumber(project.id ?? project._id, 4) - 0.5) * (projectCount <= 6 ? 12 : 18),
                    duration: 10 + seededNumber(project.id ?? project._id, 5) * 8,
                    delay: seededNumber(project.id ?? project._id, 6) * -10,
                };
            });
        },
        [projects],
    );

    const activeNode = nodes.find((node) => node.id === activeId);

    return (
        <section className="projects-section section" id="projects">
            <div className="projects-heading">
                <h2>Project <em>constellation.</em></h2>
                <p>Explore the field. Hover or focus a node to inspect the project.</p>
            </div>

            <div
                className={`project-field ${activeId ? "project-field--active" : ""}`}
                onMouseLeave={() => setActiveId(null)}
            >
                <div className="project-field__grid" aria-hidden="true" />

                {nodes.map((project) => {
                    const isActive = activeId === project.id;
                    const side = project.x > 56 ? "left" : "right";
                    const shiftDirection = activeNode
                        ? project.x < activeNode.x ? "left" : "right"
                        : "";

                    return (
                        <div
                            className={`project-node-position ${activeId && !isActive ? `project-node-position--shift-${shiftDirection}` : ""}`}
                            key={project._id ?? project.id}
                            style={{ left: `${project.x}%`, top: `${project.y}%` }}
                        >
                            <div
                                className={`project-node-drift ${isActive ? "is-active" : ""}`}
                                style={{
                                    "--drift-x": `${project.driftX}vw`,
                                    "--drift-y": `${project.driftY}vh`,
                                    "--duration": `${project.duration}s`,
                                    "--delay": `${project.delay}s`,
                                }}
                                onMouseEnter={() => setActiveId(project.id)}
                                onFocus={() => setActiveId(project.id)}
                                onBlur={(event) => {
                                    if (!event.currentTarget.contains(event.relatedTarget)) setActiveId(null);
                                }}
                            >
                                <button
                                    className={`project-node ${project.featured ? "project-node--featured" : ""}`}
                                    type="button"
                                    aria-expanded={isActive}
                                    aria-label={`View ${project.title} project details`}
                                >
                                    <span className="project-node__dot" />
                                    <span className="project-node__label">{project.title}</span>
                                    {project.featured && (
                                        <span className="project-node__featured-label">Featured</span>
                                    )}
                                </button>

                                <AnimatePresence>
                                    {isActive && (
                                        <div className="project-card-desktop">
                                            <ProjectCard project={project} side={side} />
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}

                <span className="project-field__hint">Move through the nodes</span>
            </div>

            <div className="project-card-mobile">
                {nodes.map((project) => {
                    const isActive = activeId === project.id;

                    return (
                        <article
                            className={`project-mobile-item ${isActive ? "is-active" : ""}`}
                            key={`mobile-${project._id ?? project.id}`}
                        >
                            <button
                                className="project-mobile-item__trigger"
                                type="button"
                                aria-expanded={isActive}
                                onClick={() => setActiveId(isActive ? null : project.id)}
                            >
                                <span className={`project-node__dot ${project.featured ? "project-node__dot--featured" : ""}`} />
                                <span>
                                    <strong>{project.title}</strong>
                                    <small>{project.subtitle}</small>
                                </span>
                                <span className="project-mobile-item__icon" aria-hidden="true">+</span>
                            </button>

                            <AnimatePresence initial={false}>
                                {isActive && (
                                    <motion.div
                                        className="project-mobile-item__details"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <p>{project.description}</p>
                                        <div className="project-card__tags">
                                            {(project.technologies ?? []).map((technology) => (
                                                <span key={technology}>{technology}</span>
                                            ))}
                                        </div>
                                        <div className="project-card__links">
                                            <a href={project.github}>GitHub <span aria-hidden="true">↗</span></a>
                                            <a href={project.liveDemo}>Live demo <span aria-hidden="true">↗</span></a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default Projects;
