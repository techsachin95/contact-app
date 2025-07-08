import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

function CardComponent({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          // minWidth: 400,
          p: 2,
          border: "2px solid #333",
          borderRadius: 2,
        }}
      >
        {children}
      </Card>
    </Box>
  );
}

export default CardComponent;
