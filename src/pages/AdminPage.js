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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Toolbar,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";

const API = "http://localhost:5000/api";

export default function Matrix() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);

  const names = ["themes", "events", "rules", "sponsors"];

  const currentName = names[tab];

  // ================= LOAD =================

  useEffect(() => {
    if (tab === 4) {
      loadRegistrations();
    } else {
      loadData();
    }
  }, [tab]);

  const loadData = async () => {
    const res = await fetch(`${API}/${currentName}`);
    setData(await res.json());
  };

  const loadRegistrations = async () => {
    const res = await fetch(`${API}/registrations`);
    setRegistrations(await res.json());
  };

  // ================= CREATE / UPDATE =================

  const handleSubmit = async () => {
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API}/${currentName}/${editingId}`
      : `${API}/${currentName}`;

    const payload =
      currentName === "rules"
        ? { text: form.text }
        : form;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setForm({});
    setEditingId(null);
    loadData();
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    await fetch(`${API}/${currentName}/${id}`, {
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
  };

  // ================= DELETE REGISTRATION =================

  const deleteRegistration = async (id) => {
    await fetch(`${API}/registrations/${id}`, {
      method: "DELETE",
    });
    loadRegistrations();
  };

  // ================= UI =================

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Admin Matrix
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
              {currentName !== "rules" && (
                <>
                  {(currentName === "themes" ||
                    currentName === "events") && (
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
                          value={form.desc || ""}
                          onChange={(e) =>
                            setForm({ ...form, desc: e.target.value })
                          }
                        />
                      </Grid>
                    </>
                  )}

                  {currentName === "sponsors" && (
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
                  )}

                  <Grid item xs={4}>
                    <TextField
                      label="Image URL"
                      fullWidth
                      value={form.img || ""}
                      onChange={(e) =>
                        setForm({ ...form, img: e.target.value })
                      }
                    />
                  </Grid>
                </>
              )}

              {currentName === "rules" && (
                <Grid item xs={6}>
                  <TextField
                    label="Rule Text"
                    fullWidth
                    value={form.text || ""}
                    onChange={(e) =>
                      setForm({ ...form, text: e.target.value })
                    }
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
              <Card
                key={item._id}
                sx={{ mb: 2, background: "rgba(255,255,255,0.05)" }}
              >
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
        <Paper sx={{ mt: 4 }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Registrations</Typography>
            <Button
              startIcon={<RefreshIcon />}
              onClick={loadRegistrations}
            >
              Refresh
            </Button>
          </Toolbar>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Team ID</TableCell>
                  <TableCell>Team Name</TableCell>
                  <TableCell>Theme</TableCell>
                  <TableCell>Lead</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {registrations.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.teamId}</TableCell>
                    <TableCell>{row.teamName}</TableCell>
                    <TableCell>{row.selectedTheme}</TableCell>
                    <TableCell>{row.teamLead}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => deleteRegistration(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}