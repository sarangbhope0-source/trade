import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Typography, Box } from "@mui/material";

export default function TradeChart({ data, title }) {
  const hasData = data && data.length > 0;

  return (
    // FIX: Added aspect and minHeight to the outer box
    <Box sx={{ width: "100%", height: "350px", display: "flex", flexDirection: "column" }}>
      {title && <Typography variant="h6" sx={{ mb: 2, color: "white", fontWeight: 700 }}>{title}</Typography>}
      
      <Box sx={{ flexGrow: 1, width: '100%', height: '100%', minHeight: '350px', position: 'relative' }}>
        {hasData ? (
          <ResponsiveContainer width="100%" height={350}> 
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="10 10" stroke="rgba(255,255,255,0.03)" vertical={true} />
              <XAxis dataKey="day" hide />
              <YAxis domain={['auto', 'auto']} hide />
              <Tooltip 
                cursor={{ stroke: '#6366f1', strokeWidth: 1 }}
                contentStyle={{ backgroundColor: "rgba(15, 18, 26, 0.95)", border: "1px solid rgba(99, 102, 241, 0.3)", borderRadius: "8px" }}
              />
              <Area type="monotone" dataKey="price" stroke="#6366f1" fill="url(#colorPrice)" strokeWidth={4} animationDuration={2000} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="rgba(255,255,255,0.3)">Synchronizing Neural Network...</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}