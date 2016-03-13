
import _ from 'lodash'

import {
	CREATE_BOOK_REQUEST,
	CREATE_BOOK_FAILURE,
	CREATE_BOOK_SUCCESS,
	GET_BOOKS_REQUEST,
	GET_BOOKS_SUCCESS,
	GET_BOOKS_FAILURE,
  REMOVE_SELECTED,
	SELECT_BOOK,
  DESELECT_BOOK,
  BOOK_TYPING } from 'constants/index';

export default function book(state = {
  books: [],
  newBook: {
    isbn:"",
    name: "",
    author:"",
  },
  selected: [],

}, action) {
  console.log(state.books);
  switch (action.type) {
    case GET_BOOKS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        selected: [],
        newBook: state.newBook
      });
    case GET_BOOKS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        books: action.req.data,
        selected: [],
        newBook: state.newBook
      });
    case GET_BOOKS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        selected: [],
        newBook: state.newBook
      });
    case CREATE_BOOK_REQUEST:
      return {
        books: [...state.books, action.book ],
        selected: [],
        newBook: state.newBook
      };
    case CREATE_BOOK_FAILURE:
      return {
        books: [...state.books.filter((tp) => tp.id !== action.id)],
        selected: [...state.selected.filter((tp) => tp.id !== action.id)],
        newBook: state.newBook
      };
    case REMOVE_SELECTED:
      return {

        books:[... _.remove(state.books, book => _.contains(state.selected, book))],
        selected: [],
        newBook: state.newBook
      };
    case SELECT_BOOK:
      return {
        books: state.books,
        selected: [...state.selected, _.find(state.books, {id:action.id})],
        newBook: state.newBook
      };
    case DESELECT_BOOK:
      return {
        books: state.books,
        selected: [...state.selected.filter((tp) => tp.id !== action.id)],
        newBook: state.newBook
      };

    case BOOK_TYPING:
      return {
        books: state.books,
        newBook: {
          isbn: action.form.isbn || state.newBook.isbn,
          name: action.form.name || state.newBook.name,
          author: action.form.author || state.newBook.author,
        }
      };

    default:
      return state;
  }
}
