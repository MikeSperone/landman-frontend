import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import './index.css';
import CommentData from './CommentData';

import { Actions, user } from '../../api';


const CommentEntryWrapper = styled.div`
    border-bottom: 1px solid black;
    clear: both;
`;

class CommentEntry extends React.Component {
    constructor(props) {
        super(props);
        const comment = this.props.comment;
        this.soundID = comment && comment.id; 
        this.author = this.props.author && this.props.author;
        this.hasSoundData = Boolean(this.soundID);
        this.state = {
            comment,
            isEditing: false,
            selected: true, // fix this for a "Show Comments button"
        };

    }

    handleClick(e) {
        if (this.hasSoundData) {
            return this.setState(prevState => ({selected: !prevState.selected}));
        }

        // if there is no commentData, this leads to an "Add new data",
        // which is restricted to logged in users with access
        if (this.props.permissions.create) {
            this.setState(
                prevState => ({selected: !prevState.selected}),
                () => {
                    this.setState(
                        prevState => {
                            return (prevState.selected) ?
                                { isEditing: true } :
                                prevState;
                        }
                    );
                }
            );
        } else {
            alert('Insufficient permissions to create');
        }
    }

    handleEdit(e) {
        e.preventDefault();
        const hasAccess = user.hasAccess(Actions.UPDATE, this.author.id);
        if (hasAccess.access) {
            this.setState(() => ({ buttonText: "Edit", isEditing: true }));
        } else {
            alert(hasAccess.message);
        }
    }

    render() {
        console.log("rendering comment: ", this.props.comment);
        return (
            <CommentEntryWrapper>
                {this.state.selected ? (
                    <CommentData
                        data={this.state.comment || {}}
                        permissions={this.props.permissions}
                        isNew={this.props.new}
                    />
                ) : null}
            </CommentEntryWrapper>
        );
    }
}

CommentEntry.propTypes = {
    // isEditing: PropTypes.bool,
    new: PropTypes.bool,
    sound_id: PropTypes.number,
    comment: PropTypes.object,
    permissions: PropTypes.object
};

export default CommentEntry;
