import React from 'react';
import Cookies from 'universal-cookie';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            auth: false
        }
        this.cookie = new Cookies();
    }

    auth = async (creds) => {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(creds)
        });
        const body = await response.json();
        if (response.status !== 200) {
            window.location.replace("/auth");
        }
        let state = {...this.state};
        state.auth = true;
        this.setState(state);

        this.cookie.set('trello', 'auth', {path: '/'});
        window.location.replace("/");
    }

    login() {
        this.auth({
            user: this.state.username,
            pass: this.state.password
        });
    }

    setUsername(event) {
        let state = {...this.state};
        state.username = event.target.value;
        this.setState(state);
    }

    setPassword(event) {
        let state = {...this.state};
        state.password = event.target.value;
        this.setState(state);
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <h1>Trello Login</h1>
                        <form>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    onChange={this.setUsername.bind(this)}
                                    placeholder="username ( eg: gganesan )"/>
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    onChange={this.setPassword.bind(this)}
                                    placeholder="password"/>
                            </div>
                            <div className="form-group">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-block"
                                    onClick={this.login.bind(this)}
                                    id="login">
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}

export default LoginPage;