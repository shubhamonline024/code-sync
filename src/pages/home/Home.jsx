import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../context/AuthContext";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import IconButton from "@mui/material/IconButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import api from "../../api/axiosInstance";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import Divider from "@mui/material/Divider";

const styles = {
  headingContainer: {
    display: "flex",
    justifyContent: "space-between",
    mt: 2,
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
  },
  dataGridContainer: { mt: 2 },
  dataGrid: {
    cursor: "pointer",
    "& .MuiDataGrid-cell": {
      whiteSpace: "normal !important",
      wordWrap: "break-word !important",
      lineHeight: "1.4rem",
    },
  },
  addBtn: {},
};

const Home = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [backendActive, setBackendActive] = useState(false);

  const columns = [
    { field: "sno", headerName: "Sno", flex: 0.1 },
    {
      field: "title",
      headerName: "Title",
      flex: 0.2,
      editable: true,
    },
    {
      field: "preview",
      headerName: "Preview",
      flex: 1,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 0.4,
      editable: true,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 0.4,
    },
    {
      field: "url",
      headerName: "Link",
      flex: 0.3,
    },
  ];

  const createNewNote = async () => {
    try {
      const response = await api.get("/");
      window.open(response.data.noteUrl, "_blank");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getData = async () => {
    const data = await api.get("api/notes");
    if (!data) {
      return;
    }
    setBackendActive(true);
    const rowData = data.data.reduce((acc, curr, idx) => {
      const newObj = {
        id: curr.noteId,
        sno: idx + 1,
        title: curr.heading,
        preview: curr.content,
        createdAt: curr.createdAt,
        updatedAt: curr.updatedAt,
        url: curr.noteId,
      };
      acc.push(newObj);
      return acc;
    }, []);
    setRows(rowData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NavBar user={user} />
      <Container>
        <Container sx={styles.headingContainer}>
          <Box sx={styles.leftSection}>
            <TextField
              id="standard-basic"
              placeholder="Search"
              variant="standard"
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <ClearRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={styles.rightSection}>
            {backendActive ? (
              <CloudIcon fontSize="small" sx={{ color: "#107C10" }} />
            ) : (
              <CloudOffIcon fontSize="small" />
            )}
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ ml: 2 }}
            />
            <IconButton
              color="primary"
              onClick={createNewNote}
              sx={styles.addBtn}
            >
              <AddCircleRoundedIcon fontSize="large" />
            </IconButton>
          </Box>
        </Container>
        <Container sx={styles.dataGridContainer}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowHeight={() => "auto"}
            onRowClick={(params) => {
              window.open(params.row.url, "_blank");
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20]}
            sx={styles.dataGrid}
            disableRowSelectionOnClick
          />
        </Container>
      </Container>
    </>
  );
};

export default Home;
