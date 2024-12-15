/* eslint-disable react/prop-types */
import React from "react";

const NotesContext = React.createContext();

const NotesProvider = ({ children }) => {
    const [notes, setNotes] = React.useState([]);

    const addNote = (note) => setNotes([...notes, note]);
    const deleteNote = (id) => setNotes(notes.filter((note) => note.id !== id));

    return (
        <NotesContext.Provider value={{ notes, addNote, deleteNote }}>
            {children}
        </NotesContext.Provider>
    );
};

export { NotesProvider, NotesContext };
