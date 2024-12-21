import { useContext, useState } from "react";
import { NotesContext } from "./context/NotesContext";

const App = () => {
  const { notes, addNote, deleteNote } = useContext(NotesContext);
  const [noteText, setNoteText] = useState("");

  const handleAddNote = () => {
    if (noteText.trim()) {
      addNote({ id: Date.now(), text: noteText });
      setNoteText("");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Notes App in test branch</h1>

      {/* Add Note Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write a note..."
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px",
          }}
        />
        <button onClick={handleAddNote} style={{ padding: "10px" }}>
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <span>{note.text}</span>
            <button
              onClick={() => deleteNote(note.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete Note
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
