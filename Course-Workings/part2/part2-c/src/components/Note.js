import React from "react";

const Note = ({ note, important }) => {
  const label = note.important ? "Make Not Important" : "Make Important";
  return (
    <li>
      {note.content}
      <button onClick={important}>{label}</button>
    </li>
  );
};

export default Note;
