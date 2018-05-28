import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap4-modal';
import Datetime from 'react-datetime';


class TrelloErrorModal extends React.Component {

    reload() {
        window.location.reload();
    }

    render() {
        return (
            <Modal visible={this.props.show}>
            <div className="modal-header">
                <h5 className="modal-title">Error</h5>
            </div>
            <div className="modal-body">
                <p>Cannot connect to Trello data server!</p>
                <p className="small">{this.props.error}</p>
            </div>
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.reload.bind(this)}>
                    Try again
                </button>
            </div>
      </Modal>
        );
    }
}

class TrelloCreateCardModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            card: {
                id: null,
                header: '',
                description: '',
                owner: 'gganesan',
                due: '12-Aug-2018',
                state: 'b'
            }
        };
    }

    addCard() {
        let card = {...this.state.card};
        card.id = btoa(new Date());
        card.due = new Date();
        this.props.addCard(card);
        this.props.hideCreateCard();
    }

    setHeader(event) {
        let copyState = {...this.state};
        copyState.card.header = event.target.value;
        this.setState(copyState);
    }

    setDescription(event) {
        let copyState = {...this.state};
        copyState.card.description = event.target.value;
        this.setState(copyState);
    }


    render() {
        return (
            <Modal visible={this.props.createCardShow}>
                <div className="modal-header">
                    <h5 className="modal-title">New Card</h5>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <input 
                                className="form-control"
                                type="text"
                                onChange={this.setHeader.bind(this)}
                                placeholder="Title"/>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col">
                                    <Datetime
                                        closeOnSelect='true'
                                        dateFormat='MM/DD/YYYY'
                                        timeFormat=''/>
                                </div>
                                <div className="col">
                                    <input 
                                        className="form-control"
                                        type="text" 
                                        placeholder="assignee"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input 
                                className="form-control form-control-sm"
                                type="text" 
                                onChange={this.setDescription.bind(this)}
                                placeholder="Description"/>
                            <small 
                                className="form-text text-muted">
                                New cards will appear in the backlog section.
                            </small>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.addCard.bind(this)}>
                        Save
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.props.hideCreateCard}>
                        Cancel
                    </button>
                </div>
          </Modal>
        );
    }

}

class TrelloCreateCardButton extends React.Component {

    render() {
        return (
            <button 
                className="btn btn-outline-success"
                onClick={this.props.showCreateCard}
                type="button">
                <span className="oi oi-plus"></span>
            </button>
        );
    }

}


class TrelloHeader extends React.Component {
    
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-darl bg-dark">
                <a className="navbar-brand" href="www.google.com">Trello</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline">
                        <TrelloCreateCardButton 
                            showCreateCard={this.props.showCreateCard}/>
                    </form>
                </div>
            </nav>
        );
    }
    
}

class TrelloFooter extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <span className="text-muted">Place sticky footer content here.</span>
                </div>
            </footer>
        );
    }
}

class TrelloCard extends React.Component {
    
    renderButton(cardState, displayText, contextClass) {
        return (
            <button 
                type="button" 
                className={`btn ${contextClass}`} 
                onClick={()=>this.props.setCardState(this.props.card.id, cardState)}>
                <span 
                    className={`oi oi-${displayText}`}
                    title="menu" 
                    aria-hidden="true">
                    </span>
            </button>
        );
    }
    
    
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        {this.props.card.header}
                        <div className="float-right">
                            <small>
                                <i>
                                    {this.props.card.owner}
                                </i>
                            </small>
                        </div>
                    </h5>
                    <p className="card-text">{this.props.card.description}</p>
                    <div 
                        className="form-group row">
                        <div class="col-6">
                            <div className="btn-group btn-group-sm" role="group" aria-label="">
                                {this.renderButton('b', 'media-record', 'btn-secondary')}
                                {this.renderButton('i', 'media-play', 'btn-primary')}
                                {this.renderButton('x', 'x', 'btn-danger')}
                                {this.renderButton('c', 'check', 'btn-success')}
                                {this.renderButton('d', 'trash', 'btn-secondary')}
                            </div>
                        </div>
                        <div class="col-6">
                            <div className="input-group input-group-sm" role="group" aria-label="">
                                <div className="input-group-prepend">
                                    <div class="input-group-text">@</div>
                                </div>
                                <input 
                                    type="text"
                                    value={this.props.card.due.toLocaleDateString('en-US')} 
                                    className="form-control form-control-sm"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class TrelloColumn extends React.Component {

    
    render() {
        return (
            <div className="col">
                <h3> {this.props.name} </h3>
                {this.props.cards.map(card => <TrelloCard card={card} setCardState={this.props.setCardState}/>)}
            </div>
        );
    }

}

class TrelloBoard extends React.Component {
    
    renderTrelloColumn(group, cardState) {
        return <TrelloColumn
            name={group}
            setCardState={this.props.setCardState}
            cards={this.props.cards.filter(card => card.state === cardState)}/>
    }
    
    render() {
        return (
            <div className="row">
                {this.renderTrelloColumn('backlog', 'b')}
                {this.renderTrelloColumn('in-progress', 'i')}
                {this.renderTrelloColumn('blocked', 'x')}
                {this.renderTrelloColumn('complete', 'c')}
            </div>
        );
    }
}

class TrelloPage extends React.Component {

    setCardState(id, cardState) {
        let copyState = {...this.state};
        for (let card of copyState.cards ) {
            if (card.id === id) {
                card.state = cardState;
            }
        }
        this.setState({cards: copyState.cards});
        this.updateCards();
        window.location.reload();
    }

    addCard(card) {
        this.createCard(card);
        window.location.reload();
        // let copyState = {...this.state};
        // copyState.cards.push(card);

        // this.setState({cards: copyState.cards});
        // this.updateCards();
        // window.location.reload();
    }

    toggleCreateCard() {
        let copyState = {...this.state};
        copyState.createCardShow = !copyState.createCardShow;
        this.setState(copyState);
    }

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            createCardShow: false,
            errorShow: false,
            error: ''
        };
    }

    fetchCards = async() => {
        const response = await fetch('/api/cards');
        const body = await response.json();
        if (response.status !== 200) {
            let copyState = {...this.state};
            copyState.errorShow = true;
            copyState.error = body.error;
            this.setState(copyState);
        }
        return body;
    }

    updateCards = async() => {
        const response = await fetch('/api/cards', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state.cards)
        });
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message);
        }
    }

    createCard = async(card) => {
        const response = await fetch('/api/cards', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(card)
        });
        const body = await response.json();
        if (response.status !== 201) {
            throw Error(body.message);
        }
        window.location.reload();
    }

    componentDidMount() {
        this.fetchCards()
            .then(response => {
                let copyState = {...this.state};
                response.cards.forEach(card => {
                    card.due = new Date(card.due);
                    copyState.cards.push(card)
                });
                this.setState(copyState);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container-fluid">
                <TrelloHeader
                    addCard={this.addCard.bind(this)}
                    showCreateCard={this.toggleCreateCard.bind(this)}/>
                <TrelloBoard
                    cards={this.state.cards}
                    setCardState={this.setCardState.bind(this)}/>
                <TrelloCreateCardModal
                    createCardShow={this.state.createCardShow}
                    addCard={this.addCard.bind(this)}
                    hideCreateCard={this.toggleCreateCard.bind(this)}/>
                <TrelloErrorModal
                    show={this.state.errorShow}
                    error={this.state.error}/>
            </div>
        );
    }
}

export default TrelloPage;