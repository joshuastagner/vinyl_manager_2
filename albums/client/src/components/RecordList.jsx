import React from 'react';
import axios from 'axios';
import RecordView from './RecordView.jsx';

class RecordList extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        records: []
      };

      this.getRecords = this.getRecords.bind(this);
    }

    componentDidMount() {
      if (this.props.records) {
        this.setState({records: this.props.records});
      } else {
        this.setState({owned: this.props.owned}, () => {
          this.getRecords();
        })
      }
    }

    componentWillReceiveProps(next) {
      if (this.props.owned !== next.owned) {
        this.setState({owned: next.owned}, () => {
          this.getRecords(this.state.owned);
        })
      }
    }

    getRecords() {
      axios.get('http://127.0.0.1:8000/albums/api/records')
        .then(response => {
          let records = response.data.filter(record => {
            return record.owned === this.state.owned
          })
          this.setState({records: records});
        })
    }

    render() {
        return (
          <div>
            <h2>owned: {this.props.owned.toString()}</h2>
            {this.state.records.map(record => {
              return <RecordView key={record.record_id} record={record} saveRecord={this.props.saveRecord} getRecords={this.getRecords}/>
            })}
          </div>
        )
    }
}

export default RecordList
