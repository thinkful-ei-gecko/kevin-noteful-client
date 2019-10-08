import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';
import config from './config';
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
    note_name: '',
    content: '',
    folder_id: 1,
  };

  handleChangeNoteName = (e) => {
    this.setState({ note_name: e.target.value });
  };

  handleChangeNoteContent = (e) => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      note_name: this.state.note_name,
      content: this.state.content,
      folder_id: this.state.folder_id,
    };
    this.setState({ error: null });
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return;
      })
      .then(() => {
        this.context.addNote(newNote);
        this.props.history.goBack();
      })
      .catch((error) => {
        console.error({ error });
      });
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
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="noteName">Add Note</label>
          <input name="noteName" id="noteName" onChange={this.handleChangeNoteName} />
          <label htmlFor="noteContent">Content</label>
          <textarea
            name="noteContent"
            id="noteContent"
            onChange={this.handleChangeNoteContent}
          />
          <button type="submit">Add Note</button>
        </form>
      </section>
    );
  }
}

export default AddNote;
