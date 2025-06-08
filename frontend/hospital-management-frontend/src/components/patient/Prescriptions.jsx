import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled Components
const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: "900px",
  margin: "auto",
  "@media print": {
    padding: "0",
    width: "100%",
    maxWidth: "100%",
    margin: 0,
  },
}));

const PrescriptionCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  marginBottom: theme.spacing(3),
  "@media print": {
    boxShadow: "none",
    pageBreakInside: "avoid",
    border: "2px solid #2196f3",
    borderRadius: "12px",
    margin: "0",
    background: "#fff",
  },
}));

const PrescriptionHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  padding: theme.spacing(3),
  borderRadius: "12px 12px 0 0",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "100px",
    height: "100px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
    transform: "translate(30px, -30px)",
  },
  "@media print": {
    background: "#2196f3 !important",
    WebkitPrintColorAdjust: "exact",
    colorAdjust: "exact",
    printColorAdjust: "exact",
  },
}));

const PrescriptionBody = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(4),
  "@media print": {
    padding: "30px !important",
  },
}));

const InfoSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  backgroundColor: "#f8fafc",
  borderLeft: "4px solid #3f51b5",
  marginBottom: theme.spacing(2),
  "@media print": {
    backgroundColor: "#f8fafc !important",
    WebkitPrintColorAdjust: "exact",
    colorAdjust: "exact",
    printColorAdjust: "exact",
    border: "1px solid #e0e0e0",
    borderLeft: "4px solid #3f51b5 !important",
  },
}));

const MedicineCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#fff",
  border: "1px solid #e3f2fd",
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  "@media print": {
    backgroundColor: "#fff !important",
    border: "1px solid #e0e0e0 !important",
    boxShadow: "none",
    WebkitPrintColorAdjust: "exact",
    colorAdjust: "exact",
    printColorAdjust: "exact",
  },
}));

const PrintWatermark = styled(Box)({
  "@media print": {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-45deg)",
    fontSize: "72px",
    color: "rgba(0,0,0,0.05)",
    fontWeight: "bold",
    zIndex: -1,
    userSelect: "none",
    pointerEvents: "none",
  },
});

const PrintStyles = styled("style")`
  @media print {
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      background: white !important;
      font-family: "Times New Roman", serif !important;
    }

    button,
    .no-print {
      display: none !important;
    }

    html,
    body {
      height: auto !important;
      width: 100% !important;
      overflow: visible !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    @page {
      size: A4 portrait;
      margin: 20mm;
    }

    .prescription-content {
      page-break-inside: avoid;
      margin: 0;
      padding: 0;
    }

    .print-footer {
      position: fixed;
      bottom: 10mm;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 10px;
      color: #666;
      border-top: 1px solid #ddd;
      padding-top: 5px;
    }
  }
`;

// Helper function to capitalize names
const capitalizeName = (name) => {
  if (!name) return "N/A";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Helper function to validate and format doctor name
const formatDoctorName = (doctorName) => {
  if (!doctorName) return "N/A";
  // Check if doctorName is an email
  if (doctorName.includes("@")) return doctorName; // Display email as-is
  return `${capitalizeName(doctorName)}`;
};

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const pdfRef = React.useRef(null);

  // Load all prescriptions
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication failed. Please log in again.");
          setLoading(false);
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const userEmail = payload.sub?.toLowerCase();

        const response = await axios.get(
          "http://localhost:8080/hospital/api/prescriptions/my-prescriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const filtered = response.data.filter(
          (p) =>
            p.patientEmail?.toLowerCase() === userEmail && p.issued === true,
        );

        setPrescriptions(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Error loading prescriptions:", err.message);
        setError("Could not load prescriptions.");
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  // Show selected prescription
  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
  };

  // Go back to list
  const handleBackToList = () => {
    setSelectedPrescription(null);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (selectedPrescription) {
    return (
      <>
        <PrintStyles />
        <PrintWatermark>PRESCRIPTION</PrintWatermark>
        <StyledContainer>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            className="no-print"
          >
            <Button
              variant="outlined"
              onClick={handleBackToList}
              sx={{ borderRadius: 2 }}
            >
              ← Back to List
            </Button>
            <Button
              variant="contained"
              onClick={window.print}
              sx={{
                borderRadius: 2,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
              }}
            >
              🖨️ Print Prescription
            </Button>
          </Box>

          <PrescriptionCard
            ref={pdfRef}
            elevation={0}
            className="prescription-content"
          >
            <PrescriptionHeader>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                    MEDICAL PRESCRIPTION
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Official Medical Document
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  textAlign={{ xs: "left", md: "right" }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Rx #{selectedPrescription.id || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {new Date(selectedPrescription.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </PrescriptionHeader>

            <PrescriptionBody>
              <Grid container spacing={3}>
                {/* Doctor Information */}
                <Grid item xs={12} md={6}>
                  <InfoSection elevation={0}>
                    <Typography
                      variant="h6"
                      color="primary"
                      fontWeight="bold"
                      gutterBottom
                    >
                      👨‍⚕️ Prescribing Physician
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                      {formatDoctorName(selectedPrescription.doctorName)}
                    </Typography>
                    <Typography color="text.secondary">
                      Licensed Medical Practitioner
                    </Typography>
                  </InfoSection>
                </Grid>

                {/* Patient Information */}
                <Grid item xs={12} md={6}>
                  <InfoSection elevation={0}>
                    <Typography
                      variant="h6"
                      color="primary"
                      fontWeight="bold"
                      gutterBottom
                    >
                      👤 Patient Information
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                      {capitalizeName(selectedPrescription.patientName)}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 0.5 }}>
                      📧 {selectedPrescription.patientEmail || "N/A"}
                    </Typography>
                    <Chip
                      label={
                        selectedPrescription.issued ? "✅ Issued" : "⏳ Pending"
                      }
                      color={
                        selectedPrescription.issued ? "success" : "warning"
                      }
                      size="small"
                    />
                  </InfoSection>
                </Grid>

                {/* Instructions */}
                <Grid item xs={12}>
                  <InfoSection elevation={0}>
                    <Typography
                      variant="h6"
                      color="primary"
                      fontWeight="bold"
                      gutterBottom
                    >
                      📋 Medical Instructions
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.8,
                        fontStyle: selectedPrescription.instructions
                          ? "normal"
                          : "italic",
                        color: selectedPrescription.instructions
                          ? "text.primary"
                          : "text.secondary",
                      }}
                    >
                      {selectedPrescription.instructions ||
                        "No specific instructions provided. Please follow standard medication guidelines and consult your physician if you have any questions."}
                    </Typography>
                  </InfoSection>
                </Grid>

                {/* Medicines */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    💊 Prescribed Medications
                  </Typography>
                  {selectedPrescription.medicines &&
                  selectedPrescription.medicines.length > 0 ? (
                    <Grid container spacing={2}>
                      {selectedPrescription.medicines.map((med, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                          <MedicineCard elevation={0}>
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              color="primary"
                            >
                              {med}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              As prescribed by physician
                            </Typography>
                          </MedicineCard>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <MedicineCard elevation={0}>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        fontStyle="italic"
                      >
                        No medications listed in this prescription.
                      </Typography>
                    </MedicineCard>
                  )}
                </Grid>

                {/* Important Notes */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      backgroundColor: "#fff3e0",
                      border: "1px solid #ffb74d",
                      "@media print": {
                        backgroundColor: "#fff3e0 !important",
                        WebkitPrintColorAdjust: "exact",
                        colorAdjust: "exact",
                        printColorAdjust: "exact",
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      <strong>⚠️ Important Notes:</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Take medications as prescribed by your physician
                      <br />
                      • Complete the full course even if you feel better
                      <br />
                      • Contact your doctor if you experience any adverse
                      reactions
                      <br />• Keep this prescription for your medical records
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              {/* Footer */}
              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  This prescription is valid and has been issued digitally.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Generated on {new Date().toLocaleString()}
                </Typography>
              </Box>
            </PrescriptionBody>
          </PrescriptionCard>

          {/* Print Footer */}
          <div className="print-footer">
            Digital Prescription System - Confidential Medical Document
          </div>
        </StyledContainer>
      </>
    );
  }

  return (
    <StyledContainer>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
        sx={{
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 4,
        }}
      >
        My Prescriptions
      </Typography>
      {prescriptions.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            📋 No prescriptions found
          </Typography>
          <Typography color="text.secondary">
            Your issued prescriptions will appear here.
          </Typography>
        </Box>
      ) : (
        <Fade in timeout={600}>
          <Stack spacing={3}>
            {prescriptions.map((p, index) => (
              <PrescriptionCard key={index} elevation={3}>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: "250px" }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        fontWeight="bold"
                        color="primary"
                      >
                        {formatDoctorName(p.doctorName)}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mb: 0.5 }}>
                        👤 Patient: {capitalizeName(p.patientName)}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mb: 0.5 }}>
                        📧 Email: {p.patientEmail || "N/A"}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mb: 1 }}>
                        📅 Date:{" "}
                        {new Date(p.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Typography>
                      <Chip
                        label={p.issued ? "✅ Issued" : "⏳ Pending"}
                        color={p.issued ? "success" : "warning"}
                        size="small"
                      />
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => handleViewPrescription(p)}
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        background:
                          "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                      }}
                    >
                      View & Print
                    </Button>
                  </Box>
                </CardContent>
              </PrescriptionCard>
            ))}
          </Stack>
        </Fade>
      )}
    </StyledContainer>
  );
};

export default Prescriptions;
