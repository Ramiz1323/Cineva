import React, { useState } from "react";
import { Film, Users, ShieldCheck } from "lucide-react";
import AdminMoviePanel from "../components/admin/AdminMoviePanel";
import AdminUserPanel from "../components/admin/AdminUserPanel";

const TABS = [
  { id: "movies", label: "Movies", icon: Film },
  { id: "users", label: "Users", icon: Users },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("movies");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col lg:flex-row pt-16 transition-colors">

      {/* ── Sidebar (desktop) ── */}
      <aside className="hidden lg:flex w-56 shrink-0 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 min-h-screen flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <ShieldCheck size={22} className="text-red-500" />
            <span className="text-slate-900 dark:text-white font-bold text-lg tracking-tight">Admin</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">Management Panel</p>
        </div>
        <nav className="flex flex-col gap-1 p-3 flex-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                  : "text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Top tab bar (mobile) ── */}
      <div className="lg:hidden bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-4">
        <div className="flex items-center gap-1 py-2">
          <ShieldCheck size={16} className="text-red-500 mr-2 shrink-0" />
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === id
                  ? "bg-red-600 text-white"
                  : "text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {activeTab === "movies" && <AdminMoviePanel />}
        {activeTab === "users" && <AdminUserPanel />}
      </main>
    </div>
  );
};

export default AdminDashboard;
