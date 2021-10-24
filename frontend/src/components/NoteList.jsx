import React, { useState, useEffect, useRef } from "react";
import { API } from "../util/utils.js";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [updateNoteID, setupdateNoteID] = useState(null);
  const [updateNoteContent, setUpdateNoteContent] = useState(null);

  const fetchNotes = async () => {
    const res = await API.get("/notes/");
    setNotes(res.data);
  };

    useEffect(() => {
      console.log("fetching***************************");
      fetchNotes();
    }, []);

    const addNote = async () => {
      if (newNote === "") {
        alert("Note cannot be empty!");
        return;
      }
      await API.post("/notes/", {
        content: newNote,
      });
      setNewNote("");
      fetchNotes();
    };

    const deleteNote = async (id) => {
      setupdateNoteID(null);
      await API.delete(`/notes/${id}/`);
      fetchNotes();
    };

    const updateNote = async (id) => {
      setupdateNoteID(null);
      await API.patch(`/notes/${id}/`, {
        content: updateNoteContent,
      });
      fetchNotes();
    };

    const renderedNoteList = notes.map((val, index) => {
      return (
        <div
          className="d-flex my-3 py-1 pr-1 text-left align-items-center note-container"
          key={index}
        >
          <div
            className="col"
            onClick={() => {
              setupdateNoteID(val.id);
              setUpdateNoteContent(val.content);
            }}
          >
            {val.id !== updateNoteID ? (
              <div className="p">{val.content}</div>
            ) : null}
            {val.id === updateNoteID ? (
              <textarea
                value={updateNoteContent}
                onChange={(e) => {
                  setUpdateNoteContent(e.target.value);
                }}
              />
            ) : null}
          </div>
          {val.id === updateNoteID ? (
            <button
              className="btn btn-success mr-2"
              onClick={() => {
                updateNote(val.id);
              }}
            >
              Update
            </button>
          ) : null}
          {val.id === updateNoteID ? (
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteNote(val.id);
              }}
            >
              Delete
            </button>
          ) : null}
        </div>
      );
    });
    return (
      <div className="d-flex flex-column w-75" data-testid="notelist">
        <h4 className="text-center">Note List</h4>
        <div className="col">{renderedNoteList}</div>
        <div className="input-group mt-5">
          <div className="input-group-prepend"></div>
          <textarea
            className="form-control"
            aria-label="With textarea"
            value={newNote}
            onChange={(e) => {
              setNewNote(e.target.value);
            }}
          ></textarea>
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={() => {
            addNote();
          }}
          disabled={newNote === ""}
        >
          Add
        </button>
      </div>
    );
}

export default NoteList;
