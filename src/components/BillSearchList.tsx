import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useBillSearch from "../hooks/useBillSearch";
import { Link as RouterLink } from "react-router-dom";

const BillSearchList: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    bill_number: "",
    query: "",
    sponsor: "",
    chamber: "", // Single-select
    type: "", // Single-select
  });

  const { bills, loading, error } = useBillSearch(searchParams);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const columns: GridColDef[] = [
    {
      field: "bill_number",
      headerName: "Bill Number",
      renderCell: (params) => (
        <RouterLink
          to={`/bill/${params.row.bill_id}`}
          style={{ textDecoration: "none", color: "#1976d2" }}
        >
          {params.value}
        </RouterLink>
      ),
    },
    { field: "title", headerName: "Title", width: 600 },
    { field: "last_action_date", headerName: "Last Action Date", width: 150 },
    { field: "last_action", headerName: "Last Action", width: 280 },
    { field: "state", headerName: "State" },
    { field: "relevance", headerName: "Relevance" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom align={"left"}>
        Bill Search
      </Typography>

      {/* Search Inputs */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          name="bill_number"
          label="Bill Number"
          variant="outlined"
          value={searchParams.bill_number}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          name="query"
          label="Keyword"
          variant="outlined"
          value={searchParams.query}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          name="sponsor"
          label="Sponsor"
          variant="outlined"
          value={searchParams.sponsor}
          onChange={handleInputChange}
          fullWidth
        />

        {/* Single-Select Chamber Filter */}
        <FormControl fullWidth>
          <InputLabel>Chamber</InputLabel>
          <Select
            name="chamber"
            value={searchParams.chamber}
            onChange={handleInputChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="House">House</MenuItem>
            <MenuItem value="Senate">Senate</MenuItem>
          </Select>
        </FormControl>

        {/* Single-Select Type Filter */}
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={searchParams.type}
            onChange={handleInputChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Bill">Bill</MenuItem>
            <MenuItem value="Resolution">Resolution</MenuItem>
            <MenuItem value="Joint Resolution">Joint Resolution</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* DataGrid */}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box sx={{ height: 500 }}>
          <DataGrid
            rows={bills}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row.bill_id}
          />
        </Box>
      )}
    </Box>
  );
};

export default BillSearchList;
