import { Typography, Box, Paper, Switch, FormControlLabel, Divider } from "@mui/material";

export default function Settings() {
  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Settings
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">General</Typography>
        <FormControlLabel control={<Switch defaultChecked />} label="Email Notifications" />
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Trading AI</Typography>
        <FormControlLabel control={<Switch defaultChecked />} label="Auto-Trade Execution" />
        <FormControlLabel control={<Switch />} label="High Risk Prediction Mode" />
      </Paper>
    </Box>
  );
}