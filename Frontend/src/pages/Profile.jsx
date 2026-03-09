import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import { selectFavorites, selectWatchlist, selectHistory } from "../redux/userSlice";
import { updateUserSuccess } from "../redux/authSlice";
import { getProfile, updateProfile } from "../services/profileService";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Shield, Heart, Bookmark, Clock, Edit3, Lock, Check, X, Loader } from "lucide-react";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const favorites = useSelector(selectFavorites);
  const watchlist = useSelector(selectWatchlist);
  const history = useSelector(selectHistory);

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ username: "", bio: "", currentPassword: "", newPassword: "" });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message }

  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data);
      setForm((f) => ({ ...f, username: data.username, bio: data.bio || "" }));
    });
  }, []);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {};
      if (form.username !== profile.username) payload.username = form.username;
      if (form.bio !== profile.bio) payload.bio = form.bio;
      if (form.newPassword) {
        payload.currentPassword = form.currentPassword;
        payload.newPassword = form.newPassword;
      }

      if (Object.keys(payload).length === 0) {
        setEditMode(false);
        setSaving(false);
        return;
      }

      const res = await updateProfile(payload);
      setProfile((p) => ({ ...p, ...res.user }));
      dispatch(updateUserSuccess(res.user));
      setForm((f) => ({ ...f, currentPassword: "", newPassword: "" }));
      setEditMode(false);
      showToast("success", "Profile updated successfully!");
    } catch (err) {
      const msg = err?.response?.data?.message || "Update failed. Please try again.";
      showToast("error", msg);
    } finally {
      setSaving(false);
    }
  };

  const initials = (profile?.username || user?.username || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const stats = [
    { label: "Favorites", value: favorites.length, icon: Heart, color: "text-red-500", bg: "bg-red-500/10" },
    { label: "Watchlist", value: watchlist.length, icon: Bookmark, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "History", value: history.length, icon: Clock, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-8 bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-semibold shadow-xl flex items-center gap-2 ${
                toast.type === "success"
                  ? "bg-emerald-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {toast.type === "success" ? <Check size={16} /> : <X size={16} />}
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avatar Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-200/50 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center gap-6"
        >
          {/* Big Avatar */}
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-red-500 to-orange-400 flex items-center justify-center text-3xl font-black text-white shadow-lg shrink-0">
            {initials}
          </div>

          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-extrabold">{profile?.username || user?.username}</h1>
            <p className="text-slate-500 dark:text-gray-400 text-sm mt-1 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail size={13} />
              {profile?.email || user?.email}
            </p>
            {/* Role badge */}
            <span className={`inline-flex items-center gap-1 mt-3 text-xs font-bold px-3 py-1 rounded-full ${
              profile?.role === "admin"
                ? "bg-purple-500/15 text-purple-500"
                : "bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-gray-400"
            }`}>
              <Shield size={11} />
              {profile?.role === "admin" ? "Admin" : "Member"}
            </span>
            {profile?.bio && (
              <p className="mt-3 text-sm text-slate-600 dark:text-gray-400 italic max-w-xs">{profile.bio}</p>
            )}
          </div>

          {/* Edit toggle */}
          <button
            onClick={() => setEditMode((e) => !e)}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-gray-400 hover:border-red-500 hover:text-red-500 transition"
          >
            <Edit3 size={14} />
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4"
        >
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className={`${bg} rounded-2xl p-5 flex flex-col items-center gap-2 border border-transparent hover:border-slate-200 dark:hover:border-zinc-700 transition`}>
              <Icon size={22} className={color} />
              <span className="text-2xl font-extrabold">{value}</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-gray-500 uppercase tracking-wide">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Edit Form */}
        <AnimatePresence>
          {editMode && (
            <motion.div
              key="edit-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white/60 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-200/50 dark:border-zinc-800/60 space-y-5">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <User size={18} /> Edit Details
                </h2>

                {/* Username */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-gray-500 mb-1.5">Username</label>
                  <input
                    value={form.username}
                    onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                    className="w-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    placeholder="Your username"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-gray-500 mb-1.5">Bio <span className="normal-case font-normal">(max 200 chars)</span></label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                    maxLength={200}
                    rows={3}
                    className="w-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition resize-none"
                    placeholder="A short description about yourself..."
                  />
                  <p className="text-right text-xs text-slate-400 mt-1">{form.bio.length}/200</p>
                </div>

                {/* Password section */}
                <div className="border-t border-slate-200 dark:border-zinc-800 pt-5 space-y-4">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-slate-600 dark:text-gray-400">
                    <Lock size={14} /> Change Password <span className="font-normal">(optional)</span>
                  </h3>
                  <input
                    type="password"
                    value={form.currentPassword}
                    onChange={(e) => setForm((f) => ({ ...f, currentPassword: e.target.value }))}
                    className="w-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    placeholder="Current password"
                  />
                  <input
                    type="password"
                    value={form.newPassword}
                    onChange={(e) => setForm((f) => ({ ...f, newPassword: e.target.value }))}
                    className="w-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    placeholder="New password"
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving ? <><Loader size={16} className="animate-spin" /> Saving...</> : <><Check size={16} /> Save Changes</>}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Account Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/60 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-slate-200/50 dark:border-zinc-800/60"
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-gray-500 mb-4">Account Info</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-gray-500">Email</span>
              <span className="font-semibold">{profile?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-gray-500">Role</span>
              <span className="font-semibold capitalize">{profile?.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-gray-500">Member since</span>
              <span className="font-semibold">
                {profile?.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })
                  : "—"}
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;
