import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
//import "../style/LineGraph.css";

function LineGraph() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <div>
      <h1>Graph here</h1>
      {/*<Line data options></Line>*/}
    </div>
  );
}

export default LineGraph;
