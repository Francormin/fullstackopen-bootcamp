import { CountryInfo } from "./CountryInfo";

/**
 * Render a list of countries based on the filter
 * @param {Array} countries - The array of countries
 * @param {function} toggle - The function to toggle country details
 * @param {string} filter - The filter string
 * @returns {JSX.Element} - The JSX element containing the list of countries
 */
export const Countries = ({ countries, toggle, filter }) => {
  // Check if filter is empty
  if (!filter.length) {
    return <p>Please, type something in order to find countries</p>;
  }

  // Check if filter has value and there are no countries found
  if (filter?.length && countries?.length === 0) {
    return <p>No country found</p>;
  }

  // Check if there is only one country found
  if (countries?.length === 1) {
    return <CountryInfo country={countries[0]} />;
  }

  // Check if there are too many matches
  if (countries?.length > 10) {
    return <p>Too many matches. Please, specify another filter</p>;
  }

  // Render the list of countries
  return countries.map(country => (
    <p key={country?.ccn3}>
      {country?.name?.common} <button onClick={() => toggle(country)}>Show</button>
    </p>
  ));
};
