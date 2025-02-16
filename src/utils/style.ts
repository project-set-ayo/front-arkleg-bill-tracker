export const getPartyStyle = (party: string) => {
  switch (party) {
    case "R":
      return { bgcolor: "#d92323", color: "white", iconColor: "#d92323" }; // Republican Red
    case "D":
      return { bgcolor: "#1870f2", color: "white", iconColor: "#1870f2" }; // Democrat Blue
    default:
      return { bgcolor: "#808080", color: "white", iconColor: "#555" }; // Neutral Gray for others
  }
};
