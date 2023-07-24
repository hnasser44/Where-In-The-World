import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moon from "../images/moon.svg";
import Sun from "../images/sun.svg";

const Header = () => {
  const getTheme = () => {
    const theme = localStorage.getItem("theme");
    return theme ? theme : "light";
  };

  const [theme, setTheme] = useState(getTheme());
  const [icon, setIcon] = useState(getTheme() === "light" ? Moon : Sun);
  const [text, setText] = useState(
    getTheme() === "light" ? "Dark Mode" : "Light Mode"
  );

  const AddDarkClass = () => {
    const html = document.querySelector("html");
    html.classList.add("dark");
  };

  const RemoveDarkClass = () => {
    const html = document.querySelector("html");
    html.classList.remove("dark");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Toggle icon and text based on the new theme
    if (newTheme === "dark") {
      setIcon(Sun);
      setText("Light Mode");
      AddDarkClass();
    } else {
      setIcon(Moon);
      setText("Dark Mode");
      RemoveDarkClass();
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      AddDarkClass();
    }
  }, [theme]);

  return (
    <header className="bg-white dark:bg-dark-blue shadow-xl flex items-end justify-between p-6 lg:p-10">
      <h1 className="font-bold dark:text-white">
        <Link to="/">Where in the world?</Link>
      </h1>
      <div
        className="flex items-center gap-4 hover:cursor-pointer"
        onClick={() => toggleTheme()}
      >
        <img src={icon} alt="Moon" className="w-5 h-5" />
        <p className="font-semibold text-[17px] dark:text-white">{text}</p>
      </div>
    </header>
  );
};

export default Header;
