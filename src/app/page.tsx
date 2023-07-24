"use client";
import Image from "next/image";
import React, { createContext, useState } from "react";
import styles from "./page.module.css";
import RangeSlider from "./rangeSlider";
import DataGridComponent from "./dataGrid";
import { slideInitialValue } from "./constant";

//Creating Context to pass the data to component tree.
export const slideContext = createContext(slideInitialValue);

export default function Home() {
  const [slideValue, setSlideValue] = useState(slideInitialValue);

  //Used to update the range slider values and passing the same to context
  const updateValue = (value: any) => {
    setSlideValue(value);
  };

  return (
    <main className={styles.main}>
      <slideContext.Provider value={{ slideValue, updateValue }}>
        <div>
          <h2>Patient Detials</h2>
          <span>Filter by Age</span>
          <RangeSlider />
          <DataGridComponent />
        </div>
      </slideContext.Provider>
    </main>
  );
}
