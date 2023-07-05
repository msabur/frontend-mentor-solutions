import './Details.css'
import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { useHashLocation } from '../hooks/hash-location.js'
import countriesData from '../../data.json'

export default function Details({ params }) {
  const [, navigate] = useHashLocation()
  const [notFound, setNotFound] = useState(false)
  const [country, setCountry] = useState(null)

  const currencies = country?.currencies?.map(c => c.name)

  const languages = country?.languages?.map(lang => lang.name)

  const borderCountries = country?.borders?.map(code => (
    countriesData.find(c => c.alpha3Code == code)
  ))

  useEffect(() => {
    const result = countriesData.find(c => c.alpha3Code == params.countryCode)
    if (!result) {
      setNotFound(true)
    } else {
      setCountry(result)
    }
  }, [params.countryCode])

  if (notFound) {
    return <p>Country not found, check URL</p>
  } else {
    return (
      <>
        <button onClick={() => navigate('/', { replaceState: true })}>back!</button>

        <div className="details-container">
          <div className="flag-container">
            <img src={country?.flag} alt={country?.name} />
          </div>

          <div className="info-container">
            <h3>{country?.name}</h3>
            <div className="columns">
              <div className="column">
                <p><b>Native Name:</b> {country?.nativeName}</p>
                <p><b>Population:</b> {country?.population?.toLocaleString()}</p>
                <p><b>Region:</b> {country?.region}</p>
                <p><b>Sub Region:</b> {country?.subregion}</p>
                <p><b>Capital:</b> {country?.capital}</p>
              </div>
              <div className="column">
                <p><b>Top Level Domain:</b> {country?.topLevelDomain}</p>
                <p><b>Currencies:</b> {currencies?.join(', ')}</p>
                <p><b>Languages:</b> {languages?.join(', ')}</p>
              </div>
            </div>
            <p>
              <b>Border Countries: </b>
              {borderCountries?.map(c => (
                <span key={c.alpha3Code}>
                  <Link href={`/${c.alpha3Code}`}><a>{c.name}</a></Link>
                </span>
              ))}
            </p>
          </div>
        </div>
      </>
    )
  }
}
