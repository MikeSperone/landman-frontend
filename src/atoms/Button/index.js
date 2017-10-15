import React from 'react';

export default class Button extends React.Component {
    
    constructor(props) {
        super(props);
        this.id = props.id || this.uuid();
        this.className = "pure-button pure-button-primary " + props.className;
        this.onClick =  props.onClick || this.handleClick;
        this.text = props.text || "Click";
    }
    
    handleClick() {
        console.log("Button " + this.id + " has been clicked");
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
                className={this.className}
                onClick={this.onClick}
            >
                {this.text}
            </button>
        );
    }
}