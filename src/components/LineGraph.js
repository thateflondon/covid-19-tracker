import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
//import "../style/LineGraph.css";

function LineGraph() {
  const [data, setData] = useState({});

  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;

    data[casesType].forEach((date) => {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
        lastDataPoint = data[casesType][date];
      }
    });
    return chartData;
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const chartData = buildChartData(data);
        setData(chartData);
      });
  }, []);

  return (
    <div>
      <h1>Graph here</h1>
      <Line
        data={{
          datasets: [
            {
              data: data,
              backgroundColor: "rgba(204, 16, 52, 0)",
              borderColor: "#CC1034",
            },
          ],
        }}
      ></Line>
    </div>
  );
}

export default LineGraph;
