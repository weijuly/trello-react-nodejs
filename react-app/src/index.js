import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import TrelloPage from './TrelloPage';
import LoginPage from './LoginPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={TrelloPage}/>
            <Route exact path="/auth" component={LoginPage}/>
        </Switch>
    </BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
