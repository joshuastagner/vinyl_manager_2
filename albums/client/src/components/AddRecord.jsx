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
    const { host, token } = this.props;
    event.preventDefault();
    let record = this.state;
    record.thumb = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/12in-Vinyl-LP-Record-Angle.jpg/1200px-12in-Vinyl-LP-Record-Angle.jpg';
    this.props.saveRecord(host, token, this.state, this.state.owned);
    this.setState({
      artist: '',
      title: '',
      year: '',
      owned: false
    });
  }

  render() {
    if (this.props.filter !== 'ADD_RECORD') {
      return null;
    };

    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <div className="wrapper">
            <label>Artist: </label><br />
            <input type="text" name="artist" onChange={this.handleChange} value={this.state.artist}/><br/>
            <label>Title: </label><br />
            <input type="text" name="title" onChange={this.handleChange} value={this.state.title}/><br/>
            <label>Year Released: </label><br/>
            <input type="text"name="year" onChange={this.handleChange} value={this.state.year}/><br/>
            <label>Have it: </label>
            <input className="check" type="checkbox" value="true" name="owned" onChange={this.handleChange} checked={this.state.owned}/><br/>
            <input className="submit" type="submit"/>
          </div>
        </form>
      </div>
    )
  }
}

export default AddRecord
