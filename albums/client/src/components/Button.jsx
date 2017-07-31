import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flashMessage: ''
    };
  }

  flashMessage () {
    this.setState({flashMessage: '  added to your collection'}, () => {
      setTimeout(() => {this.setState({flashMessage: ''})}, 1000)
    })
  }

  render () {
    const { view, removeRecord, saveRecord, record, host, token } = this.props;

    if (view === 'OWNED_RECORDS' || view === 'WANTED_RECORDS') {
      return (
        <button onClick={() => {removeRecord(host, token, record.record_id)}}>remove</button>
      );
    }
    return (
      <div>
        <button onClick={() => {
            saveRecord(host, token, record, true);
            this.flashMessage();
          }}>own it</button>
        <button onClick={() => {
            saveRecord(host, token, record, false);
            this.flashMessage();
          }}>want it</button>
        <a style={{color: 'green'}}>{ this.state.flashMessage}</a>
      </div>
    )
  }
};

export default Button;
