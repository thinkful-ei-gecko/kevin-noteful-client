import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';
import config from './config';
import NotefulForm from './NotefulForm/NotefulForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from './CircleButton/CircleButton';

class AddNote extends Component {
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
    this.setState({ error: null });
    fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${config.API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));

        return res.json();
      })
      .then((data) => {
        callback(data);
        this.context.addBookmark(data);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };

  handleClickCancel = () => {
    this.props.history.push('/');
  };

  render() {
    const { error } = this.state;
    return (
      <section className="AddNote">
        <CircleButton
          tag="button"
          role="link"
          onClick={() => this.props.history.goBack()}
          className="NotePageNav__back-button"
        >
          <FontAwesomeIcon icon="chevron-left" />
          <br />
          Back
        </CircleButton>
        <h2>Add Note</h2>
        <NotefulForm
          error={error}
          onSubmit={this.handleSubmit}
          onCancel={this.handleClickCancel}
        />
      </section>
    );
  }
}

export default AddNote;
