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
    let cookies = document.cookie.split('; ')

    let token = cookies.filter(cookie => {
      return cookie.slice(0, 4) === 'csrf'
    })

    token = token[0].slice(10)

    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/albums/api/save-record',
      headers: {'X-CSRFToken': token},
      data: {
        artist: this.state.artist,
        title: this.state.title,
        year: this.state.year,
        owned: this.state.owned
      }
    })
      .then(() => {
        this.setState({
          artist: '',
          title: '',
          year: '',
          owned: false
        })
      })
      .catch(() => alert('fuck'))

    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Artist: </label><br />
          <input type="text" name="artist" onChange={this.handleChange} value={this.state.artist}/><br/>
          <label>Title: </label><br />
          <input type="text" name="title" onChange={this.handleChange} value={this.state.title}/><br/>
          <label>Year Released: </label><br/>
          <input type="text"name="year" onChange={this.handleChange} value={this.state.year}/><br/>
          <label>Have it: </label><br/>
          <input type="checkbox" value="true" name="owned" onChange={this.handleChange} checked={this.state.owned}/><br/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default AddRecord
