import { Typography } from "@material-ui/core";
import React from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "../style/InfoBox.css";

function InfoBox({ title, cases, total }) {
  return (
    <Card>
      <CardContent>
        {/**Title */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {/**Number of cases */}
        <h2 className="infoBox__cases">{cases}</h2>

        {/**Total */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
