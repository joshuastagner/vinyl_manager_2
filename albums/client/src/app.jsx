import React from 'react';
import ReactDOM from 'react-dom';
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

    render() {
        let style = {
          marginRight: '10px'
        };

        let component = <RecordList owned={this.state.owned} />

        if (this.state.component === 'search') {
          component = <Search />
        }

        if (this.state.component === 'add') {
          component = <AddRecord />
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
