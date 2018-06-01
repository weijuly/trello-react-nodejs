import React from 'react';

class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [
                'antman',
                'batman',
                'catman',
                'dogman',
                'eelman'
            ],
            selectedUser: '',
            userToAdd: '',
            disableRemoveUser: true,
            disableAddUser: true
        }
    }

    addUser() {
        let state = {...this.state};
        state.users.push(state.userToAdd);
        state.users.sort();
        state.disableAddUser = true;
        this.setState(state);
        document.getElementById('addUserTextBox').value = '';
    }

    checkUser(event) {
        let state = {...this.state},
            value = event.target.value;
        state.disableAddUser = value === '' || this.state.users.indexOf(value) >= 0;
        state.userToAdd = value;
        this.setState(state);
    }

    selectUser(event) {
        let state = {...this.state};
        state.selectedUser = event.target.value;
        state.disableRemoveUser = false;
        this.setState(state);
    }

    removeUser() {
        let state = {...this.state};
        state.users.splice(state.users.indexOf(state.selectedUser), 1);
        state.disableRemoveUser = true;
        this.setState(state);
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <h1>Users</h1>
                        <form>
                            <div className="form-group">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onKeyUp={this.checkUser.bind(this)}
                                        ref="addUserTextBox"
                                        id="addUserTextBox"
                                        placeholder="userid ( eg: gganesan )"/>
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-outline-success"
                                            disabled={this.state.disableAddUser}
                                            onClick={this.addUser.bind(this)}
                                            type="button">
                                            <span className="oi oi-plus"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <select
                                        className="custom-select"
                                        onChange={this.selectUser.bind(this)}
                                        id="users">
                                        {this.state.users.map(user => <option key={user} value={user}>{user}</option>)}
                                    </select>
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-outline-danger"
                                            disabled={this.state.disableRemoveUser}
                                            onClick={this.removeUser.bind(this)}
                                            type="button">
                                            <span className="oi oi-x"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}

export default AdminPage;