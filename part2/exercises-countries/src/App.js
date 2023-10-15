import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Filter } from "./components/Filter";
import { Countries } from "./components/Countries";
import { CountryInfo } from "./components/CountryInfo";

/**
 * Renders the main application component.
 * Fetches and displays a list of countries based on a filter.
 * Allows the user to view detailed information about a specific country.
 */
const App = () => {
  // Initialize state variables
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [countryInfo, setCountryInfo] = useState({});

  // Handle filter change
  const handleChangeFilter = event => {
    setCountryInfo({});
    setFilter(event.target.value);
  };

  // Toggle country info
  const toggleCountryInfo = country => {
    setCountryInfo(country);
  };

  // Fetch countries data based on filter
  useEffect(() => {
    const fetchCountries = async filter => {
      try {
        // Make API request to fetch countries based on the provided filter
        const response = await axios.get(`https://restcountries.com/v3.1/name/${filter}`);

        // Sort the countries by name in descending order
        const sortedCountriesByName = response.data.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));

        // Set the state with the sorted countries
        setCountries(sortedCountriesByName);
      } catch (error) {
        // If an error occurs, set the state with an empty array
        setCountries([]);
      }
    };

    if (filter.length) fetchCountries(filter);
  }, [filter]);

  return (
    <>
      {/* Render filter component */}
      <Filter filterHandler={handleChangeFilter} filter={filter} />

      {/* Render countries component */}
      <Countries countries={countries} toggle={toggleCountryInfo} filter={filter} />

      {/* Render country info component if country info exists */}
      {Object.keys(countryInfo).length > 0 && <CountryInfo country={countryInfo} />}
    </>
  );
};

export default App;
