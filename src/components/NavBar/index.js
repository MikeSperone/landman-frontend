import React from 'react';
import Login from '../Login';
import styled from 'styled-components';

const HorizontalMenu = styled.div.attrs({
    className: ''
})`
    
`;

const MenuItem = props => (
    <li className='pure-menu-item'>
        <a href='#' className='pure-menu-link'>{props.name}</a>
    </li>
);
const Menu = () => (
    <ul className='pure-menu-list'>
       <MenuItem name='About' />
       <MenuItem name='Saxophone' />
       <li className='pure-menu-item'><Login /></li>
    </ul>
);
const Title = () => <div className='pure-menu-heading'>Geoffery Landman Saxophone Database</div>;

const NavBar = () => (
    <div className="pure-menu pure-menu-horizontal">
        <Title />
        <Menu />
    </div>
);

export default NavBar;
