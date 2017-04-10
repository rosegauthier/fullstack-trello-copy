var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


// TODO: Include your React components like this:
import App from './components/app';
import Login from './components/login';

// TODO: Render your routes inside the router
ReactDOM.render(<Router history={browserHistory}>
	<Route path="/login" component={ Login } />
	<Route path="/" component={ App } />
</Router>, document.getElementById("placeholder"));
