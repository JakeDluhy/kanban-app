import assert from 'assert';
import LaneActions from '../app/actions/LaneActions';
import LaneStore from '../app/stores/LaneStore';
import alt from '../app/libs/alt';
alt.addStore('LaneStore', LaneStore);

describe('LaneStore', function() {
  beforeEach(function() {
    alt.flush();
  });

  it('creates lanes', function() {
    const name = 'test';

    LaneActions.create({ name });
    const state = alt.stores.LaneStore.getState();

    assert.equal(state.lanes.length, 1);
    assert.equal(state.lanes[0].name, name);
    assert.equal(state.lanes[0].notes.length, 0);
  });

  describe('with existing lane', function() {
    beforeEach(function() {
      this.existingLane = { id: 123, name: 'test' };
      LaneActions.create(this.existingLane);
    });

    it('can update the lane', function() {
      const name = 'test 2';

      LaneActions.update({ ...this.existingLane, name });
      const state = alt.stores.LaneStore.getState();

      assert.equal(state.lanes.length, 1);
      assert.equal(state.lanes[0].name, name);
    });

    it('can delete the lane', function() {

    });

    it('can attach a note to the lane', function() {

    });

    it('can detach a note from a lane', function() {

    });
  });

  describe('moving a note', function() {
    beforeEach(function() {
      this.lane = LaneActions.create
    });

    it('can move a note within the same lane', function() {

    });

    it('can move a note from one lane to another', function() {

    });


  });
})