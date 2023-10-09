import { useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const CountryInfo = ({ country }) => {
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country?.name?.common}`)
      .then(response => console.log(response.data))
      .catch(error => console.error("axios weather:", error));
  }, [country?.name?.common]);

  return (
    <>
      <h2>
        {country?.name?.common}{" "}
        <small>
          <i>(official: {country?.name?.official})</i>
        </small>
      </h2>
      <p>Capital: {country?.capital[0]}</p>
      <p>Population: {country?.population}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country?.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country?.flags?.png} alt="country-flag" width="200" />
    </>
  );
};
