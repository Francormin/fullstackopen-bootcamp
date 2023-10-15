import { useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

/**
 * Fetches weather data for a given country and displays country information.
 * @param {Object} props - The props object containing the country data.
 * @param {Object} props.country - The country object.
 */
export const CountryInfo = ({ country }) => {
  /**
   * Fetches weather data for the country using the WeatherStack API.
   * Logs the response data to the console or logs the error if the request fails.
   */
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
