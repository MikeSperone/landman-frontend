import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar';
import About from './components/About';
import './index.css';

import Edit from './components/Edit';

const App = () => (
    <div>
        <NavBar />
        <Edit editType="search" />
        <About />
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
