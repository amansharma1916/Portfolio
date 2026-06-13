import { useState } from "react";
import PortfolioForm from "./components/PortfolioForm";
import ExperienceForm from "./components/ExperienceForm";
import ProjectForm from "./components/ProjectForm";
import Contact from "./components/Contact";
import "./Dashboard.css";
const menuItems = [
  {
    id: "portfolio",
    label: "Portfolio",
    component: PortfolioForm,
  },
  {
    id: "experience",
    label: "Experience",
    component: ExperienceForm,
  },
  {
    id: "projects",
    label: "Projects",
    component: ProjectForm,
  },
  {
    id: "contact",
    label: "Contact",
    component: Contact,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(menuItems[0].id);

  const ActiveComponent =
    menuItems.find((item) => item.id === activeTab)?.component ||
    PortfolioForm;

  return (
  <div className="dashboard">
  <aside className="sidebar">
    <div className="sidebar-header">
      <h1>CMS - Admin</h1>
    </div>

    <nav className="sidebar-nav">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`sidebar-btn ${
            activeTab === item.id ? "active" : ""
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  </aside>

  <main className="content">
    <div className="content-wrapper">
      <ActiveComponent />
    </div>
  </main>
</div>
);
};

export default Dashboard;
