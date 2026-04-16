import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import BillInteractionsList from "./BillInteractionsList";

type FilterType = "all" | "active" | "archived";

const ControlBillInteractionsList: React.FC = () => {
  const [filterType, setFilterType] = useState<FilterType>("active");

  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: FilterType | null,
  ) => {
    if (newValue !== null) {
      setFilterType(newValue);
    }
  };

  const controls = (
    <ToggleButtonGroup
      value={filterType}
      exclusive
      onChange={handleFilterChange}
      size="small"
      aria-label="bill filter"
    >
      <ToggleButton value="active">Active</ToggleButton>
      <ToggleButton value="archived">Archived</ToggleButton>
      <ToggleButton value="all">All</ToggleButton>
    </ToggleButtonGroup>
  );

  return <BillInteractionsList filterType={filterType} controls={controls} />;
};

export default ControlBillInteractionsList;
