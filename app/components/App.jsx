// require('bootstrap-loader')
import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx'


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'info@yourdomain.com'
        }
      ]
    };
  }

  render() {
    const notes = this.state.notes;
    return (
      <div>

        <Notes notes={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote}/>
      </div>
    );
  }

  deleteNote = (id, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  };

  editNote = (id, task) => {
    // Don't modify if trying to set an empty value
    if(!task.trim()) {
      return;
    }

    const notes = this.state.notes.map(note => {
      if(note.id === id && task) {
        note.task = task;
      }

      return note;
    });

    this.setState({notes});
  };

  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'Define New task'
      }])
    });
  };
}
