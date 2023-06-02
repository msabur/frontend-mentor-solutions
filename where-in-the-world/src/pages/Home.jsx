import './Home.css'
import { useState } from 'react'
import countriesData from '../../data.json'

export default function Home({ onClickCountry }) {
  const [countries, setCountries] = useState(countriesData)
  const onFilter = (event) => {
    const region = event.target.value
    if (region) {
      setCountries(countriesData.filter((country) => country.region === region))
    } else {
      setCountries(countriesData)
    }
  }

  const onSearch = (event) => {
    const search = event.target.value
    setCountries(countriesData.filter((country) => country.name.toLowerCase().includes(search.toLowerCase())))
  }

  return (
    <>
      <div className="search-container">
        <input type="text" onChange={onSearch} placeholder="Search for a country..." className="shadowed rounded-borders" />

        <select onChange={onFilter} defaultValue="" className="shadowed rounded-borders">
          <option value="" hidden>Filter by Region</option>
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="countries">
        {countries.map((country) => (
          <div className="country rounded-borders shadowed" key={country.name}
            onClick={()=>{
              onClickCountry(country);
            }}
          >
            <img src={country.flag} alt={country.name} />
            <div className="country-info">
              <h3>{country.name}</h3>
              <p><b>Population:</b> {country.population.toLocaleString()}</p>
              <p><b>Region:</b> {country.region}</p>
              <p><b>Capital:</b> {country.capital}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
