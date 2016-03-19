
import _ from 'lodash'

import {
	GET_GEO
} from 'constants/index';

export default function geo(state = {
  ip: "",
  leaflet: true,
  lat: "",
  lon: ""

}, action) {
  switch (action.type) {
    case GET_GEO:
      return Object.assign({}, state, {
        leaflet:true
      });

    default:
      return state;
  }
}
