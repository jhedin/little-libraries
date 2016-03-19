
import {
	CREATE_LIBRARY_REQUEST,
	CREATE_LIBRARY_FAILURE,
	CREATE_LIBRARY_SUCCESS,
	GET_LIBRARIES_REQUEST,
	GET_LIBRARIES_SUCCESS,
	GET_LIBRARIES_FAILURE,
  LIBRARY_TYPING } from 'constants/index';

export default function library(state = {
  libraries: [],
  newLibrary: {
    name: "",
    lat: 0,
    lon: 0,
    desc: "",
    capacity: 30,
    picture: ""
  },

}, action) {

  switch (action.type) {
    case GET_LIBRARIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        newLibrary: state.newLibrary
      });
    case GET_LIBRARIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        libraries: action.req.data,
        newLibrary: state.newLibrary
      });
    case GET_LIBRARIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        newLibrary: state.newLibrary
      });
    case CREATE_LIBRARY_REQUEST:
      return {
        libraries: [...state.libraries, action.library ],
        newLibrary: state.newLibrary
      };
    case CREATE_LIBRARY_FAILURE:
      return {
        libraries: [...state.libraries.filter((tp) => tp.id !== action.id)],
        newLibrary: state.newLibrary
      };
    case LIBRARY_TYPING:
      return {
        libraries: state.libraries,
        newLibrary: {
          name: action.form.name || state.newLibrary.name,
          lat: action.form.lat || state.newLibrary.lat,
          lon: action.form.lon || state.newLibrary.lon,
          desc: action.form.desc || state.newLibrary.desc,
          capacity: action.form.capacity || state.newLibrary.capacity,
          picture: action.form.picture || state.newLibrary.picture
        }
      };

    default:
      return state;
  }
}
