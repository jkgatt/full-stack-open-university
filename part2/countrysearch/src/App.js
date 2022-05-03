import { useEffect, useState } from 'react';
import axios from 'axios';

import FilterResult from './components/FilterResult';

const App = () => {
  const [countryList, setCountryList] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    console.log("Downloading country info...")
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => setCountryList(response.data))
    console.log("Downloaded country info")
  }, [])

  const handleSearch = (event) => setSearchValue(event.target.value)
  
  return (
    <div>
      <div>
      Find Countries: <input value={searchValue} onChange={handleSearch} />
      </div>
      <div>
        <FilterResult filter={searchValue} countryList={countryList}/>
      </div>
    </div>
  )
}

export default App;
