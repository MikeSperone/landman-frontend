import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Edit from './components/Edit';

const App = () => <Edit editType="search" /> ;

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
