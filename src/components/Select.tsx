import {
  FormControl,
  InputLabel,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import Select from "@mui/material/Select";

type City = {
  displayName: string;
  apiName: string;
};

type SelectCityProps = {
  city: string;
  onCityChange: (city: City) => void;
};

const cities: City[] = [
  { displayName: "مكة المكرمة", apiName: "Makkah" },
  { displayName: "المدينة المنورة", apiName: "Madinah" },
  { displayName: "الرياض", apiName: "Riyadh" },
];

export default function SelectCity({ city, onCityChange }: SelectCityProps) {

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCity = cities.find(
      (item) => item.apiName === event.target.value,
    );

    if (selectedCity) {
      onCityChange(selectedCity);
    }
  };
  return (
    <>
      <FormControl style={{ width: "100%" }}>
        <InputLabel
          id="demo-simple-select-label"
          style={{ color: "white", fontFamily: "IBM Plex Sans Arabic" }}
        >
          المدينة
        </InputLabel>
        <Select
          style={{ color: "white" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="Age"
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
        >
          {cities.map((city) => (
            <MenuItem key={city.apiName} value={city.apiName}>
              {city.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
