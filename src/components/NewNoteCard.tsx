import React, { useState } from "react";
import type { Note } from "../types";

interface NewNoteCardProps {
  onSave: (note: Note) => void;
  onCancel: () => void;
}

// Predefined colors and emojis
const colors = ["bg-pink-100", "bg-yellow-100", "bg-green-100", "bg-blue-100", "bg-purple-100"];
const emojis = ["📝", "💡", "⭐", "💖", "📌"];

const NewNoteCard: React.FC<NewNoteCardProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState(colors[0]);
  const [emoji, setEmoji] = useState(emojis[0]);
  const [tags, setTags] = useState("");

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;

    // Only pass properties defined in Note type
    onSave({
        id: Date.now(),
        title,
        content,
        color,
        emoji,
        pinned: false, // default pinned state
        tags: tags.split(",").map(t => t.trim()).filter(t => t),
        text: ""
    });

    // Reset fields
    setTitle("");
    setContent("");
    setTags("");
    setColor(colors[0]);
    setEmoji(emojis[0]);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className={`w-full max-w-lg p-6 rounded-xl shadow-xl ${color} flex flex-col`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">{emoji} New Note</h2>
          <button onClick={onCancel} className="text-red-500 font-bold text-lg">✖</button>
        </div>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <div className="flex justify-between items-center mb-4">
          {/* Color picker */}
          <div className="flex gap-2">
            {colors.map(c => (
              <button
                key={c}
                className={`w-8 h-8 rounded-full border ${c} ${color === c ? "ring-2 ring-pink-500" : ""}`}
                onClick={() => setColor(c)}
              />
            ))}
          </div>

          {/* Emoji picker */}
          <div className="flex gap-2">
            {emojis.map(e => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                className={`text-lg ${emoji === e ? "scale-125" : ""}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded bg-pink-500 text-white hover:bg-pink-600">Save</button>
        </div>
      </div>
    </div>
  );
};

export default NewNoteCard;