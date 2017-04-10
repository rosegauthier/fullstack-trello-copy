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
        return <section className="board" 
                        key={ this.props.board._id }>
            <div className="board-top">
                <h2>{ this.props.board.title }</h2>
                <button className="remove-board" onClick={ () => this.props.removeBoard(this.props.board._id) } >🙅</button>
            </div>
            <div id={ this.props.board._id }
                onDragOver={ (e) => e.preventDefault() }
                 onDrop={ (e) => this.drop(e, this.props.board._id) }>
                { this.props.board.cards.map(card => {
                    return <Card key={ card._id } 
                                user={ this.props.user } 
                                allUsers={ this.props.allUsers }
                                reAssignTask={ this.props.reAssignTask }
                                removeCard={ this.props.removeCard }
                                card={ card } />
                }) }
            </div>
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
    //drag and drop functionality to move cards between boards, but this is just DOM manipulation. I am completely at a loss as to how to move the card from one board to another in the db. I think because I associated multiple cards with one board instead of associating 1 board to 1 card I made this a lot harder on myself. Do you have any ideas?
    drop(e, id) {

        e.preventDefault();
        var el = document.getElementById(id);
        console.log(el)
        var data = e.dataTransfer.getData("text");
        el.appendChild(document.getElementById(data));

    }
}

export default Board;