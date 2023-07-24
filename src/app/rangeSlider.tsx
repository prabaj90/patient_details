"use client";
import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { slideContext } from "./page";

/*Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider. 
  This is important for screen reader users.*/
function valuetext(value: number) {
  return `${value}`;
}

export default function RangeSlider() {
  const {slideValue, updateValue} = useContext(slideContext);
  const [value, setValue] = useState<number[]>(slideValue);

  //Hanlding slider value change event and updating the same to context also
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    updateValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Patient Age range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
