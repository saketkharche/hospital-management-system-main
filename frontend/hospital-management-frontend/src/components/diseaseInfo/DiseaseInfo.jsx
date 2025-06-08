import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
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
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

// Custom hook for 3D tilt effect
const useTilt = () => {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (event) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * 15;
    const rotateY = ((x - midX) / midX) * 15;

    setStyle({
      transform: `perspective(600px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: "transform 0.1s ease-out",
      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)",
      cursor: "pointer",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      cursor: "default",
    });
  };

  return { ref, style, handleMouseMove, handleMouseLeave };
};

// Disease Card Component
const DiseaseCard = ({ disease, theme }) => {
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
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        border: `1px solid ${theme.palette.divider}`,
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
          sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
        >
          {disease.name}
        </Typography>
        {disease.primary && (
          <Typography variant="subtitle2" color={theme.palette.text.secondary} gutterBottom>
            ({disease.primary})
          </Typography>
        )}
        <Divider sx={{ my: 1, bgcolor: theme.palette.divider }} />
        <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.primary }}>
          <strong>ICD-9 Code:</strong> {disease.icd9}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.primary, lineHeight: 1.5, whiteSpace: "pre-line" }}
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
                color: theme.palette.primary.main,
                "&:hover": { color: theme.palette.primary.dark },
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
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Create theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#42a5f5" : "#1976d2",
            dark: darkMode ? "#0288d1" : "#0d47a1",
          },
          background: {
            default: darkMode ? "#121212" : "#f5f5f5",
            paper: darkMode ? "#1e1e1e" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#e0e0e0" : "#212121",
            secondary: darkMode ? "#b0bec5" : "#424242",
          },
          action: {
            hover: darkMode ? "#37474f" : "#e3f2fd",
            selected: darkMode ? "#0288d1" : "#bbdefb",
          },
          divider: darkMode ? "#444" : "#e0e0e0",
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
                border: `1px solid ${darkMode ? "#444" : "#e0e0e0"}`,
                borderRadius: 12,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: darkMode
                    ? "0 8px 24px rgba(0, 0, 0, 0.5)"
                    : "0 8px 24px rgba(0, 0, 0, 0.1)",
                },
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              root: {
                color: darkMode ? "#e0e0e0" : "#212121",
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                color: darkMode ? "#e0e0e0" : "#212121",
                backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  backgroundColor: darkMode ? "#2e2e2e" : "#ffffff",
                  "& fieldset": {
                    borderColor: darkMode ? "#444" : "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: darkMode ? "#666" : "#1976d2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: darkMode ? "#42a5f5" : "#1976d2",
                  },
                },
                "& .MuiInputBase-input": {
                  color: darkMode ? "#e0e0e0" : "#212121",
                },
                "& .MuiInputLabel-root": {
                  color: darkMode ? "#b0bec5" : "#424242",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: darkMode ? "#42a5f5" : "#1976d2",
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: "none",
                fontWeight: 500,
                padding: "8px 24px",
                boxShadow: darkMode
                  ? "0 4px 12px rgba(0, 0, 0, 0.3)"
                  : "0 4px 12px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: darkMode
                    ? "0 6px 16px rgba(0, 0, 0, 0.4)"
                    : "0 6px 16px rgba(0, 0, 0, 0.15)",
                },
              },
            },
          },
        },
      }),
    [darkMode]
  );

  const handleThemeToggle = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const fetchDiseases = useCallback(async () => {
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

      const [, codes, extraFields, display] = response.data;

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
  }, [searchTerm]);

  useEffect(() => {
    fetchDiseases();
  }, [fetchDiseases]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          p: { xs: 2, sm: 3 },
          bgcolor: theme.palette.background.default,
          minHeight: "100vh",
          background: darkMode
            ? "linear-gradient(180deg, #121212, #1e1e1e)"
            : "linear-gradient(180deg, #f5f5f5, #ffffff)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Disease Information Search
          </Typography>
          <IconButton
            onClick={handleThemeToggle}
            color="inherit"
            aria-label="toggle dark mode"
            sx={{
              bgcolor: theme.palette.action.hover,
              borderRadius: "50%",
              p: 1,
            }}
          >
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>

        <Box
          display="flex"
          gap={2}
          mb={4}
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
                transition: "all 0.3s ease",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={fetchDiseases}
            size="medium"
            sx={{
              borderRadius: 8,
              px: 4,
              py: 1.5,
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            Search
          </Button>
        </Box>

        {loading && (
          <Box textAlign="center" my={4}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
              fontWeight: "medium",
              bgcolor: darkMode ? "#2e2e2e" : "#fff",
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {results.map((disease, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <DiseaseCard disease={disease} theme={theme} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default DiseaseInfo;