import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
import Browse from './components/Browse';

const Browser = () => ( <Browse />);
const Edit = () => <Edit />

class App extends React.Component {

    handleClick(name) {
        console.log(name + " clicked");
    }

    render() {
        return (
            <div className="container">
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

