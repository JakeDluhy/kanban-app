import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';

import Editable from './Editable';

const LaneHeader = ({
  lane, LaneActions, NoteActions, ...props
}) => {
  const addNote = e => {
    e.stopPropagation();

    const noteId = uuid.v4();

    NoteActions.create({
      id: noteId,
      task: 'New task'
    });

    LaneActions.attachToLane({
      laneId: lane.id,
      noteId
    });
  };
  const activateLaneEdit = () => {
    LaneActions.update(Object.assign({}, lane, { isEditing: true }))
  };
  const editLaneName = name => {
    LaneActions.update({
      id: lane.id,
      name,
      isEditing: false
    });
  };
  const deleteLane = e => {
    e.stopPropagation();

    LaneActions.delete(lane.id);
  };

  return (
    <div className="lane-header" onClick={activateLaneEdit} {...props}>
      <div className="lane-add-note">
        <button onClick={addNote}>+</button>
      </div>
      <Editable
        className="editable"
        isEditing={lane.isEditing}
        value={lane.name}
        onEdit={editLaneName} />

      <div className="lane-delete">
        <button onClick={deleteLane}>x</button>
      </div>
    </div>
  );
}

export default connect(() => ({}), {
  NoteActions,
  LaneActions
})(LaneHeader);