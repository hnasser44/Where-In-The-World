import CountryCard from "./CountryCard";
import { Link } from "react-router-dom";

const Countries = ({ currentCountries }) => {
  return (
    <>
      {currentCountries.map((country, index) => (
        <Link to={`/country/${country.name.common}`} key={index}>
          <CountryCard key={index} country={country} />
        </Link>
      ))}
    </>
  );
};

export default Countries;
