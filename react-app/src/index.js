import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import TrelloPage from './TrelloPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
        <TrelloPage/>
    </BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
