import React, { useEffect, useState } from "react";
import { Trash2, ShieldBan, ShieldCheck } from "lucide-react";
import { adminGetUsers, adminBanUser, adminDeleteUser } from "../../services/adminService";

const AdminUserPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminGetUsers();
      setUsers(data.users || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleBan = async (id) => {
    const res = await adminBanUser(id);
    setUsers((prev) => prev.map((u) => u._id === id ? { ...u, isBanned: res.isBanned } : u));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this user?")) return;
    await adminDeleteUser(id);
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Users</h2>

      {loading ? (
        <div className="text-slate-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-800">
          <table className="w-full text-sm text-left text-slate-700 dark:text-gray-300">
            <thead className="bg-slate-100 dark:bg-zinc-900 text-slate-500 dark:text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-3 py-3">Username</th>
                <th className="px-3 py-3 hidden sm:table-cell">Email</th>
                <th className="px-3 py-3 hidden sm:table-cell">Role</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 transition">
                  <td className="px-3 py-3 font-semibold text-slate-900 dark:text-white">{user.username}</td>
                  <td className="px-3 py-3 text-slate-500 dark:text-gray-400 hidden sm:table-cell">{user.email}</td>
                  <td className="px-3 py-3 hidden sm:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${user.role === "admin" ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" : "bg-slate-200 dark:bg-zinc-700 text-slate-600 dark:text-gray-300"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${user.isBanned ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
                      {user.isBanned ? "Banned" : "Active"}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleBan(user._id)}
                      className={`p-2 rounded-lg transition ${user.isBanned ? "bg-green-100 dark:bg-green-900/40 hover:bg-green-200 dark:hover:bg-green-900 text-green-600 dark:text-green-400" : "bg-slate-100 dark:bg-zinc-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400"}`}
                      title={user.isBanned ? "Unban user" : "Ban user"}
                    >
                      {user.isBanned ? <ShieldCheck size={16} /> : <ShieldBan size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2 bg-slate-100 dark:bg-zinc-800 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition text-red-500 dark:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserPanel;
