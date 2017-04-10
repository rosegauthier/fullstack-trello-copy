import React from 'react';
import ReactDOM from 'react-dom';
import Card from './card';

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            mode: ''
        }

        this.createCard = this.createCard.bind(this);
    }

    render() {
        return <section className="board" key={ this.props.board._id }>
            <div className="board-top">
                <h2>{ this.props.board.title }</h2>
                <button className="remove-board" onClick={ () => this.props.removeBoard(this.props.board._id) } >🙅</button>
            </div>
            { this.props.board.cards.map(card => {
                return <Card key={ card._id } 
                            user={ this.props.user } 
                            allUsers={ this.props.allUsers }
                            reAssignTask={ this.props.reAssignTask }
                            removeCard={ this.props.removeCard }
                            card={ card } />
            }) }
            { (this.state.mode === 'add') ? 
                <div className="add-new" key={ this.props.board._id } >
                    <label>
                        <input type="text"
                            value={ this.props.newCardTitle }
                            onChange={ (e) => this.props.handleChange(e.target.value, 'newCardTitle') } />
                    </label>
                    <button 
                        onClick={ () => this.createCard(this.props.board._id) } >Add!</button>
                </div> : '' }
            <div className="add-new-card" onClick={ () => (this.state.mode === 'add') ? this.setState({ mode: ''}) : this.setState({ mode: 'add'}) } >Add new task...</div>
        </section>
    }

    createCard(boardId) {
        this.setState({mode: ''})
        this.props.addNewCard(boardId);
    }
}

export default Board;