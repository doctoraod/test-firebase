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
      console.log('child_added')
      this.setState({
        todoList: [ ...this.state.todoList, { id: data.key,  name: data.val().name }]
      })
    })
    db.ref('todoList').on('child_changed', data => {
      console.log('child_changed')
      this.setState({
        todoList: [ ...this.state.todoList, { id: data.key,  name: data.val().name }]
      })
    })
    db.ref('todoList').on('child_removed', data => {
      console.log('child_removed', data.key)
      const { todoList } = this.state
      const newTodoList = todoList.filter((value) => +value.id !== +data.key)
      this.setState({
        todoList: newTodoList
      })
    })
  }
  handleAdd = (value) => {
    const id = Date.now()
    db.ref(`todoList/${id}`).set({ name: value })
  }
  handleRemove = (id) => {
    db.ref(`todoList/${id}`).remove()
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
            <h3 className="title is-3">Todo List</h3>
            <div className="content">
              <ol>
                {
                  this.state.todoList.map((value, key) => (
                    <li key={key}>{value.id} {value.name} <button className="button is-small is-danger" onClick={() => this.handleRemove(value.id)}>Remove</button></li>
                  ))
                }
              </ol>
            </div>
          </div>
          <div className="column">
            <h3 className="title is-3">Add Todo</h3>
            <div className="field">
              <label className="label">Todo</label>
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
        </div>
      </div>
    );
  }
}

export default App;
