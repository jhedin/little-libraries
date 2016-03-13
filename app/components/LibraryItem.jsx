import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/library-item';
import { Link } from 'react-router'

const cx = classNames.bind(styles);

export default class LibraryItem extends Component {
  constructor(props) {
    super(props);
    this.onSelectLibrary = this.onSelectLibrary.bind(this);
  }

  onSelectLibrary() {
    const { id, index, onSelectLibrary } = this.props;
    onSelectLibrary(id);
  }

  render() {
    return (
      <li className={cx('library-item')} key={this.props.id}>
         <button
           onClick={this.onSelectLibrary}
           >{this.props.name}</button>
      </li>
    );
  }
}

LibraryItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onSelectLibrary: PropTypes.func.isRequired
};
