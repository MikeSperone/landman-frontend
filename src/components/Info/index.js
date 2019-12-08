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
    console.info('list: ', props.soundData);
    return props.soundData.map(d => (
        d ?
        <SoundEntry
            fingering_id={ props.bin }
            soundData={d}
            key={d.id}
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
            fingering_id={props.bin}
            key={'new'}
        />
    </InfoWrapper>
);

Info.propTypes = {
    bin: PropTypes.string.isRequired,
    soundData: PropTypes.array.isRequired,
    handleConfirmDelete: PropTypes.func.isRequired,
};
export default Info;
