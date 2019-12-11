import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SoundEntry from './SoundEntry';
import { user } from '../../api';

const InfoWrapper = styled.div`
    width: calc(100% - 250px);
    float: right;
    @media (max-width: 640px) {
        width: 100%;
    }
`;

function listSoundsData(props) {
    return props.soundData.map(d => (
        d ?
        <SoundEntry
            fingering_id={ props.bin }
            permissions={ user.getAccess() }
            soundData={d}
            key={d.id}
            handleConfirmDelete={id => {
                console.info('Info/i id: ', id);
                return props.handleConfirmDelete(id);
            }}
        /> :
        null
    ));
};

const Info = props => {
    console.info('user.access ', user.getAccess());
    return (
    <InfoWrapper>
        { props.soundData.length ? listSoundsData(props) : null }
        {user.getAccess().create ?
            (<SoundEntry
                new
                fingering_id={props.bin}
                key={'new'}
                permissions={ user.getAccess() }
            />) :
            null
        }
    </InfoWrapper>
);}

Info.propTypes = {
    bin: PropTypes.string.isRequired,
    soundData: PropTypes.array.isRequired,
    handleConfirmDelete: PropTypes.func.isRequired,
};
export default Info;
