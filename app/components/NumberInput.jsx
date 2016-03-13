import React, { Component, PropTypes } from 'react';

export default class NumberInput extends Component {
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
    const { className, placeholder, value } = this.props;
    return (
      <input className={className}
        type="number"
        placeholder={placeholder}
        onChange={this.onChange}
        value={value}
        autoFocus={false} />
    );
  }
}

NumberInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.number,
  onEntryChange: PropTypes.func
};
