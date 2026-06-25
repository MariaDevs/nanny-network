"use client";
import { useState } from "react";
import { CheckCircle, XCircle, Trash2, Eye, EyeOff, Users, MessageSquare, Search, Filter } from "lucide-react";

type Nanny = {
  id: string; fullName: string; province: string; city: string; age: number;
  yearsExperience: number; languages: string; skills: string; availability: string;
  salaryRange: string; bio: string; photoUrl: string | null; status: string;
  phone: string; idDocUrl: string | null; certsUrl: string | null; createdAt: Date;
  user: { email: string };
};

type Message = {
  id: string; fullName: string; phone: string; email: string;
  city: string; service: string; message: string; createdAt: Date;
};

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    approved: { bg: "#e8fdf0", color: "#166534" },
    pending: { bg: "#fef9e8", color: "#92400e" },
    rejected: { bg: "#fef2f2", color: "#dc2626" },
    inactive: { bg: "#f5f5f5", color: "#6b7280" },
  };
  const c = colors[status] || colors.inactive;
  return (
    <span className="px-2 py-1 rounded-full text-xs font-semibold" style={c}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function AdminClient({ nannies: initial, messages }: { nannies: Nanny[]; messages: Message[] }) {
  const [nannies, setNannies] = useState(initial);
  const [tab, setTab] = useState<"nannies" | "messages">("nannies");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProvince, setFilterProvince] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  async function updateStatus(id: string, status: string) {
    const res = await fetch("/api/admin/nanny", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) setNannies(prev => prev.map(n => n.id === id ? { ...n, status } : n));
  }

  async function deleteNanny(id: string) {
    if (!confirm("Are you sure you want to delete this nanny profile? This cannot be undone.")) return;
    const res = await fetch("/api/admin/nanny", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setNannies(prev => prev.filter(n => n.id !== id));
  }

  const filtered = nannies.filter(n => {
    const matchSearch = !search ||
      n.fullName.toLowerCase().includes(search.toLowerCase()) ||
      n.city.toLowerCase().includes(search.toLowerCase()) ||
      n.user.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || n.status === filterStatus;
    const matchProvince = filterProvince === "all" || n.province === filterProvince;
    return matchSearch && matchStatus && matchProvince;
  });

  const provinces = ["all", ...Array.from(new Set(nannies.map(n => n.province)))];

  const stats = {
    total: nannies.length,
    approved: nannies.filter(n => n.status === "approved").length,
    pending: nannies.filter(n => n.status === "pending").length,
    rejected: nannies.filter(n => n.status === "rejected").length,
  };

  return (
    <div style={{ background: "#f5f5f0", minHeight: "100vh" }}>
      <div className="wrap" style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.5rem" }}>Admin Panel</h1>
        <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "2rem" }}>Nanny Network — Content Management</p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total Nannies", value: stats.total, color: "#4a90d9" },
            { label: "Approved", value: stats.approved, color: "#7bc67e" },
            { label: "Pending Review", value: stats.pending, color: "#f59e0b" },
            { label: "Rejected", value: stats.rejected, color: "#ef4444" },
          ].map(s => (
            <div key={s.label} className="card" style={{ padding: "1.25rem" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "inline-flex", gap: "0.25rem", marginBottom: "1.5rem", background: "white", borderRadius: "0.75rem", padding: "0.25rem", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          <button onClick={() => setTab("nannies")}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer", transition: "all 0.2s", background: tab === "nannies" ? "#4a90d9" : "transparent", color: tab === "nannies" ? "white" : "#6b7280" }}>
            <Users size={16} /> Nannies ({nannies.length})
          </button>
          <button onClick={() => setTab("messages")}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer", transition: "all 0.2s", background: tab === "messages" ? "#4a90d9" : "transparent", color: tab === "messages" ? "white" : "#6b7280" }}>
            <MessageSquare size={16} /> Messages ({messages.length})
          </button>
        </div>

        {tab === "nannies" && (
          <div>
            {/* Filters */}
            <div className="card" style={{ padding: "1rem", marginBottom: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, minWidth: "12rem", background: "#f9fafb", borderRadius: "0.5rem", padding: "0.5rem 0.75rem" }}>
                <Search size={16} style={{ color: "#9ca3af", flexShrink: 0 }} />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search nannies..."
                  style={{ border: "none", outline: "none", fontSize: "0.875rem", background: "transparent", padding: 0, width: "100%" }} />
              </div>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                style={{ width: "auto", fontSize: "0.875rem", padding: "0.5rem 0.75rem" }}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="inactive">Inactive</option>
              </select>
              <select value={filterProvince} onChange={e => setFilterProvince(e.target.value)}
                style={{ width: "auto", fontSize: "0.875rem", padding: "0.5rem 0.75rem" }}>
                {provinces.map(p => <option key={p} value={p}>{p === "all" ? "All Provinces" : p}</option>)}
              </select>
              <span style={{ fontSize: "0.75rem", color: "#9ca3af", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Filter size={12} /> {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Nannies list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {filtered.map(nanny => (
                <div key={nanny.id} className="card" style={{ overflow: "hidden" }}>
                  <div style={{ padding: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: "3rem", height: "3rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0, overflow: "hidden", background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
                        {nanny.photoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={nanny.photoUrl} alt={nanny.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : "👩"}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700 }}>{nanny.fullName}</div>
                        <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>{nanny.user.email} · {nanny.city}, {nanny.province}</div>
                        <div style={{ color: "#9ca3af", fontSize: "0.75rem", marginTop: "0.125rem" }}>{nanny.yearsExperience} yrs exp · Age {nanny.age}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                      <StatusBadge status={nanny.status} />
                      <button onClick={() => setExpanded(expanded === nanny.id ? null : nanny.id)}
                        style={{ padding: "0.5rem", borderRadius: "0.5rem", background: "none", border: "none", cursor: "pointer", color: "#6b7280" }} title="View details">
                        {expanded === nanny.id ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      {nanny.status !== "approved" && (
                        <button onClick={() => updateStatus(nanny.id, "approved")}
                          style={{ padding: "0.5rem", borderRadius: "0.5rem", background: "none", border: "none", cursor: "pointer", color: "#16a34a" }} title="Approve">
                          <CheckCircle size={16} />
                        </button>
                      )}
                      {nanny.status !== "rejected" && (
                        <button onClick={() => updateStatus(nanny.id, "rejected")}
                          style={{ padding: "0.5rem", borderRadius: "0.5rem", background: "none", border: "none", cursor: "pointer", color: "#ef4444" }} title="Reject">
                          <XCircle size={16} />
                        </button>
                      )}
                      {nanny.status === "approved" && (
                        <button onClick={() => updateStatus(nanny.id, "inactive")}
                          style={{ padding: "0.375rem 0.75rem", borderRadius: "0.5rem", background: "none", border: "1px solid #d1d5db", cursor: "pointer", color: "#9ca3af", fontSize: "0.75rem", fontWeight: 600 }} title="Deactivate">
                          Deactivate
                        </button>
                      )}
                      <button onClick={() => deleteNanny(nanny.id)}
                        style={{ padding: "0.5rem", borderRadius: "0.5rem", background: "none", border: "none", cursor: "pointer", color: "#f87171" }} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {expanded === nanny.id && (
                    <div style={{ borderTop: "1px solid #f3f4f6", padding: "1rem 1.25rem", background: "#fafafa" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))", gap: "1rem", fontSize: "0.875rem", marginBottom: "1rem" }}>
                        {[
                          ["Private Phone", nanny.phone],
                          ["Languages", nanny.languages],
                          ["Availability", nanny.availability],
                          ["Salary Range", nanny.salaryRange || "Not specified"],
                          ["Skills", nanny.skills],
                          ["Registered", new Date(nanny.createdAt).toLocaleDateString("en-ZA")],
                        ].map(([label, val]) => (
                          <div key={label}>
                            <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", marginBottom: "0.25rem" }}>{label}</div>
                            <div>{val}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginBottom: "1rem", fontSize: "0.875rem" }}>
                        <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", marginBottom: "0.25rem" }}>Bio</div>
                        <p style={{ color: "#4b5563" }}>{nanny.bio}</p>
                      </div>
                      <div style={{ display: "flex", gap: "0.75rem" }}>
                        {nanny.idDocUrl && (
                          <a href={nanny.idDocUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: "0.75rem", padding: "0.375rem 1rem" }}>View ID Document</a>
                        )}
                        {nanny.certsUrl && (
                          <a href={nanny.certsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: "0.75rem", padding: "0.375rem 1rem" }}>View Certificates</a>
                        )}
                        {!nanny.idDocUrl && !nanny.certsUrl && (
                          <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>No documents uploaded</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-12 text-gray-400">No nannies found matching your filters.</div>
              )}
            </div>
          </div>
        )}

        {tab === "messages" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {messages.map(m => (
              <div key={m.id} className="card" style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "0.75rem" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{m.fullName}</div>
                    <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>{m.email} · {m.phone} · {m.city}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", borderRadius: "9999px", background: "#e8f4fd", color: "#4a90d9" }}>
                      {m.service}
                    </span>
                    <div style={{ color: "#9ca3af", fontSize: "0.75rem", marginTop: "0.25rem" }}>{new Date(m.createdAt).toLocaleDateString("en-ZA")}</div>
                  </div>
                </div>
                <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>{m.message}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <div style={{ textAlign: "center", padding: "3rem 0", color: "#9ca3af" }}>No contact messages yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
