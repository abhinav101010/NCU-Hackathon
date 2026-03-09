import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  IconButton,
  Grid,
  Paper,
  Toolbar,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import { API } from "../../utils/common";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);

  const names = ["themes", "events", "rules", "sponsors"];
  const currentName = names[tab];

  const tiers = ["Silver", "Gold", "Platinum", "Co-Title", "Title"];

  // ================= REGISTRATION TABLE =================

  const columns = [
    { field: "teamId", headerName: "Team ID", width: 120 },
    { field: "teamName", headerName: "Team Name", width: 180 },
    { field: "selectedTheme", headerName: "Theme", width: 180 },

    { field: "teamLead", headerName: "Team Lead", width: 160 },
    { field: "teamLeadTshirt", headerName: "TL Size", width: 100 },
    { field: "teamLeadEmail", headerName: "Lead Email", width: 200 },

    { field: "phone", headerName: "Lead Phone", width: 140 },

    { field: "university", headerName: "University", width: 180 },
    { field: "yearCourse", headerName: "Year & Course", width: 160 },

    { field: "member1", headerName: "Member 1", width: 160 },
    { field: "member1Email", headerName: "M1 Email", width: 200 },
    { field: "member1Phone", headerName: "M1 Phone", width: 150 },
    { field: "member1Tshirt", headerName: "M1 Size", width: 100 },

    { field: "member2", headerName: "Member 2", width: 160 },
    { field: "member2Email", headerName: "M2 Email", width: 200 },
    { field: "member2Phone", headerName: "M2 Phone", width: 150 },
    { field: "member2Tshirt", headerName: "M2 Size", width: 100 },

    { field: "email", headerName: "Login Email", width: 200 },

    {
      field: "ideaDescription",
      headerName: "Idea",
      width: 350,
    },

    {
      field: "actions",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => deleteRegistration(params.row._id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  // ================= LOAD DATA =================

  const loadData = async () => {
    const res = await fetch(`${API}/api/${currentName}`);
    const json = await res.json();
    setData(json);
  };

  const loadRegistrations = async () => {
    const res = await fetch(`${API}/api/registrations`);
    const json = await res.json();
    setRegistrations(json);
  };

  useEffect(() => {
    if (tab === 4) loadRegistrations();
    else loadData();
  }, [tab]);

  // ================= SUBMIT =================

  const handleSubmit = async () => {
    const method = editingId ? "PUT" : "POST";

    const url = editingId
      ? `${API}/api/${currentName}/${editingId}`
      : `${API}/api/${currentName}`;

    if (currentName === "rules") {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: form.text }),
      });
    } else {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key !== "_id" && key !== "img") {
          formData.append(key, form[key]);
        }
      });

      if (image) formData.append("img", image);

      await fetch(url, {
        method,
        body: formData,
      });
    }

    setForm({});
    setImage(null);
    setEditingId(null);

    loadData();
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    await fetch(`${API}/api/${currentName}/${id}`, {
      method: "DELETE",
    });

    loadData();
  };

  // ================= EDIT =================

  const handleEdit = (item) => {
    setEditingId(item._id);

    let problemText = item.problemStatements || "";

    if (Array.isArray(problemText)) {
      problemText = problemText.join("\n");
    }

    setForm({
      ...item,
      problemStatements: problemText,
      days: item.days ? JSON.stringify(item.days, null, 2) : "",
    });

    setImage(null);
  };

  // ================= DELETE REGISTRATION =================

  const deleteRegistration = async (id) => {
    await fetch(`${API}/api/registrations/${id}`, {
      method: "DELETE",
    });

    loadRegistrations();
  };

  // ================= CSV =================

  const downloadCSV = () => {
    if (!registrations.length) return;

    const headers = Object.keys(registrations[0]);
    const rows = registrations.map((r) => headers.map((h) => r[h]));

    const csv = [headers, ...rows]
      .map((row) => row.map((v) => `"${v || ""}"`).join(","))
      .join("\n");

    const blob = new Blob([csv]);
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "registrations.csv";
    link.click();
  };

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // ================= UI =================

  return (
    <Container sx={{ mt: 10 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Admin Panel</Typography>

        <Button color="error" variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mt: 3 }}>
        <Tab label="Themes" />
        <Tab label="Events" />
        <Tab label="Rules" />
        <Tab label="Sponsors" />
        <Tab label="Registrations" />
      </Tabs>

      {/* ================= FORMS ================= */}

      {tab !== 4 && (
        <>
          <Box mt={4}>
            <Grid container spacing={2}>
              {/* THEMES */}

              {currentName === "themes" && (
                <>
                  <Grid item xs={6}>
                    <TextField
                      label="Theme Title"
                      fullWidth
                      value={form.title || ""}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Problem Statements (one per line)"
                      multiline
                      rows={6}
                      fullWidth
                      value={form.problemStatements || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          problemStatements: e.target.value,
                        })
                      }
                    />
                  </Grid>
                </>
              )}

              {/* EVENTS */}

              {currentName === "events" && (
                <>
                  <Grid item xs={4}>
                    <TextField
                      label="Event Title"
                      fullWidth
                      value={form.title || ""}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      label="Event Date"
                      fullWidth
                      value={form.date || ""}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Schedule JSON"
                      multiline
                      rows={10}
                      fullWidth
                      value={form.days || ""}
                      onChange={(e) =>
                        setForm({ ...form, days: e.target.value })
                      }
                    />
                  </Grid>
                </>
              )}

              {/* SPONSORS */}

              {currentName === "sponsors" && (
                <>
                  <Grid item xs={4}>
                    <TextField
                      label="Sponsor Name"
                      fullWidth
                      value={form.name || ""}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      select
                      label="Tier"
                      fullWidth
                      value={form.tier || ""}
                      onChange={(e) =>
                        setForm({ ...form, tier: e.target.value })
                      }
                    >
                      {tiers.map((tier) => (
                        <MenuItem key={tier} value={tier}>
                          {tier}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              )}

              {/* IMAGE */}

              {currentName !== "rules" && (
                <Grid item xs={4}>
                  <Button variant="outlined" component="label" fullWidth>
                    Upload Image
                    <input
                      hidden
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </Button>
                </Grid>
              )}

              {/* RULES */}

              {currentName === "rules" && (
                <Grid item xs={6}>
                  <TextField
                    label="Rule Text"
                    fullWidth
                    value={form.text || ""}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                  />
                </Grid>
              )}
            </Grid>

            <Box mt={3}>
              <Button variant="contained" onClick={handleSubmit}>
                {editingId ? "Update" : "Add"}
              </Button>
            </Box>
          </Box>

          {/* ================= LIST ================= */}

          <Box mt={4}>
            {data.map((item) => (
              <Card key={item._id} sx={{ mb: 2 }}>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h6">
                      {currentName === "rules"
                        ? item.text
                        : item.title || item.name}
                    </Typography>
                  </Box>

                  <Box>
                    <IconButton onClick={() => handleEdit(item)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}

      {/* ================= REGISTRATIONS ================= */}

      {tab === 4 && (
        <Paper sx={{ mt: 4, height: 600 }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Registrations</Typography>

            <Box>
              <Button startIcon={<RefreshIcon />} onClick={loadRegistrations}>
                Refresh
              </Button>

              <Button variant="contained" onClick={downloadCSV}>
                Download CSV
              </Button>
            </Box>
          </Toolbar>

          <DataGrid
            rows={registrations}
            columns={columns}
            getRowId={(row) => row._id}
            pageSizeOptions={[10, 25, 50]}
            slots={{ toolbar: GridToolbar }}
          />
        </Paper>
      )}
    </Container>
  );
}
