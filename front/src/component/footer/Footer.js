import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faPoll } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container">
      <div>
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
          <p>Home</p>
        </Link>
      </div>
      <div>
        <Link to="/create">
          <FontAwesomeIcon icon={faPlus} />
          <p>New Project</p>
        </Link>
      </div>
      <div>
        <Link to="/report">
          <FontAwesomeIcon icon={faPoll} />
          <p>Report</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
