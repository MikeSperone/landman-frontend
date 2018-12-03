import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const SaxKey = props => {
    const openClosed = (props.keyPressed === "0") ? "open" : "closed";
    return (
        <button
            className={props.keyName + " " + openClosed}
            onClick={() => props.onClick()}
        ></button>
    );
};

export default class FingeringDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.newBin = "00000000000000000000000000";
    }

    renderKey(n, v) {
        return (
            <SaxKey
                keyName={n}
                keyPressed={(this.props.bin && this.props.bin[v]) ? this.props.bin[v] : this.newBin[v]}
                onClick={() => this.props.handleClick(v)}
            />
        );
    }

    render() {
        return (
            <div className="fingeringDisplay">
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
            </div>
        );
    }
}

FingeringDisplay.propTypes = {
    bin: PropTypes.string,
    handleClick: PropTypes.func
};
