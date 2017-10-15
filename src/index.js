import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Atoms/Components
import Button from './atoms/Button';

// Views
import Browse from './containers/Browse';
import NewData from './containers/NewData';
import Search from './containers/Search';

class App extends React.Component {

    handleClick(name) {
        console.log(name + " clicked");
        switch (name) {
            case "search":
                ReactDOM.render(<Search />,document.getElementById('container'));
                break;
            case "new":
                ReactDOM.render(<NewData editType="add" />,document.getElementById('container'));
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
                        <Button onClick={this.handleClick.bind(this, "search")} text="SEARCH" />
                    </div>
                    <div className="pure-u-1-3">
                        <Button onClick={this.handleClick.bind(this, "new")} text="NEW" />
                    </div>
                    <div className="pure-u-1-3">
                        <Button onClick={this.handleClick.bind(this, "browse")} text="BROWSE" />
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
