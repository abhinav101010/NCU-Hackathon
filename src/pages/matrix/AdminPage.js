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

export default function AdminPage() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);
  const names = ["themes", "events", "rules", "sponsors"];
  const currentName = names[tab];

  const tiers = ["Silver", "Gold", "Platinum", "Co-Title", "Title"];

  const columns = [
    { field: "teamId", headerName: "Team ID", width: 120 },
    { field: "teamName", headerName: "Team Name", width: 180 },
    { field: "selectedTheme", headerName: "Theme", width: 180 },

    { field: "teamLead", headerName: "Team Lead", width: 160 },
    { field: "teamLeadTshirt", headerName: "TL Size", width: 100 },

    { field: "teamLeadEmail", headerName: "Lead Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 140 },
    { field: "university", headerName: "University", width: 180 },
    { field: "yearCourse", headerName: "Year & Course", width: 160 },

    { field: "member1", headerName: "Member 1", width: 160 },
    { field: "member1Tshirt", headerName: "M1 Size", width: 100 },

    { field: "member2", headerName: "Member 2", width: 160 },
    { field: "member2Tshirt", headerName: "M2 Size", width: 100 },

    { field: "email", headerName: "Login Email", width: 200 },
    { field: "ideaDescription", headerName: "Idea", width: 300 },

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

  // ================= LOAD =================

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
    if (tab === 4) {
      loadRegistrations();
    } else {
      loadData();
    }
  }, [tab]);

  // ================= CREATE / UPDATE =================

  const handleSubmit = async () => {
    const method = editingId ? "PUT" : "POST";

    const url = editingId
      ? `${API}/api/${currentName}/${editingId}`
      : `${API}/api/${currentName}`;

    if (currentName === "rules") {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: form.text }),
      });
    } else {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key !== "_id" && key !== "img") {
          formData.append(key, form[key]);
        }
      });

      if (image) {
        formData.append("img", image);
      }

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

    if (currentName === "rules") {
      setForm({ text: item.text });
    } else {
      setForm(item);
    }

    setImage(null);
  };

  // ================= DELETE REGISTRATION =================

  const deleteRegistration = async (id) => {
    await fetch(`${API}/api/registrations/${id}`, {
      method: "DELETE",
    });

    loadRegistrations();
  };

  // ================= Download CSV ====================
  const downloadCSV = () => {
    if (!registrations.length) return;

    const headers = [
      "Team ID",
      "Team Name",
      "Theme",
      "Team Lead",
      "TL Shirt Size",
      "Lead Email",
      "Phone",
      "University",
      "Year & Course",
      "Member 1",
      "M1 Shirt Size",
      "Member 2",
      "M2 Shirt Size",
      "Login Email",
      "Idea Description",
    ];

    const rows = registrations.map((r) => [
      r.teamId,
      r.teamName,
      r.selectedTheme,
      r.teamLead,
      r.teamLeadTshirt,
      r.teamLeadEmail,
      r.phone,
      r.university,
      r.yearCourse,
      r.member1,
      r.member1Tshirt,
      r.member2,
      r.member2Tshirt,
      r.email,
      r.ideaDescription,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((v) => `"${v || ""}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "registrations.csv";
    link.click();
  };

  // ================= Size Summary ================
  const getSizeSummary = () => {
    const summary = {
      XS: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
    };

    registrations.forEach((r) => {
      if (summary[r.teamLeadTshirt] !== undefined) summary[r.teamLeadTshirt]++;

      if (summary[r.member1Tshirt] !== undefined) summary[r.member1Tshirt]++;

      if (summary[r.member2Tshirt] !== undefined) summary[r.member2Tshirt]++;
    });

    return summary;
  };
  const sizeSummary = getSizeSummary();

  // ================= UI =================

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Themes" />
        <Tab label="Events" />
        <Tab label="Rules" />
        <Tab label="Sponsors" />
        <Tab label="Registrations" />
      </Tabs>

      {/* ================= CRUD SECTION ================= */}

      {tab !== 4 && (
        <>
          <Box mt={3}>
            <Grid container spacing={2}>
              {(currentName === "themes" || currentName === "events") && (
                <>
                  <Grid item xs={4}>
                    <TextField
                      label="Title"
                      fullWidth
                      value={form.title || ""}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      label="Description"
                      fullWidth
                      multiline
                      rows={3}
                      value={form.desc || ""}
                      onChange={(e) =>
                        setForm({ ...form, desc: e.target.value })
                      }
                    />
                  </Grid>

                  {currentName === "events" && (
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
                  )}
                </>
              )}

              {/* SPONSOR FIELDS */}

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
                      sx={{
                        minWidth: 150,
                      }}
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

              {/* IMAGE FIELD */}

              {currentName !== "rules" && (
                <Grid item xs={4}>
                  <Button variant="outlined" component="label" fullWidth>
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </Button>

                  {image && (
                    <Typography sx={{ mt: 1, fontSize: 12 }}>
                      {image.name}
                    </Typography>
                  )}
                </Grid>
              )}

              {/* RULES FIELD */}

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

            <Box mt={2}>
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
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h6">
                      {currentName === "rules"
                        ? item.text
                        : item.title || item.name}
                    </Typography>

                    {item.desc && (
                      <Typography color="gray">{item.desc}</Typography>
                    )}

                    {item.date && (
                      <Typography color="gray" sx={{ fontSize: 12 }}>
                        {item.date}
                      </Typography>
                    )}

                    {/* SHOW TIER */}

                    {currentName === "sponsors" && item.tier && (
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "primary.main",
                          mt: 0.5,
                        }}
                      >
                        Tier: {item.tier}
                      </Typography>
                    )}
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

      {/* ================= REGISTRATION TABLE ================= */}

      {tab === 4 && (
        <Paper sx={{ mt: 4, height: 600 }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Registrations</Typography>
            <Box mt={4} mb={2}>
              <Grid container spacing={2}>
                {Object.entries(sizeSummary).map(([size, count]) => (
                  <Grid item key={size}>
                    <Card sx={{ px: 3, py: 1, textAlign: "center" }}>
                      <Typography variant="h6">
                        {size} : {count}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box>
              <Button
                startIcon={<RefreshIcon />}
                onClick={loadRegistrations}
                sx={{ mr: 2 }}
              >
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
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            sx={{
              border: "none",
            }}
          />
        </Paper>
      )}
    </Container>
  );
}
