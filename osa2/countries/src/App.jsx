import React, { useEffect, useState } from 'react'
import Countries from './Components/Countries'
import Filter from './Components/Filter'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filterChange={handleFilterChange} />
      <Countries countries={countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase()))}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  )
}

export default App
