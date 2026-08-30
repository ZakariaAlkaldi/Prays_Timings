import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

type cardProps = {
  imgPath: string;
  prayName: string;
  time: string;
};

function PrayCard({ imgPath, prayName, time }: cardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={imgPath} title="Al Fager Pray" />
      <CardContent>
        <h2 style={{ color: "#212121", fontSize: "26px" }}>{prayName}</h2>
        <Typography
          variant="h4"
          sx={{ color: "text.secondary", fontSize: "40px" }}
        >
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default PrayCard;
