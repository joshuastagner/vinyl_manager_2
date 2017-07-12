import React from 'react'
import axios from 'axios'

class AddRecord extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      artist: '',
      title: '',
      year: '',
      owned: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    let value = target.value;

    if (value === 'true') {
      value = !this.state.owned
    }

    this.setState({[target.name]: value})
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Artist: </label><br />
          <input type="text" name="artist" onChange={this.handleChange}/><br/>
          <label>Title: </label><br />
          <input type="text" name="title" onChange={this.handleChange}/><br/>
          <label>Year Released: </label><br/>
          <input type="text"name="year" onChange={this.handleChange}/><br/>
          <label>Have it: </label><br/>
          <input type="checkbox" value="true" name="owned" onChange={this.handleChange} /><br/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default AddRecord
