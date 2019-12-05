import React, { Component } from 'react';
import Button from '../Button';
import APIcalls from '../../api';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    validateEmail(email) {
        return (
            email.length > 5 &&
            email.match('@') &&
            email.match('.')
        );
    }

    validatePassword(password) {
        return password.length > 5;
    }

    validateForm() {
        return (
            this.validateEmail(this.state.email) &&
            this.validatePassword(this.state.password)
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        APIcalls.login(this.state.email, this.state.password)
            .then(d => {
                if (d.user) {
                    this.setState({ password: '' });
                    this.props.handleUser(d);
                } else {
                    alert('login error?');
                    console.log('login error? ', d);
                }
            }).catch(e => {
                alert(e);
            });
    }

    render() {
        return (
            <div className="Login">
                <form className="pure-form" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <input
                            style={{margin: '0.5rem'}}
                            autoFocus
                            id="email"
                            type="email"
                            name="email"
                            placeholder="human@example.com"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <Button
                            type="submit"
                            text="Login" 
                            className={this.validateForm() ? '' : 'pure-button-disabled'}
                        />
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default Login;
