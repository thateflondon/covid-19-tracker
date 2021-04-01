import React, { useState, useEffect } from "react";

import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import "./style/App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  //Individual country
  const [countryInfo, setCountryInfo] = useState({});
  //Table
  const [tableData, setTableData] = useState([]);

  //All the cases
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  //Cases in the selected country
  useEffect(() => {
    //Async API request
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //France, Cameroon, United States
            value: country.countryInfo.iso2, //FR, CM, US
          }));

          setTableData(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  //Listen to any change
  const onCountryChange = async (event) => {
    //select a country
    const countryCode = event.target.value;
    console.log("country code >>>", countryCode);
    setCountry(countryCode);

    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        //All of the data from the country response
        setCountryInfo(data);
      });
  };

  console.log("Country Info >>>", countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        {/**Header */}
        <div className="app__header">
          {/**Title and select input dropdown */}
          <h1>COVID 19 TRACKER</h1>
          {/**Dropdown menu */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          {/**InfoBox title="Coronavirus cases" */}
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          {/**InfoBox title="Coronavirus recoveries" */}
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          {/**InfoBox title="Deaths"*/}
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/**Map */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/**Table */}
          <Table countries={tableData} />
          <h3>Worldwide New Cases</h3>
          {/**Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
