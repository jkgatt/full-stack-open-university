import { useState } from "react"
import CountryInfo from "./CountryInfo"

const Country = ({ country }) => {

    const [showInfo, setShowInfo] = useState(false)
    
    const handleShow = (event) => {
        setShowInfo(!showInfo)
    }

    return (
        <div>
            <p>{country.name.common}</p><button onClick={handleShow}>{showInfo ? "Hide Info" : "Show Info"}</button>
            { showInfo ? <CountryInfo countryInfo={country} /> : ''}
        </div>
    ) 
}

export default Country