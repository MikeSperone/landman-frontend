import React from 'react';
import './index.css';

class SaxKey extends React.Component {
    render() {
        let openClosed = (this.props.keyPressed === "0") ? "open" : "closed";
        return (
            <button className={this.props.keyName + " " + openClosed}
                onClick={() => this.props.onClick()}
            ></button>
        );
    }
}

export default class FingeringDisplay extends React.Component {
    constructor(props) {
        super();
        this.state = {
            keyState: props.bin,
        };
    }

    handleClick(i) {
        const keyState = this.state.keyState;
        console.log("keyState", keyState);
        const newState = (keyState[i] == 0) ? "1" : "0";
        const newKeyState = keyState.substr(0, i) + newState + keyState.substr(i + 1);
        this.setState({keyState: newKeyState});
    }

    renderKey(n, v) {
        return (
            <SaxKey
                keyName={n}
                keyPressed={this.state.keyState[v]}
                onClick={() => this.handleClick(v)}
            />
        );
    }

    render() {
        return (
            <div className="fingeringItem">
                <div className="leftColumn">
                    <div>
                        {this.renderKey("octave", 6)}
                    </div>
                    <div className="side">
                        {this.renderKey("highE", 12)}
                        {this.renderKey("sideC", 13)}
                        {this.renderKey("sideBFlat", 14)}
                    </div>
                    <div className="otherSideKeys">
                        {this.renderKey("highFSharp", 15)}
                        {this.renderKey("sideFSharp", 16)}
                    </div>
                </div>
                <div className="centerColumn">
                    <div className="front">
                        {this.renderKey("frontF", 7)}
                    </div>
                    <div className="fingers">
                        {this.renderKey("l1", 0)}
                        {this.renderKey("l2", 1)}
                        {this.renderKey("l3", 2)}
                        <hr/>
                        {this.renderKey("r1", 3)}
                        {this.renderKey("r2", 4)}
                        {this.renderKey("r3", 5)}
                    </div>
                    <div>
                        {this.renderKey("eFlat", 21)}
                        {this.renderKey("lowC", 22)}
                    </div>
                </div>
                <div className="rightColumn">
                    {this.renderKey("bis", 8)}
                    <div className="high">
                        {this.renderKey("highF", 10)}
                        {this.renderKey("highDSharp", 9)}
                        {this.renderKey("highD", 11)}
                    </div>
                    <div className="sideKeys">
                        {this.renderKey("gSharp", 17)}
                        {this.renderKey("lowB", 18)}
                        {this.renderKey("lowCSharp", 19)}
                        {this.renderKey("lowBFlat", 20)}
                    </div>
                </div>
            </div>
        );
    }
}

