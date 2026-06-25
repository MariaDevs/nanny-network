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
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Admin Panel</h1>
        <p className="text-gray-500 text-sm mb-8">Nanny Network — Content Management</p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total Nannies", value: stats.total, color: "#4a90d9" },
            { label: "Approved", value: stats.approved, color: "#7bc67e" },
            { label: "Pending Review", value: stats.pending, color: "#f59e0b" },
            { label: "Rejected", value: stats.rejected, color: "#ef4444" },
          ].map(s => (
            <div key={s.label} className="card p-5">
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 w-fit shadow-sm">
          <button onClick={() => setTab("nannies")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition"
            style={{ background: tab === "nannies" ? "#4a90d9" : "transparent", color: tab === "nannies" ? "white" : "#6b7280" }}>
            <Users size={16} /> Nannies ({nannies.length})
          </button>
          <button onClick={() => setTab("messages")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition"
            style={{ background: tab === "messages" ? "#4a90d9" : "transparent", color: tab === "messages" ? "white" : "#6b7280" }}>
            <MessageSquare size={16} /> Messages ({messages.length})
          </button>
        </div>

        {tab === "nannies" && (
          <div>
            {/* Filters */}
            <div className="card p-4 mb-6 flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 flex-1 min-w-48">
                <Search size={16} className="text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search nannies..." className="border-0 outline-none text-sm bg-transparent p-0 flex-1" />
              </div>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-auto text-sm py-2">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="inactive">Inactive</option>
              </select>
              <select value={filterProvince} onChange={e => setFilterProvince(e.target.value)} className="w-auto text-sm py-2">
                {provinces.map(p => <option key={p} value={p}>{p === "all" ? "All Provinces" : p}</option>)}
              </select>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Filter size={12} /> {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Nannies list */}
            <div className="flex flex-col gap-4">
              {filtered.map(nanny => (
                <div key={nanny.id} className="card overflow-hidden">
                  <div className="p-5 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden"
                        style={{ background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
                        {nanny.photoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={nanny.photoUrl} alt={nanny.fullName} className="w-full h-full object-cover" />
                        ) : "👩"}
                      </div>
                      <div>
                        <div className="font-bold">{nanny.fullName}</div>
                        <div className="text-gray-500 text-xs">{nanny.user.email} · {nanny.city}, {nanny.province}</div>
                        <div className="text-gray-400 text-xs mt-0.5">{nanny.yearsExperience} yrs exp · Age {nanny.age}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <StatusBadge status={nanny.status} />
                      <button onClick={() => setExpanded(expanded === nanny.id ? null : nanny.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500" title="View details">
                        {expanded === nanny.id ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      {nanny.status !== "approved" && (
                        <button onClick={() => updateStatus(nanny.id, "approved")}
                          className="p-2 rounded-lg hover:bg-green-50 text-green-600" title="Approve">
                          <CheckCircle size={16} />
                        </button>
                      )}
                      {nanny.status !== "rejected" && (
                        <button onClick={() => updateStatus(nanny.id, "rejected")}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-500" title="Reject">
                          <XCircle size={16} />
                        </button>
                      )}
                      {nanny.status === "approved" && (
                        <button onClick={() => updateStatus(nanny.id, "inactive")}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 text-xs font-medium" title="Deactivate">
                          Deactivate
                        </button>
                      )}
                      <button onClick={() => deleteNanny(nanny.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-400" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {expanded === nanny.id && (
                    <div className="border-t px-5 py-4" style={{ background: "#fafafa" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))", gap: "1rem", fontSize: "0.875rem", marginBottom: "1rem" }}>
                        <div>
                          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Private Phone</div>
                          <div>{nanny.phone}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Languages</div>
                          <div>{nanny.languages}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Availability</div>
                          <div>{nanny.availability}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Salary Range</div>
                          <div>{nanny.salaryRange || "Not specified"}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Skills</div>
                          <div>{nanny.skills}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Registered</div>
                          <div>{new Date(nanny.createdAt).toLocaleDateString("en-ZA")}</div>
                        </div>
                      </div>
                      <div className="mb-4 text-sm">
                        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Bio</div>
                        <p className="text-gray-600">{nanny.bio}</p>
                      </div>
                      <div className="flex gap-3 text-sm">
                        {nanny.idDocUrl && (
                          <a href={nanny.idDocUrl} target="_blank" rel="noopener noreferrer"
                            className="btn-outline text-xs py-1.5 px-4">View ID Document</a>
                        )}
                        {nanny.certsUrl && (
                          <a href={nanny.certsUrl} target="_blank" rel="noopener noreferrer"
                            className="btn-outline text-xs py-1.5 px-4">View Certificates</a>
                        )}
                        {!nanny.idDocUrl && !nanny.certsUrl && (
                          <span className="text-gray-400 text-xs">No documents uploaded</span>
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
          <div className="flex flex-col gap-4">
            {messages.map(m => (
              <div key={m.id} className="card p-6">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-3">
                  <div>
                    <div className="font-bold">{m.fullName}</div>
                    <div className="text-gray-500 text-xs">{m.email} · {m.phone} · {m.city}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#e8f4fd", color: "#4a90d9" }}>
                      {m.service}
                    </span>
                    <div className="text-gray-400 text-xs mt-1">{new Date(m.createdAt).toLocaleDateString("en-ZA")}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{m.message}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="text-center py-12 text-gray-400">No contact messages yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
