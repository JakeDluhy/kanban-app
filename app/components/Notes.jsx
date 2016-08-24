import React from 'react';

import Note from './Note.jsx';
import Editable from './Editable';

import LaneActions from '../actions/LaneActions';

export default ({
  notes,
  onNoteClick=() => {}, onEdit=() => {}, onDelete=() => {}
}) => (
  <ul className="notes">
    {notes.map(({id, isEditing, task}) =>
      <li key={id}>
        <Note
          className="note"
          id={id}
          isEditing={isEditing}
          onClick={onNoteClick.bind(null, id)}
          onMove={LaneActions.move}>
          <Editable
            className="editable"
            isEditing={isEditing}
            value={task}
            onEdit={onEdit.bind(null, id)} />

          <button
            className="delete"
            onClick={onDelete.bind(null, id)}>x</button>
        </Note>
      </li>
    )}
  </ul>
);
