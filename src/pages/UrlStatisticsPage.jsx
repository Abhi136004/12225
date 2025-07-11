import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { Log } from "../utils/logger";

const UrlStatisticsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stats");
        setStats(res.data);
        await Log("frontend", "info", "api", "Fetched stats successfully");
      } catch (error) {
        await Log("frontend", "error", "api", error.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <Paper sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>Statistics</Typography>
      <List>
        {stats.map((item, i) => (
          <ListItem key={i}>
            <ListItemText
              primary={`Shortcode: ${item.shortcode}`}
              secondary={
                <>
                  <Typography>Created: {item.createdAt}</Typography>
                  <Typography>Expires: {item.expiresAt}</Typography>
                  <Typography>Clicks: {item.clicks.length}</Typography>
                  {item.clicks.map((click, idx) => (
                    <Typography key={idx}>Click at: {click.timestamp}</Typography>
                  ))}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UrlStatisticsPage;
