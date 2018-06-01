import React from 'react';


class Button extends React.Component {


    render() {
        return (
            <button
                onClick={() => this.props.notify(this.props.name)}>
                {this.props.name}
            </button>
        );
    }

}

class ButtonGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            names: [
                'Tony Stark',
                'Natalie Rushman',
                'Bruce Banner',
                'Nick Fury',
                'Steve Rogers',
                'Thor Ragnarok'
            ]
        };
    }

    notify(name) {
        alert(name + ' was notified!');
    }

    render() {
        let buttons = [];
        for (let i = 0; i < this.state.names.length; i++) {
            buttons.push(<Button notify={this.notify.bind(this)} name={this.state.names[i]}/>);
        }
        return (
            <div>
                {buttons}
            </div>
        )

    }
}
export default ButtonGroup;