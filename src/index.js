import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Browse from './containers/Browse';
import EditData from './containers/New';
import Search from './containers/Search';

class App extends React.Component {

    handleClick(name) {
        console.log(name + " clicked");
        switch (name) {
            case "search":
                ReactDOM.render(<Search />,document.getElementById('container'));
                break;
            case "new":
                ReactDOM.render(<EditData editType="add" />,document.getElementById('container'));
                break;
            case "browse":
                ReactDOM.render(<Browse />,document.getElementById('container'));
                break;
            default:
                console.log("nope, this isn't a thing");
                break;
        }
                
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
