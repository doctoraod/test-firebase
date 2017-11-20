import React, { Component } from 'react';
// import moment from 'moment'
import './App.css'
import db from './firebase'

class App extends Component {
  constructor() {
    super()
    this.state = {
      todoList: [],
      name: '',
      age: '',
      last: ''
    }
  }
  componentDidMount = () => {
    db.ref('last').on('value', data => {
      console.log('last - value')
      this.setState({
        last: data.val(),
      })
    })
    db.ref('todoList').on('child_added', data => {
      console.log('child_added')
      console.log(data.val())
      this.setState({
        todoList: [ ...this.state.todoList, { id: data.key, ...data.val() }],
      })
    })
    db.ref('todoList').on('child_changed', data => {
      console.log('child_changed')
      this.setState({
        todoList: [ ...this.state.todoList, { id: data.key, ...data.val() }],
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
  handleEnter = (e) => {
    if (e.keyCode === 13) {
      // Key Enter
      this.handleAdd()
    }
  }
  handleAdd = () => {
    const { name, age } = this.state
    const id = Date.now()
    db.ref(`todoList/${id}`).set({ name, age: (+age || 0) })
    this.setState({ name: '', age: '' })
  }
  handleRemove = (id) => {
    db.ref(`todoList/${id}`).remove()
  }
  handleTextChange = (element, key) => {
    this.setState({
      [key]: element.target.value
    })
  }
  handleCancel = () => {
    this.setState({
      name: '',
      age: ''
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
                    <li key={key}>{value.id} {value.name} ({value.age}) <button className="button is-small is-danger" onClick={() => this.handleRemove(value.id)}>Remove</button></li>
                  ))
                }
              </ol>
            </div>
          </div>
          <div className="column">
            <h3 className="title is-3">{this.state.last}</h3>
            <h3 className="title is-3">Add Todo</h3>
            <div className="field">
              <label className="label">Todo</label>
              <div className="control">
                <input className="input" type="text" placeholder="Text input" value={this.state.name} onKeyUp={this.handleEnter} onChange={(e) => this.handleTextChange(e, 'name')}/>
              </div>
            </div>
            <div className="field">
              <label className="label">Age</label>
              <div className="control">
                <input className="input" type="text" placeholder="Text input" value={this.state.age} onKeyUp={this.handleEnter} onChange={(e) => this.handleTextChange(e, 'age')}/>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-primary" onClick={() => this.handleAdd()}>Add</button>
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
