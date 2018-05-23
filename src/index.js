import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import 'react-select/dist/react-select.css';
import Router from './components/Router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
