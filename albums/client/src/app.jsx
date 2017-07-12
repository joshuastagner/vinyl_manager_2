import React from 'react'
import ReactDOM from 'react-dom'
import RecordList from './components/RecordList.jsx'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showRecords: false,
        }

        this.showRecords = this.showRecords.bind(this)
    }

    showRecords () {
        this.setState({showRecords: true})
    }

    render () {
        if (this.state.showRecords) {
            return <RecordList owned={true}/>
        }

        return (
            <div>
                <p onClick={this.showRecords}>your records</p>
            </div>
        );
    }
}

ReactDOM.render( <App />, document.getElementById('app'));
