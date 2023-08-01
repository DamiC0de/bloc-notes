import React, { useState, useEffect } from "react";
import Showdown from "showdown";
import 'bootstrap/dist/css/bootstrap.css';


const converter = new Showdown.Converter();

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || [
      { id: Date.now(), titre: "Première note", contenu: "Écrivez ici en markdown..." }
    ]
  );

  const [selectedNote, setSelectedNote] = useState(notes[0].id);

  const updateNote = (id, titre, contenu) => {
    const newNotes = notes.map(note =>
      note.id === id ? { id, titre, contenu } : note
    );
    setNotes(newNotes);
  };

  const saveNote = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
    saveNote();
  };

  const addNote = () => {
    const newNote = { id: Date.now(), titre: "", contenu: "" };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote.id);
  };

  useEffect(() => {
    if (!notes.find(note => note.id === selectedNote)) {
      setSelectedNote(notes[0]?.id);
    }
  }, [notes, selectedNote]);

  return (
<div className="container">
  <div className="row">
    <div className="col-4">
      <button className="btn btn-primary my-3" onClick={addNote}>Ajouter une note</button>
      {notes.map(note => (
        <div className="card my-2" key={note.id} onClick={() => setSelectedNote(note.id)}>
          <div className="card-header">
            <h5>{note.titre}</h5>
            <p>{note.contenu.length > 50 ? note.contenu.substring(0, 50) + '...' : note.contenu}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="col-8">
      {notes.filter(note => note.id === selectedNote).map(note => (
        <div className="card my-2" key={note.id}>
          <div className="card-header">
            <h2>{note.titre}</h2>
            <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(note.contenu) }} />
          </div>
          <div className="card-body">
            <input
              className="form-control my-2"
              value={note.titre}
              onChange={e => updateNote(note.id, e.target.value, note.contenu)}
            />
            <textarea
              className="form-control my-2"
              value={note.contenu}
              onChange={e => updateNote(note.id, note.titre, e.target.value)}
            />
            <button className="btn btn-success mr-2" onClick={saveNote} disabled={!note.titre.trim() || !note.contenu.trim()}>Sauvegarder</button>
            <button className="btn btn-danger" onClick={() => deleteNote(note.id)}>Supprimer</button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


  );
}

export default App;
