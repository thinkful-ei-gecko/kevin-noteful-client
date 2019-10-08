import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';
import config from './config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from './CircleButton/CircleButton';

class AddFolder extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = ApiContext;

  state = {
    error: null,
    folderName: '',
  };

  handleChangeFolderName = (e) => {
    this.setState({ folderName: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newFolder = {
      folder_name: this.state.folderName,
    }
    this.setState({ error: null });
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFolder),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return;
      })
      .then(() => {
        this.context.addFolder(newFolder);
        this.props.history.goBack();
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <section className="AddFolder">
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
        <h2>Add Folder</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="folderName">Add Folder</label><br/>
          <input
            name="folderName"
            id="folderName"
            onChange={this.handleChangeFolderName}
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    );
  }
}

export default AddFolder;
