import React, { useEffect, useState } from 'react'
import styles from './StatesSelect.module.css'

let countriesApi = "https://crio-location-selector.onrender.com/countries"

export default function StatesSelect() {
  let [countries, setCountries] = useState([])
  let [selectedCountry, setSelectedcountry] = useState('')
  let [selectedState, setSelectedState] = useState('')
  let [states, setStates] = useState([])
  let [cities, setCities] = useState([])
  let [selectedCity, setSelectedCity] = useState('')
  let [location, setLocation] = useState(false)


  let handleCountryChange = (e) => {
    let country = e.target.value
    setSelectedcountry(country)
    setLocation(false)
    try{
        if( selectedCountry !== "Select Country"){
            let stateApi = `https://crio-location-selector.onrender.com/country=${country}/states`
        fetch(stateApi).then((res) => 
            res.json()
        ).then((data) => 
            setStates(data)
        ).catch((err) => 
            console.log(`error occred : ${err}`)
        )
        }else{
            setStates([])
        }
        
    }catch(err){
        console.log("error occured")
    }
        
    
  }

  let handleStateChange = (e) => {
    let state = e.target.value
    setSelectedState(state)
    try{
        if(selectedState !== 'Select State'){
            let cityApi = `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
        fetch(cityApi).then((res) => 
            res.json()
        ).then((data) => 
            setCities(data)
        ).catch((err) => 
            console.log(`error occred : ${err}`)
        )
        }else{
            setCities([])
        }
        
    }catch(err){
        console.log("error occured")
    }
  }

  let handleCityChange = (e) => {
    let city = e.target.value
    setSelectedCity(city)
    if(selectedCity !== "Select City"){
        setLocation(true)
    }
    
  }

  useEffect(() => {
        fetch(countriesApi).then((res) => res.json()).then((data) => setCountries(data)).catch((err) => console.log(`got error : ${err}`))
  }, [])
  return (
    <div>
        <h2>Select Location</h2>
        <div className={styles.container}>
        <select className={styles.countryTab} value= {selectedCountry} onChange={handleCountryChange}>
            <option value="Select Country">Select Country</option>
            {
                countries.map((country) => {
                    return <option value={country}>{country}</option>
                })
            }
        </select>
        <select className={styles.stateTab} value= {selectedState} onChange={handleStateChange} disabled={!selectedCountry || selectedCountry === "Select Country"}>
            <option value="Select State">Select State</option>
            {
                states.map((state) => {
                    return <option value={state}>{state}</option>
                })
            }
        </select>
        <select className={styles.stateTab} value= {selectedCity} onChange={handleCityChange} disabled = {!selectedState || selectedState === "Select State"}>
            <option value="Select City">Select State</option>
            {
                cities.map((city) => {
                    return <option value={city}>{city}</option>
                })
            }
        </select>
        </div>
        {location ? <div className={styles.locationTab}>You Selected {selectedCountry}, {selectedState}, {selectedCity}</div> : ''}
    </div>
  )
}
