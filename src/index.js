import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Edit from './components/Edit';

class SearchAdd extends React.Component {

    render() {
        return (
            <div>
                <Edit
                    data={{bin: "00000000000000000000000"}}
                    editType="search"
                />
                <div id="not-found"></div>
            </div>
        );
    }

}

const App = () => <SearchAdd />;

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
