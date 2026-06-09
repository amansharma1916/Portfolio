import {useEffect, useState} from "react";
import Navbar from "../components/navbar/Navbar";
import LandingPage from "../components/landing/LandingPage";
import SideBar from "../components/landing/SideBar";
import { getPortfolioData } from "../services/portfolio.service";


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
    </>
  );
};

export default Home;