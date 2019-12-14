import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommentEntry from './CommentEntry';
import { user } from '../../api';

const CommentWrapper = styled.div`
    border-left: red 1px solid;
    border-bottom: red 1px solid;
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
            commentData={d}
            key={d.id}
            confirmDeleteComment={props.confirmDeleteComment}
        />) :
        null
    ));
};

const Comment = props => {
    return <CommentWrapper>
        {
            props.commentData.length ?
                listCommentData(props) :
                null
        }
        {
            user.getAccess().create ?
                <CommentEntry
                    new
                    sound_id={props.sound_id}
                    key={'new'}
                    permissions={ user.getAccess() }
                /> :
                null
        }
    </CommentWrapper>
}

Comment.propTypes = {
    commentData: PropTypes.array.isRequired,
    sound_id: PropTypes.number.isRequired,
    confirmDeleteComment: PropTypes.func.isRequired,
};
export default Comment;
