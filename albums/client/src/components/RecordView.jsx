import React from 'react'
import axios from 'axios'

class RecordView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      added: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.removeRecord = this.removeRecord.bind(this);
  }

  handleClick({ target }) {
    this.props.record.owned = target.value === 'true'
    if (this.props.saveRecord) {
      this.props.saveRecord(this.props.record, (response) => {
        this.setState({added: true})
        setTimeout(() => {
          this.setState({added: false})
        }, 2000)
      })
    }
  }

  removeRecord() {
    let cookies = document.cookie.split('; ')

    let token = cookies.filter(cookie => {
      return cookie.slice(0, 4) === 'csrf'
    })

    token = token[0].slice(10)

    axios({
      method: 'DELETE',
      url: 'http://127.0.0.1:8000/albums/api/delete-record',
      headers: {'X-CSRFToken': token},
      data: {
        record_id: this.props.record.record_id
      }
    })
      .then(response => {
        this.props.getRecords();
      })
  }

  render () {
    let Button1 = '';
    let Button2 = '';
    let added = '';

    if (this.state.added) {
      added = <a style={{color: 'green'}}>Added to your list</a>
    }

    if (this.props.saveRecord) {
      Button1 = <button onClick={this.handleClick} value={true}>own it</button>
      Button2 = <button onClick={this.handleClick} value={false}>want it</button>
    } else {
      Button1 = <button onClick={this.removeRecord}>remove</button>
    }

    return (
      <div>
        {added}
        <div className="record">
          <img src={this.props.record.thumb} style={{height: '100px', width: '100px'}}/>
          <table>
            <tbody>
              <tr>
                <td>{this.props.record.title}</td>
              </tr>
              <tr><td>{this.props.record.artist}</td></tr>
              <tr><td>{this.props.record.year || 'unknown'}</td></tr>
              <tr><td>{Button1}{Button2}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default RecordView
