import React from 'react'
import axios from 'axios'
import RecordList from './RecordList.jsx'

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchQuery: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({searchQuery: target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchRecords(this.state.searchQuery, (response) => {
    console.log('search props', this.props.resultRecords)
      this.setState({displayResults: true})
    })
  }

  render() {
    return (
      <div className="search">
        <h2>search discogs</h2>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.searchQuery} />
          <input className="submit" type="submit" value="search" />
        </form>
        <RecordList owned="search results" records={this.props.resultRecords} saveRecord={this.props.saveRecord} />
      </div>
    )
  }
}

export default Search
