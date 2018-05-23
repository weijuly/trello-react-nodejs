import React from 'react';
import ReactDOM from 'react-dom';
import TrelloPage from './TrelloPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TrelloPage/>, document.getElementById('root'));
registerServiceWorker();
