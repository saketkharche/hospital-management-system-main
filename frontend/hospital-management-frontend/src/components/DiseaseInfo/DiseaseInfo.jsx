import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  CardActions,
  Link,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";

// Custom hook for 3D tilt effect
const useTilt = () => {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (event) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element.
    const y = event.clientY - rect.top; // y position within the element.

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    // Calculate rotation degrees (-15deg to 15deg)
    const rotateX = ((y - midY) / midY) * 15;
    const rotateY = ((x - midX) / midX) * 15;

    setStyle({
      transform: `perspective(600px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: "transform 0.1s ease-out",
      boxShadow: "0 20px 30px rgba(25, 118, 210, 0.3)",
      cursor: "pointer",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease",
      boxShadow: "0 4px 15px rgba(25, 118, 210, 0.1)",
      cursor: "default",
    });
  };

  return { ref, style, handleMouseMove, handleMouseLeave };
};

// Separate card component that uses the hook
const DiseaseCard = ({ disease }) => {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt();

  return (
    <Card
      ref={ref}
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 4px 15px rgba(25, 118, 210, 0.1)",
        borderRadius: 3,
        backgroundColor: "#f9fafd",
        transition: "box-shadow 0.3s ease",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1565c0" }}
        >
          {disease.name}
        </Typography>
        {disease.primary && (
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            ({disease.primary})
          </Typography>
        )}
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>ICD-9 Code:</strong> {disease.icd9}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.primary", lineHeight: 1.5, whiteSpace: "pre-line" }}
        >
          <strong>Description:</strong> {disease.desc}
        </Typography>
      </CardContent>

      {disease.links.length > 0 && (
        <CardActions sx={{ flexWrap: "wrap", px: 2, pb: 2, pt: 0, gap: 1 }}>
          {disease.links.map(([url, title], i) => (
            <Link
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                fontSize: "0.875rem",
                color: "#1565c0",
                "&:hover": { color: "#0d47a1" },
              }}
            >
              {title}
            </Link>
          ))}
        </CardActions>
      )}
    </Card>
  );
};

const DiseaseInfo = () => {
  const [searchTerm, setSearchTerm] = useState("gastro");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDiseases = async () => {
    const trimmedTerm = searchTerm.trim().toLowerCase();
    if (!trimmedTerm) {
      setError("Please enter a valid search term.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://clinicaltables.nlm.nih.gov/api/conditions/v3/search`,
        {
          params: {
            terms: trimmedTerm,
            df: "consumer_name,primary_name",
            ef: "term_icd9_code:icd9,term_icd9_text:desc,info_link_data:links",
            maxList: 10,
          },
        }
      );

      const [_, codes, extraFields, display] = response.data;

      const baseDiseases = codes.map((code, idx) => ({
        id: code,
        name: display[idx]?.[0] || "Unknown",
        primary: display[idx]?.[1] || "",
        icd9: extraFields.icd9?.[idx] || "N/A",
        desc: extraFields.desc?.[idx] || "No description available.",
        links: extraFields.links?.[idx] || [],
      }));

      setResults(baseDiseases);
    } catch (error) {
      console.error("❌ Disease fetch error:", error);
      setError("Failed to load disease information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiseases();
  }, []);

  return (
    <Box p={3} maxWidth="1000px" mx="auto">
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2", textAlign: "center", mb: 4 }}
      >
        Disease Information Search
      </Typography>

      <Box display="flex" gap={2} mb={4}>
        <TextField
          label="Search for a disease"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          fullWidth
          size="medium"
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchDiseases();
          }}
        />
        <Button variant="contained" onClick={fetchDiseases} sx={{ px: 4 }} size="medium">
          Search
        </Button>
      </Box>

      {loading && (
        <Box textAlign="center" my={4}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4, fontWeight: "medium" }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {results.map((disease, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DiseaseCard disease={disease} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DiseaseInfo;
