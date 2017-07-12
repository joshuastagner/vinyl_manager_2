import React from 'react'
import axios from 'axios'

class RecordList extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        records: []
      }
    }

    componentDidMount() {
      if (this.props.records) {
        this.setState({records: this.props.records});
      } else {
        this.getRecords(this.props.owned);
      }
    }

    componentWillReceiveProps(next) {
      if (this.props.owned !== next.owned) {
        this.getRecords(next.owned);
      }
    }

    getRecords(filterParam) {
      axios.get('http://127.0.0.1:8000/albums/api/records')
        .then(response => {
          let records = response.data.filter(record => {
            return record.owned === filterParam
          })
          this.setState({records: records});
        })
    }

    render() {
        return (
          <div>
            <h2>owned: {this.props.owned.toString()}</h2>
            {this.state.records.map(record => <p>{record.title}</p>)}
          </div>
        )
    }
}

export default RecordList
