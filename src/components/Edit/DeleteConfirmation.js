import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const ConfirmationWrapper = styled.div`
    height: 200px;
    width: 33vw;
    min-width: 360px
    background: white;
    border: 5px solid #C22;
    border-radius: 3px;
    font-size: 1.5rem;
    padding: 1rem;
    margin: 0 auto;
    z-index: 999;
    > div {
        position: absolute;
        width: 200px;
        left: 0;
        right: 0;
        bottom: 1rem;
        margin: 0 auto;
        #yes { background-color: #ccc; }
    }
    > * {
        text-align: center;
        margin-top: 0;
        > hr {
            width: 100%;
            margin: 0.5rem 0;
        }
    }
`;

const DeleteConfirmation = props => (
    <ConfirmationWrapper className={props.className}>
        <p>
            Please confirm you would like to delete this.
        </p>
        <hr />
        <p>
            <b>This can not be undone!</b>
        </p>
        <div>
            <Button id='no' text='No' onClick={props.onCancel}/>
            <Button id='yes' text='Yes' onClick={props.onConfirm}/>
        </div>
    </ConfirmationWrapper>
);

export default DeleteConfirmation;
