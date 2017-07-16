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

      if (this.props.records) {
        this.setState({records: this.props.records})
      }
    }

    getRecords() {
      let bool = false;
      if (this.props.owned === 'Your Records') {
        bool = true;
      }

      axios.get('http://vinyl-manager.herokuapp.com/albums/api/records')
        .then(response => {
          let records = response.data.filter(record => {
            return record.owned === bool;
          })
          this.setState({records: records});
        })
    }

    render() {
        return (
          <div>
            <h2>{this.props.owned.toString()}</h2>
            {this.state.records.map(record => {
              return <RecordView key={record.record_id} record={record} saveRecord={this.props.saveRecord} getRecords={this.getRecords}/>
            })}
          </div>
        )
    }
}


export default RecordList
