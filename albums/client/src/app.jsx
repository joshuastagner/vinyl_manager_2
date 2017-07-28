import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import { fetchUserRecords, isLoggedIn, setToken, setHost } from './actions';
import AddRecord from './components/AddRecord.jsx';
import VisibleRecords from './containers/VisibleRecords.jsx';
import NavBar from './components/NavBar.jsx';
import Search from './containers/Search.jsx';

class App extends React.Component {
    componentWillMount () {
      console.log('props', this.props.host)
      this.props.store.dispatch(fetchUserRecords(`${this.props.host}/albums/api/records/`));

      if (this.props.user === 'AnonymousUser') {
        this.props.store.dispatch(isLoggedIn(false, this.props.user));
      } else {
        this.props.store.dispatch(isLoggedIn(true, this.props.user));
      }

      let cookies = document.cookie.split('; ')
      let token = cookies.filter(cookie => {
        return cookie.slice(0, 4) === 'csrf'
      });
      token = token[0].slice(10);
      this.props.store.dispatch(setToken(token));

      this.props.store.dispatch(setHost(this.props.host));
    }

    render() {
        return (
          <div>
            <NavBar />
            <Search />
            <VisibleRecords />
          </div>
        );
    }
}

const loggerMiddleware = createLogger();
const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <App user={window.user} host={window.host} store={store}/>
  </Provider>,
  document.getElementById('app')
);

