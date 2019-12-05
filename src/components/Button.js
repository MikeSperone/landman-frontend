import React from 'react';

export default class Button extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.id = props.id || this.uuid();
    }
    
    uuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4(); 
    }
    
    render() {
        
        return (
            <button
                id={this.id}
                className={"pure-button pure-button-primary " + this.props.className}
                onClick={this.props.onClick}
            >
                {this.props.text || "Click"}
            </button>
        );
    }
}
