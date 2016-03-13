import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';

polyfill();


export function getGeo() {

  return { type: types.GET_GEO};
}