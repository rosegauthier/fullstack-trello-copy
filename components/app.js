import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import $ from 'jquery';

import Login from './login'
import Board from './board'

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            user: null,
            allUsers: [],
            newCardTitle: '',
            newBoardTitle: '',
            boards: []
        }

        this.addNewCard = this.addNewCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.reAssignTask = this.reAssignTask.bind(this);
        this.userLoggedIn = this.userLoggedIn.bind(this);
        this.logout = this.logout.bind(this);
    }

    render() {
        if (this.state.user !== null) {
          return (
              <div>
                  <header>
                      <h1>Trello-ish</h1>
                      <div>
                        <button onClick={ () => this.logout() }>Logout</button>
                      </div>
                      <input type="text"
                              value={ this.state.newBoardTitle }
                              onChange={ (e) => this.handleChange(e.target.value, 'newBoardTitle') }/>
                      <button onClick={ () => this.addBoard() }>Add board</button>
                  </header>
                  <main>
                      { this.state.boards.map(board => {
                          return <Board board={ board } 
                                        user={ this.state.user }
                                        allUsers={ this.state.allUsers }
                                        key={ board._id }
                                        removeBoard={ (id) => this.removeBoard(id) } 
                                        addNewCard={ (id) => this.addNewCard(id) } 
                                        removeCard={ (id) => this.removeCard(id) }
                                        reAssignTask={ (user, cardId) => this.reAssignTask(user, cardId)}
                                        handleChange={ (val, state) => this.handleChange(val, state) } />
                      }) }
                  </main>
              </div>
          )
        } else {
          return <Login onLogin={ this.userLoggedIn }/>
        }
    }

    userLoggedIn(user) {
      this.setState({ user: user }, this.refresh);
    }

    logout() {
        $.ajax({
            url: '/api/signout',
            method: 'GET',
            contentType: 'application/json'
        })
        .then(this.setState({ user: null }));
    }

    reAssignTask(user, cardId) {

        console.log('clicked', user, cardId)
        $.ajax({
            url: `/api/cards/${cardId}`,
            data: JSON.stringify({ user: user }),
            method: 'PUT',
            contentType: 'application/json'
        })
        .then(card => {
            console.log('success')
            this.refresh();
        })
    }

    handleChange(val, state) {
        this.setState({ [state]: val });
    }

    addBoard() {
        $.ajax({
            url: '/api/boards',
            data: JSON.stringify({ title: this.state.newBoardTitle }),
            method: 'POST',
            contentType: 'application/json'
        })
        .then(board => {
            this.setState({ newBoardTitle: '' })
            this.refresh();
        })
    }

    removeBoard(id) {
        $.ajax({
            url: `/api/boards/${id}`,
            method: 'DELETE'
        })
        .then( () => this.refresh());
    }

    addNewCard(boardId) {
        $.ajax({
            url: `/api/boards/${boardId}/cards`,
            data: JSON.stringify({ title: this.state.newCardTitle, user: this.state.user.name }),
            method: 'POST',
            contentType: 'application/json'
        })
        .then(board => {
            this.refresh();
            this.setState({newCardTitle: ''});
        });
    }

    removeCard(id) {
        $.ajax({
            url: `api/cards/delete/${id}`,
            method: 'DELETE',
            contentType: 'application/json'
        })
        .then( () => this.refresh());
    }

    refresh() {
        $.get('/api/boards')
        .then(boards => {
            this.setState({ boards: boards });
        });

        $.get('/api/users')
        .then(users => {
            this.setState({ allUsers: users });
        });

        // var users = [...new Set(array.map(board => board.age))];
    }

    componentDidMount() {
      $.getJSON('/api/me')
      .then((user) => {
        //if there is a cookie, log in the user and show the boards
        if (user) {
          this.userLoggedIn(user)
        }
      })
      .catch((err) => { throw err } );
    }

}

export default App;