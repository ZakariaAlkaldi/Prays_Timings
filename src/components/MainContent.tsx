import { Divider, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import PrayCard from "./PrayCard";
import SelectCity from "./Select";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/ar";
moment.locale("ar");
import fagerImg from "../assets/fager.png";
import dhuherImg from "../assets/dhuher.png";
import aserImg from "../assets/aser.jpg";
import maghrebImg from "../assets/maghreb.jpg";
import eshaImg from "../assets/esha.jpg";

function MainContent() {
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [timings, setTimings] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });

  const [city, setCity] = useState({
    displayName: "مكة المكرمة",
    apiName: "Makkah",
  });

  const [reTime, setReTime] = useState("");

  const date = moment().format("MMMM | YYYY D | HH:mm");
  const currentDate = date.replace(/[٠-٩]/g, (digit) => {
    return "٠١٢٣٤٥٦٧٨٩".indexOf(digit).toString();
  });

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${city.apiName}&country=Saudi%20Arabia&method=4`,
    );

    return response.data.data.timings;
  };

  useEffect(() => {
    let cancelled = false;

    async function fetchTimings() {
      const data = await getTimings();

      if (!cancelled) {
        setTimings(data);
      }
    }

    fetchTimings();

    return () => {
      cancelled = true;
    };
  }, [city]);

  const setUpCountDownTimer = () => {
    const momentNow = moment();

    let PrayerIndex = 0;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "HH:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "HH:mm"))
    ) {
      PrayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "HH:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "HH:mm"))
    ) {
      PrayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "HH:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "HH:mm"))
    ) {
      PrayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "HH:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "HH:mm"))
    ) {
      PrayerIndex = 4;
    } else {
      PrayerIndex = 0;
    }

    setNextPrayerIndex(PrayerIndex);

    const nextPrayer = prayersArray[PrayerIndex];
    const nextPrayerTime = timings[nextPrayer.key];
    let remainingTime = moment(nextPrayerTime, "HH:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midNightDiff = moment("23:59:59", "HH:mm:ss").diff(momentNow);
      const fajrMidNightDiff = moment(nextPrayerTime, "HH:mm").diff(
        moment("00:00:00", "HH:mm:ss"),
      );

      const totalDiff = midNightDiff + fajrMidNightDiff;
      remainingTime = totalDiff;
    }

    const duRemainingTime = moment.duration(remainingTime);

    setReTime(
      `${duRemainingTime.seconds()} : ${duRemainingTime.minutes()} : ${duRemainingTime.hours()}`,
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setUpCountDownTimer();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const imgsPaths = {
    fager: fagerImg,
    dhuher: dhuherImg,
    aser: aserImg,
    maghreb: maghrebImg,
    esha: eshaImg,
  };

  const containerStyle = {
    margin: "10px 0 40px 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minMax(200px, 1fr))",
    gap: "10px",
  };

  const dividerStyle = {
    margin: "30px 0",
    borderColor: "white",
    opacity: "0.1",
  };

  const gridStyle = {
    margin: "10px 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minMax(260px, 1fr))",
    gap: "50px",
  };

  return (
    <>
      <div style={gridStyle}>
        <Grid size={6}>
          <div>
            <h3>{currentDate}</h3>
            <h1>{city.displayName}</h1>
          </div>
        </Grid>
        <Grid size={6}>
          <div>
            <h3>متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h3>
            <h1>{reTime}</h1>
          </div>
        </Grid>
      </div>

      <Divider style={dividerStyle} />

      <div className="cards" style={containerStyle}>
        <PrayCard
          imgPath={imgsPaths.fager}
          prayName="الفجر"
          time={timings.Fajr}
        />
        <PrayCard
          imgPath={imgsPaths.dhuher}
          prayName="الظهر"
          time={timings.Dhuhr}
        />
        <PrayCard
          imgPath={imgsPaths.aser}
          prayName="العصر"
          time={timings.Asr}
        />
        <PrayCard
          imgPath={imgsPaths.maghreb}
          prayName="المغرب"
          time={timings.Maghrib}
        />
        <PrayCard
          imgPath={imgsPaths.esha}
          prayName="العشاء"
          time={timings.Isha}
        />
      </div>

      <Stack
        direction="row"
        style={{ justifyContent: "center" }}
        aria-busy={timings === undefined}
      >
        <SelectCity city={city.apiName} onCityChange={setCity} />
      </Stack>
    </>
  );
}

export default MainContent;
