import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { push } from 'react-router-redux';
import LibraryItem from 'components/LibraryItem';

import {
  fetchLibraries
   } from 'actions/libraries';
import styles from 'scss/components/libraries';

import {
  fetchBooks
  } from 'actions/books';
 
const cx = classNames.bind(styles);

class Libraries extends Component {

  //Data that needs to be called before rendering the component
  //This is used for server side rending via the fetchComponentDataBeforeRending() method
  static need = [
    fetchLibraries
  ]

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
    const {libraries} = this.props;

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
        <ul>{libraryItems}</ul>
        <button onClick={this.onNewLibrary}>New Library</button>
      </div>
    );
  }
}


Libraries.propTypes = {
  libraries: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    libraries: state.library.libraries
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Libraries);
