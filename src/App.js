import React, { useState, useEffect } from "react";
import "./style/App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import LineGraph from "./components/LineGraph";
import Table from "./components/Table";
import { sortData, prettyStat } from "./util";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  //Individual country
  const [countryInfo, setCountryInfo] = useState({});
  //Table
  const [tableData, setTableData] = useState([]);
  //Map
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  //Create circle according the size of the data
  const [mapCountries, setMapCountries] = useState([]);
  //Select the infoBoxes (Cases, Revovered or Deaths)
  const [casesType, setCasesType] = useState("cases");

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

          const sortedData = sortData(data); //sort data
          setTableData(sortedData); //fetch sorted data
          //setMapCountries(data);
          setCountries(countries);
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);

  //Listen to any change
  const onCountryChange = async (event) => {
    //select a country
    const countryCode = event.target.value;
    //console.log("country code >>>", countryCode);
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
        //Point to a choosen location
        if (typeof data.countryInfo !== "undefined") {
          const {
            countryInfo: { lat, long },
          } = data;
          setMapCenter({ lat, lng: long });

          setMapZoom(4);
        } else {
          setMapCenter({ lat: 34.80746, lng: -40.4796 });
          setMapZoom(3);
        }
        //Works with Map (v.2.8.0 react-leaflet not on v.3 with MapContainer)
        //setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        //setMapZoom(4);
      });
  };

  console.log("Country Info >>>", countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        {/**Header */}
        <div className="app__header">
          {/**Title and select input dropdown */}
          <h1>COVID-19</h1>
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
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyStat(countryInfo.todayCases)}
            total={prettyStat(countryInfo.cases)}
          />
          {/**InfoBox title="Coronavirus recoveries" */}
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyStat(countryInfo.todayRecovered)}
            total={prettyStat(countryInfo.recovered)}
          />
          {/**InfoBox title="Deaths"*/}
          <InfoBox
            isOrange
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyStat(countryInfo.todayDeaths)}
            total={prettyStat(countryInfo.deaths)}
          />
        </div>

        {/**Map */}
        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          casesType={casesType}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/**Table */}
          <Table countries={tableData} />
          {/**Graph */}
          <h3 className="app__graphTitle">Worldwide {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
