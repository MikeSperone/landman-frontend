import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar';
import './index.css';

import Edit from './components/Edit';

const App = () => (
    <div>
        <NavBar />
        <Edit editType="search" />
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
