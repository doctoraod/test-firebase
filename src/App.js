import React, { Component } from 'react';
// import moment from 'moment'
import './App.css'
import db from './firebase'

class App extends Component {
  constructor() {
    super()
    this.state = {
      todoList: [],
      name: ''
    }
  }
  componentDidMount = () => {
    db.ref('todoList').on('child_added', data => {
      this.setState({
        todoList: [ ...this.state.todoList, { id: data.key,  name: data.val().name }]
      })
    })
  }
  handleAdd = (value) => {
    const { todoList } = this.state
    db.ref(`todoList/${Date.now()}`).set({ name: value })
    this.setState({
      todoList: [ ...todoList, { id: Date.now(), name: value } ],
      name: ''
    })
  }
  handleRemove = (key, id) => {
    const { todoList } = this.state
    db.ref(`todoList/${id}`).remove()
    todoList.splice(key, 1)
    this.setState({
      todoList
    })
  }
  handleTextChange = (element) => {
    this.setState({
      name: element.target.value
    })
  }
  handleCancel = () => {
    this.setState({
      name: ''
    })
  }
  render() {
    return (
      <div className="App">
        <div className="columns">
          <div className="column">
            <div className="content">
              <ol>
                {
                  this.state.todoList.map((value, key) => (
                    <li key={key}>{value.id} {value.name} <button className="button is-small is-danger" onClick={() => this.handleRemove(key, value.id)}>Remove</button></li>
                  ))
                }
              </ol>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="Text input" value={this.state.name} onChange={this.handleTextChange}/>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-primary" onClick={() => this.handleAdd(this.state.name)}>Add</button>
              </div>
              <div className="control">
                <button className="button is-link" onClick={this.handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
          <div className="column">
          </div>
          <div className="column">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
