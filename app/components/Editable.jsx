import React from 'react';

import classnames from 'classnames';

export default ({ isEditing, value, onEdit, className, ...props }) => {
  if(isEditing) {
    return <Edit
      className={className}
      value={value}
      onEdit={onEdit}
      {...props} />;
  } else {
    return <span className={classnames('value', className)} {...props}>
      {value}
    </span>;
  }
}

class Edit extends React.Component {
  render() {
    const { value, className, ...props } = this.props;

    return <input
      type="text"
      className={classnames('edit', className)}
      autoFocus={true}
      defaultValue={value}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />;
  }

  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit = (e) => {
    const value = e.target.value;

    if(this.props.onEdit) {
      this.props.onEdit(value);
    }
  }
}