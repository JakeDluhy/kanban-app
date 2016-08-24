import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';

import Notes from './Notes';
import LaneHeader from './LaneHeader';

const Lane = ({
  connectDropTarget,
  lane, notes, NoteActions, LaneActions, ...props
}) => {
  const editNote = (id, task) => {
    NoteActions.update({ id, task, isEditing: false });
  };
  const deleteNote = (noteId, e) => {
    e.stopPropagation();

    LaneActions.detachFromLane({
      laneId: lane.id,
      noteId
    });
    NoteActions.delete(noteId);
  };
  const activateNoteEdit = id => {
    NoteActions.update({ id, isEditing: true });
  };

  return connectDropTarget(
    <div {...props}>
      <LaneHeader lane={lane} />
      <Notes
        notes={selectNotesByIds(notes, lane.notes)}
        onNoteClick={activateNoteEdit}
        onEdit={editNote}
        onDelete={deleteNote} />
    </div>
  );
}
function selectNotesByIds(allNotes, noteIds = []) {
  let notes = noteIds.map(noteId => {
    return allNotes.filter(note => note.id === noteId)[0];
  });

  return notes;
}

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(!targetProps.lane.notes.length) {
      LaneActions.attachToLane({
        laneId: targetProps.lane.id,
        noteId: sourceId
      })
    }
  }
}

export default compose(
  DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  connect(({ notes }) => ({
      notes
  }), {
    NoteActions,
    LaneActions
  })
)(Lane);