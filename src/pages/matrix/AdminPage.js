import React, { useEffect, useState } from "react";
import {
  Box, Typography, Button, TextField,
  IconButton, MenuItem, Chip, Grid,
  InputAdornment, Drawer, useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { motion, AnimatePresence } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import GroupsIcon from "@mui/icons-material/Groups";
import PaletteIcon from "@mui/icons-material/Palette";
import EventIcon from "@mui/icons-material/Event";
import GavelIcon from "@mui/icons-material/Gavel";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { API } from "../../utils/common";
import { useNavigate } from "react-router-dom";

const NAV = [
  { id: 0, label: "Themes",        icon: <PaletteIcon />,   name: "themes"   },
  { id: 1, label: "Events",        icon: <EventIcon />,     name: "events"   },
  { id: 2, label: "Rules",         icon: <GavelIcon />,     name: "rules"    },
  { id: 3, label: "Sponsors",      icon: <HandshakeIcon />, name: "sponsors" },
  { id: 4, label: "Registrations", icon: <ListAltIcon />,   name: null       },
];

const TIERS = ["Silver", "Gold", "Platinum", "Co-Title", "Title"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const NAV_H = 64;

// ─── STYLED FIELD ─────────────────────────────────────────────────────────────
function AdminField({ sx, ...props }) {
  const theme = useTheme();
  const p = theme.palette.primary.main;
  const isDark = theme.palette.mode === "dark";
  return (
    <TextField fullWidth size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
          "& fieldset": { borderColor: `${p}28` },
          "&:hover fieldset": { borderColor: `${p}55` },
          "&.Mui-focused fieldset": { borderColor: p, boxShadow: `0 0 0 3px ${p}18` },
        },
        "& .MuiInputLabel-root.Mui-focused": { color: p },
        ...sx,
      }}
      {...props}
    />
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color }) {
  const theme = useTheme();
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.18 }}>
      <Box sx={{
        p: 2, borderRadius: "16px",
        border: `1px solid ${color}33`,
        background: theme.palette.mode === "dark"
          ? `linear-gradient(135deg, ${color}12, ${color}06)`
          : `linear-gradient(135deg, ${color}10, ${color}04)`,
        display: "flex", alignItems: "center", gap: 1.5,
      }}>
        <Box sx={{
          width: 38, height: 38, borderRadius: "10px", flexShrink: 0,
          background: `${color}20`, border: `1px solid ${color}33`,
          display: "flex", alignItems: "center", justifyContent: "center", color,
        }}>
          {icon}
        </Box>
        <Box>
          <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.3rem", color, lineHeight: 1 }}>
            {value}
          </Typography>
          <Typography sx={{ fontSize: "0.68rem", color: "text.secondary", letterSpacing: "0.05em", mt: 0.2 }}>
            {label}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}

// ─── SIZE CHIP ────────────────────────────────────────────────────────────────
function SizeChip({ size, count, color }) {
  return (
    <Box sx={{
      display: "flex", flexDirection: "column", alignItems: "center",
      px: 1.5, py: 1.2, borderRadius: "12px",
      border: `1px solid ${color}33`, background: `${color}10`, minWidth: 52,
    }}>
      <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color, lineHeight: 1 }}>
        {count}
      </Typography>
      <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, color: "text.secondary", letterSpacing: "0.08em", mt: 0.3 }}>
        {size}
      </Typography>
    </Box>
  );
}

// ─── SIDEBAR CONTENT ─────────────────────────────────────────────────────────
function SidebarContent({ tab, setTab, registrations, primary, theme, handleLogout, onNavClick }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", pt: 2.5, pb: 2 }}>
      <Box sx={{ px: 2.5, mb: 3 }}>
        <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "0.95rem", color: primary, letterSpacing: "0.06em" }}>
          INNOVATHON
        </Typography>
        <Typography sx={{ fontSize: "0.62rem", color: "text.disabled", letterSpacing: "0.1em" }}>
          ADMIN PANEL
        </Typography>
      </Box>

      <Box sx={{ flex: 1, px: 1.5, display: "flex", flexDirection: "column", gap: 0.5, overflowY: "auto" }}>
        {NAV.map((item) => {
          const active = tab === item.id;
          return (
            <Box key={item.id}
              onClick={() => { setTab(item.id); onNavClick?.(); }}
              sx={{
                display: "flex", alignItems: "center", gap: 1.5,
                px: 1.5, py: 1.1, borderRadius: "12px", cursor: "pointer",
                background: active ? `${primary}18` : "transparent",
                border: active ? `1px solid ${primary}44` : "1px solid transparent",
                color: active ? primary : theme.palette.text.secondary,
                fontWeight: active ? 700 : 400, fontSize: "0.84rem",
                transition: "all 0.2s ease",
                "&:hover": { background: `${primary}0e`, color: primary },
              }}>
              <Box sx={{ display: "flex", fontSize: "1.05rem", opacity: active ? 1 : 0.55 }}>
                {item.icon}
              </Box>
              {item.label}
              {item.id === 4 && registrations.length > 0 && (
                <Chip label={registrations.length} size="small" sx={{
                  ml: "auto", height: 18, fontSize: "0.6rem", fontWeight: 700,
                  background: `${primary}20`, color: primary,
                  border: `1px solid ${primary}44`, borderRadius: "6px",
                  "& .MuiChip-label": { px: "5px" },
                }} />
              )}
            </Box>
          );
        })}
      </Box>

      <Box sx={{ px: 1.5, mt: 1 }}>
        <Box onClick={handleLogout} sx={{
          display: "flex", alignItems: "center", gap: 1.5,
          px: 1.5, py: 1.1, borderRadius: "12px", cursor: "pointer",
          color: theme.palette.error.main, fontSize: "0.84rem", fontWeight: 600,
          border: "1px solid transparent", transition: "all 0.2s",
          "&:hover": { background: `${theme.palette.error.main}12`, border: `1px solid ${theme.palette.error.main}33` },
        }}>
          <LogoutIcon sx={{ fontSize: "1.05rem" }} />
          Logout
        </Box>
      </Box>
    </Box>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const theme     = useTheme();
  const primary   = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const isDark    = theme.palette.mode === "dark";
  const navigate  = useNavigate();
  const isMobile  = useMediaQuery(theme.breakpoints.down("md"));

  const [tab, setTab]             = useState(0);
  const [data, setData]           = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [form, setForm]           = useState({});
  const [editingId, setEditingId] = useState(null);
  const [image, setImage]         = useState(null);
  const [search, setSearch]       = useState("");
  const [formOpen, setFormOpen]   = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentName = NAV[tab]?.name;

  const loadData = async () => {
    if (!currentName) return;
    const res  = await fetch(`${API}/api/${currentName}`);
    const json = await res.json();
    setData(json);
  };

  const loadRegistrations = async () => {
    const res  = await fetch(`${API}/api/registrations`);
    const json = await res.json();
    setRegistrations(json);
  };

  useEffect(() => {
    if (tab === 4) loadRegistrations();
    else loadData();
    setForm({}); setEditingId(null); setFormOpen(false);
  }, [tab]);

  const handleSubmit = async () => {
    const method = editingId ? "PUT" : "POST";
    const url    = editingId ? `${API}/api/${currentName}/${editingId}` : `${API}/api/${currentName}`;
    if (currentName === "rules") {
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: form.text }) });
    } else {
      const fd = new FormData();
      Object.keys(form).forEach((k) => { if (k !== "_id" && k !== "img") fd.append(k, form[k]); });
      if (image) fd.append("img", image);
      await fetch(url, { method, body: fd });
    }
    setForm({}); setImage(null); setEditingId(null); setFormOpen(false);
    loadData();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/api/${currentName}/${id}`, { method: "DELETE" });
    loadData();
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    let ps = item.problemStatements || "";
    if (Array.isArray(ps)) ps = ps.join("\n");
    setForm({ ...item, problemStatements: ps, days: item.days ? JSON.stringify(item.days, null, 2) : "" });
    setImage(null);
    setFormOpen(true);
  };

  const deleteRegistration = async (id) => {
    await fetch(`${API}/api/registrations/${id}`, { method: "DELETE" });
    loadRegistrations();
  };

  const downloadCSV = () => {
    if (!registrations.length) return;
    const headers = Object.keys(registrations[0]);
    const rows    = registrations.map((r) => headers.map((h) => r[h]));
    const csv     = [headers, ...rows].map((row) => row.map((v) => `"${v || ""}"`).join(",")).join("\n");
    const link    = document.createElement("a");
    link.href     = URL.createObjectURL(new Blob([csv]));
    link.download = "registrations.csv";
    link.click();
  };

  const handleLogout = () => { localStorage.removeItem("adminToken"); navigate("/admin/login"); };

  const tshirtCounts = SIZES.reduce((acc, size) => {
    acc[size] = registrations.reduce((sum, r) =>
      sum + (r.teamLeadTshirt === size ? 1 : 0) + (r.member1Tshirt === size ? 1 : 0) + (r.member2Tshirt === size ? 1 : 0), 0);
    return acc;
  }, {});
  const totalTshirts = Object.values(tshirtCounts).reduce((a, b) => a + b, 0);

  const columns = [
    { field: "teamId",          headerName: "Team ID",     width: 120 },
    { field: "teamName",        headerName: "Team Name",   width: 160 },
    { field: "selectedTheme",   headerName: "Theme",       width: 160 },
    { field: "teamLead",        headerName: "Team Lead",   width: 150 },
    { field: "teamLeadEmail",   headerName: "Lead Email",  width: 200 },
    { field: "phone",           headerName: "Phone",       width: 130 },
    { field: "university",      headerName: "University",  width: 180 },
    { field: "yearCourse",      headerName: "Year/Course", width: 140 },
    { field: "teamLeadTshirt",  headerName: "TL Size",     width: 90  },
    { field: "member1",         headerName: "Member 1",    width: 150 },
    { field: "member1Email",    headerName: "M1 Email",    width: 200 },
    { field: "member1Phone",    headerName: "M1 Phone",    width: 130 },
    { field: "member1Tshirt",   headerName: "M1 Size",     width: 90  },
    { field: "member2",         headerName: "Member 2",    width: 150 },
    { field: "member2Email",    headerName: "M2 Email",    width: 200 },
    { field: "member2Phone",    headerName: "M2 Phone",    width: 130 },
    { field: "member2Tshirt",   headerName: "M2 Size",     width: 90  },
    { field: "email",           headerName: "Login Email", width: 200 },
    { field: "ideaDescription", headerName: "Idea",        width: 300 },
    {
      field: "actions", headerName: "Action", width: 80,
      renderCell: (params) => (
        <IconButton size="small" color="error" onClick={() => deleteRegistration(params.row._id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const filtered = registrations.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return r.teamName?.toLowerCase().includes(q) || r.teamId?.toLowerCase().includes(q)
      || r.teamLead?.toLowerCase().includes(q) || r.university?.toLowerCase().includes(q)
      || r.selectedTheme?.toLowerCase().includes(q);
  });

  const themes     = [...new Set(registrations.map((r) => r.selectedTheme).filter(Boolean))];
  const sizeColors = { XS: "#a0d8ef", S: "#00ffa3", M: "#f5c842", L: "#ff9a6c", XL: "#c084fc", XXL: "#ff6b6b" };

  const sidebarProps = { tab, setTab, registrations, primary, secondary, isDark, theme, handleLogout };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", pt: `${NAV_H}px`, background: theme.palette.background.default }}>

      {/* ── MOBILE TOP BAR ── */}
      {isMobile && (
        <Box sx={{
          position: "fixed", top: NAV_H, left: 0, right: 0, zIndex: 20,
          px: 2, py: 1,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: isDark ? "rgba(8,8,16,0.94)" : "rgba(248,250,255,0.94)",
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${primary}18`,
        }}>
          <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "0.92rem", color: primary }}>
            {NAV[tab].label}
          </Typography>
          <IconButton onClick={() => setDrawerOpen(true)} size="small" sx={{
            color: primary, border: `1px solid ${primary}33`, borderRadius: "10px", p: 0.7,
            "&:hover": { background: `${primary}12` },
          }}>
            <MenuIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* ── MOBILE SIDEBAR DRAWER ── */}
      <Drawer
        anchor="left"
        open={isMobile && drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 240, border: "none",
            background: isDark ? theme.palette.background.default : "#fff",
            boxShadow: "4px 0 32px rgba(0,0,0,0.28)",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", px: 1.5, pt: 1.5 }}>
          <IconButton onClick={() => setDrawerOpen(false)} size="small" sx={{
            color: theme.palette.text.secondary, border: `1px solid ${primary}22`,
            borderRadius: "9px", p: 0.5,
            "&:hover": { color: primary, borderColor: `${primary}55`, background: `${primary}10` },
          }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <SidebarContent {...sidebarProps} onNavClick={() => setDrawerOpen(false)} />
      </Drawer>

      {/* ── DESKTOP SIDEBAR ── */}
      {!isMobile && (
        <Box sx={{
          width: 220, flexShrink: 0,
          borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
          background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
          backdropFilter: "blur(12px)",
          position: "sticky", top: NAV_H,
          height: `calc(100vh - ${NAV_H}px)`,
          zIndex: 10,
        }}>
          <SidebarContent {...sidebarProps} />
        </Box>
      )}

      {/* ── MAIN CONTENT ── */}
      <Box sx={{
        flex: 1, overflow: "auto", minWidth: 0,
        p: { xs: 2, md: 3 },
        // on mobile add space for the fixed top bar (≈44px)
        pt: { xs: `${NAV_H - 20}px`, md: 3 },
      }}>

        {/* ══ TABS 0–3 ══ */}
        {tab < 4 && (
          <AnimatePresence mode="wait">
            <motion.div key={tab}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>

              {/* HEADER */}
              <Box sx={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", gap: 1, mb: 3,
              }}>
                <Box>
                  <Typography sx={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 800,
                    fontSize: { xs: "1.2rem", md: "1.4rem" },
                    background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                    {NAV[tab].label}
                  </Typography>
                  <Typography sx={{ fontSize: "0.76rem", color: "text.secondary" }}>
                    {data.length} item{data.length !== 1 ? "s" : ""}
                  </Typography>
                </Box>
                <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />}
                  onClick={() => { setForm({}); setEditingId(null); setFormOpen(true); }}
                  sx={{ borderRadius: "12px", fontWeight: 700, flexShrink: 0 }}>
                  Add New
                </Button>
              </Box>

              {/* FORM PANEL */}
              <AnimatePresence>
                {formOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.26 }}
                    style={{ overflow: "hidden" }}
                  >
                    <Box sx={{
                      mb: 3, p: { xs: 2, md: 3 }, borderRadius: "18px",
                      border: `1px solid ${primary}33`,
                      background: isDark ? `${primary}06` : `${primary}04`,
                      boxShadow: `0 4px 24px ${primary}10`,
                    }}>
                      <Typography sx={{
                        fontFamily: "'Syne',sans-serif", fontWeight: 700,
                        fontSize: "0.82rem", color: primary, mb: 2, letterSpacing: "0.08em",
                      }}>
                        {editingId ? "EDIT" : "NEW"} {NAV[tab].label.toUpperCase().replace(/S$/, "")}
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        {currentName === "themes" && (<>
                          <AdminField label="Theme Title" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                          <AdminField label="Description" multiline rows={3} value={form.desc || ""} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
                          <AdminField label="Problem Statements (one per line)" multiline rows={5} value={form.problemStatements || ""} onChange={(e) => setForm({ ...form, problemStatements: e.target.value })} />
                        </>)}
                        {currentName === "events" && (<>
                          <AdminField label="Event Title" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                          <AdminField label="Event Date" value={form.date || ""} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                          <AdminField label="Schedule JSON" multiline rows={8} value={form.days || ""} onChange={(e) => setForm({ ...form, days: e.target.value })} />
                        </>)}
                        {currentName === "sponsors" && (<>
                          <AdminField label="Sponsor Name" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                          <AdminField select label="Tier" value={form.tier || ""} onChange={(e) => setForm({ ...form, tier: e.target.value })}>
                            {TIERS.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                          </AdminField>
                        </>)}
                        {currentName === "rules" && (
                          <AdminField label="Rule Text (Title: Description)" value={form.text || ""} onChange={(e) => setForm({ ...form, text: e.target.value })} />
                        )}
                        {currentName !== "rules" && (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
                            <Button variant="outlined" component="label" size="small" sx={{ borderRadius: "10px", textTransform: "none", flexShrink: 0 }}>
                              {image ? "Image selected ✓" : "Upload Image"}
                              <input hidden type="file" onChange={(e) => setImage(e.target.files[0])} />
                            </Button>
                            {image && <Typography sx={{ fontSize: "0.74rem", color: "text.secondary" }}>{image.name}</Typography>}
                          </Box>
                        )}
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, mt: 2.5, flexWrap: "wrap" }}>
                        <Button variant="contained" color="primary" startIcon={<SaveIcon />}
                          onClick={handleSubmit} sx={{ borderRadius: "10px", fontWeight: 700 }}>
                          {editingId ? "Update" : "Save"}
                        </Button>
                        <Button variant="outlined" sx={{ borderRadius: "10px" }}
                          onClick={() => { setFormOpen(false); setEditingId(null); setForm({}); }}>
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ITEMS LIST */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                {data.map((item, i) => (
                  <motion.div key={item._id}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: i * 0.04 }}>
                    <Box sx={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      px: { xs: 1.8, md: 2.5 }, py: 1.6, borderRadius: "14px",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`,
                      background: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                      transition: "all 0.2s ease",
                      "&:hover": { border: `1px solid ${primary}33`, boxShadow: `0 4px 16px ${primary}10` },
                    }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0, flex: 1 }}>
                        {item.img && (
                          <Box component="img" src={`${API}${item.img}`}
                            sx={{ width: 42, height: 42, borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />
                        )}
                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{
                            fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.88rem",
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                          }}>
                            {currentName === "rules" ? (item.text?.split(":")[0] || item.text) : (item.title || item.name)}
                          </Typography>
                          {item.tier && (
                            <Chip label={item.tier} size="small" sx={{
                              mt: 0.3, height: 17, fontSize: "0.6rem", fontWeight: 700,
                              background: `${primary}18`, color: primary,
                              border: `1px solid ${primary}33`, borderRadius: "5px",
                              "& .MuiChip-label": { px: "5px" },
                            }} />
                          )}
                          {item.date && (
                            <Typography sx={{ fontSize: "0.7rem", color: "text.disabled", mt: 0.2 }}>{item.date}</Typography>
                          )}
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                        <IconButton size="small" onClick={() => handleEdit(item)} sx={{
                          borderRadius: "8px", width: 30, height: 30,
                          color: primary, background: `${primary}10`,
                          "&:hover": { background: `${primary}22` },
                        }}>
                          <EditIcon sx={{ fontSize: "0.85rem" }} />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDelete(item._id)} sx={{
                          borderRadius: "8px", width: 30, height: 30,
                          color: theme.palette.error.main, background: `${theme.palette.error.main}10`,
                          "&:hover": { background: `${theme.palette.error.main}22` },
                        }}>
                          <DeleteIcon sx={{ fontSize: "0.85rem" }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
                {data.length === 0 && (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <Typography sx={{ fontSize: "0.86rem", color: "text.disabled" }}>
                      No items yet. Click "Add New" to get started.
                    </Typography>
                  </Box>
                )}
              </Box>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ══ REGISTRATIONS ══ */}
        {tab === 4 && (
          <AnimatePresence mode="wait">
            <motion.div key="registrations"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}>

              {/* HEADER */}
              <Box sx={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: 1.5, mb: 3,
              }}>
                <Box>
                  <Typography sx={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 800,
                    fontSize: { xs: "1.2rem", md: "1.4rem" },
                    background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                    Registrations
                  </Typography>
                  <Typography sx={{ fontSize: "0.76rem", color: "text.secondary" }}>
                    {registrations.length} teams registered
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton onClick={loadRegistrations} size="small" sx={{
                    borderRadius: "10px", border: `1px solid ${primary}33`,
                    color: primary, background: `${primary}08`,
                    "&:hover": { background: `${primary}18` },
                  }}>
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                  <Button variant="contained" color="primary" size="small"
                    startIcon={<DownloadIcon />} onClick={downloadCSV}
                    sx={{ borderRadius: "12px", fontWeight: 700 }}>
                    <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>Export CSV</Box>
                    <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>CSV</Box>
                  </Button>
                </Box>
              </Box>

              {/* STAT CARDS */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {[
                  { label: "Total Teams",    value: registrations.length, icon: <GroupsIcon />,    color: primary   },
                  { label: "Themes Chosen",  value: themes.length,        icon: <PaletteIcon />,   color: secondary },
                  { label: "Total T-Shirts", value: totalTshirts,         icon: <CheckroomIcon />, color: "#f5c842" },
                ].map((s, i) => (
                  <Grid item xs={12} sm={4} key={i}><StatCard {...s} /></Grid>
                ))}
              </Grid>

              {/* T-SHIRT BREAKDOWN */}
              {totalTshirts > 0 && (
                <Box sx={{
                  mb: 3, p: { xs: 2, md: 2.5 }, borderRadius: "16px",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                  background: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, flexWrap: "wrap" }}>
                    <CheckroomIcon sx={{ fontSize: "1rem", color: primary }} />
                    <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.78rem", color: primary, letterSpacing: "0.08em" }}>
                      T-SHIRT SIZE BREAKDOWN
                    </Typography>
                    <Typography sx={{ fontSize: "0.7rem", color: "text.disabled" }}>
                      (Lead + M1 + M2)
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap" }}>
                    {SIZES.map((size) => <SizeChip key={size} size={size} count={tshirtCounts[size]} color={sizeColors[size]} />)}
                  </Box>
                </Box>
              )}

              {/* SEARCH */}
              <AdminField
                placeholder="Search by team, ID, lead, university, theme..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 2, maxWidth: { xs: "100%", sm: 460 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: "1rem", color: primary }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* DATA GRID */}
              <Box sx={{
                borderRadius: "16px",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                overflow: "hidden",
                "& .MuiDataGrid-root": { border: "none", fontFamily: "inherit", fontSize: { xs: "0.75rem", md: "0.82rem" } },
                "& .MuiDataGrid-columnHeaders": {
                  background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                  borderBottom: `1px solid ${primary}22`,
                  "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", color: primary },
                },
                "& .MuiDataGrid-row:hover": { background: `${primary}08` },
                "& .MuiDataGrid-cell": { borderColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)" },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: `1px solid ${primary}18`,
                  background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                },
              }}>
                <DataGrid
                  rows={filtered}
                  columns={columns}
                  getRowId={(row) => row._id}
                  pageSizeOptions={[10, 25, 50]}
                  initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                  slots={{ toolbar: GridToolbar }}
                  slotProps={{
                    toolbar: {
                      sx: {
                        px: 2, py: 1,
                        borderBottom: `1px solid ${primary}18`,
                        "& .MuiButton-root": {
                          color: primary, fontWeight: 600, fontSize: "0.74rem",
                          borderRadius: "8px",
                          "&:hover": { background: `${primary}12` },
                        },
                      },
                    },
                  }}
                  autoHeight
                />
              </Box>
            </motion.div>
          </AnimatePresence>
        )}
      </Box>
    </Box>
  );
}