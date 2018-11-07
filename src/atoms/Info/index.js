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
    return (
        props.soundData.map(d => {
            console.log('soundData: ', d);
            return (
                d ? (
                    <SoundEntry soundData={d} key={d} isEditing={props.isEditing}/>
                ) : null
            );
        })
    );
};

const Info = props => {
    
    console.log('Info props: ', props);
    return (
        <InfoWrapper>
            { props.soundData.length ? listSoundsData(props) : null }
            <SoundEntry
                new
                handleNewEntry={props.handleNewEntry}
                isEditing={props.isEditing}
                key={'new'}
            />
        </InfoWrapper>
    );
}

Info.propTypes = {
    soundData: PropTypes.array,
    isEditing: PropTypes.bool,
    handleNewEntry: PropTypes.func
};
export default Info;