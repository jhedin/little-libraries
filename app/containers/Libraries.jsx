import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { push } from 'react-router-redux';
import LibraryItem from 'components/LibraryItem';

import styles from 'scss/components/libraries';

import {
  fetchLibraries
   } from 'actions/libraries';

import {
  fetchBooks
  } from 'actions/books';

import {
  getGeo
  } from 'actions/geo';
 
const cx = classNames.bind(styles);

class Libraries extends Component {

  //Data that needs to be called before rendering the component
  //This is used for server side rending via the fetchComponentDataBeforeRending() method
  static need = [
    fetchLibraries
  ]

  // enable leaflet
  componentDidMount () {

    const {libraries, leaflet} = this.props;
    let L = window.L;

    let map = L.map("map").setView([51.0401904, -114.087756], 13);

    L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    for(let library of libraries) {

      L.marker([library.lat, library.lon])
      .on('click', this.onSelectLibrary.bind(this, library.id))
      .addTo(map);
    }

  }

  constructor(props) {
    super(props);
    // event handlers for libraryItems components
    this.onSelectLibrary = this.onSelectLibrary.bind(this);
    this.onNewLibrary = this.onNewLibrary.bind(this);
  }

  onSelectLibrary(id) {
    const { dispatch } = this.props;
    dispatch(fetchBooks(id));
    dispatch(push('/library/'+id));
  }

  onNewLibrary() {
    const { dispatch } = this.props;
    dispatch(push('/newLibrary'));
  }

  render() {
    const {libraries, leaflet} = this.props;

    const libraryItems = libraries.map((library, key) => {
      return (
      <LibraryItem index={key}
        id={library.id}
        key={key}
        name={library.name}
        onSelectLibrary = {this.onSelectLibrary}/>)
    });

    return (
      <div className={cx('libraries')}>
        {leaflet ? <div id="map" className={cx('map')}></div> : <ul>{libraryItems}</ul>}    
        <button onClick={this.onNewLibrary}>New Library</button>
      </div>
    );
  }
}


Libraries.propTypes = {
  libraries: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  leafet: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    libraries: state.library.libraries,
    leaflet: state.geo.leaflet
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Libraries);
