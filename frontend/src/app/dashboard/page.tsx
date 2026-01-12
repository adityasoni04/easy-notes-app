"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import Navbar from '@/components/Navbar';
import NoteCard from '@/components/NoteCard';
import CreateNoteModal from '@/components/CreateNoteModal';
import UpdateNoteModal from '@/components/UpdateNoteModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import NoteModal from '@/components/NoteModal';
import { Search, Plus, Loader2, Sparkles } from 'lucide-react';
import { toast } from "sonner";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false); 
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<any>(null);
  const [viewingNote, setViewingNote] = useState<any>(null);
  const [noteToDelete, setNoteToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchNotes = async (query = "") => {
    if (notes.length === 0) setLoading(true);
    setIsSearching(true);

    try {
      const endpoint = query ? `/notes/search?q=${query}` : '/notes';
      const res = await api.get(endpoint);
      setNotes(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
      setIsSearching(false); 
    }
  };

  const handleConfirmDelete = async () => {
    if (!noteToDelete) return;
    setIsDeleting(true);
    try {
      await api.delete(`/notes/${noteToDelete.id}`);
      toast.success("Note deleted successfully!");
      setNoteToDelete(null);
      fetchNotes(searchQuery);
    } catch (err) {
      toast.error("Failed to delete note");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-[2.5rem] p-8 md:p-12 mb-12 shadow-2xl shadow-blue-200 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Easy Notes, <span className="text-blue-300">AI Powered.</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 opacity-90 leading-relaxed">
              Search by meaning, not just words. Our Gemini integration understands the intent behind your thoughts.
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); fetchNotes(searchQuery); }}
              className="relative group"
            >
              <input
                type="text"
                placeholder="Ask your notes anything..."
                className="w-full pl-14 pr-16 py-4.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-blue-200 focus:bg-white focus:text-slate-900 focus:ring-4 focus:ring-blue-400/30 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchQuery(value);
                  if (value === "") {
                    fetchNotes("");
                  }
                }} />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-200 group-focus-within:text-blue-600 w-6 h-6 transition-colors" />

              <button
                type="submit"
                disabled={isSearching}
                className={`absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-semibold shadow-lg overflow-hidden
                  ${isSearching
                    ? 'bg-blue-400 cursor-wait text-white/80'
                    : 'bg-blue-500 hover:bg-blue-400 text-white'}`}
              >
                {isSearching && (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                )}

                <Sparkles className={`w-4 h-4 ${isSearching ? 'animate-pulse' : ''}`} />
                <span className="hidden sm:inline">{isSearching ? "Thinking..." : "Search"}</span>
              </button>
            </form>
          </div>
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* --- Action Bar --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {searchQuery ? "Search Results" : "Your Library"}
            </h2>
            <p className="text-slate-500 text-sm">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'} found
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-100 active:scale-95 transition-all w-full sm:w-auto justify-center"
          >
            <Plus className="w-5 h-5" /> Create New Note
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="animate-spin text-blue-600 w-12 h-12" />
            <p className="text-slate-400 font-medium animate-pulse">Loading...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notes.map((note: any) => (
                <NoteCard
                  key={note._id?.toString()}
                  note={note}
                  onEdit={(n: any) => setEditingNote(n)}
                  onView={(n: any) => setViewingNote(n)}
                  onDelete={(n: any) => setNoteToDelete(n)}
                />
              ))}
            </div>

            {notes.length === 0 && (
              <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-slate-300 w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-1">No notes found</h3>
                <p className="text-slate-400 max-w-xs mx-auto">
                  Try a different search or create a new note to get started.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <NoteModal
        isOpen={!!viewingNote}
        onClose={() => setViewingNote(null)}
        note={viewingNote}
      />

      <CreateNoteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onNoteCreated={() => fetchNotes(searchQuery)}
      />

      <UpdateNoteModal
        isOpen={!!editingNote}
        onClose={() => setEditingNote(null)}
        note={editingNote}
        onNoteUpdated={() => fetchNotes(searchQuery)}
      />

      <DeleteConfirmModal
        isOpen={!!noteToDelete}
        onClose={() => setNoteToDelete(null)}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />
    </div>
  );
}