import React from 'react'
import { FaGithub , FaLinkedin} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

import './SideBar.css'
import { Link } from 'react-router-dom';

const SideBar = ({ sidebarData }) => {
  return (
    <div className="sidebar">
      <Link to={sidebarData.github } target="_blank" className="social-icon">
        <FaGithub />
      </Link>
      <Link to={sidebarData.linkedin } target="_blank" className="social-icon">
        <FaLinkedin />
      </Link>
      <Link to={sidebarData.leetcode } target="_blank" className="social-icon">
        <SiLeetcode />
      </Link>
      <div className="vertical-line"></div>
    </div>
  )
}

export default SideBar