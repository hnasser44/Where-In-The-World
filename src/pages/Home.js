import { useEffect, useState } from "react";
import axios from "axios";
import SearchInput from "../components/SearchInput";
import FilterRegion from "../components/FilterRegion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Countries from "../components/Countries";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchFiltering, setIsSearchFiltering] = useState(false);
  const [isRegionFiltering, setIsRegionFiltering] = useState(false);
  const [SearchfilteredCountries, setSearchfilteredCountries] = useState([]);
  const [RegionfilteredCountries, setRegionfilteredCountries] = useState([]);
  const [SearchText, setSearchText] = useState("");
  const [currentRegion, setCurrentRegion] = useState("All Regions");
  const BASE_URL = "https://restcountries.com/v3.1";

  const fetchCountries = async () => {
    const response = await axios.get(`${BASE_URL}/all`);
    const data = response.data;
    setCountries(data);
  };

  const CheckFiltering = () => {
    if (isSearchFiltering && isRegionFiltering) {
      const result = SearchfilteredCountries.filter((country) =>
        RegionfilteredCountries.includes(country)
      );
      return result;
    } else if (isSearchFiltering) {
      return SearchfilteredCountries;
    } else if (isRegionFiltering) {
      return RegionfilteredCountries;
    } else {
      return countries;
    }
  };

  const fetchCountriesByRegion = async (region) => {
    if (currentRegion === region) return;
    setIsLoading(true);
    setCurrentRegion(region);
    const result = countries.filter((country) => country.region === region);
    setRegionfilteredCountries(result);
    setIsRegionFiltering(true);
    const message = SearchText === "" ? "All" : "with name  " + SearchText;
    toast.success(`Showing ${region} countries ${message}`, {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
    });

    setIsLoading(false);
  };

  const filterCountriesBySearch = async (name) => {
    if (name === "") return;
    setSearchText(name);
    setIsLoading(true);
    const result = countries.filter((country) =>
      country.name.common.toLowerCase().includes(name.toLowerCase())
    );
    setSearchfilteredCountries(result);
    setIsSearchFiltering(true);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center gap-3 lg:flex-row lg:justify-between lg:items-end">
        <SearchInput filterCountriesByName={filterCountriesBySearch} />
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
        <Countries currentCountries={CheckFiltering()} />
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
