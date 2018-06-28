import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
    margin: 0.5rem;
`;

export default class Button extends React.Component {
    
    constructor(props) {
        super(props);
        this.props = props;
        this.id = props.id || this.uuid();
        this.onClick =  props.onClick || this.handleClick;
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
            <ButtonWrapper
                id={this.id}
                className={"pure-button pure-button-primary " + this.props.className}
                onClick={this.onClick}
            >
                {this.props.text || "Click"}
            </ButtonWrapper>
        );
    }
}