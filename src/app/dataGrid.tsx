"use client";
import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import useApi from "./useApi";
import { slideContext } from "./page";
import { columnsHeader } from "./constant";

const columns: GridColDef[] = columnsHeader;

export default function DataGridComponent() {
  const {slideValue} = useContext(slideContext);
  //calling custom hook for API call
  const { loading, data } = useApi(
    "https://hapi.fhir.org/baseR4/Patient?_pretty=true"
  );
  const [fetchData, setFetchData] = useState<any[]>([]);

  //When ever API response change occurs state will be updated 
  useEffect(() => {
    if (data !== null) {
      setFetchData(data?.entry);
    }
  }, [data]);

 // Master Data(array of Objects)
  const patientData = fetchData.map((data) => {
    //calculating the Age as per DOB
    const age =
      new Date().getFullYear() -
      new Date(data.resource.birthDate).getFullYear();
    
    //Object creation of Patient Detials  
    const patientDetials = {
      id: data.resource.id,
      name: {
        firstName: `${data.resource.name[0].given[0]} ${data.resource.name[0].family}`,
        initial: `${data.resource.name[0].given[0].charAt(
          0
        )}${data.resource.name[0].family.charAt(0)}`,
      },
      gender: data.resource.gender,
      birthdate: age,
      visit: new Date(data.resource.meta.lastUpdated).toLocaleString(),
    };
    return patientDetials;
  });

//Filered patient detials
  const filteredData = patientData.filter(
    (data) => data.birthdate >= slideValue[0] && data.birthdate <= slideValue[1]
  );

  if (loading) return <h1>Loading</h1>;
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={filteredData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
