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
function makeLibraryRequest(method, id, data, api='/lib') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

/*
 * @param data
 * @return a simple JS object
 */
function createLibraryRequest(data) {
  return {
    type: types.CREATE_LIBRARY_REQUEST,
    library: data
  };
}

function createLibrarySuccess() {
  return {
    type: types.CREATE_LIBRARY_SUCCESS
  };
}

function createLibraryFailure(data) {
  return {
    type: types.CREATE_LIBRARY_FAILURE,
    id: data.id,
    error: data.error
  };
}

function createLibraryDuplicate() {
  return {
    type: types.CREATE_LIBRARY_DUPLICATE
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createLibrary(name, lat, lon, desc, capacity, picture) {
  return (dispatch, getState) => {
    // If the name box is empty
    if (name.trim().length <= 0) return;

    const id = md5.hash(lat + name + lon);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { library } = getState();
    const data = {
      id: id,
      name: name,
      lat: lat,
      lon: lon,
      desc: desc,
      capacity: capacity,
      picture: picture
    }

    // Conditional dispatch
    // If the library already exists, make sure we emit a dispatch event
    if (library.libraries.filter(libraryItem => libraryItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate library
      return dispatch(createLibraryDuplicate());
    }

    // First dispatch an optimistic update
    dispatch(createLibraryRequest(data));

    return makeLibraryRequest('post', id, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_LIBRARY_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createLibrarySuccess());
        }
      })
      .catch(ex => {
        return dispatch(createLibraryFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your library'}));
      });
  };
}

// Fetch posts logic
export function fetchLibraries() {
  return {
    type: types.GET_LIBRARIES,
    promise: makeLibraryRequest('get')
  };
}

export function libraryTyping(form) {
  return { type: types.LIBRARY_TYPING, form };
}
