import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BooksMain from 'components/BooksMain';
import classNames from 'classnames/bind';
import _ from 'lodash';

import { push } from 'react-router-redux';
 
import {
  fetchLibraries
   } from 'actions/libraries';

import {
  fetchBooks,
  selectBook,
  deselectBook,
  removeSelected
  } from 'actions/books';
  
import styles from 'scss/components/library';
console.dir(styles);

const cx = classNames.bind(styles);

class Library extends Component {

  //Data that needs to be called before rendering the component
  //This is used for server side rending via the fetchComponentDataBeforeRending() method
  static need = [
    fetchLibraries,
    fetchBooks
  ]

  constructor(props) {
    super(props);
    // event handlers for books
    this.onSelectBook = this.onSelectBook.bind(this);
    this.onDeselectBook = this.onDeselectBook.bind(this);
    // event handlers for the list
    this.onRemoveSelected = this.onRemoveSelected.bind(this);
    this.onNewBook = this.onNewBook.bind(this);
  }

  onSelectBook(id) {
    const { dispatch } = this.props; 
    dispatch(selectBook(id));
  }
  onDeselectBook(id) {
    const { dispatch } = this.props; 
    dispatch(deselectBook(id));
  }
  onRemoveSelected(selected) {

    const { dispatch } = this.props; 
    dispatch(removeSelected(selected));
  }
  onNewBook() {
    const { dispatch, params } = this.props; 
    dispatch(push('/newBook/'+ params.id));
  }

  render() {
    const {libraries} = this.props;

    const library = _.find(libraries, {id:this.props.params.id});


    return (
      <div className={cx('library')}>
        <div className={cx('center')}>
          <h1>{library.name}</h1>
          <img className={cx('library-img')} src={library.picture} />
          <p>{library.desc}</p>

          <BooksMain
            books={this.props.books}
            selected={this.props.selected}
            onSelectBook={this.onSelectBook}
            onDeselectBook={this.onDeselectBook}
            onNewBook={this.onNewBook}
            onRemoveSelected={this.onRemoveSelected}
          />
      	</div>
        

      </div>
    );
  }
}

Library.propTypes = {
  libraries: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    libraries: state.library.libraries,
    books: state.book.books,
    selected: state.book.selected
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Library);
