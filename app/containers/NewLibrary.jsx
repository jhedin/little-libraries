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

  constructor(props) {
    super(props);
    // event handlers for libraryItems components
    this.onlibraryTyping = this.onlibraryTyping.bind(this);
    this.onEntrySave = this.onEntrySave.bind(this);
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
        <TextInput placeholder="library's name (make one up!)"
          className="library-name" 
          maxlength="100"
          type="text"
          value={newLibrary.name}
          onEntryChange={this.onlibraryTyping.bind(this, "name")}
          />
        <NumberInput placeholder="lat"
          className="lat"
          value={newLibrary.lat}
          onEntryChange={this.onlibraryTyping.bind(this, "lat")}
          />
        <NumberInput placeholder="lon"
          className="lon"
          value={newLibrary.lon}
          onEntryChange={this.onlibraryTyping.bind(this, "lon")}
          />
        <TextInput placeholder="Description: How do you find it, who runs it and so on"
          className="library-desc" 
          maxlength="500"
          type="text"
          value={newLibrary.desc}
          onEntryChange={this.onlibraryTyping.bind(this, "desc")}
          />
        <NumberInput placeholder="Book Capacity"
          className="library-cap" 
          value={newLibrary.capacity}
          onEntryChange={this.onlibraryTyping.bind(this, "capacity")}
          />
        <TextInput placeholder="picture link"
          className="library-pic-link" 
          maxlength="300"
          type="url"
          value={newLibrary.picture}
          onEntryChange={this.onlibraryTyping.bind(this, "picture")}
          />

        <button onClick={this.onEntrySave} >Submit</button>
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
