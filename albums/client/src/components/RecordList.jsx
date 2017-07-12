import React from 'react'
import axios from 'axios'

class RecordList extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        records: []
      }
    }

    componentDidMount () {
      axios.get('http://127.0.0.1:8000/albums/api/records')
        .then(response => {
          let records = response.data.filter(record => {
            return record.owned === this.props.owned
          })
          this.setState({records: records})
        })
    }

    render() {
        return (
          <div>
            {this.state.records.map(record => <p>{record.title}</p>)}
          </div>
        )
    }
}

export default RecordList
