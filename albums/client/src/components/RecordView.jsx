import React from 'react'

class RecordView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      added: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target }) {
    this.props.record.owned = target.value
    if (this.props.saveRecord) {
      this.props.saveRecord(this.props.record, (response) => {
        this.setState({added: true})
        setTimeout(() => {
          this.setState({added: false})
        }, 2000)
      })
    }
  }

  render () {
    let ownItButton = '';
    let wantItButton = '';
    let added = '';

    if (this.state.added) {
      added = <a style={{color: 'green'}}>Added to your list</a>
    }

    if (this.props.saveRecord) {
      ownItButton = <button onClick={this.handleClick} value={'true'}>own it</button>
      wantItButton = <button onClick={this.handleClick} value={'false'}>want it</button>
    }

    return (
      <div>
        {added}
        <table>
          <tbody>
            <tr>
              <td>{this.props.record.title}</td>
            </tr>
            <tr><td>{this.props.record.artist}</td></tr>
            <tr><td>{this.props.record.year}</td></tr>
            <tr><td><img src={this.props.record.thumb} style={{height: '100px', width: '100px'}}/></td></tr>
          </tbody>
        </table>
          {ownItButton}
          {wantItButton}
      </div>
    );
  }
}
export default RecordView
