import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommentEntry from './CommentEntry';
import { user } from '../../api';

const CommentWrapper = styled.div`
    width: calc(100% - 250px);
    float: right;
    @media (max-width: 640px) {
        width: 100%;
    }
`;

function listCommentData(props) {
    console.info('comment list: ', props.commentData);
    return props.commentData.map(d => (
        d ?
        (<CommentEntry
            sound_id={ props.sound_id}
            permissions={ user.getAccess() }
            comment={d}
            key={d.id}
            handleConfirmDelete={props.handleConfirmDelete}
        />) :
        null
    ));
};

const Comment = props => {
    console.info('user.access ', user.getAccess());
    return (
    <CommentWrapper>
        { props.commentData.length ? listCommentData(props) : null }
        {user.getAccess().create ?
            (<CommentEntry
                new
                sound_id={props.sound_id}
                key={'new'}
                permissions={ user.getAccess() }
            />) :
            null
        }
    </CommentWrapper>
);}

Comment.propTypes = {
    commentData: PropTypes.array.isRequired,
    // handleConfirmDelete: PropTypes.func.isRequired,
};
export default Comment;
