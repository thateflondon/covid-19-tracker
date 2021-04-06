import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "../style/InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, isOrange, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      } ${isOrange && "infoBox--orange"} `}
    >
      <CardContent>
        {/**Title */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {/**Number of cases */}
        <h2
          className={`infoBox__cases ${
            !isRed && !isOrange && "infoBox__cases--green"
          } ${isOrange && !isRed && "infoBox--orange"} ${isOrange && !isRed && "infoBox__cases--orange"}`}
        >
          {cases}
        </h2>

        {/**Total */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
