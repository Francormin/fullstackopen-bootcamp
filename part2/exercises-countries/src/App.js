import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Filter } from "./components/Filter";
import { Countries } from "./components/Countries";
import { CountryInfo } from "./components/CountryInfo";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [countryInfo, setCountryInfo] = useState({});

  const handleChangeFilter = event => {
    setCountryInfo({});
    setFilter(event.target.value);
  };

  const toggleCountryInfo = country => {
    setCountryInfo(country);
  };

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${filter}`)
      .then(response => {
        const sortedCountriesByName = response.data.sort((a, b) => (b.name.common < a.name.common ? 1 : -1));
        setCountries(sortedCountriesByName);
      })
      .catch(error => setCountries([]));
  }, [filter]);

  return (
    <>
      <Filter filterHandler={handleChangeFilter} filter={filter} />

      <Countries countries={countries} toggle={toggleCountryInfo} />

      {Object.keys(countryInfo).length > 0 && <CountryInfo country={countryInfo} />}
    </>
  );
};

export default App;
