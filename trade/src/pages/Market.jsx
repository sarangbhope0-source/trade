import {
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  Chip
} from "@mui/material";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const chartData = [
  { time: "9AM", value: 100 },
  { time: "10AM", value: 120 },
  { time: "11AM", value: 90 },
  { time: "12PM", value: 140 },
  { time: "1PM", value: 170 },
  { time: "2PM", value: 150 },
];

const WatchItem = ({ symbol, name, price, trend }) => {
  const isUp = trend >= 0;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1.5
      }}
    >
      <Box>
        <Typography fontWeight="bold">{symbol}</Typography>
        <Typography variant="caption" color="gray">
          {name}
        </Typography>
      </Box>

      <Box sx={{ textAlign: "right" }}>
        <Typography fontWeight="bold">${price}</Typography>
        <Chip
          size="small"
          icon={isUp ? <TrendingUpIcon /> : <TrendingDownIcon />}
          label={`${trend}%`}
          sx={{
            bgcolor: isUp ? "rgba(0,255,150,0.15)" : "rgba(255,0,0,0.15)",
            color: isUp ? "#00e676" : "#ff5252"
          }}
        />
      </Box>
    </Box>
  );
};

export default function Market() {
  return (
    <Box sx={{ maxWidth: 1100, mx: "auto" }}>

      {/* Header */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 4 }}
      >
        Markets
      </Typography>

      <Grid container spacing={3}>

        {/* Chart Section */}
        <Grid xs={12} md={8}>
          <motion.div whileHover={{ scale: 1.01 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                color: (theme) => theme.palette.mode === 'dark' ? "#fff" : "text.primary",
                background: (theme) => theme.palette.mode === 'dark' ? "linear-gradient(135deg, #0f2027, #2c5364)" : "linear-gradient(135deg, #f1f5f9, #e2e8f0)"
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Market Trend
              </Typography>

              <Box sx={{ width: '100%', height: 300, minHeight: 300 }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                  <LineChart data={chartData}>
                    <XAxis dataKey="time" stroke="#ccc" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#00e676"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* Watchlist */}
        <Grid xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                background: (theme) => theme.palette.mode === 'dark' ? "linear-gradient(135deg, #1d2671, #c33764)" : "linear-gradient(135deg, #fce7f3, #fbcfe8)",
                color: (theme) => theme.palette.mode === 'dark' ? "#fff" : "text.primary"
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Watchlist
              </Typography>

              <WatchItem symbol="BTC" name="Bitcoin" price="52300" trend={2.4} />
              <Divider sx={{ my: 1, bgcolor: "rgba(255,255,255,0.2)" }} />
              <WatchItem symbol="ETH" name="Ethereum" price="2940" trend={-1.2} />
              <Divider sx={{ my: 1, bgcolor: "rgba(255,255,255,0.2)" }} />
              <WatchItem symbol="AAPL" name="Apple Inc." price="180.20" trend={0.5} />
            </Paper>
          </motion.div>
        </Grid>

        {/* Heatmap / Insights */}
        <Grid xs={12}>
          <motion.div whileHover={{ scale: 1.01 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                backdropFilter: "blur(10px)",
                background: (theme) => theme.palette.mode === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                color: "text.primary"
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Global Market Snapshot
              </Typography>

              <Grid container spacing={2}>
                { [
                  { name: "NASDAQ", change: "+1.2%" },
                  { name: "SENSEX", change: "-0.5%" },
                  { name: "NIFTY 50", change: "+0.8%" },
                  { name: "CRYPTO", change: "+3.1%" }
                ].map((m, i) => (
                  <Grid xs={6} md={3} key={i}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: "center",
                        borderRadius: 3,
                        background:
                          m.change.includes("+")
                            ? "rgba(0,255,150,0.15)"
                            : "rgba(255,0,0,0.15)",
                        color:
                          m.change.includes("+")
                            ? "#00e676"
                            : "#ff5252"
                      }}
                    >
                      <Typography>{m.name}</Typography>
                      <Typography fontWeight="bold">
                        {m.change}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </motion.div>
        </Grid>

      </Grid>
    </Box>
  );
}