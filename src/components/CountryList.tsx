import { useEffect, useState } from "react";
import { fetchData } from "../api/api";
import { Country } from "../types/Country";
import CountryCard from "./CountryCard";

function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchData();
      const initializedData = data.map((country: Country) => ({
        ...country,
        isSelected: false,
      }));
      setCountries(initializedData);
      setLoading(false);
    };

    getCountries();
  }, []);

  const toggleFavorite = (selectedCountry: Country) => {
    setCountries((prevCountries) =>
      prevCountries.map((country) =>
        country.cca2 === selectedCountry.cca2
          ? { ...country, isSelected: !country.isSelected }
          : country
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const selectedCountries = countries.filter((country) => country.isSelected);
  const nonSelectedCountries = countries.filter(
    (country) => !country.isSelected
  );

  return (
    <div className="m-8">
      <h1 className="font-semibold text-center text-[30px] my-4 mt-16">
        Favorite Countries
      </h1>
      {selectedCountries.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {selectedCountries.map((country) => (
            <CountryCard
              key={country.cca2}
              country={country}
              onClick={() => toggleFavorite(country)}
            />
          ))}
        </ul>
      )}

      <h1 className="font-semibold my-4 text-center text-[30px]">Countries</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 bg-">
        {nonSelectedCountries.map((country) => (
          <CountryCard
            key={country.cca2}
            country={country}
            onClick={() => toggleFavorite(country)}
          />
        ))}
      </ul>
    </div>
  );
}

export default CountryList;
