const CountryCard = ({ country }) => {
  const formatPopulation = (population) => {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="dark:bg-dark-blue rounded-md shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer">
      <img
        src={country.flags.svg}
        alt=""
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="p-7 text-lg pb-12">
        <h1 className="font-bold mb-5 mt-2 text-2xl dark:text-white">
          {country.name.common}
        </h1>
        <h2 className="dark:text-dark-gray">
          <span className="font-semibold dark:text-white">Population</span>:{" "}
          {formatPopulation(country.population)}
        </h2>
        <h2 className="dark:text-dark-gray">
          <span className="font-semibold dark:text-white">Region</span>:{" "}
          {country.region}
        </h2>
        <h2 className="dark:text-dark-gray">
          <span className="font-semibold dark:text-white">Capital</span>:{" "}
          {country.capital}
        </h2>
      </div>
    </div>
  );
};

export default CountryCard;
