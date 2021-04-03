import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="container">
      <FontAwesomeIcon icon={faStopwatch} /> Gig Traker
    </header>
  );
};

export default Header;
