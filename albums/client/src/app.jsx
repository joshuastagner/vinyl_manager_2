import React from 'react'
import ReactDOM from 'react-dom'
import RecordList from './components/RecordList.jsx'
import Search from './components/Search.jsx'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            component: 'list',
            showRecords: false,
            owned: true
        }

        this.showYours = this.showYours.bind(this)
        this.showWishList = this.showWishList.bind(this)
        this.search = this.search.bind(this)
    }

    showYours () {
        this.setState({owned: true, component: 'list'})
    }

    showWishList () {
        this.setState({owned: false, component: 'list'})
    }

    search () {
        this.setState({component: 'search'})
    }

    render () {
        let style = {
          marginRight: '10px'
        }

        let component = <RecordList owned={this.state.owned} />

        if (this.state.component === 'search') {
          component = <Search />
        }

        return (
          <div>
            <p>
              <a style={style} onClick={this.showYours}>your records</a>
              <a style={style} onClick={this.showWishList}>wish list</a>
              <a style={style} onClick={this.search}> search</a>
            </p>
            { component }
          </div>
        );
    }
}

ReactDOM.render( <App />, document.getElementById('app'));
