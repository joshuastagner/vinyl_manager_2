import React from 'react'
import axios from 'axios'
import ButtonContainer from '../containers/ButtonContainer.jsx';

class RecordView extends React.Component {

  render () {
    return (
      <div>
        <div className="record">
          <img src={this.props.record.thumb} style={{height: '100px', width: '100px'}}/>
          <table>
            <tbody>
              <tr>
                <td>{this.props.record.title}</td>
              </tr>
              <tr><td>{this.props.record.artist}</td></tr>
              <tr><td>{this.props.record.year || 'unknown'}</td></tr>
              <tr><td><ButtonContainer record={this.props.record}/></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default RecordView
