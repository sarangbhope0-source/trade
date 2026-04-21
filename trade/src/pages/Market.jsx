import { Grid, Paper, Typography, Box } from "@mui/material";
import MarketRow from "../components/MarketRow";

export default function Market() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>Markets</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 0, overflow: "hidden" }}>
             <img src="https://images.unsplash.com/photo-1611974717537-484439002206?w=800" alt="Trade Chart" style={{ width: "100%", height: "auto" }} />
             <Box sx={{ p: 2 }}><Typography variant="subtitle1">Global Market Heatmap</Typography></Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Watchlist</Typography>
            <MarketRow symbol="BTC" name="Bitcoin" price="52,300" trend={2.4} />
            <MarketRow symbol="ETH" name="Ethereum" price="2,940" trend={-1.2} />
            <MarketRow symbol="AAPL" name="Apple Inc." price="180.20" trend={0.5} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}