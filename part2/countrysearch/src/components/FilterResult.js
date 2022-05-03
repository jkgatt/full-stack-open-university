import Country from "./Country";
import CountryInfo from "./CountryInfo";

const FilterResult = ({filter, countryList}) => {

    if(filter === ''){
      return (<></>)
    }
  
    const filteredList = filter === '' ? [] : 
    countryList.filter(country =>
         country.name.common.toLowerCase().includes(filter.toLowerCase()));
    
    if(filteredList.length > 10){
      return (
        <p>Too many matches, dig deeper</p>
      )
    } else if (filteredList.length > 1 && filteredList.length <= 10) {
      return filteredList.map(country => <Country key={country.cca2} country={country} />)
    } else if (filteredList.length === 1) {
        return <CountryInfo countryInfo={filteredList[0]} />
    } else {
      return (
        <p>No match found, try again!</p>
      )
    }
  }

  export default FilterResult