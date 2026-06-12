export const emptyProject = {
  title: "",
  subtitle: "",
  description: "",
  technologies: "",
  highlights: "",
  github: "",
  liveDemo: "",
  featured: false,
};

export const toPayload = (project) => ({
  ...project,
  technologies: project.technologies.split(",").map((item) => item.trim()).filter(Boolean),
  highlights: project.highlights.split("\n").map((item) => item.trim()).filter(Boolean),
});
