import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';

import Browse from '../containers/Browse';
// import Edit from './containers/Edit';
// import Search from './containers/Search';

const Browser = () => ( <Browse />);
// const Editor = () => <Edit />
// const Searcher = () => <Search />

class App extends React.Component {

    handleClick(name) {
        console.log(name + " clicked");
    }

    render() {
        return (
            <div className="menu">
                <h1>Geoffery Landman Saxophone Fingerings</h1>
                <div className="index-btns">
                    <div className="pure-u-1-3">
                        <button className="pure-button pure-button-primary" onClick={() => this.handleClick("search")}>SEARCH</button>
                    </div>
                    <div className="pure-u-1-3">
                        <button className="pure-button pure-button-primary" onClick={() => this.handleClick("new")}>NEW</button>
                    </div>
                    <div className="pure-u-1-3">
                        <button className="pure-button pure-button-primary" onClick={() => this.handleClick("browse")}>BROWSE</button>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

