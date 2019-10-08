import React, { Component } from  'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';
import config from './config'
import NotefulForm from './NotefulForm/NotefulForm'

class AddFolder extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = ApiContext;

  state = {
    error: null,
  };

  handleSubmit = (bookmark, callback) => {
    this.setState({ error: null })
    fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))

        return res.json()
      })
      .then(data => {
        callback(data)
        this.context.addBookmark(data)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  render() {
    const { error } = this.state
    return (
      <section className='AddBookmark'>
        <h2>Create a bookmark</h2>
        <NotefulForm
          error={error}
          onSubmit={this.handleSubmit}
          onCancel={this.handleClickCancel}
        />
      </section>
    );
  }
}

export default AddFolder;