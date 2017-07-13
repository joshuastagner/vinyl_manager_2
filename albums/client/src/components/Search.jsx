import React from 'react'
import axios from 'axios'
import RecordList from './RecordList.jsx'

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchQuery: '',
      displayResults: false,
      records: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({searchQuery: target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    let cookies = document.cookie.split('; ')

    let token = cookies.filter(cookie => {
      return cookie.slice(0, 4) === 'csrf'
    })

    token = token[0].slice(10)

    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/albums/api/records/',
      headers: {'X-CSRFToken': token},
      data: {
        query: this.state.searchQuery
      }
    })
      .then(response => {
        this.setState({searchQuery: '', records: response.data, displayResults: true})
      })
      .catch((error) => console.log(error))
  }

  render() {
    let component = '';
    if (this.state.displayResults) {
      component = <RecordList owned="nah" records={this.state.records} saveRecord={this.props.saveRecord} />
    }

    return (
      <div>
        <h2>search discogs</h2>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.searchQuery} />
          <input type="submit" value="search" />
        </form>
        {component}
      </div>
    )
  }
}

export default Search
