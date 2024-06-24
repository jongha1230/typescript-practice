import { useEffect, useState } from "react";
import { fetchData } from "../api/api";
import { Country } from "../types/Country";
import CountryCard from "./CountryCard";

function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchData();
      setCountries(data);
      setLoading(false);
    };

    getCountries();
  }, []);

  const toggleFavorite = (country: Country) => {
    setSelectedCountries((prevSelected) => {
      if (prevSelected.find((c) => c.cca2 === country.cca2)) {
        return prevSelected.filter((c) => c.cca2 !== country.cca2);
      } else {
        return [...prevSelected, country];
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const nonSelectedCountries = countries.filter(
    (country) => !selectedCountries.find((c) => c.cca2 === country.cca2)
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
              isSelected={true}
            />
          ))}
        </ul>
      )}

      <h1 className="font-semibold my-4 text-center text-[30px]">Countries</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {nonSelectedCountries.map((country) => (
          <CountryCard
            key={country.cca2}
            country={country}
            onClick={() => toggleFavorite(country)}
            isSelected={false}
          />
        ))}
      </ul>
    </div>
  );
}

export default CountryList;
