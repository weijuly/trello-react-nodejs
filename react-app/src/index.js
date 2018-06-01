import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TrelloPage from './TrelloPage';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={TrelloPage}/>
            <Route exact path="/auth" component={LoginPage}/>
            <Route exact path="/admin" component={AdminPage}/>
        </Switch>
    </BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
