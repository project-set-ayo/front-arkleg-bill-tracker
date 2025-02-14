import { useState } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import useTextSearchBills from "../hooks/useTextSearchBills";
import {
  Container,
  TextField,
  CircularProgress,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const TextSearchBills = ({ sessionId }: { sessionId: number }) => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25); // Default page size
  const [serverPage, setServerPage] = useState(1); // Server-side pagination control

  const { bills, summary, loading, error, fetchBills } = useTextSearchBills();

  const handleSearch = () => {
    if (!sessionId || !query.trim()) return;
    setSearchQuery(query);
    setPage(1); // Reset client-side pagination
    setServerPage(1); // Reset server-side pagination
    fetchBills(sessionId, query, 1);
  };

  const handleServerPageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (summary?.page_total || 1)) {
      setServerPage(newPage);
      fetchBills(sessionId, searchQuery, newPage);
    }
  };

  const columns: GridColDef[] = [
    { field: "bill_number", headerName: "Bill Number", width: 120 },
    { field: "title", headerName: "Title", width: 400 },
    { field: "last_action", headerName: "Last Action", width: 300 },
    { field: "last_action_date", headerName: "Last Action Date", width: 150 },
  ];

  const handleRowClick = (params: GridRowParams) => {
    const billId = params.row.bill_id;
    window.open(`/bill/${billId}`, "_blank"); // Opens in a new tab
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          label="Search for Text in Bills (e.g education, tax, medical services)"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(event) => event.key === "Enter" && handleSearch()}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {summary && (
        <Box sx={{ mb: 2, p: 1, border: "1px solid #ddd", borderRadius: 2 }}>
          <Typography variant="body2">
            <strong>Results Found:</strong> {summary.count}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant={"body2"} fontWeight={"bold"}>
              Current Server Page:
            </Typography>
            <IconButton
              size="small"
              onClick={() => handleServerPageChange(serverPage - 1)}
              disabled={serverPage <= 1}
            >
              <KeyboardArrowLeft />
            </IconButton>
            <Typography variant="body2">
              {summary.page_current} of {summary.page_total}
            </Typography>
            <IconButton
              size="small"
              onClick={() => handleServerPageChange(serverPage + 1)}
              disabled={serverPage >= (summary?.page_total || 1)}
            >
              <KeyboardArrowRight />
            </IconButton>
          </Box>
          <Typography variant="body2">
            <strong>Relevancy Range:</strong> {summary.relevancy}
          </Typography>
        </Box>
      )}

      <DataGrid
        rows={bills}
        columns={columns}
        pageSize={pageSize}
        rowCount={summary?.count || 0}
        pagination
        paginationMode="server"
        getRowId={(row) => row.bill_id} // Ensures unique row IDs
        onPageChange={(newPage) => setPage(newPage + 1)}
        onPageSizeChange={(newSize) => setPageSize(newSize)}
        onRowClick={handleRowClick} // Open bill in a new tab when row is clicked
        sx={{
          cursor: "pointer", // Make it clear that rows are clickable
        }}
      />
    </Container>
  );
};

export default TextSearchBills;
