import {
  Typography,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Mon", value: 10000 },
  { name: "Tue", value: 12000 },
  { name: "Wed", value: 11000 },
  { name: "Thu", value: 14000 },
  { name: "Fri", value: 17000 },
  { name: "Sat", value: 16000 },
];

export default function Portfolio() {
  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>

      {/* Header */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 4, display: "flex", alignItems: "center", gap: 1 }}
      >
        <AccountBalanceWalletIcon /> Portfolio
      </Typography>

      <Grid container spacing={3}>

        {/* Total Balance Card */}
        <Grid xs={12} md={6}>
          <motion.div whileHover={{ scale: 1.03 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                color: (theme) => theme.palette.mode === 'dark' ? "#fff" : "text.primary",
                background: (theme) => theme.palette.mode === 'dark' ? "linear-gradient(135deg, #0f2027, #2c5364)" : "linear-gradient(135deg, #f1f5f9, #e2e8f0)"
              }}
            >
              <Typography variant="subtitle2">Total Balance</Typography>
              <Typography variant="h4" fontWeight="bold">
                $42,850
              </Typography>
              <Typography sx={{ color: "#00e676", mt: 1 }}>
                +12.5% this week
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Assets Count */}
        <Grid xs={12} md={6}>
          <motion.div whileHover={{ scale: 1.03 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                color: (theme) => theme.palette.mode === 'dark' ? "#fff" : "text.primary",
                background: (theme) => theme.palette.mode === 'dark' ? "linear-gradient(135deg, #1d2671, #c33764)" : "linear-gradient(135deg, #fce7f3, #fbcfe8)"
              }}
            >
              <Typography variant="subtitle2">Assets</Typography>
              <Typography variant="h4" fontWeight="bold">
                24 Holdings
              </Typography>
              <Typography sx={{ mt: 1 }}>
                Stocks + Crypto diversified
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Chart */}
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
                <TrendingUpIcon /> Portfolio Growth
              </Typography>

              <Box sx={{ width: '100%', height: 300, minHeight: 300 }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                  <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#ccc" />
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

        {/* Breakdown */}
        <Grid xs={12} md={6}>
          <motion.div whileHover={{ scale: 1.03 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                background: (theme) => theme.palette.mode === 'dark' ? "linear-gradient(135deg, #134e5e, #71b280)" : "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                color: (theme) => theme.palette.mode === 'dark' ? "#fff" : "text.primary"
              }}
            >
              <Typography variant="h6">Stocks</Typography>
              <Typography variant="h5">$12,400</Typography>
              <Typography>Tech, Pharma, Banking</Typography>
            </Paper>
          </motion.div>
        </Grid>

        <Grid xs={12} md={6}>
          <motion.div whileHover={{ scale: 1.03 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                background: (theme) => theme.palette.mode === 'dark' ? "linear-gradient(135deg, #42275a, #734b6d)" : "linear-gradient(135deg, #f3e8ff, #e9d5ff)",
                color: (theme) => theme.palette.mode === 'dark' ? "#fff" : "text.primary"
              }}
            >
              <Typography variant="h6">Crypto</Typography>
              <Typography variant="h5">$30,450</Typography>
              <Typography>BTC, ETH, Altcoins</Typography>
            </Paper>
          </motion.div>
        </Grid>

      </Grid>
    </Box>
  );
}