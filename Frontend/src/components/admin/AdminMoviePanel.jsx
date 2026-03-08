import React, { useEffect, useState } from "react";
import { Trash2, Edit, Plus, X, Youtube } from "lucide-react";
import { adminGetMovies, adminAddMovie, adminUpdateMovie, adminDeleteMovie } from "../../services/adminService";

// convert any YouTube URL to an embed URL
const toEmbedUrl = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/\s]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const emptyForm = { title: "", description: "", movieId: "", posterUrl: "", backdropUrl: "", trailerUrl: "", releaseDate: "", genre: "", category: "" };

const AdminMoviePanel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminGetMovies();
      setMovies(data.movies || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditTarget(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (movie) => { setEditTarget(movie); setForm({ ...movie }); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditTarget(null); setForm(emptyForm); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editTarget) {
        await adminUpdateMovie(editTarget._id, form);
      } else {
        await adminAddMovie(form);
      }
      await load();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save movie");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this movie?")) return;
    await adminDeleteMovie(id);
    setMovies((prev) => prev.filter((m) => m._id !== id));
  };

  const embedUrl = toEmbedUrl(form.trailerUrl);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Movies</h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          <Plus size={18} /> Add Movie
        </button>
      </div>

      {loading ? (
        <div className="text-slate-500 dark:text-gray-400">Loading...</div>
      ) : movies.length === 0 ? (
        <div className="text-slate-400 dark:text-gray-500 text-center py-20">No movies added yet. Click "Add Movie" to get started.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-800">
          <table className="w-full text-sm text-left text-slate-700 dark:text-gray-300">
            <thead className="bg-slate-100 dark:bg-zinc-900 text-slate-500 dark:text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-3 py-3">Poster</th>
                <th className="px-3 py-3">Title</th>
                <th className="px-3 py-3 hidden sm:table-cell">Genre</th>
                <th className="px-3 py-3 hidden md:table-cell">Category</th>
                <th className="px-3 py-3 hidden sm:table-cell">Release</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id} className="border-t border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 transition">
                  <td className="px-4 py-3">
                    <img src={movie.posterUrl} alt={movie.title} className="h-14 w-10 object-cover rounded" />
                  </td>
                  <td className="px-3 py-3 font-semibold text-slate-900 dark:text-white">{movie.title}</td>
                  <td className="px-3 py-3 text-slate-600 dark:text-gray-400 hidden sm:table-cell">{movie.genre}</td>
                  <td className="px-3 py-3 text-slate-600 dark:text-gray-400 hidden md:table-cell">{movie.category}</td>
                  <td className="px-3 py-3 text-slate-600 dark:text-gray-400 hidden sm:table-cell">{movie.releaseDate}</td>
                  <td className="px-3 py-3 text-right">
                    <button onClick={() => openEdit(movie)} className="p-2 bg-slate-100 dark:bg-zinc-800 hover:bg-blue-100 dark:hover:bg-zinc-700 rounded-lg transition text-blue-500 dark:text-blue-400">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(movie._id)} className="p-2 bg-slate-100 dark:bg-zinc-800 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition text-red-500 dark:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto p-5 sm:p-6 relative border-t sm:border border-slate-200 dark:border-zinc-700">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{editTarget ? "Edit Movie" : "Add Movie"}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "title", label: "Movie Title" },
                { key: "movieId", label: "Movie ID" },
                { key: "posterUrl", label: "Poster Image URL" },
                { key: "backdropUrl", label: "Background Image URL" },
                { key: "trailerUrl", label: "Trailer YouTube Link" },
                { key: "releaseDate", label: "Release Date", type: "date" },
                { key: "genre", label: "Genre" },
                { key: "category", label: "Category" },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="block text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide mb-1">{label}</label>
                  <input
                    type={type || "text"}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white text-sm outline-none focus:border-red-500 transition"
                  />
                </div>
              ))}

              {/* Description - full width */}
              <div className="md:col-span-2">
                <label className="block text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white text-sm outline-none focus:border-red-500 transition resize-none"
                />
              </div>

              {/* YouTube preview */}
              {embedUrl && (
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wide mb-2">
                    <Youtube size={14} className="text-red-500" /> Trailer Preview
                  </label>
                  <iframe
                    src={embedUrl}
                    className="w-full aspect-video rounded-xl border border-slate-200 dark:border-zinc-700"
                    allowFullScreen
                    title="Trailer Preview"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={closeModal} className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-white rounded-lg text-sm transition">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg font-semibold text-sm transition"
              >
                {saving ? "Saving..." : editTarget ? "Update" : "Add Movie"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMoviePanel;
