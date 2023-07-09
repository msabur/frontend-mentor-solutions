import './App.css'
import { useState, useLayoutEffect } from 'react'
import { Router, Route } from 'wouter'
import { useHashLocation } from './hooks/hash-location.js'
import Home from './pages/Home.jsx'
import Details from './pages/Details.jsx'

function App() {
  const [theme, setTheme] = useState('dark')
  const [location] = useHashLocation()

  // avoid having to scroll up after navigating to a new screen
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const toggleTheme = () => {
    const body = document.getElementsByTagName('body')[0]
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode')
      body.classList.add('light-mode')
      setTheme('light')
    } else {
      body.classList.remove('light-mode')
      body.classList.add('dark-mode')
      setTheme('dark')
    }
  }

  return (
    <>
      <div className="nav-container">
        <nav>
          <h1>Where in the world?</h1>
          <button onClick={() => toggleTheme()}>
            {theme == "light"
              ? (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path fillRule="nonzero" d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"></path></g></svg>
              ) : (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M195 125c0-26.3 5.3-51.3 14.9-74.1C118.7 73 51 155.1 51 253c0 114.8 93.2 208 208 208 97.9 0 180-67.7 202.1-158.9-22.8 9.6-47.9 14.9-74.1 14.9-106 0-192-86-192-192z"></path></svg>
              )}
            Dark Mode
          </button>
        </nav>
      </div>
      <main>
        <Router hook={useHashLocation} base='/frontend-mentor-solutions/where-in-the-world'>
          <Route path='/' component={Home} />
          <Route path='/:countryCode'>
            {params => <Details params={params} />}
          </Route>
        </Router>
      </main>
    </>
  )
}

export default App
