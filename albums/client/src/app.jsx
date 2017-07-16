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
            owned: 'Your Records',
            resultRecords: []
        };

        this.changeList = this.changeList.bind(this);
        this.saveRecord = this.saveRecord.bind(this);
        this.searchRecords = this.searchRecords.bind(this);
    }

    searchRecords(query, cb) {

      let cookies = document.cookie.split('; ')

      let token = cookies.filter(cookie => {
        return cookie.slice(0, 4) === 'csrf'
      })

      token = token[0].slice(10)
      console.log(token)

      axios({
        method: 'POST',
        url: `${this.props.host}/albums/api/records/`,
        headers: {'X-CSRFToken': token},
        data: {
          query: query
        }
      })
        .then(response => {
          this.setState({resultRecords: response.data})
          cb(response)
        })
        .catch((error) => {
          console.log(error)
          cb(error)
        })
      }

    changeList({ target }) {
      let component = target.name;
      let bool = 'Your Records';

      if (component === 'own' || component === 'want') {
        if (component === 'want') {
          bool = 'Wanted records';
        }
        component = 'list'
      }

      this.setState({
        component: component,
        owned: bool
      });
    }

    getRecords(filterParam) {
      axios.get(`${this.props.host}/albums/api/records/`)
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

      console.log(token)

      axios({
        method: 'POST',
        url: `${this.props.host}/albums/api/save-record`,
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
        .catch((error) => {
          console.log(error)
          cb(error)
        })


    render() {
        let component = <RecordList owned={this.state.owned} host={this.props.host}/>
        let login = <a href='/logout'>logout</a>

        if (this.props.user === 'AnonymousUser') {
          login = <a href='/login'>login</a>
        }
        if (this.state.component === 'search') {
          component = <Search
              saveRecord={this.saveRecord}
              searchRecords={this.searchRecords}
              resultRecords={this.state.resultRecords}
            />
        }

        if (this.state.component === 'add') {
          component = <AddRecord saveRecord={this.saveRecord} />
        }

        return (
          <div>
            <p className="nav">
              <a name="own"  onClick={this.changeList}>your records</a>
              <a name="want"onClick={this.changeList}>wish list</a>
              <a name="search" onClick={this.changeList}>search</a>
              <a name="add" onClick={this.changeList}>manually add a record</a>
              {login}
            </p>
            { component }
          </div>
        );
    }
}

ReactDOM.render( <App user={window.user} host={window.host}/>, document.getElementById('app'));
