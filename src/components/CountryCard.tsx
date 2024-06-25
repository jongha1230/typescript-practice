import { Country } from "../types/Country";

interface CountryCardProps {
  country: Country;
  onClick: () => void;
}

const CountryCard = ({ country, onClick }: CountryCardProps) => {
  return (
    <li
      className={`border px-4 py-2 shadow-md bor bg-slate-500/35 hover:bg-slate-500 transition-colors 
        ${country.isSelected ? "border-4 border-green-500" : ""}`}
      onClick={onClick}
    >
      <img
        className="w-32 h-auto mx-auto mb-4 "
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
      />
      <h2 className="font-semibold text-[20px]">{country.name.common}</h2>
      <p>{country.capital}</p>
    </li>
  );
};

export default CountryCard;
