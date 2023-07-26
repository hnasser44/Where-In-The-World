/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ArrowBack from "../images/arrow-left.svg";

const Details = () => {
  const { name } = useParams();
  const [country, setCountry] = useState({});
  const [borderCountryNames, setBorderCountryNames] = useState([]);
  const [loadingBorderNames, setLoadingBorderNames] = useState(true);
  const BASE_URL = "https://restcountries.com/v3.1";

  const fetchCountry = async () => {
    console.log("fetching country for " + name);
    const response = await axios.get(`${BASE_URL}/name/${name}`);
    const data = response.data;
    setCountry(data[0]);
  };

  const getNativeName = () => {
    const nativeName = country.name.nativeName;
    const nativeNameObject = Object.values(nativeName)[0];
    return nativeNameObject.common;
  };

  const formatPopulation = (population) => {
    return " " + population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getCurrencies = () => {
    const currencies = country.currencies;
    const currenciesArray = Object.values(currencies);
    const currenciesNames = currenciesArray.map((currency) => currency.name);
    return " " + currenciesNames.join(", ");
  };

  const getLanguages = () => {
    const languages = country.languages;
    const languagesArray = Object.values(languages);
    return " " + languagesArray.join(", ");
  };

  const getCountryNameByCode = async (code) => {
    const response = await axios.get(`${BASE_URL}/alpha/${code}`);
    const data = response.data[0];
    return data.name.common;
  };

  const RedirectToCountryPage = (countryName) => {
    return () => {
      window.location.href = `/country/${countryName}`;
    };
  };

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  useEffect(() => {
    if (country.name) getNativeName();
  }, [country]);

  useEffect(() => {
    // Fetch border country names and update the state
    const fetchBorderCountries = async () => {
      try {
        const borderNames = await Promise.all(
          country.borders.map((border) => getCountryNameByCode(border))
        );
        setBorderCountryNames(borderNames);
        setLoadingBorderNames(false);
      } catch (error) {
        console.error("Error fetching border country names:", error);
        setLoadingBorderNames(false);
      }
    };

    if (country.borders && country.borders.length > 0) {
      fetchBorderCountries();
    } else {
      setLoadingBorderNames(false);
    }
  }, [country]);

  return (
    <>
      {country.name && (
        <div className="p-6 mt-6">
          <div
            className="dark:bg-dark-blue bg-white shadow-2xl flex items-center gap-4 p-4 w-36 hover:cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
            onClick={handleGoBack}
          >
            <img
              src={ArrowBack}
              alt="Arrow Back"
              className="w-5 h-5 dark:invert"
            />
            <p className="font-semibold text-[17px] dark:text-white">Back</p>
          </div>
          <div className="mt-16 dark:text-white lg:flex lg:items-center lg:gap-10 xl:gap-20">
            <img
              src={country.flags.svg}
              alt=""
              className="md:w-[500px] xl:h-[400px] lg:self-stretch xl:basis-1/2"
            />
            <div>
              <h1 className="font-bold text-[28px] mt-10 mb-6 lg:mt-0">
                {country.name.common}
              </h1>

              <div className="lg:flex lg:items-stretch lg:justify-start lg:gap-20">
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-[17px]">
                    Native Name:
                    <span className="font-normal dark:text-dark-gray">
                      {" "}
                      {getNativeName()}
                    </span>
                  </p>
                  <p className="font-bold text-[17px]">
                    Population:
                    <span className="font-normal dark:text-dark-gray">
                      {formatPopulation(country.population)}
                    </span>
                  </p>
                  <p className="font-bold text-[17px]">
                    Region:
                    <span className="font-normal dark:text-dark-gray">
                      {" "}
                      {country.region}
                    </span>
                  </p>
                  <p className="font-bold text-[17px]">
                    Sub Region:
                    <span className="font-normal dark:text-dark-gray">
                      {" "}
                      {country.subregion}
                    </span>
                  </p>
                  <p className="font-bold text-[17px]">
                    Capital:
                    <span className="font-normal dark:text-dark-gray">
                      {" "}
                      {country.capital}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold text-[17px] mt-8">
                    Top Level Domain:
                    <span className="font-normal dark:text-dark-gray">
                      {" "}
                      {country.tld}
                    </span>
                  </p>
                  <p className="font-bold text-[17px]">
                    Currencies:
                    <span className="font-normal dark:text-dark-gray">
                      {getCurrencies()}
                    </span>
                  </p>
                  <p className="font-bold text-[17px]">
                    Languages:
                    <span className="font-normal dark:text-dark-gray">
                      {getLanguages()}
                    </span>
                  </p>
                </div>
              </div>

              <p className="font-bold text-[17px] mt-10">Border Countries:</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {borderCountryNames.map((border, index) => (
                  <div
                    key={index}
                    onClick={RedirectToCountryPage(border)}
                    className="dark:bg-dark-blue dark:text-white bg-white shadow-2xl flex items-center justify-center gap-4 p-2 w-36 lg:w-30 hover:cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
                  >
                    <p className="font-semibold text-[17px]">{border}</p>
                  </div>
                ))}
                {borderCountryNames.length === 0 && !loadingBorderNames && (
                  <p className="font-semibold text-[17px] dark:text-dark-gray">
                    N/A
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
