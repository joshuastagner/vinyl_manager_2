import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RecordList from './components/RecordList.jsx';
import Search from './components/Search.jsx';
import AddRecord from './components/AddRecord.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            component: 'list',
            owned: true
        };

        this.changeList = this.changeList.bind(this);
        this.saveRecord = this.saveRecord.bind(this);
    }

    changeList({ target }) {
      let component = target.name;
      let bool = true;

      if (component === 'own' || component === 'want') {
        if (component === 'want') {
          bool = false;
        }
        component = 'list'
      }

      this.setState({
        component: component,
        owned: bool
      });
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

    saveRecord(record, cb) {
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
          artist: record.artist,
          title: record.title,
          year: record.year,
          owned: record.owned,
          thumb: record.thumb
        }
      })
        .then((response) => cb(response))
        .catch((error) => cb(error))
      }

    render() {
        let style = {
          marginRight: '10px'
        };

        let component = <RecordList owned={this.state.owned} />

        if (this.state.component === 'search') {
          component = <Search saveRecord={this.saveRecord} />
        }

        if (this.state.component === 'add') {
          component = <AddRecord saveRecord={this.saveRecord} />
        }

        return (
          <div>
            <p>
              <a style={style} name="own"  onClick={this.changeList}>your records</a>
              <a style={style} name="want"onClick={this.changeList}>wish list</a>
              <a style={style} name="search" onClick={this.changeList}>search</a>
              <a style={style} name="add" onClick={this.changeList}>manually add a record</a>
            </p>
            { component }
          </div>
        );
    }
}

ReactDOM.render( <App />, document.getElementById('app'));
