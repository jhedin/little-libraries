import React, { Component, PropTypes } from 'react';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  /*
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways. I personally think this makes it more reusable.
   */
  onChange(event) {
    const { onEntryChange } = this.props;
    onEntryChange(event.target.value);
  }

  render() {
    const { className, placeholder, value, maxlength, type } = this.props;
    return (
      <input className={className}
        type={type}
        placeholder={placeholder}
        onChange={this.onChange}
        value={value}
        maxLength={maxlength}
        autoFocus={false} />
    );
  }
}

TextInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  maxlength: PropTypes.number,
  onEntryChange: PropTypes.func
};
