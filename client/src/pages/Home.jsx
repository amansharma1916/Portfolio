import {useEffect, useState} from "react";
import Navbar from "../components/navbar/Navbar";
import LandingPage from "../components/landing/LandingPage";
import SideBar from "../components/landing/SideBar";
import Experience from "../components/experience/Experience";
import Projects from "../components/projects/Projects";
import Contact from "../components/contact/Contact";
import { getPortfolioData } from "../services/portfolio.service";
import { getExperiences, getExperienceById } from "../services/experience.service";


const Home = () => {
    const [portfolioData, setPortfolioData] = useState({
  "navbar": {
    "logoText": "AMAN"
  },
  "sidebar": {
    "github": "https://github.com/amansharma1916/",
    "linkedin": "https://www.linkedin.com/in/amansharma1916/",
    "leetcode": "https://leetcode.com/u/amansharma1916/"
  },
  "hero": {
    "introText": "Hi, my name is",
    "firstName": "AMAN",
    "lastName": "SHARMA.",
    "title": "Full Stack Developer & Computer Science Student",
    "description": "I build scalable web applications, AI-powered systems, geospatial platforms, and modern digital experiences using technologies that solve real-world problems.",
    "profileImage": "",
    "buttons": [
      {
        "label": "View Work",
        "link": "/projects"
      },
      {
        "label": "Resume",
        "link": "/resume"
      }
    ]
  }
});

    const [experiences, setExperiences] = useState([{
            displayOrder: 1,
            company: "Wyreflow Technologies",
            role: "Frontend Team Lead",
            startDate: "Apr 2026",
            endDate: "Jun 2026",
            description:
                "Led frontend development for client-facing applications and collaborated closely with backend teams to deliver scalable solutions.",

            achievements: [
                "Built reusable micro frontend components",
                "Integrated payment systems",
                "Implemented OAuth authentication",
                "Designed role-based access control",
                "Worked with CI/CD pipelines",
            ],

            technologies: [
                "React",
                "TypeScript",
                "Node.js",
                "Tailwind",
                "OAuth",
                "Amanzon S3",
            ],
        },

        {
            displayOrder: 2,
            company: "Bluestock Fintech",
            role: "Full Stack Developer Intern",
            startDate: "Jan 2025",
            endDate: "Apr 2025",
            description:
                "Worked on fintech applications, backend APIs, and frontend integrations.",

            achievements: [
                "Developed REST APIs",
                "Integrated frontend and backend systems",
                "Improved application performance",
            ],

            technologies: [
                "React",
                "Node.js",
                "MongoDB",
                "Express",
            ],
        },

        {
            displayOrder: 3,
            company: "Indux Technology",
            role: "Software Development Intern",
            startDate: "Jun 2024",
            endDate: "Aug 2024",
            description:
                "Contributed to client-facing projects and learned production development workflows.",

            achievements: [
                "Developed UI components",
                "Collaborated with senior developers",
                "Delivered client requirements",
            ],

            technologies: [
                "JavaScript",
                "React",
                "Express",
            ],
        }]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPortfolioData();
                console.log("Fetched portfolio data:", res.data);
                setPortfolioData(res.data);
            } catch (error) {
                console.error("Error fetching portfolio data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
      const fetchExperiences = async () => {
          try {
              const res = await getExperiences();
              console.log("Fetched experiences:", res.data);
              setExperiences(res.data);
          } catch (error) {
              console.error("Error fetching experiences:", error);
          }
      };

      fetchExperiences();
  }, []);

  return (
    <>
      <Navbar 
      navbarData={portfolioData.navbar}
      />
      <LandingPage 
      heroData={portfolioData.hero}
      />
      <SideBar 
      sidebarData={portfolioData.sidebar}
      />
      <Experience experiences={experiences} />
        <Projects />

        <Contact />
    </>
  );
};

export default Home;