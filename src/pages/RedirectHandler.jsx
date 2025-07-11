import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Log } from "../utils/logger";

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const redirect = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/${shortcode}`);
        window.location.href = res.data.longUrl;
      } catch (error) {
        await Log("frontend", "error", "api", `Redirect failed: ${error.message}`);
        alert("Invalid or expired URL.");
      }
    };

    redirect();
  }, [shortcode]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
