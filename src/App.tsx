/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import type { Note } from "./types";
import NewNoteCard from "./components/NewNoteCard";
import NoteCard from "./components/NoteCards";
import NoteIcon from "./assets/images/note.png"; 

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showNewNote, setShowNewNote] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note: Note) => {
    setNotes([note, ...notes]);
    setShowNewNote(false);
    setEditingNote(null);
  };

  const deleteNote = (id: number) => setNotes(notes.filter(n => n.id !== id));
  const togglePin = (id: number) =>
    setNotes(notes.map(n => (n.id === id ? { ...n, pinned: !n.pinned } : n)));

  const editNote = (note: Note) => setEditingNote(note);

  const filteredNotes = notes.filter(
    n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      (n.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ?? false)
  );

  const pinnedNotes = filteredNotes.filter(n => n.pinned);
  const unpinnedNotes = filteredNotes.filter(n => !n.pinned);

  return (
    <div className="min-h-screen bg-pink-50 p-6 flex flex-col items-center">
   <h1 className="text-4xl font-bold text-pink-600 mb-4 flex items-center gap-2">
  <img src={NoteIcon} alt="note icon" className="w-8 h-8" />
  MyNotes
</h1>
      <p className="mb-6 text-gray-600">{notes.length} notes</p>

      <button
        onClick={() => setShowNewNote(true)}
        className="mb-6 px-6 py-2 rounded bg-pink-500 text-white hover:bg-pink-600"
      >
        + New Note
      </button>

      <input
        type="text"
        placeholder="Search notes by title, content, or tags..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-lg p-2 mb-6 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
      />

      {pinnedNotes.length > 0 && (
        <div className="w-full max-w-lg mb-6">
          <h2 className="text-lg font-bold text-pink-600 mb-2">Pinned</h2>
          <div className="grid gap-4">
            {pinnedNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={deleteNote}
                onTogglePin={togglePin}
                onEdit={editNote}
              />
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-lg mb-6">
        <h2 className="text-lg font-bold text-pink-600 mb-2">All Notes</h2>
        {unpinnedNotes.length === 0 ? (
          <p className="text-pink-400">No notes yet. Create your first note to get started!</p>
        ) : (
          <div className="grid gap-4">
            {unpinnedNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={deleteNote}
                onTogglePin={togglePin}
                onEdit={editNote}
              />
            ))}
          </div>
        )}
      </div>

      {/* New Note / Edit Note Popup */}
      {(showNewNote || editingNote) && (
        <NewNoteCard
          onSave={addNote}
          onCancel={() => {
            setShowNewNote(false);
            setEditingNote(null);
          }}
          {...(editingNote ? { initialData: editingNote } : {})}
        />
      )}
    </div>
  );
};

export default App;