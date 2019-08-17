import React, { Component } from 'react';
import Button from '../Button';

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
            email.matches('@') &&
            email.matches('.')
        );
    }

    validatePassword(password) {
        return password.length > 5;
    }

    validateForm() {
        const errors = [];
        if (!this.validateEmail(this.state.email)) errors.push('Invalid email address');
        if (!this.validatePassword(this.state.password)) errors.push('Invalid password');
        return errors;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render() {
        return (
            <div className="Login">
                <form className="pure-form" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <input
                            autoFocus
                            type="email"
                            name="email"
                            placeholder="human@example.com"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <Button
                            type="submit"
                            text="Login" 
                            disabled={!this.validateForm()}
                        />
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default Login;
