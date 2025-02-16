import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { Event as EventIcon } from "@mui/icons-material";

interface BillCalendarEventProps {
  type: string;
  date: string;
  time?: string;
  location?: string;
  description: string;
}

const BillCalendarEvent: React.FC<BillCalendarEventProps> = ({
  type,
  date,
  time,
  location,
  description,
}) => {
  const handleDownloadEvent = () => {
    const eventDetails = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${type} - ${description}`,
      `DTSTART:${date.replace(/-/g, "")}T${time ? time.replace(":", "") + "00Z" : "120000Z"}`,
      `LOCATION:${location || "TBD"}`,
      `DESCRIPTION:${description}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([eventDetails], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type.replace(/\s/g, "_")}_${date}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      p={2}
      my={1}
      border="1px solid #ddd"
      borderRadius={2}
      sx={{ backgroundColor: "#f9f9f9" }}
    >
      <Box flex={1}>
        <Typography variant="body1" fontWeight="bold">
          {type}
        </Typography>
        <Typography variant="body2">{description}</Typography>
        <Typography variant="body2" color="textSecondary">
          {new Date(date).toLocaleDateString()} {time ? `at ${time}` : ""}
        </Typography>

        {location && (
          <Typography variant="body2" color="textSecondary">
            Location: {location}
          </Typography>
        )}
      </Box>

      {/* Small Icon Button for Downloading Event */}
      <Tooltip title="Download Event">
        <IconButton onClick={handleDownloadEvent} size="small">
          <EventIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default BillCalendarEvent;
