import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-addons-test-utils';
import assert from 'assert';
import Editable from '../app/components/Editable';

describe('Editable', function() {
  it('renders value', function() {
    const value = 'value';
    const component = new Editable({ value });

    assert.equal(component.props.children, value);
  });

  it('triggers onEdit with blur', function() {
    const onEdit = sinon.spy();
    const component = renderIntoDocument(
      <Wrapper>
        <Editable isEditing={true} value={'value'} onEdit={onEdit} />
      </Wrapper>
    );

    const input = findRenderedDOMComponentWithTag(component, 'input');
    input.value = 'value2';

    Simulate.blur(input);

    assert(onEdit.calledOnce);
  });

  it('triggers onEdit with enter', function() {
    const onEdit = sinon.spy();
    const component = renderIntoDocument(
      <Wrapper>
        <Editable isEditing={true} value={'value'} onEdit={onEdit} />
      </Wrapper>
    );

    const input = findRenderedDOMComponentWithTag(component, 'input');
    input.value = 'value2';

    Simulate.keyPress(input, { key: 'Enter', keyCode: 13, which: 13 });

    assert(onEdit.calledOnce);
  });

  it('triggers onEdit with the correct value', function() {
    let newValue = 'value2';
    const onEdit = sinon.spy();
    const component = renderIntoDocument(
      <Wrapper>
        <Editable isEditing={true} value={'value'} onEdit={onEdit} />
      </Wrapper>
    );

    const input = findRenderedDOMComponentWithTag(component, 'input');
    input.value = newValue;

    Simulate.blur(input);

    assert(onEdit.calledWithExactly(newValue));
  });
});

class Wrapper extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}