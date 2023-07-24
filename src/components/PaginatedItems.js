import { useState } from "react";

const PaginatedItems = ({ CountriesPerPage, countries }) => {
  const [countryOffset, setCountryOffset] = useState(0);
  const endOffset = countryOffset + CountriesPerPage;
  const currentCountries = countries.slice(countryOffset, endOffset);
  const pageCount = Math.ceil(countries.length / CountriesPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * CountriesPerPage) % countries.length;
    setCountryOffset(newOffset);
  };
  return <div></div>;
};

export default PaginatedItems;
