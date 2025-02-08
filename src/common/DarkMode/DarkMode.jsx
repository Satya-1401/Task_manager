import React from "react";
import { ReactSVG } from "react-svg";
import "./DarkMode.css";
import Sun from "./Sun.svg";
import Moon from "./Moon.svg";

const DarkMode = () => {
  const setDarkTheme = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };

  const setLightTheme = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };

  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked
      />

      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <ReactSVG src={Sun} />
        <ReactSVG src={Moon} />
      </label>
    </div>
  );
};

export default DarkMode;
