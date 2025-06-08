import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import debounce from "lodash/debounce";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";

const NAVBAR_HEIGHT = 64;
const FOOTER_HEIGHT = 60;

const DrugInfo = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounced suggestions fetcher
  const fetchSuggestions = useCallback(
    debounce(async (searchText) => {
      if (!searchText.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(
          `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${searchText}*&limit=10`,
        );
        const names = res.data.results
          .map((item) => item.openfda.brand_name?.[0])
          .filter((v, i, a) => v && a.indexOf(v) === i);
        setSuggestions(names.slice(0, 5));
      } catch {
        setSuggestions([]);
      }
    }, 500),
    [],
  );

  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

  const fetchDrugDetails = async (name) => {
    setLoading(true);
    setError("");
    setSelectedDrugs([]);

    try {
      const res = await axios.get(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${name}"&limit=5`,
      );
      setSelectedDrugs(res.data.results || []);
    } catch {
      setError("No detailed drug info found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >
      <Navbar />

      <Container
        maxWidth="md"
        sx={{
          flexGrow: 1,
          pt: `${NAVBAR_HEIGHT + 24}px`,
          pb: `${FOOTER_HEIGHT + 24}px`,
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#1976d2",
            textAlign: "center",
            mb: 4,
            letterSpacing: 1,
          }}
        >
          🔍 Drug Information Search
        </Typography>

        <TextField
          label="Search by Drug Name"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          sx={{
            mb: 3,
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
          }}
          placeholder="Type a drug name (e.g., Aspirin, Ibuprofen)"
        />

        {suggestions.length > 0 && (
          <List
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              mb: 4,
              maxHeight: 200,
              overflowY: "auto",
            }}
          >
            {suggestions.map((suggestion, index) => (
              <ListItem disablePadding key={index} divider>
                <ListItemButton
                  onClick={() => {
                    setQuery(suggestion);
                    fetchDrugDetails(suggestion);
                    setSuggestions([]); // close suggestions after select
                  }}
                  sx={{
                    "&:hover": { backgroundColor: "#e3f2fd" },
                    cursor: "pointer",
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: "#0d47a1" }}>
                    {suggestion}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
            <CircularProgress size={48} thickness={5} />
          </Box>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 4, fontWeight: 600, fontSize: "1rem" }}
          >
            {error}
          </Alert>
        )}

        {selectedDrugs.length > 0 && (
          <Box>
            {selectedDrugs.map((drug, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.15 }}
              >
                <Card
                  sx={{
                    mb: 4,
                    borderRadius: 3,
                    boxShadow: "0 6px 20px rgba(32,33,36,.28)",
                    backgroundColor: "#fff",
                  }}
                  elevation={6}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      gutterBottom
                      sx={{ color: "#1565c0" }}
                    >
                      {drug.openfda.brand_name?.[0] ||
                        drug.openfda.generic_name?.[0] ||
                        "Unknown Drug"}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      Manufacturer:{" "}
                      {drug.openfda.manufacturer_name?.[0] || "N/A"}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography
                      variant="body1"
                      sx={{ mb: 1.5, lineHeight: 1.6, whiteSpace: "pre-line" }}
                    >
                      <strong>Usage:</strong>{" "}
                      {drug.indications_and_usage?.[0] || "N/A"}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{ mb: 1.5, lineHeight: 1.6, whiteSpace: "pre-line" }}
                    >
                      <strong>Dosage:</strong>{" "}
                      {drug.dosage_and_administration?.[0] || "N/A"}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{ mb: 1.5, lineHeight: 1.6, whiteSpace: "pre-line" }}
                    >
                      <strong>Side Effects:</strong>{" "}
                      {drug.adverse_reactions?.[0] || "N/A"}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{ mb: 1.5, lineHeight: 1.6, whiteSpace: "pre-line" }}
                    >
                      <strong>Warnings:</strong> {drug.warnings?.[0] || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default DrugInfo;
