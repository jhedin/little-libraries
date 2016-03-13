import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/book-item';

const cx = classNames.bind(styles);

export default class BookItem extends Component {
  constructor(props) {
    super(props);
    this.onSelectBook = this.onSelectBook.bind(this);
    this.onDeselectBook = this.onSelectBook.bind(this);
  }

  onSelectBook() {
    const { id, index, onSelectBook } = this.props;
    onSelectBook(id);
  }

  onDeselectBook() {
    const { id, index, onDeselectBook } = this.props;
    onDeselectBook(id);
  }

  render() {

    return (
      <li className={cx('book-item')} key={this.props.id} onClick={this.props.selected ? this.onDeselectBook:this.onSelectBook}>
          <h3>{this.props.name}</h3>
          <p>{this.props.author},{this.props.isbn}</p>
      </li>
    );
  }
}

BookItem.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  isbn: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onSelectBook: PropTypes.func.isRequired,
  onDeselectBook: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};
