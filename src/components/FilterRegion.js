import { useState } from "react";
import ArrowDownIcon from "../images/arrow-down.svg";

const FilterRegion = ({ fetchCountriesByRegion, setCurrentRegion }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const Regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  const handleRegionChange = (region) => {
    fetchCountriesByRegion(region);
    setCurrentRegion(region);
    setIsDropdownOpen(false);
  };

  return (
    <div className="p-6 w-[350px]">
      <div
        className="bg-white dark:bg-dark-blue shadow-2xl p-4 flex items-center justify-between hover:cursor-pointer rounded-md"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <h2 className="font-semibold dark:text-white">Filter by Region</h2>
        <img
          src={ArrowDownIcon}
          alt=""
          className="w-5 h-5 arrowdown-icon dark:invert"
        />
      </div>
      <ul
        className={`bg-white dark:bg-dark-blue dark:text-white p-4 mt-2 rounded-md flex flex-col gap-2 shadow-xl font-semibold z-30 dropdown ${
          isDropdownOpen && "open"
        }`}
      >
        {Regions.map((region, index) => (
          <li key={index}>
            <button onClick={() => handleRegionChange(region)}>{region}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterRegion;
