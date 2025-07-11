import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { Log } from "../utils/logger";

const UrlShortenerPage = () => {
  const [urls, setUrls] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = async () => {
    await Log("frontend", "info", "page", "User submitted URL form");

    try {
      const payload = urls.map(({ longUrl, validity, shortcode }) => ({
        longUrl,
        validity: validity ? parseInt(validity) : 30,
        shortcode,
      }));

      // Replace this with your backend API
      const response = await fetch("http://localhost:5000/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      await Log("frontend", "error", "api", `API error: ${error.message}`);
      alert("Error occurred");
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urls.map((url, i) => (
        <Grid container spacing={2} key={i} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Long URL"
              fullWidth
              value={url.longUrl}
              onChange={(e) => handleChange(i, "longUrl", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Validity (min)"
              fullWidth
              value={url.validity}
              onChange={(e) => handleChange(i, "validity", e.target.value)}
              type="number"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Custom Code"
              fullWidth
              value={url.shortcode}
              onChange={(e) => handleChange(i, "shortcode", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}

      <Button variant="contained" onClick={addField} sx={{ mr: 2 }}>
        Add More
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>

      {results.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <Typography variant="h6">Results</Typography>
          {results.map((r, i) => (
            <div key={i}>
              <Typography>Short URL: <a href={`http://localhost:3000/${r.shortcode}`}>{r.shortcode}</a></Typography>
              <Typography>Expires At: {r.expiresAt}</Typography>
            </div>
          ))}
        </div>
      )}
    </Paper>
  );
};

export default UrlShortenerPage;
