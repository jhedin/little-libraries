/*eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';

polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */
function makeBookRequest(method, id, data, api='/book') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}
 
/*
 * @param data
 * @return a simple JS object
 */
function createBookRequest(data) {
  return {
    type: types.CREATE_BOOK_REQUEST,
    book: data
  };
}

function createBookSuccess() {
  return {
    type: types.CREATE_BOOK_SUCCESS
  };
}

function createBookFailure(data) {
  return {
    type: types.CREATE_BOOK_FAILURE,
    id: data.id,
    error: data.error
  };
}

function createBookDuplicate() {
  return {
    type: types.CREATE_BOOK_DUPLICATE
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createBook(name, author, isbn, library) {
  return (dispatch, getState) => {
    // we need either the name *and* author, or the isbn
    if ((name.trim().length <= 0 && isbn.trim().length <= 0) || (author.trim().length <=0 && isbn.trim().length <= 0)) return;

    const id = md5.hash(name + author + isbn);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { book } = getState();
    const data = {
      id: id,
      name: name,
      author: author,
      isbn: isbn
    }

    // Conditional dispatch
    // If the book already exists, make sure we emit a dispatch event
    if (book.books.filter(bookItem => bookItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate book
      return dispatch(createBookDuplicate());
    }

    // First dispatch an optimistic update
    dispatch(createBookRequest(data));

    return makeBookRequest('post', library, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_BOOK_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createBookSuccess());
        }
      })
      .catch(ex => {
        return dispatch(createBookFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your book'}));
      });
  };
}

export function removeSelected(selected) {
  for(let b of selected){
    makeBookRequest('delete', b.id);
  }
  return {
    type: types.REMOVE_SELECTED
  }
}

// Fetch posts logic
export function fetchBooks(data) {

  const id = typeof data === "string" ? data : data.id;

  console.log("server_id:" + id)

  return {
    type: types.GET_BOOKS,
    promise: makeBookRequest('get', id)
  };
}

export function bookTyping(form) {
  return { type: types.BOOK_TYPING, form };
}

export function selectBook(id) {
  return { type: types.SELECT_BOOK, id };
}

export function deselectBook(id) {
  return { type: types.DESELECT_BOOK, id };
}

