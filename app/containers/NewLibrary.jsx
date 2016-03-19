import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { push } from 'react-router-redux';

import NumberInput from 'components/NumberInput';
import TextInput from 'components/TextInput';

import {
  libraryTyping,
  createLibrary
   } from 'actions/libraries';
import styles from 'scss/components/new-library';

const cx = classNames.bind(styles);

class NewLibrary extends Component {

  // enable leaflet
  componentDidMount () {

    const {libraries, leaflet} = this.props;
    let L = window.L;

    let map = L.map("map");//.setView([48.4284425, -123.3488279], 13);
    map.locate({setView: true, maxZoom: 16});

    L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let mark = L.marker([48.4284425, -123.3488279])
      .on('move', e => this.onMarkerMove(mark.getLatLng().lat,mark.getLatLng().lng))
      .addTo(map);

    map.on('click', e => { mark.setLatLng(e.latlng)});


  }

  constructor(props) {
    super(props);
    // event handlers for libraryItems components
    this.onlibraryTyping = this.onlibraryTyping.bind(this);
    this.onEntrySave = this.onEntrySave.bind(this);
    this.onMarkerMove = this.onMarkerMove.bind(this);
  }

  onMarkerMove(lat,lng) {
    const { dispatch } = this.props;
    let form = {lat:lat, lon:lng};
    dispatch(libraryTyping(form));
  }

  onlibraryTyping(typ, val) {
    const { dispatch } = this.props;
    let form = {};
    form[typ] = val; 
    dispatch(libraryTyping(form));
  }

  onEntrySave() {
    const { dispatch, newLibrary } = this.props;
    dispatch(createLibrary(newLibrary.name, newLibrary.lat, newLibrary.lon, newLibrary.desc, newLibrary.capacity, newLibrary.picture));
    dispatch(push('/libraries'));
  }

  render() {
    const {newLibrary} = this.props;

    return (
      <div className={cx('new-library')}>   
        <div id="map" className={cx('map')}></div>
        <ul>
          <li><h3>Add a New Library</h3></li>
          <li>Click on the Map to Set the Location</li>
          <li>Library Name: <TextInput placeholder="(make one up!)"
            className="library-name" 
            maxlength="100"
            type="text"
            value={newLibrary.name}
            onEntryChange={this.onlibraryTyping.bind(this, "name")}
            /></li>

          <li>Description: <TextInput placeholder="How do you find it, who runs it and so on"
            className="library-desc" 
            maxlength="500"
            type="text"
            value={newLibrary.desc}
            onEntryChange={this.onlibraryTyping.bind(this, "desc")}
            /></li>
          <li>Max Number of Books: <NumberInput placeholder="Book Capacity"
            className="library-cap" 
            value={newLibrary.capacity}
            onEntryChange={this.onlibraryTyping.bind(this, "capacity")}
            /></li>
          <li>Link to a picture: <TextInput placeholder="picture link"
            className="library-pic-link" 
            maxlength="300"
            type="url"
            value={newLibrary.picture}
            onEntryChange={this.onlibraryTyping.bind(this, "picture")}
            /></li>
          <li><button onClick={this.onEntrySave} >Submit</button></li>
        </ul>

      </div>
    );
  }
}

NewLibrary.propTypes = {
  newLibrary: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    newLibrary: state.library.newLibrary,
    libraries: state.library.libraries
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(NewLibrary);
