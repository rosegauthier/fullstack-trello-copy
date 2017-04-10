import React from 'react';
import ReactDOM from 'react-dom';

class Card extends React.Component {
    constructor() {
        super();
        this.state = {
            changeUser: false
        }

        this.displayAllUsers = this.displayAllUsers.bind(this);
        this.drag = this.drag.bind(this);
    }

    render() {
        return <div className="card" 
                    id={ this.props.card._id }
                    key={ this.props.card._id } 
                    draggable="true"
                    onDragStart={(e) => this.drag(e)}>
            <h4>{ this.props.card.title }</h4>
            <button className="remove-card" onClick={ () => this.props.removeCard(this.props.card._id) } >🙅</button>

            <p onClick={ () => this.setState({ changeUser: !this.state.changeUser }) } > For: { this.props.card.user ? 
                <span className="accent">
                    { this.props.card.user }
                    </span>
                 : 'unassigned'}</p>

            { this.state.changeUser === true ? <ul>{ this.displayAllUsers(this.props.allUsers, this.props.card._id) }</ul> : ''}
        </div>
    }

    displayAllUsers(users) {
        return users.map(user => {
            return <li key={ user.id } onClick={ () => this.assignUser(user.name, this.props.card._id) }>{ user.name }</li>
        })
    }

    assignUser(user, cardId) {
        this.props.reAssignTask(user, cardId);
        this.setState({changeUser: ''})
    }
    
    //drag and drop functionality to move cards between boards
    drag(e) {
        e.dataTransfer.setData("text", e.target.id);
    }
}

export default Card;