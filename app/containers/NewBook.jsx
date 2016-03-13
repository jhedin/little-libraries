import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { push } from 'react-router-redux';

import TextInput from 'components/TextInput';

import {
  bookTyping,
  createBook
   } from 'actions/books';
import styles from 'scss/components/new-book';

const cx = classNames.bind(styles);

class NewBook extends Component {

  constructor(props) {
    super(props);
    // event handlers for bookItems components
    this.onBookTyping = this.onBookTyping.bind(this);
    this.onEntrySave = this.onEntrySave.bind(this);
  }

  onBookTyping(typ, val) {
    const { dispatch } = this.props;
    let form = {};
    form[typ] = val; 
    dispatch(bookTyping(form));
  }

  onEntrySave() {
    const { dispatch, newBook, params } = this.props;
    dispatch(createBook(newBook.name, newBook.author, newBook.isbn, params.id));
    dispatch(push('/library/'+ params.id));
  }

  render() {
    const {newBook} = this.props;
    console.log(newBook)

    return (
      <div className={cx('new-book')}>   
        <ul>
          <li>Title: <TextInput placeholder="title"
            className="book-name" 
            maxlength={140}
            type="text"
            value={newBook.name}
            onEntryChange={this.onBookTyping.bind(this, "name")}
          /></li>
          <li>Author: <TextInput placeholder="(last name)"
            className="book-author" 
            maxlength={100}
            type="text"
            value={newBook.author}
            onEntryChange={this.onBookTyping.bind(this, "author")}
          /></li>
          <li>ISBN: <TextInput placeholder="isbn"
            className="book-isbn" 
            maxlength={20}
            type="text"
            value={newBook.isbn}
            onEntryChange={this.onBookTyping.bind(this, "isbn")}
          /></li>
          <button onClick={this.onEntrySave} >Submit</button>
        </ul>
      </div>
    );
  }
}

NewBook.propTypes = {
  newBook: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    newBook: state.book.newBook,
    libraries: state.book.libraries
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(NewBook);
