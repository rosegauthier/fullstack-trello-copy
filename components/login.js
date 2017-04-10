import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import $ from 'jquery';

import Field from './field';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            login: {
                mode: 'login',
                email: '',
                password: '',
                name: ''
            }
        }
        this.updateField = this.updateField.bind(this);
        this.login = this.login.bind(this);
    }

    render() {
        return (
            <div>
               <div>
                <label>
                  <input type='radio' name='mode' value='login' onChange={ this.updateField } checked={ this.state.login.mode == 'login'} />
                  Login
                </label>
                <label>
                  <input type='radio' name='mode' value='signup' onChange={ this.updateField } checked={ this.state.login.mode == 'signup'} />
                  Sign-up
                </label>
              </div>

              { this.state.login.mode == 'signup' ?
                  <Field label="Name" name="name" value={ this.state.login.name } onChange={ this.updateField } /> : null
              }
              <Field label="E-mail" name="email" value={ this.state.login.email } onChange={ this.updateField } />
              <Field label="Password" type="password" name="password" value={ this.state.login.password } onChange={ this.updateField } />

              { this.state.error ? <div>{ this.state.error }</div> : null }

              <button onClick={ this.login }>Login</button>
            </div>
        )
    }

    login() {
      let url;
      if(this.state.login.mode === 'login') {
        url = '/api/login';
      } else {
        url = '/api/signup';
      }

      $.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          name: this.state.login.name, 
          email: this.state.login.email, 
          password: this.state.login.password
        })
      }).then((data) => {
        this.props.onLogin(data);
      }).catch((error) => {
        this.setState({error: error});
      })
    }

    updateField(evt) {
      var login = this.state.login;
      login[evt.target.name] = evt.target.value;
      this.setState({login: login});
    }
}

export default Login;