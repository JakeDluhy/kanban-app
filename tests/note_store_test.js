import assert from 'assert';
import NoteActions from '../app/actions/NoteActions';
import NoteStore from '../app/stores/NoteStore';
import alt from '../app/libs/alt';
alt.addStore('NoteStore', NoteStore);

describe('NoteStore', function() {
  beforeEach(function() {
    alt.flush();
  });

  it('creates notes', function() {
    const task = 'test';

    NoteActions.create({ task });
    const state = alt.stores.NoteStore.getState();

    assert.equal(state.notes.length, 1);
    assert.equal(state.notes[0].task, task);
  });

  describe('with existing note', function() {
    beforeEach(function() {
      this.existingNote = { id: 123, task: 'test' };
      NoteActions.create(this.existingNote);
    });

    it('updates notes', function() {
      const updatedTask = 'test 2';

      NoteActions.update({ ...this.existingNote, task: updatedTask });
      const state = alt.stores.NoteStore.getState();

      assert.equal(state.notes.length, 1);
      assert.equal(state.notes[0].task, updatedTask);
    });

    it('deletes notes', function() {
      NoteActions.delete(this.existingNote.id);

      const state = alt.stores.NoteStore.getState();

      assert.equal(state.notes.length, 0);
    });
  });
});