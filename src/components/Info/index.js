import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SoundEntry from './SoundEntry';

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
            soundData={d}
            key={d.soundID}
            handleConfirmDelete={props.handleConfirmDelete}
        /> :
        null
    ));
};

const Info = props => (
    <InfoWrapper>
        { props.soundData.length ? listSoundsData(props) : null }
        <SoundEntry
            new
            bin={props.bin}
            handleNewEntry={props.handleNewEntry}
            key={'new'}
        />
    </InfoWrapper>
);

Info.propTypes = {
    bin: PropTypes.string.isRequired,
    soundData: PropTypes.array.isRequired,
    handleNewEntry: PropTypes.func.isRequired,
    handleConfirmDelete: PropTypes.func.isRequired,
};
export default Info;
