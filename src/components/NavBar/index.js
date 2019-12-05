import React, { Component } from 'react';
import Login from '../Login';
import styled from 'styled-components';

const HorizontalMenu = styled.div.attrs({
    className: 'pure-menu pure-menu-horizontal'
})`
    display: flex;
`;
const MenuList = styled.div.attrs({
    className: 'pure-menu-list'
})`
    flex: auto;
`;

const LoginMenuWrapper = styled.li.attrs({
    className: "pure-menu-item pure-menu-has-children pure-menu-allow-hover"
})`
    float: right;
    && > ul {
        left: auto;
        right: 0;
    }
`;

const MenuItem = props => (
    <li className={'pure-menu-item ' + (props.selected ? 'pure-menu-selected' : '')}>
        <a href={props.href} className='pure-menu-link'>{props.name}</a>
    </li>
);

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false, 
            user: '',
        };
        this.handleUser = this.handleUser.bind(this);
    }

    handleUser(u) {
        if (u && u.user !== "undefined") {
            this.setState({ user: u.user, isLoggedIn: true });
        } else {
            console.error(u);
        }
    }

    render() {
        return (
            <HorizontalMenu>
                <div className='pure-menu-heading'>Geoffery Landman Saxophone Database</div>
                <MenuList>
                    <MenuItem name='About' href='example.com' />
                    <MenuItem name='Saxophone' href='example.com' selected />
                    { this.state.isLoggedIn ? (
                        <MenuItem name={'Greetings ' + this.state.user.firstName} />
                    ) : (
                        <LoginMenuWrapper>
                            <div id='menuLink1' className='pure-menu-link'>Login</div>
                            <ul className="pure-menu-children">
                                <li className='pure-menu-item'>
                                    <Login handleUser={this.handleUser} />
                                </li>
                            </ul>
                        </LoginMenuWrapper>
                    )}
                </MenuList>
            </HorizontalMenu>
        );
    }
}

export default NavBar;
