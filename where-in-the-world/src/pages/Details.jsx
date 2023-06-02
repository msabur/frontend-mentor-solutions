import './Details.css'

export default function Details({ onBack, country }) {
  return (
    <>
      <button onClick={onBack}>back!</button>
      <img src={country.flag} alt={country.name} />
      <h3>{country.name}</h3>
      <p><b>Native Name:</b> {country.nativeName}</p>
      <p><b>Population:</b> {country.population.toLocaleString()}</p>
      <p><b>Region:</b> {country.region}</p>
      <p><b>Sub Region:</b> {country.subregion}</p>
      <p><b>Capital:</b> {country.capital}</p>
      <p><b>Top Level Domain:</b> {country.topLevelDomain}</p>
      <p><b>Currencies:</b> {country.currencies.map(c => `${c.name}, `)}</p>
      <p><b>Languages:</b> {country.languages.map(c => `${c.name}, `)}</p>
    </>
  )
}
