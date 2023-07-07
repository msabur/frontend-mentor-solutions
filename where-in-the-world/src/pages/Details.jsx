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
        <button className="back-button" onClick={() => navigate('/', { replaceState: true })}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/> </svg>
            Back
        </button>

        <div className="details-container">
          <div className="flag-container">
            <img src={country?.flag} alt={country?.name} />
          </div>

          <div className="info-container">
            <h1>{country?.name}</h1>
            <div className="info-columns">
              <div className="info-column">
                <p><b>Native Name:</b> {country?.nativeName}</p>
                <p><b>Population:</b> {country?.population?.toLocaleString()}</p>
                <p><b>Region:</b> {country?.region}</p>
                <p><b>Sub Region:</b> {country?.subregion}</p>
                <p><b>Capital:</b> {country?.capital}</p>
              </div>
              <div className="info-column">
                <p><b>Top Level Domain:</b> {country?.topLevelDomain}</p>
                <p><b>Currencies:</b> {currencies?.join(', ')}</p>
                <p><b>Languages:</b> {languages?.join(', ')}</p>
              </div>
            </div>
            <p>
              <b>Border Countries: </b>
              {borderCountries?.map(c => (
                <Link href={`/${c.alpha3Code}`} key={c.alpha3Code}>
                  <a class="border-link">{c.name}</a>
                </Link>
              ))}
            </p>
          </div>
        </div>
      </>
    )
  }
}
