import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Button from "@mui/material/Button";
export const slideInitialValue = [60,100];
export const columnsHeader = [
    {
      field: "name",
      headerName: "First name",
      width: 250,
      editable: true,
      renderCell: (params) => {
        return (
          <>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              {params.row.name.initial}
            </Avatar>
            {params.row.name.firstName}
          </>
        );
      },
    },
    {
      field: "visit",
      headerName: "visit",
      width: 250,
      editable: true,
    },
    {
      field: "birthdate",
      headerName: "Age",
      width: 110,
      editable: true,
    },
    {
      field: "condition",
      headerName: "Condition",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log("Detials Clicked");
        };
  
        return <Button variant="contained" onClick={onClick}>Details</Button>;
      }
    }
      
  ];