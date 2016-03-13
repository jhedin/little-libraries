import React, { PropTypes } from 'react';
import BookItem from 'components/BookItem';
import _ from 'lodash';

import classNames from 'classnames/bind';
import styles from 'scss/components/books-main';

const cx = classNames.bind(styles);

const BooksMain = ({onSelectBook, onDeselectBook, books, selected, onNewBook, onRemoveSelected}) => {

  const bookItems = books.map((book, key) => {
    return (
      <BookItem 
        id={book.id}
        name={book.name}
        author={book.author}
        isbn={book.isbn}
        selected={!!_.find(selected, {id:book.id})}
        key={key}
        onSelectBook={onSelectBook}
        onDeselectBook={onDeselectBook}
         />);
    });

  return (
    <div className={cx('main-section')}>
      <ul className={cx('book-list')}>{bookItems}</ul>
      <div>
        <button onClick={onNewBook} >Add Book</button>
        <button onClick={onRemoveSelected.bind(null, selected)} >Take Selected</button>
      </div>
    </div>
  );
};

BooksMain.propTypes = {
  books: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onSelectBook: PropTypes.func.isRequired,
  onDeselectBook: PropTypes.func.isRequired,
  onNewBook: PropTypes.func.isRequired,
  onRemoveSelected: PropTypes.func.isRequired
};

export default BooksMain;
