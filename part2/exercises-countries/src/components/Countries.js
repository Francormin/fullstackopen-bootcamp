import { CountryInfo } from "./CountryInfo";

export const Countries = ({ countries, toggle }) =>
  countries.length === 0 ? (
    <p>No country found</p>
  ) : countries.length === 1 ? (
    <CountryInfo country={countries[0]} />
  ) : countries.length > 10 ? (
    <p>Too many matches. Please, specify another filter</p>
  ) : (
    countries.map(country => (
      <p key={country?.ccn3}>
        {country?.name?.common} <button onClick={() => toggle(country)}>Show</button>
      </p>
    ))
  );
