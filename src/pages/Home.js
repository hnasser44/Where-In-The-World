import { useEffect, useState } from "react";
import axios from "axios";
import SearchInput from "../components/SearchInput";
import FilterRegion from "../components/FilterRegion";
import CountryCard from "../components/CountryCard";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Countries from "../components/Countries";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredCountries, setfilteredCountries] = useState([]);
  const [currentRegion, setCurrentRegion] = useState("All Regions");
  const BASE_URL = "https://restcountries.com/v3.1";

  const fetchCountries = async () => {
    setfilteredCountries([]);
    const response = await axios.get(`${BASE_URL}/all`);
    const data = response.data;
    setCountries(data);
  };

  const fetchCountriesByRegion = async (region) => {
    setIsLoading(true);
    toast.success(`Showing ${region} countries...`, {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
    });
    const response = await axios.get(`${BASE_URL}/region/${region}`);
    const data = response.data;
    setCountries(data);
    setIsLoading(false);
  };

  const filterCountriesByName = async (name) => {
    setIsFiltering(name !== "");
    if (name === "") return;
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(name.toLowerCase())
    );
    if (filteredCountries.length === 0) {
      toast.error(`No countries found with name ${name} in ${currentRegion}`, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
      });
    }
    setfilteredCountries(filteredCountries);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center gap-3 lg:flex-row lg:justify-between lg:items-end">
        <SearchInput filterCountriesByName={filterCountriesByName} />
        <FilterRegion
          fetchCountriesByRegion={fetchCountriesByRegion}
          setCurrentRegion={setCurrentRegion}
        />
      </div>
      <div
        className={`p-6 flex flex-col gap-10 md:grid md:gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 countries-container ${
          !isLoading && "loaded"
        }`}
      >
        <Countries
          currentCountries={isFiltering ? filteredCountries : countries}
        />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Home;
