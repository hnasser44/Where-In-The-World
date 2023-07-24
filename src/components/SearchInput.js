import SearchIcon from "../images/search.svg";

const SearchInput = ({ filterCountriesByName }) => {
  return (
    <div className="mt-6 p-6 flex items-center justify-center relative lg:basis-1/2 xl:basis-1/3">
      <img
        src={SearchIcon}
        alt=""
        className="absolute left-16 w-6 h-6 dark:filter-white"
      />
      <input
        type="text"
        placeholder="Search for a country..."
        className="bg-white dark:bg-dark-blue dark:text-white dark:placeholder-white shadow-xl rounded-md p-4 w-full pl-24 focus:outline-none"
        onChange={(e) => filterCountriesByName(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
