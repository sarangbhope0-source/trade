import { Typography, Box, Paper } from "@mui/material";

export default function Portfolio() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>Portfolio</Typography>
      <Paper sx={{ p: 4, textAlign: "center" }}>
         <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400" alt="Assets" style={{ borderRadius: "50%", marginBottom: "20px" }} />
         <Typography variant="h5">Total Assets: 24</Typography>
         <Typography color="gray">You are currently holding $12,400 in Stocks and $30,450 in Crypto.</Typography>
      </Paper>
    </Box>
  );
}