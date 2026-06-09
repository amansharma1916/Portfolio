import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Experience.css";

const Experience = ({ experiences }) => {
    const [activeExperience, setActiveExperience] = useState(null);

    const [isMobile, setIsMobile] = useState(
        window.innerWidth <= 768
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () =>
            window.removeEventListener(
                "resize",
                handleResize
            );
    }, []);


    const handleToggle = (id) => {
        setActiveExperience((prev) =>
            prev === id ? null : id
        );
    };

    return (
        <section className="experience section">
            <div className="container">
                <div className="experience__header">
                    <h2 className="experience__title">
                        Experience
                    </h2>

                    <p className="experience__subtitle">
                        Building products, solving real-world
                        problems, and growing through professional
                        experiences.
                    </p>
                </div>

                <div className="experience__list">
                    {experiences.map((experience) => (
                        <div
                            key={experience.displayOrder}
                            className={`experience__item ${activeExperience === experience.displayOrder
                                    ? "active"
                                    : ""
                                }`}
                            onMouseEnter={() => {
                                if (!isMobile) {
                                    setActiveExperience(
                                        experience.displayOrder
                                    );
                                }
                            }}
                            onClick={() => {
                                if (isMobile) {
                                    handleToggle(experience.displayOrder);
                                }
                            }}
                        >
                            <div className="experience__summary">
                                <div className="experience__duration">
                                    {experience.startDate} -{" "}
                                    {experience.endDate}
                                </div>

                                <div className="experience__divider"></div>

                                <motion.div
                                    className="experience__company"
                                    animate={{
                                        x:
                                            activeExperience ===
                                                experience.displayOrder
                                                ? -10
                                                : 0,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                    }}
                                >
                                    {experience.company}
                                </motion.div>
                            </div>

                            <AnimatePresence>
                                {activeExperience ===
                                    experience.displayOrder && (
                                        <motion.div
                                            className="experience__details"
                                            initial={{
                                                height: 0,
                                                opacity: 0,
                                                y: -15,
                                            }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                height: 0,
                                                opacity: 0,
                                                y: -15,
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <h3 className="experience__role">
                                                {experience.role}
                                            </h3>

                                            <p className="experience__description">
                                                {
                                                    experience.description
                                                }
                                            </p>

                                            <ul className="experience__achievements">
                                                {experience.achievements.map(
                                                    (
                                                        achievement,
                                                        index
                                                    ) => (
                                                        <motion.li
                                                            key={index}
                                                            initial={{
                                                                opacity: 0,
                                                                x: -20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    index * 0.08,
                                                            }}
                                                        >
                                                            {achievement}
                                                        </motion.li>
                                                    )
                                                )}
                                            </ul>

                                            <div className="experience__technologies">
                                                {experience.technologies.map(
                                                    (
                                                        tech,
                                                        index
                                                    ) => (
                                                        <motion.span
                                                            key={index}
                                                            className="experience__tech"
                                                            initial={{
                                                                opacity: 0,
                                                                scale: 0.8,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                scale: 1,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    index * 0.05,
                                                            }}
                                                        >
                                                            {tech}
                                                        </motion.span>
                                                    )
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;